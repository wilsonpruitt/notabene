import data from "@/data/content.json";

export interface Section {
  id: string;
  heading: string;
  danish: string;
  english: string;
  bilingual: boolean;
}

export type EntryKind = "volume" | "companion" | "doc";

export interface Entry {
  slug: string;
  kind: EntryKind;
  spine: string;       // "I".."VIII", "IX", or "" for docs
  spineNum: number;    // 1..9, 0 for docs
  bio: number;         // Notabene's biographical/compositional order
  daTitle: string;
  enTitle: string;
  pub: string;
  forord: string;
  titlePage: string;
  physical: string;    // English-only production note (volumes only)
  sections: Section[];
  editorIntro: string; // English-only (volumes I–VIII)
  apparatus: string;   // English-only (volumes I–VIII)
}

const ENTRIES = data as unknown as Entry[];

export function loadAll(): Entry[] {
  return ENTRIES;
}

export function loadEntry(slug: string): Entry | null {
  return ENTRIES.find((e) => e.slug === slug) || null;
}

/** The eight phantom volumes in Notabene's biographical order. */
export function volumesBiographical(): Entry[] {
  return ENTRIES.filter((e) => e.kind === "volume").sort((a, b) => a.bio - b.bio);
}

/** The eight phantom volumes in the 1844 Forord editorial (spine) order. */
export function volumesEditorial(): Entry[] {
  return ENTRIES.filter((e) => e.kind === "volume").sort(
    (a, b) => a.spineNum - b.spineNum
  );
}

export function companion(): Entry | null {
  return ENTRIES.find((e) => e.kind === "companion") || null;
}

export function docs(): Entry[] {
  return ENTRIES.filter((e) => e.kind === "doc");
}

/** Adjacent volumes in biographical order, for prev/next navigation. */
export function neighbours(slug: string): { prev: Entry | null; next: Entry | null } {
  const order = volumesBiographical();
  const i = order.findIndex((e) => e.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? order[i - 1] : null,
    next: i < order.length - 1 ? order[i + 1] : null,
  };
}
