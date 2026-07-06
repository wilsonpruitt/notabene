import Link from "next/link";
import { volumesBiographical } from "@/lib/content";
import { Fleuron } from "@/components/decorations";

export const metadata = {
  title: "About this Edition — The Kierkegaard–Notabene Edition",
};

export default function AboutPage() {
  const vols = volumesBiographical();
  return (
    <div className="prose-doc">
      <Link href="/" className="back-link">
        ← All Volumes
      </Link>
      <header className="entry-head">
        <div className="entry-spine">Wroot Press · MMXXVI</div>
        <h1 className="entry-title">About this Edition</h1>
      </header>

      <div className="scholarly">
        <p className="md-p">
          In June 1844 the Copenhagen bookseller C. A. Reitzel published, under
          the pseudonym <em>Nicolaus Notabene</em>, a small octavo volume
          entitled <em>Forord, indeholdende Prøver til et nyt Tidsskrift</em> —{" "}
          <em>Prefaces, containing Specimens for a New Journal</em>. It
          contained eight prefaces and no books. The prefaces prefaced nothing.
        </p>
        <p className="md-p">
          Beginning with <em>Urania, Aarbog for 1845</em> in December 1844, and
          continuing volume by volume until February 1847, Notabene composed
          and published the eight <em>books</em> that the 1844 prefaces had
          announced. This edition presents those eight phantom volumes, the
          Danish source set in its period orthography on the verso and the
          English translation on the recto, together with a biographical
          companion (Volume IX) and the editorial apparatus.
        </p>

        <h3 className="md-h3">Reading orders</h3>
        <p className="md-p">
          The corpus admits of two reading-sequences. The{" "}
          <em>biographical</em> order — the order in which Notabene composed and
          published the volumes — is recommended for a first reading and is the
          edition’s primary navigation:{" "}
          {vols.map((v, i) => (
            <span key={v.slug}>
              <Link href={`/${v.slug}`} style={{ color: "#7E6534" }}>
                {v.spine}
              </Link>
              {i < vols.length - 1 ? " — " : "."}
            </span>
          ))}{" "}
          The <em>editorial</em> order — the order of the eight prefaces in the
          1844 <em>Forord</em> — is preserved on the spines (I–VIII) for the
          citation conventions a century of scholarship has established. Both
          orders are offered on the home page; neither is regarded as
          exclusively correct.
        </p>

        <h3 className="md-h3">The bilingual presentation</h3>
        <p className="md-p">
          The volumes of 1844–1847, and the documents of 1923 and 1962, appear
          in their original Danish with an English translation on facing pages.
          The 2026 editorial apparatus — the General Introduction, the
          editor’s introductions, the textual apparatus — is in English only,
          the Norden Foundation grant having underwritten the English critical
          publication specifically. The Danish is set in the period
          orthography of its source (<em>aa</em> for the modern <em>å</em>,
          capital common nouns, the period’s compounding and punctuation); it
          is not modernized. Vibskov’s 1962 essay, by contrast, retains its
          mid-twentieth-century orthography, marking its later time-stratum.
        </p>
        <p className="md-p">
          The <em>Forord</em> of 1844 itself is not re-edited here; it has been
          authoritatively edited in <em>Søren Kierkegaards Skrifter</em>{" "}
          (vol. 4, Gads Forlag, 1997).
        </p>

        <h3 className="md-h3">Editorial matter</h3>
        <p className="md-p">
          <Link href="/general-introduction-henriksen" style={{ color: "#7E6534" }}>
            General Introduction
          </Link>{" "}
          (Henriksen, 2024) ·{" "}
          <Link
            href="/historical-preface-hertel-1923"
            style={{ color: "#7E6534" }}
          >
            Hertel’s 1923 Prospectus
          </Link>{" "}
          ·{" "}
          <Link href="/translators-note" style={{ color: "#7E6534" }}>
            Translator’s Note
          </Link>{" "}
          ·{" "}
          <Link href="/glossary" style={{ color: "#7E6534" }}>
            Lexicon of Systematic Terms
          </Link>
          .
        </p>
      </div>

      <Fleuron />
    </div>
  );
}
