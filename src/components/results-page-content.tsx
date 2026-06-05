import { ArrowLeft, FileText, Globe, Trophy } from "lucide-react";
import { ArxivIcon, GithubIcon } from "@/components/brand-icons";
import type { Publication, ResultGallery, ResultMedia } from "@/lib/content";

export function ResultsPageHeader({ paper }: { paper: Publication }) {
  return (
    <header className="results-page-header">
      <div className="results-page-inner">
        <a href="/#publications" className="results-back">
          <ArrowLeft aria-hidden="true" className="icon-xs" />
          Back to publications
        </a>
        <p className="results-eyebrow">
          {paper.venueShort ?? paper.venue} · {paper.year}
        </p>
        <h1 className="results-page-title">{paper.title}</h1>
        <p className="results-page-authors">
          <PaperAuthors authors={paper.authors} />
          <EqualContributionNote show={paper.equalContribution} />
        </p>
        <HighlightBadge text={paper.highlight} />
        <div className="results-page-links">
          <PaperLinks paper={paper} />
        </div>
      </div>
    </header>
  );
}

export function ResultsPageBody({ galleries }: { galleries: ResultGallery[] }) {
  return (
    <main className="results-page-main">
      {galleries.map((gallery, idx) => (
        <ResultsSection
          key={`${gallery.title ?? "gallery"}-${idx}`}
          gallery={gallery}
        />
      ))}
    </main>
  );
}

function EqualContributionNote({ show }: { show?: boolean }) {
  if (!show) return null;
  return <span className="paper-note"> &nbsp;* equal contribution</span>;
}

function HighlightBadge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="results-page-highlight">
      <Trophy aria-hidden="true" className="icon-xs" />
      {text}
    </p>
  );
}

function PaperAuthors({ authors }: { authors: string }) {
  const parts = authors.split(/(H\. Pehlivan\*?)/g);
  return (
    <span>
      {parts.map((part, i) => (
        <AuthorPart key={`${part}-${i}`} part={part} />
      ))}
    </span>
  );
}

function AuthorPart({ part }: { part: string }) {
  if (part.startsWith("H. Pehlivan")) {
    return <strong>{part}</strong>;
  }
  return <span>{part}</span>;
}

function PaperLinks({ paper }: { paper: Publication }) {
  return (
    <>
      {paper.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="results-page-link"
        >
          <LinkLabelIcon label={link.label} />
          {link.label}
        </a>
      ))}
    </>
  );
}

const LINK_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  arXiv: ArxivIcon,
  Code: GithubIcon,
  Project: Globe,
  Paper: FileText,
};

function LinkLabelIcon({ label }: { label: string }) {
  const Icon = LINK_ICONS[label];
  if (!Icon) return null;
  return <Icon aria-hidden className="icon-xs" />;
}

function ResultsSection({ gallery }: { gallery: ResultGallery }) {
  const layoutClass = gallery.layout === "stack" ? "results-stack" : "results-grid";
  return (
    <section className="results-section">
      <SectionTitle text={gallery.title} />
      <SectionDescription text={gallery.description} />
      <div className={layoutClass}>
        {gallery.items.map((item, idx) => (
          <ResultItem key={`${item.src}-${idx}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ text }: { text?: string }) {
  if (!text) return null;
  return <h2 className="results-section-title">{text}</h2>;
}

function SectionDescription({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="results-section-desc">{text}</p>;
}

function ResultItem({ item }: { item: ResultMedia }) {
  return (
    <figure className="results-item">
      <ResultCaption text={item.caption} />
      <ResultMediaElement item={item} />
    </figure>
  );
}

function ResultMediaElement({ item }: { item: ResultMedia }) {
  if (item.kind === "video") return <ResultVideo item={item} />;
  return <ResultImage item={item} />;
}

function ResultVideo({
  item,
}: {
  item: Extract<ResultMedia, { kind: "video" }>;
}) {
  return (
    <video
      src={item.src}
      poster={item.poster}
      controls
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}

function ResultImage({
  item,
}: {
  item: Extract<ResultMedia, { kind: "image" }>;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.src} alt={item.alt} loading="lazy" />;
}

function ResultCaption({ text }: { text?: string }) {
  if (!text) return null;
  return <figcaption>{text}</figcaption>;
}
