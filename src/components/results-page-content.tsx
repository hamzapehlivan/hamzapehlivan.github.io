import Link from "next/link";
import { ArrowLeft, FileText, Globe, Spotlight, Trophy } from "lucide-react";
import { ArxivIcon, GithubIcon } from "@/components/brand-icons";
import {
  ResultImage,
  ResultPairSide,
  ResultVideo,
} from "@/components/result-media";
import type {
  Publication,
  PublicationHighlight,
  ResultGallery,
  ResultMedia,
} from "@/lib/content";

export function ResultsPageHeader({ paper }: { paper: Publication }) {
  return (
    <header className="results-page-header">
      <div className="results-page-inner">
        <Link href="/#publications" className="results-back">
          <ArrowLeft aria-hidden="true" className="icon-xs" />
          Back to publications
        </Link>
        <p className="results-eyebrow">
          {paper.venueShort ?? paper.venue} · {paper.year}
        </p>
        <h1 className="results-page-title">{paper.title}</h1>
        <p className="results-page-authors">
          <PaperAuthors authors={paper.authors} />
          <EqualContributionNote show={paper.equalContribution} />
        </p>
        <HighlightBadges highlights={paper.highlights} />
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

function HighlightIcon({ icon }: { icon: PublicationHighlight["icon"] }) {
  if (icon === "spotlight") {
    return <Spotlight aria-hidden="true" className="icon-xs" />;
  }
  return <Trophy aria-hidden="true" className="icon-xs" />;
}

function HighlightBadges({
  highlights,
}: {
  highlights?: PublicationHighlight[];
}) {
  if (!highlights?.length) return null;
  return (
    <div className="results-page-highlights">
      {highlights.map((highlight) => (
        <span key={highlight.label} className="results-page-highlight">
          <HighlightIcon icon={highlight.icon} />
          {highlight.label}
        </span>
      ))}
    </div>
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
  const isStack = gallery.layout === "stack";
  const layoutClass = isStack ? "results-stack" : "results-grid";
  const dataColumns = !isStack && gallery.columns ? String(gallery.columns) : undefined;
  return (
    <section className="results-section">
      <SectionTitle text={gallery.title} />
      <SectionDescription text={gallery.description} />
      <div className={layoutClass} data-columns={dataColumns}>
        {gallery.items.map((item, idx) => (
          <ResultItem key={`${itemKey(item)}-${idx}`} item={item} />
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

function itemKey(item: ResultMedia): string {
  if (item.kind === "pair") return item.before.src;
  return item.src;
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
  if (item.kind === "pair") return <ResultPair item={item} />;
  return <ResultImage item={item} />;
}

function ResultPair({
  item,
}: {
  item: Extract<ResultMedia, { kind: "pair" }>;
}) {
  return (
    <div className="results-pair">
      <ResultPairSide side={item.before} />
      <ResultPairSide side={item.after} />
    </div>
  );
}

function ResultCaption({ text }: { text?: string }) {
  if (!text) return null;
  return <figcaption>{text}</figcaption>;
}
