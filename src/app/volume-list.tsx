"use client";

import { useState } from "react";
import Link from "next/link";
import type { Entry } from "@/lib/content";

export function VolumeList({
  biographical,
  editorial,
}: {
  biographical: Entry[];
  editorial: Entry[];
}) {
  const [order, setOrder] = useState<"bio" | "ed">("bio");
  const list = order === "bio" ? biographical : editorial;

  return (
    <div>
      <div className="order-switch" role="tablist" aria-label="Reading order">
        <button
          type="button"
          role="tab"
          aria-selected={order === "bio"}
          className={order === "bio" ? "active" : ""}
          onClick={() => setOrder("bio")}
        >
          Biographical order
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={order === "ed"}
          className={order === "ed" ? "active" : ""}
          onClick={() => setOrder("ed")}
        >
          Editorial order
        </button>
      </div>
      <p className="order-note">
        {order === "bio"
          ? "The order in which Notabene composed and published the volumes, December 1844 – February 1847. Recommended for a first reading."
          : "The order in which the eight prefaces appeared in the 1844 Forord — the citation order preserved on the spines."}
      </p>

      <div className="vol-list">
        {list.map((v) => (
          <Link key={v.slug} href={`/${v.slug}`} className="vol-card">
            <div className="vol-card-spine">
              <span className="spine-roman">{v.spine}</span>
              <span className="spine-label">
                {order === "bio" ? `№ ${v.bio}` : "Spine"}
              </span>
            </div>
            <div className="vol-card-body">
              <div className="vol-card-da">{v.daTitle}</div>
              <div className="vol-card-en">{v.enTitle}</div>
              <div className="vol-card-meta">
                {v.forord} · {v.pub} · Spine {v.spine}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
