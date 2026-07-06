"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

type ViewMode = "facing" | "stacked" | "danish" | "english";

const KEY = "notabene.viewMode";

export function Reader({
  sections,
  hasBilingual,
}: {
  sections: Section[];
  hasBilingual: boolean;
}) {
  // SSR-safe default: facing on the assumption of a wide viewport; the
  // post-mount effect corrects to the saved choice or to stacked on narrow.
  const [mode, setMode] = useState<ViewMode>(
    hasBilingual ? "facing" : "english"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hasBilingual) return;
    try {
      const saved = localStorage.getItem(KEY) as ViewMode | null;
      if (saved && ["facing", "stacked", "danish", "english"].includes(saved)) {
        setMode(saved);
        return;
      }
    } catch {}
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 860px)").matches
    ) {
      setMode("stacked");
    }
  }, [hasBilingual]);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(KEY, mode);
      } catch {}
    }
  }, [mode, mounted]);

  const modes: { key: ViewMode; label: string }[] = [
    { key: "facing", label: "Facing pages" },
    { key: "stacked", label: "Stacked" },
    { key: "danish", label: "Dansk" },
    { key: "english", label: "English" },
  ];

  return (
    <div className="reader">
      {hasBilingual && (
        <div className="view-toggle" role="tablist" aria-label="Reading mode">
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              role="tab"
              aria-selected={mode === m.key}
              onClick={() => setMode(m.key)}
              className={`view-btn ${mode === m.key ? "active" : ""}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {sections.map((s) => (
        <SectionView key={s.id} section={s} mode={hasBilingual ? mode : "english"} />
      ))}
    </div>
  );
}

function SectionView({ section, mode }: { section: Section; mode: ViewMode }) {
  const heading = section.heading ? (
    <h3 className="reader-section-heading">{section.heading}</h3>
  ) : null;

  // A non-bilingual section (Vol IX English-only chapters; English-only
  // editorial docs; the English-only matter in mixed entries) always
  // renders full width, regardless of the chosen mode — there is no
  // Danish to face it.
  if (!section.bilingual || !section.danish.trim()) {
    return (
      <section className="reader-section">
        {heading}
        <div className="prose english-text">
          {renderMarkdown(section.english, `${section.id}-en`)}
        </div>
      </section>
    );
  }

  if (mode === "danish") {
    return (
      <section className="reader-section">
        {heading}
        <div className="prose danish-text">
          {renderMarkdown(section.danish, `${section.id}-da`)}
        </div>
      </section>
    );
  }
  if (mode === "english") {
    return (
      <section className="reader-section">
        {heading}
        <div className="prose english-text">
          {renderMarkdown(section.english, `${section.id}-en`)}
        </div>
      </section>
    );
  }
  if (mode === "stacked") {
    return (
      <section className="reader-section">
        {heading}
        <div className="stacked-da">
          <div className="col-label">Dansk Grundtext</div>
          <div className="prose danish-text">
            {renderMarkdown(section.danish, `${section.id}-da`)}
          </div>
        </div>
        <div className="stacked-en">
          <div className="col-label">English Translation</div>
          <div className="prose english-text">
            {renderMarkdown(section.english, `${section.id}-en`)}
          </div>
        </div>
      </section>
    );
  }
  // facing
  return (
    <section className="reader-section">
      {heading}
      <div className="facing-grid">
        <div className="facing-verso">
          <div className="col-label">Dansk Grundtext</div>
          <div className="prose danish-text">
            {renderMarkdown(section.danish, `${section.id}-da`)}
          </div>
        </div>
        <div className="facing-recto">
          <div className="col-label">English Translation</div>
          <div className="prose english-text">
            {renderMarkdown(section.english, `${section.id}-en`)}
          </div>
        </div>
      </div>
    </section>
  );
}
