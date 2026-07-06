import Link from "next/link";
import { loadAll, loadEntry, neighbours } from "@/lib/content";
import { renderMarkdown, renderTitlePage } from "@/lib/markdown";
import { Reader } from "./reader";
import { Fleuron } from "@/components/decorations";

export function generateStaticParams() {
  return loadAll().map((e) => ({ slug: e.slug }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = loadEntry(slug);
  if (!e) return <p>Not found.</p>;

  const hasBilingual = e.sections.some((s) => s.bilingual && s.danish.trim());
  const isDoc = e.kind === "doc";
  const { prev, next } = neighbours(slug);

  return (
    <div className={isDoc ? "prose-doc" : undefined}>
      <Link href="/" className="back-link">
        ← All Volumes
      </Link>

      <header className="entry-head">
        <div className="entry-spine">
          {e.kind === "volume" && (
            <>
              Spine {e.spine} · {e.forord} · Notabene № {e.bio} · {e.pub}
            </>
          )}
          {e.kind === "companion" && <>Volume {e.spine} · Biographical Companion</>}
          {isDoc && <>Editorial Matter · {e.pub}</>}
        </div>
        <h1 className="entry-title">
          {isDoc ? e.enTitle : e.daTitle}
        </h1>
        {!isDoc && <div className="entry-title-en">{e.enTitle}</div>}
      </header>

      {/* Period Danish title page (verbatim; layout only). */}
      {!isDoc && e.titlePage && (
        <div className="title-page">{renderTitlePage(e.titlePage)}</div>
      )}

      {/* English-only production note (the as-if-for-print physical book). */}
      {e.physical && (
        <div className="production-note">
          <span className="pn-label">Physical description</span>
          {renderMarkdown(e.physical, `${e.slug}-phys`)}
        </div>
      )}

      <Reader sections={e.sections} hasBilingual={hasBilingual} />

      {/* English-only scholarly apparatus, attached below the text. */}
      {(e.editorIntro || e.apparatus) && (
        <div className="apparatus-wrap">
          <div className="ap-label">Editorial Apparatus — English</div>
          {e.editorIntro && (
            <details className="disclosure">
              <summary>Editor’s Introduction</summary>
              <div className="disclosure-body scholarly">
                {renderMarkdown(e.editorIntro, `${e.slug}-intro`)}
              </div>
            </details>
          )}
          {e.apparatus && (
            <details className="disclosure">
              <summary>Textual Apparatus</summary>
              <div className="disclosure-body scholarly">
                {renderMarkdown(e.apparatus, `${e.slug}-app`)}
              </div>
            </details>
          )}
        </div>
      )}

      {(prev || next) && (
        <nav className="pager">
          <span>
            {prev && (
              <Link href={`/${prev.slug}`}>
                <span className="pg-sub">← Previous · Notabene № {prev.bio}</span>
                {prev.daTitle}
              </Link>
            )}
          </span>
          <span style={{ textAlign: "right" }}>
            {next && (
              <Link href={`/${next.slug}`}>
                <span className="pg-sub">Next · Notabene № {next.bio} →</span>
                {next.daTitle}
              </Link>
            )}
          </span>
        </nav>
      )}

      <Fleuron />
    </div>
  );
}
