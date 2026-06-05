import Image from "next/image";
import { ArrowUpRight, FileText, Globe, Trophy } from "lucide-react";
import { ArxivIcon, GithubIcon } from "@/components/brand-icons";
import { ResultsButton } from "@/components/results-button";
import type { Publication } from "@/lib/content";

function LinkIcon({ label }: { label: string }) {
  const className = "icon-xs";
  switch (label) {
    case "arXiv":
      return <ArxivIcon className={className} />;
    case "Code":
      return <GithubIcon className={className} />;
    case "Paper":
      return <FileText aria-hidden="true" className={className} />;
    case "Project":
      return <Globe aria-hidden="true" className={className} />;
    default:
      return <ArrowUpRight aria-hidden="true" className={className} />;
  }
}

function HighlightedAuthors({ authors }: { authors: string }) {
  const parts = authors.split(/(H\. Pehlivan\*?)/g);

  return (
    <span>
      {parts.map((part, index) =>
        part.startsWith("H. Pehlivan") ? (
          <strong key={`${part}-${index}`}>{part}</strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </span>
  );
}

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="publication-card" id={publication.slug}>
      <div className="paper-image-frame">
        <Image
          src={publication.image}
          alt={publication.imageAlt}
          width={680}
          height={420}
          className="paper-image"
        />
      </div>
      <div className="paper-copy">
        <div className="paper-meta-row">
          <span className="paper-venue">
            {publication.venueShort ?? publication.venue}
          </span>
          <span className="paper-year">{publication.year}</span>
          {publication.status && publication.status !== "Published" ? (
            <span className="paper-status">{publication.status}</span>
          ) : null}
          {publication.highlight ? (
            <span className="paper-highlight">
              <Trophy aria-hidden="true" className="icon-xs" />
              {publication.highlight}
            </span>
          ) : null}
        </div>
        <h3>{publication.title}</h3>
        <p className="paper-authors">
          <HighlightedAuthors authors={publication.authors} />
          {publication.equalContribution ? (
            <span className="paper-note"> &nbsp;* equal contribution</span>
          ) : null}
        </p>
        <p className="paper-venue-full">
          {publication.venue}, {publication.year}
        </p>
        <div className="focus-tags" aria-label="Research focus">
          {publication.focus.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
        <div className="paper-links">
          {publication.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              <LinkIcon label={link.label} />
              {link.label}
            </a>
          ))}
          <ResultsButton publication={publication} />
        </div>
      </div>
    </article>
  );
}
