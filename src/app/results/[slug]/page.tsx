import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ResultsPageBody,
  ResultsPageHeader,
} from "@/components/results-page-content";
import { publications } from "@/lib/content";

type PageParams = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): PageParams[] {
  return publications
    .filter((p) => p.results && p.results.length > 0)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = publications.find((p) => p.slug === slug);
  if (!paper) return {};
  const venue = paper.venueShort ?? paper.venue;
  return {
    title: `${paper.title} — Results`,
    description: `Qualitative results and comparisons for "${paper.title}" (${venue}, ${paper.year}).`,
  };
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const paper = publications.find((p) => p.slug === slug);
  if (!paper?.results?.length) {
    notFound();
  }

  return (
    <div className="results-page">
      <ResultsPageHeader paper={paper} />
      <ResultsPageBody galleries={paper.results} />
    </div>
  );
}
