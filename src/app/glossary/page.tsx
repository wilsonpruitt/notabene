import Link from "next/link";
import glossary from "@/data/glossary.json";
import { renderMarkdown } from "@/lib/markdown";
import { Fleuron } from "@/components/decorations";

interface Term {
  da: string;
  en: string;
  first: string;
  note: string;
}

export const metadata = {
  title: "Lexicon of Systematic Terms — The Kierkegaard–Notabene Edition",
};

export default function GlossaryPage() {
  const terms = glossary as Term[];
  return (
    <div className="prose-doc">
      <Link href="/" className="back-link">
        ← All Volumes
      </Link>
      <header className="entry-head">
        <div className="entry-spine">Editorial Matter · Translator’s Note § III</div>
        <h1 className="entry-title">Lexicon of Systematic Terms</h1>
        <div className="entry-title-en">
          The Danish terms carried, throughout the corpus, in the renderings
          indicated
        </div>
      </header>

      <p className="scholarly" style={{ marginBottom: "1rem" }}>
        These are not arbitrary lexical choices but the conceptual structure of
        the works. Each appears in Danish, in italic, on its first occurrence,
        with the English rendering as a gloss; subsequent occurrences appear in
        English alone unless the Danish term has acquired a determination the
        English cannot carry. The full lexicon is in the electronic apparatus;
        the table here reports the terms most central to the argument.
      </p>

      <table className="glossary-table">
        <thead>
          <tr>
            <th>Danish</th>
            <th>English</th>
            <th>First occurrence</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((t, i) => (
            <tr key={i}>
              <td className="glossary-da">{renderMarkdown(t.da, `g-da${i}`)}</td>
              <td className="glossary-en">{renderMarkdown(t.en, `g-en${i}`)}</td>
              <td className="glossary-note">
                {renderMarkdown(t.first, `g-fi${i}`)}
              </td>
              <td className="glossary-note">
                {renderMarkdown(t.note, `g-no${i}`)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p
        className="scholarly"
        style={{ marginTop: "1.5rem", fontStyle: "italic", color: "#6B6248" }}
      >
        See the{" "}
        <Link href="/translators-note" style={{ color: "#7E6534" }}>
          Translator’s Note
        </Link>{" "}
        for the principles behind these decisions.
      </p>

      <Fleuron />
    </div>
  );
}
