/**
 * build-content.mjs — ingest the Forord phantom-volumes corpus
 * (~/Downloads/prefaces/*.md) into src/data/content.json, which the
 * Next.js app imports at build time.
 *
 * The corpus is a critical edition: each phantom volume has a Danish
 * source file and an English-translation file whose section HEADINGS
 * are identical Danish strings (only the prose under them differs by
 * language). The English file additionally carries one English-only
 * "## Physical description" production note. Editor's introductions
 * and textual apparatus are separate English-only files.
 *
 * Output model is SECTION-PAIRED (not paragraph-zipped): every section
 * carries its Danish heading, its Danish body, its English body, and a
 * per-section `bilingual` flag (false ⇒ render English-only, full width).
 *
 * Display fidelity is load-bearing: bodies are passed through verbatim.
 * Nothing here normalizes period orthography (aa/å), casing, quotes,
 * em-dash length, or Greek script. The renderer is non-destructive too.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.resolve(__dirname, "..");
// The corpus is bundled in-repo (corpus/) so builds are self-contained and
// reproducible on Vercel. Falls back to the author's working copy locally.
const BUNDLED = path.join(SITE_DIR, "corpus");
const WORKING = path.join(process.env.HOME || "", "Downloads", "prefaces");
const SRC_DIR = fs.existsSync(BUNDLED) ? BUNDLED : WORKING;
const OUT_FILE = path.join(SITE_DIR, "src", "data", "content.json");

// ── Editorial metadata (stable; this corpus is textually frozen) ──────────
// bio = Notabene's biographical/compositional order (primary nav).
// spineNum = the 1844 Forord editorial order, kept for citation.

const VOLUMES = [
  { slug: "iv-urania", spine: "IV", spineNum: 4, bio: 1,
    en: "urania_1845.md", da: "preface_04_urania_danish.md",
    intro: "editor_intro_04_urania.md", app: "editor_apparatus_04_urania.md",
    daTitle: "Urania, Aarbog for 1845", enTitle: "Urania, Almanac for 1845",
    pub: "December 1844", forord: "Forord IV" },
  { slug: "i-logiske-system", spine: "I", spineNum: 1, bio: 2,
    en: "preface_01_logical_system.md", da: "preface_01_logical_system_danish.md",
    intro: "editor_intro_01_logical_system.md", app: "editor_apparatus_01_logical_system.md",
    daTitle: "Det logiske System", enTitle: "The Logical System",
    pub: "January 1845", forord: "Forord I" },
  { slug: "viii-philosophiske-overveielser", spine: "VIII", spineNum: 8, bio: 3,
    en: "preface_08_philosophical_journal.md", da: "preface_08_philosophical_journal_danish.md",
    intro: "editor_intro_08_philosophical_journal.md", app: "editor_apparatus_08_philosophical_journal.md",
    daTitle: "Philosophiske Overveielser, Første Hefte",
    enTitle: "Philosophical Considerations, First Number",
    pub: "April 1845", forord: "Forord VIII" },
  { slug: "v-total-afholdenhed", spine: "V", spineNum: 5, bio: 4,
    en: "preface_05_temperance_society.md", da: "preface_05_temperance_society_danish.md",
    intro: "editor_intro_05_temperance_society.md", app: "editor_apparatus_05_temperance_society.md",
    daTitle: "Tale for Total-Afholdenheds-Selskabet",
    enTitle: "Address for the Total-Abstinence Society",
    pub: "April 1845", forord: "Forord V" },
  { slug: "vi-fire-og-tyve-praedikener", spine: "VI", spineNum: 6, bio: 5,
    en: "preface_06_edifying_discourses.md", da: "preface_06_edifying_discourses_danish.md",
    intro: "editor_intro_06_edifying_discourses.md", app: "editor_apparatus_06_edifying_discourses.md",
    daTitle: "Fire og Tyve Prædikener", enTitle: "Twenty-Four Sermons",
    pub: "December 1845", forord: "Forord VI" },
  { slug: "iii-anden-udgave", spine: "III", spineNum: 3, bio: 6,
    en: "preface_03_second_edition.md", da: "preface_03_second_edition_danish.md",
    intro: "editor_intro_03_second_edition.md", app: "editor_apparatus_03_second_edition.md",
    daTitle: "Det logiske System, Anden Udgave",
    enTitle: "The Logical System, Second Edition",
    pub: "January 1846", forord: "Forord III" },
  { slug: "ii-lyriske-productioner", spine: "II", spineNum: 2, bio: 7,
    en: "preface_02_lyric_author.md", da: "preface_02_lyric_author_danish.md",
    intro: "editor_intro_02_lyric_author.md", app: "editor_apparatus_02_lyric_author.md",
    daTitle: "Lyriske Productioner for hiin Enkelte",
    enTitle: "Lyric Productions for That Single Reader",
    pub: "May 1846", forord: "Forord II" },
  { slug: "vii-philosophiske-smaastykker", spine: "VII", spineNum: 7, bio: 8,
    en: "preface_07_smuggled_preface.md", da: "preface_07_smuggled_preface_danish.md",
    intro: "editor_intro_07_smuggled_preface.md", app: "editor_apparatus_07_smaastykker.md",
    daTitle: "Philosophiske Smaastykker", enTitle: "Philosophical Fragments",
    pub: "February 1847", forord: "Forord VII" },
];

// ── helpers ───────────────────────────────────────────────────────────────

function read(file) {
  return fs.readFileSync(path.join(SRC_DIR, file), "utf-8").replace(/\r\n/g, "\n");
}

// Split a markdown doc into { preamble, sections:[{heading, body}] } on
// top-level "## " headings. Preamble = everything before the first "## ".
function splitH2(text) {
  const lines = text.split("\n");
  const preamble = [];
  const sections = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^## (?!#)(.*)$/);
    if (m) {
      if (cur) sections.push(cur);
      cur = { heading: m[1].trim(), bodyLines: [] };
    } else if (cur) {
      cur.bodyLines.push(line);
    } else {
      preamble.push(line);
    }
  }
  if (cur) sections.push(cur);
  return {
    preamble: preamble.join("\n").trim(),
    sections: sections.map((s) => ({ heading: s.heading, body: s.bodyLines.join("\n").trim() })),
  };
}

// A section is "prose" (i.e. real body, not a title-page pseudo-heading)
// when one of its paragraphs is substantial.
function isProse(body) {
  return body
    .split(/\n{2,}/)
    .some((p) => p.replace(/[*_>#`-]/g, "").trim().length >= 200);
}

// Normalize a heading for cross-language matching: strip emphasis, upcase,
// drop non-alphanumerics. ("NOTABENE'S FORORD" ⇔ "NOTABENES FORORD")
function normHeading(h) {
  return h
    .replace(/[*_`#]/g, "")
    .toUpperCase()
    .replace(/[^A-ZÆØÅ0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Leading roman-numeral token of a heading ("VI. SELECTED ..." -> "VI").
function romanPrefix(h) {
  const m = normHeading(h).match(/^([IVXLC]+)\b/);
  return m ? m[1] : null;
}

function firstProseIndex(sections) {
  return sections.findIndex((s) => isProse(s.body));
}

// ── phantom volumes (I–VIII) ─────────────────────────────────────────────

function buildVolume(v) {
  const en = splitH2(read(v.en));
  const da = splitH2(read(v.da));

  // Every English phantom-volume file carries exactly one English-only
  // "## Physical description" section, positioned immediately after the
  // (shared, Danish) title-page pseudo-headings and immediately before
  // the first body section. It is a reliable structural sentinel:
  //   title-page pseudo-sections | Physical description | body sections…
  // The Danish file has the same leading title-page pseudo-sections but
  // no Physical description, so its body begins at the same index.
  const pd = en.sections.findIndex(
    (s) => normHeading(s.heading) === "PHYSICAL DESCRIPTION"
  );
  if (pd < 0) {
    console.warn(`  ! ${v.slug}: no "Physical description" sentinel found`);
  }
  const tpCount = pd < 0 ? firstProseIndex(en.sections) : pd;

  // Title page taken from the Danish file (canonical period artifact).
  const titlePieces = [da.preamble];
  for (let i = 0; i < tpCount; i++) {
    titlePieces.push("## " + da.sections[i].heading);
    if (da.sections[i].body) titlePieces.push(da.sections[i].body);
  }
  const titlePage = titlePieces.filter(Boolean).join("\n\n").trim();

  const physical = pd >= 0 ? en.sections[pd].body.trim() : "";
  const enBody = en.sections.slice(pd >= 0 ? pd + 1 : tpCount);
  const daBody = da.sections.slice(tpCount);

  if (enBody.length !== daBody.length) {
    console.warn(
      `  ! ${v.slug}: section count mismatch EN ${enBody.length} / DA ${daBody.length} — pairing by index`
    );
  }

  const n = Math.max(enBody.length, daBody.length);
  const sections = [];
  for (let i = 0; i < n; i++) {
    const d = daBody[i];
    const e = enBody[i];
    sections.push({
      id: "s" + (i + 1),
      heading: (d && d.heading) || (e && e.heading) || "",
      danish: d ? d.body : "",
      english: e ? e.body : "",
      bilingual: true,
    });
  }

  return {
    slug: v.slug,
    kind: "volume",
    spine: v.spine,
    spineNum: v.spineNum,
    bio: v.bio,
    daTitle: v.daTitle,
    enTitle: v.enTitle,
    pub: v.pub,
    forord: v.forord,
    titlePage,
    physical,
    sections,
    editorIntro: read(v.intro).trim(),
    apparatus: read(v.app).trim(),
  };
}

// ── Vol IX — biographical companion (mixed bilingual/EN-only) ─────────────

function buildVolumeIX() {
  const en = splitH2(read("volume_09_liv_og_tid.md"));
  const da = splitH2(read("volume_09_liv_og_tid_danish.md"));

  const enStart = firstProseIndex(en.sections);
  const titlePieces = [en.preamble];
  for (let i = 0; i < enStart; i++) {
    titlePieces.push("## " + en.sections[i].heading);
    if (en.sections[i].body) titlePieces.push(en.sections[i].body);
  }
  const titlePage = titlePieces.filter(Boolean).join("\n\n").trim();

  // Danish file carries only the bilingual sections (VI correspondence,
  // VII Vibskov 1962 essay). Match them to the English master by the
  // section's leading roman numeral. Note: VII's Danish deliberately uses
  // MODERN orthography (1962 stratum) — do not normalize it to the 1840s
  // aa-orthography of the other Danish, and vice versa. Passed verbatim.
  const daByRoman = {};
  for (const s of da.sections) {
    const r = romanPrefix(s.heading);
    if (r) daByRoman[r] = s;
  }

  const sections = [];
  let idx = 0;
  for (let i = enStart; i < en.sections.length; i++) {
    const s = en.sections[i];
    idx++;
    const r = romanPrefix(s.heading);
    const daMatch = r ? daByRoman[r] : null;
    sections.push({
      id: "s" + idx,
      heading: s.heading,
      english: s.body,
      danish: daMatch ? daMatch.body : "",
      // Sections I–V + Editor's Note are English-only here. Sections III
      // (Skilsmissebrev) and IV (burnt fragment) embed their Danish inline
      // within the English master — rendered verbatim, full width.
      bilingual: Boolean(daMatch && daMatch.body),
    });
  }

  return {
    slug: "ix-liv-og-tid",
    kind: "companion",
    spine: "IX",
    spineNum: 9,
    bio: 9,
    daTitle: "Liv og Tid af Nicolaus Notabene",
    enTitle: "Life and Times of Nicolaus Notabene",
    pub: "Biographical companion",
    forord: "—",
    titlePage,
    physical: "",
    sections,
    editorIntro: "",
    apparatus: "",
  };
}

// ── editorial documents ───────────────────────────────────────────────────

// Hertel 1923: EN-only headnote/provenance, one bilingual 1923-text
// section ("TIL DET CULTIVEREDE PUBLIKUM"), EN-only closing note (which
// lives at the tail of the EN body for that section — naturally unpaired).
function buildHertel() {
  const en = splitH2(read("general_introduction_hertel_1923.md"));
  const da = splitH2(read("general_introduction_hertel_1923_danish.md"));

  const sections = [];
  for (let i = 0; i < en.sections.length; i++) {
    const e = en.sections[i];
    const norm = normHeading(e.heading);
    const d = da.sections.find((x) => normHeading(x.heading) === norm);
    sections.push({
      id: "s" + (i + 1),
      heading: e.heading,
      english: e.body,
      danish: d ? d.body : "",
      bilingual: Boolean(d && d.body),
    });
  }

  return {
    slug: "historical-preface-hertel-1923",
    kind: "doc",
    spine: "",
    spineNum: 0,
    bio: 0,
    daTitle: "Historisk Fortale",
    enTitle: "Historical Preface — Hertel’s 1923 Prospectus",
    pub: "Frede Hertel, 1923",
    forord: "—",
    titlePage: en.preamble.trim(),
    physical: "",
    sections,
    editorIntro: "",
    apparatus: "",
  };
}

// English-only editorial documents (Henriksen's General Introduction;
// the Translator's Note). Rendered single-column.
function buildDoc(file, slug, daTitle, enTitle, pub) {
  const doc = splitH2(read(file));
  const sections = doc.sections.map((s, i) => ({
    id: "s" + (i + 1),
    heading: s.heading,
    english: s.body,
    danish: "",
    bilingual: false,
  }));
  return {
    slug,
    kind: "doc",
    spine: "",
    spineNum: 0,
    bio: 0,
    daTitle,
    enTitle,
    pub,
    forord: "—",
    titlePage: doc.preamble.trim(),
    physical: "",
    sections,
    editorIntro: "",
    apparatus: "",
  };
}

// ── main ──────────────────────────────────────────────────────────────────

const out = [];

for (const v of VOLUMES) {
  process.stdout.write(`Volume ${v.spine} (${v.slug}) … `);
  const built = buildVolume(v);
  console.log(`${built.sections.length} sections`);
  out.push(built);
}

const ix = buildVolumeIX();
console.log(`Volume IX (${ix.slug}) … ${ix.sections.length} sections, ` +
  `${ix.sections.filter((s) => s.bilingual).length} bilingual`);
out.push(ix);

out.push(buildHertel());
out.push(
  buildDoc(
    "general_introduction_henriksen_2026.md",
    "general-introduction-henriksen",
    "Almindelig Indledning",
    "General Introduction",
    "Mads Fedder Henriksen, 2024"
  )
);
out.push(
  buildDoc(
    "translator_note.md",
    "translators-note",
    "Oversætterens Note",
    "Translator’s Note",
    "Mads Fedder Henriksen, 2024"
  )
);

// ── glossary: the systematic-terms table from Translator's Note § III ─────
function buildGlossary() {
  const tn = read("translator_note.md");
  const rows = [];
  let inTable = false;
  for (const line of tn.split("\n")) {
    const isRow = /^\s*\|.*\|\s*$/.test(line);
    if (!isRow) {
      if (inTable && rows.length) break; // table ended
      continue;
    }
    const cells = line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    const joined = cells.join("").replace(/[\s:-]/g, "");
    if (joined === "") continue; // separator row
    if (/^danish$/i.test(cells[0])) {
      inTable = true;
      continue; // header row
    }
    if (inTable && cells.length >= 2) {
      rows.push({
        da: cells[0],
        en: cells[1] || "",
        first: cells[2] || "",
        note: cells[3] || "",
      });
    }
  }
  return rows;
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 0));
const glossary = buildGlossary();
fs.writeFileSync(
  path.join(SITE_DIR, "src", "data", "glossary.json"),
  JSON.stringify(glossary, null, 0)
);
console.log(`Built glossary.json: ${glossary.length} systematic terms.`);

const vols = out.filter((x) => x.kind === "volume").length;
const secs = out.reduce((s, x) => s + x.sections.length, 0);
console.log(
  `\nBuilt content.json: ${out.length} entries (${vols} phantom volumes + ` +
  `companion + 3 editorial docs), ${secs} sections total.`
);
