import type { Publication } from "@/lib/content";
import { PublicationCard } from "./publication-card";

type PublicationGroupProps = {
  label: string;
  publications: Publication[];
};

export function PublicationGroup({ label, publications }: PublicationGroupProps) {
  if (publications.length === 0) return null;

  return (
    <section className="publication-group" aria-label={`Publications: ${label}`}>
      <div className="publication-group-rail" aria-hidden="true">
        <span>{label}</span>
      </div>
      <div className="publication-group-cards">
        {publications.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </div>
    </section>
  );
}
