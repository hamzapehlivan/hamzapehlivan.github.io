import Link from "next/link";
import { Images } from "lucide-react";
import type { Publication } from "@/lib/content";

type ResultsButtonProps = {
  publication: Publication;
};

export function ResultsButton({ publication }: ResultsButtonProps) {
  if (!publication.results || publication.results.length === 0) return null;

  return (
    <Link
      href={`/results/${publication.slug}/`}
      className="results-trigger"
      aria-label={`Result gallery for ${publication.title}`}
    >
      <Images aria-hidden="true" className="icon-xs" />
      Result gallery
    </Link>
  );
}
