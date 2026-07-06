import React from "react";

/**
 * A small, deliberately NON-DESTRUCTIVE markdown renderer.
 *
 * It renders only the constructs the corpus actually uses — headings
 * (### / ####), horizontal rules, blockquotes, ordered/unordered lists,
 * pipe tables, paragraphs, and inline **strong** / *em* / [^ref].
 *
 * It performs NO typographic "correction": period orthography (aa for å),
 * capital common nouns, em-dash length, semicolons, retained German/Latin
 * italics, and Greek script all pass through verbatim. Display fidelity is
 * load-bearing for this edition; the renderer must never modernize.
 */

function inline(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[\^([^\]]+)\]/g;
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    if (m[1] !== undefined) {
      out.push(<strong key={`${keyBase}-b${k++}`}>{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      out.push(<em key={`${keyBase}-i${k++}`}>{m[2]}</em>);
    } else if (m[3] !== undefined) {
      out.push(
        <sup key={`${keyBase}-f${k++}`} className="fn-ref">
          {m[3]}
        </sup>
      );
    }
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function isTableRow(line: string): boolean {
  return /^\s*\|.*\|\s*$/.test(line);
}
function isTableSep(line: string): boolean {
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-");
}
function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

export function renderMarkdown(
  body: string,
  keyBase = "md"
): React.ReactNode[] {
  if (!body) return [];
  const lines = body.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let para: string[] = [];
  let n = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) {
      nodes.push(
        <p key={`${keyBase}-p${n}`} className="md-p">
          {inline(text, `${keyBase}-p${n}`)}
        </p>
      );
      n++;
    }
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (t === "") {
      flushPara();
      i++;
      continue;
    }
    if (t === "---" || t === "***" || t === "___") {
      flushPara();
      nodes.push(<hr key={`${keyBase}-hr${n++}`} className="md-hr" />);
      i++;
      continue;
    }
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      const level = h[1].length; // 1..6
      const Tag = `h${Math.min(level, 6)}` as React.ElementType;
      nodes.push(
        <Tag key={`${keyBase}-h${n++}`} className={`md-h${level}`}>
          {inline(h[2], `${keyBase}-h${n}`)}
        </Tag>
      );
      i++;
      continue;
    }
    if (t.startsWith(">")) {
      flushPara();
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      nodes.push(
        <blockquote key={`${keyBase}-bq${n++}`} className="md-bq">
          {inline(buf.join(" "), `${keyBase}-bq${n}`)}
        </blockquote>
      );
      continue;
    }
    // pipe table
    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flushPara();
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(cells(lines[i]));
        i++;
      }
      nodes.push(
        <div key={`${keyBase}-tw${n}`} className="md-table-wrap">
          <table className="md-table">
            <thead>
              <tr>
                {head.map((c, ci) => (
                  <th key={ci}>{inline(c, `${keyBase}-th${n}-${ci}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{inline(c, `${keyBase}-td${n}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      n++;
      continue;
    }
    // unordered / ordered list
    const ulm = t.match(/^[-*]\s+(.*)$/);
    const olm = t.match(/^(\d+)\.\s+(.*)$/);
    if (ulm || olm) {
      flushPara();
      const ordered = Boolean(olm);
      const items: string[] = [];
      while (i < lines.length) {
        const lt = lines[i].trim();
        const um = lt.match(/^[-*]\s+(.*)$/);
        const om = lt.match(/^\d+\.\s+(.*)$/);
        if (ordered && om) items.push(om[1]);
        else if (!ordered && um) items.push(um[1]);
        else if (lt === "") {
          let j = i + 1;
          while (j < lines.length && lines[j].trim() === "") j++;
          const cont =
            j < lines.length &&
            ((ordered && /^\d+\.\s+/.test(lines[j].trim())) ||
              (!ordered && /^[-*]\s+/.test(lines[j].trim())));
          if (!cont) break;
          i = j;
          continue;
        } else break;
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      nodes.push(
        <ListTag key={`${keyBase}-l${n++}`} className="md-list">
          {items.map((it, ii) => (
            <li key={ii}>{inline(it, `${keyBase}-li${n}-${ii}`)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    para.push(t);
    i++;
  }
  flushPara();
  return nodes;
}

/**
 * The Danish period title page, set centred like a real Golden-Age
 * gift-book title page. Verbatim text; only layout is applied.
 *   # …      → the work's title
 *   ## …     → subtitle / imprint lines (kept in their original order)
 *   ---      → a centred rule
 *   other    → a centred line
 */
export function renderTitlePage(body: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let n = 0;
  for (const raw of body.split("\n")) {
    const t = raw.trim();
    if (t === "") continue;
    if (t === "---") {
      out.push(<hr key={`tp-r${n++}`} className="tp-rule" />);
      continue;
    }
    const hm = t.match(/^(#{1,6})\s+(.*)$/);
    if (hm) {
      if (hm[1].length === 1) {
        out.push(<h1 key={`tp-h${n++}`}>{inline(hm[2], `tp-h${n}`)}</h1>);
      } else {
        // every sub-level becomes a centred subtitle/imprint line
        out.push(
          <h2 key={`tp-s${n++}`} className="md-h2">
            {inline(hm[2], `tp-s${n}`)}
          </h2>
        );
      }
      continue;
    }
    out.push(
      <p key={`tp-p${n++}`} className="md-p">
        {inline(t, `tp-p${n}`)}
      </p>
    );
  }
  return out;
}
