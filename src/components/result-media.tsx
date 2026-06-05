"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { PairSide, ResultMedia } from "@/lib/content";

function MediaSpinner() {
  return (
    <span className="results-media-spinner" role="status" aria-label="Loading media">
      <Loader2 aria-hidden="true" />
    </span>
  );
}

export function ResultVideo({
  item,
}: {
  item: Extract<ResultMedia, { kind: "video" }>;
}) {
  const [ready, setReady] = useState(false);
  return (
    <span className="results-media-wrap" data-ready={ready ? "true" : undefined}>
      {!ready ? <MediaSpinner /> : null}
      <video
        src={item.src}
        poster={item.poster}
        controls
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </span>
  );
}

export function ResultImage({
  item,
}: {
  item: Extract<ResultMedia, { kind: "image" }>;
}) {
  const [ready, setReady] = useState(false);
  return (
    <span className="results-media-wrap" data-ready={ready ? "true" : undefined}>
      {!ready ? <MediaSpinner /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </span>
  );
}

export function ResultPairSide({ side }: { side: PairSide }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="results-pair-side" data-ready={ready ? "true" : undefined}>
      {!ready ? <MediaSpinner /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={side.src}
        alt={side.alt}
        loading="lazy"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
      <PairSideLabel text={side.label} />
    </div>
  );
}

function PairSideLabel({ text }: { text?: string }) {
  if (!text) return null;
  return <span className="results-pair-label">{text}</span>;
}
