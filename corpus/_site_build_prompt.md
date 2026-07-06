# Prompt for next session — build the Forord phantom-volumes site

*Paste the block below after `/clear`. Working directory is `~/Downloads/prefaces/`.*

---

The Forord phantom-volumes project is a Kierkegaardian speculative-philosophy work in the form of a critical edition of an imagined Danish authorship (Nicolaus Notabene, 1844–1847), produced as-if-for-print but destined for a sub-site of `wrootpress.com`. **The textual corpus is now complete in both languages** — English (~136,500 w) and period Danish (~55,000 w). The remaining commitment is **building the actual bilingual website**, modeled on `ambrose.actasanctorum.org`.

## Before doing anything else, read these in order

1. Project memory `forord-phantom-volumes.md` and feedback memory `feedback_as-if-for-print-earnestness.md` — both load-bearing. The dual frame (as-if-for-print earnestness; the apparatus *is* the work, not decoration) governs every design decision. On the site, the apparatus is the experience for many visitors — do not treat it as secondary.
2. `~/Downloads/prefaces/general_introduction_henriksen_2026.md` — § VI gives the two reading orders and the editorial rationale; § V gives the bilingual-presentation principle (Danish verso / English recto, apparatus English-only).
3. `~/Downloads/prefaces/translator_note.md` — the production spec; § II–VI document the orthographic and typographic conventions the Danish text must be *displayed* with (period *aa*, capital common nouns, long-s on title pages only, em-dashes at original length, Greek in Greek script, retained-German italics). The site's typography must not "correct" these.
4. Inspect the bilingual model: the `ambrose.actasanctorum.org` site lives under `~/acta-sanctorum/` (look at `site/`, `src/`, `DEPLOY.md`, `package.json`). Determine its stack, its bilingual-toggle mechanism, its routing, and how it deploys. This is the structural template — match it unless there is a strong reason not to.
5. Inspect `~/wrootpress.com/` for the wrootpress deployment pattern (Vercel, `wilson-pruitts-projects` team) and how existing sub-sites (loci, doctrine, topographia) are wired, so the new sub-site follows house convention.

## Confirm these decisions with Wilson *early* (use AskUserQuestion before building)

- **Subdomain.** Likely `forord.wrootpress.com` or `notabene.wrootpress.com`. DNS for the `wrootpress.com` zone is managed at **Cloudflare** (CNAME → `cname.vercel-dns.com`, or A `76.76.21.21`); Wilson does the DNS swing.
- **Stack.** Match ambrose's stack exactly, or build fresh in the Doctrine/Topographia pattern (Astro 6 + MDX on Vercel)? Recommend matching whichever gives the cleanest bilingual facing-page toggle; state your recommendation with the tradeoff.
- **Hertel 1923 gap.** `general_introduction_hertel_1923.md` is a 1923 prospectus that, by the dual frame, *should* be bilingual (1840s–1962 documents are bilingual; only 2026 apparatus is English-only). Its Danish was never produced. Options: (a) produce a 1920s-philological-Danish version first, (b) ship it English-only with an editor's note, (c) defer. Flag this; don't silently pick.

## Corpus file inventory and bilingual status

Eight phantom volumes. **Note the filename asymmetry**: Vol IV's English is `urania_1845.md` (the calibration file), *not* `preface_04_*`.

| Vol | English file | Danish file | Site treatment |
|---|---|---|---|
| I | `preface_01_logical_system.md` | `preface_01_logical_system_danish.md` | bilingual facing |
| II | `preface_02_lyric_author.md` | `preface_02_lyric_author_danish.md` | bilingual facing |
| III | `preface_03_second_edition.md` | `preface_03_second_edition_danish.md` | bilingual facing |
| IV | `urania_1845.md` | `preface_04_urania_danish.md` | bilingual facing |
| V | `preface_05_temperance_society.md` | `preface_05_temperance_society_danish.md` | bilingual facing |
| VI | `preface_06_edifying_discourses.md` | `preface_06_edifying_discourses_danish.md` | bilingual facing |
| VII | `preface_07_smuggled_preface.md` | `preface_07_smuggled_preface_danish.md` | bilingual facing |
| VIII | `preface_08_philosophical_journal.md` | `preface_08_philosophical_journal_danish.md` | bilingual facing |

- `editor_intro_0{1-8}_*.md` — **English-only** (2026 Henriksen apparatus). One per volume.
- `editor_apparatus_0{1-8}_*.md` — **English-only** (2026 Cappelørn-style apparatus). One per volume.
- `general_introduction_henriksen_2026.md` — **English-only** (2026).
- `general_introduction_hertel_1923.md` — see "Hertel 1923 gap" above (currently English-only; ideally bilingual).
- `translator_note.md` — **English-only** (2026, Henriksen).
- `volume_09_liv_og_tid.md` (English master) + `volume_09_liv_og_tid_danish.md` (Danish portions). Vol IX is **mixed**: Henriksen frame (§§ I, II, V chronology/dramatis personae/bibliography) English-only; Skilsmissebrev (§ III) and burnt fragment (§ IV) bilingual (Danish already in the English master file alongside its translation); Reitzel correspondence (§ VI) bilingual; Vibskov 1962 essay (§ VII) bilingual — and note the Vibskov Danish deliberately uses *modern* orthography (å, lowercase nouns) to mark its 1962 time-stratum, distinct from the 1840s strata. Do not normalize the two Danish orthographies to each other.
- Supporting/no-publish-as-page: `forord_handoff.md`, `notabene_bio_and_boxset.md`, `cover_design_spec.md`, `period_covers_1844-1847.md`, `_next_session_prompt.md`, this file. These are working docs, not site content (the cover/period specs may inform visual design and any inside-apparatus plates).

## Reading order and citation convention (from Henriksen § VI)

- **Primary navigation = Notabene's biographical order: IV — I — VIII — V — VI — III — II — VII.** Vol IX is the biographical companion, presented as such.
- **Spines/citation = editorial order I–VIII** (the 1844 *Forord* sequence), preserved for the century of scholarship that cites by it. Each volume page should show both: its biographical position and its editorial (spine) number.
- Offer the reader both sequences (biographical recommended for first reading; editorial for the returning reader). Don't force one.
- The 1844 *Forord* itself is **not** re-edited here (it's in SKS vol. 4); reference it from the General Introduction, don't reproduce it.

## Display fidelity (the earnestness is in the details)

- Render the Danish in its period orthography exactly as written — `aa` not `å`, capital common nouns, period compounds, em-dashes at length, semicolons where modern Danish would use commas. The bilingual CSS/typography must not auto-correct or "modernize."
- Greek stays in Greek script (Vol VII § 10: συμπαθῆσαι ταῖς ἀσθενείαις τῶν ἀνθρώπων). Retained German (*Mediation*, *Aufhebung*, *plötzlich*, *Sein/Nichts/Werden*) and Latin tags stay in their italic forms.
- Title pages may use long-s (ſ) as a visual signal per Translator's Note § II; body text uses modern short-s. If you implement long-s on title pages, do it as a display layer, not by altering source text.
- Systematic key terms (*Springet*, *Øieblikket*, *Indesluttethed*, *Svimmelhed*, *hiin Enkelte*, *Løfte*, *Bekjendtgjørelse*, *Alvor*) are italicized on first occurrence in the English per Translator's Note § III — preserve that, and consider a glossary/lexicon affordance keyed to the Translator's Note table.

## Deploy workflow constraints (from feedback memory)

- **Production only** — no preview/staging/local-env workflow; build straight to the production Vercel project. Use `npx vercel`, never bare `vercel`.
- **Batch deploys** — stack commits through the session, deploy once at the end.
- 8 GB RAM machine: prefer `--turbopack` if Next.js; don't run parallel heavy builds.
- DNS swing is Wilson's to do at Cloudflare once the Vercel project + domain are configured.

## Suggested build sequence

1. Confirm subdomain + stack + Hertel handling with Wilson (AskUserQuestion).
2. Inspect ambrose; scaffold the sub-site in the matched stack; wire the Vercel project under `wilson-pruitts-projects`.
3. Content pipeline: ingest the markdown files; build the bilingual facing-page component (Danish verso / English recto, with a single-language toggle); handle the per-volume editor-intro + apparatus as English-only attached sections.
4. Navigation: biographical order primary, editorial spine numbers visible, both-sequence switch. Landing page in the Henriksen register (sober, scholarly — the production frame is the work).
5. Vol IX special-case (mixed bilingual/English-only sections; two Danish orthographies).
6. Glossary/lexicon affordance from Translator's Note § III; optional reception-history plates from `period_covers_1844-1847.md` if time allows.
7. Verify the rendered pages in a browser — golden path (read a volume bilingually, toggle languages, switch reading order) and the Vol IX edge cases — before reporting done. Deploy once at session end; tell Wilson the DNS records to set.

The full corpus state is in `forord-phantom-volumes.md` in memory. The dual frame and the Kierkegaardian particularity are the load-bearing principles: build the site as a serious critical-edition reading environment, not a generic doc site.
