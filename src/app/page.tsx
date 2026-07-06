import Link from "next/link";
import {
  volumesBiographical,
  volumesEditorial,
  companion,
  docs,
} from "@/lib/content";
import { VolumeList } from "./volume-list";
import { Fleuron } from "@/components/decorations";

export default function Home() {
  const bio = volumesBiographical();
  const ed = volumesEditorial();
  const ix = companion();
  const matter = docs();

  return (
    <div>
      <section className="hero">
        <div className="eyebrow">Wroot Press · A Critical Edition</div>
        <h1>The Kierkegaard–Notabene Edition</h1>
        <div className="hero-gilt" />
        <div className="hero-sub">
          The eight books the 1844 <em>Forord</em> prefaced
        </div>
      </section>

      <p className="lede">
        In June 1844 the bookseller C. A. Reitzel published, under the pseudonym{" "}
        <em>Nicolaus Notabene</em>, a small octavo volume of eight prefaces and
        no books — <em>Forord, indeholdende Prøver til et nyt Tidsskrift</em>.
        The prefaces prefaced nothing. Between December 1844 and February 1847,
        Notabene composed and published the eight <em>books</em> those prefaces
        had announced. This edition presents those eight phantom volumes,
        Danish source and English translation on facing pages, with a
        biographical companion and the editorial apparatus. The form is the
        argument; the apparatus is part of the work, not its frame.
      </p>

      <VolumeList biographical={bio} editorial={ed} />

      {ix && (
        <>
          <div className="section-label">The Biographical Companion</div>
          <div className="vol-list">
            <Link href={`/${ix.slug}`} className="vol-card">
              <div className="vol-card-spine">
                <span className="spine-roman">{ix.spine}</span>
                <span className="spine-label">Companion</span>
              </div>
              <div className="vol-card-body">
                <div className="vol-card-da">{ix.daTitle}</div>
                <div className="vol-card-en">{ix.enTitle}</div>
                <div className="vol-card-meta">
                  Chronology · Dramatis personae · Skilsmissebrev · Burnt
                  fragment · Correspondence · Vibskov 1962
                </div>
              </div>
            </Link>
          </div>
        </>
      )}

      <div className="section-label">Editorial Matter</div>
      <div className="matter-grid">
        {matter.map((d) => (
          <Link key={d.slug} href={`/${d.slug}`} className="matter-card">
            <div className="mc-t">{d.enTitle}</div>
            <div className="mc-s">{d.pub}</div>
          </Link>
        ))}
        <Link href="/glossary" className="matter-card">
          <div className="mc-t">Lexicon of Systematic Terms</div>
          <div className="mc-s">Translator’s Note § III</div>
        </Link>
      </div>

      <Fleuron />
    </div>
  );
}
