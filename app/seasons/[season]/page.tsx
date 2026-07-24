import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeasonPage from "../../components/SeasonPage";
import { isSeasonSlug, seasonOrder, seasons } from "../data";

type SeasonRouteProps = {
  params: Promise<{ season: string }>;
};

export function generateStaticParams() {
  return seasonOrder.map((season) => ({ season }));
}

export async function generateMetadata({
  params,
}: SeasonRouteProps): Promise<Metadata> {
  const { season } = await params;
  if (!isSeasonSlug(season)) return {};
  const current = seasons[season];
  return {
    title: `${current.label} · ${current.lens}`,
    description: current.subtitle,
  };
}

export default async function SeasonalRoute({ params }: SeasonRouteProps) {
  const { season } = await params;
  if (!isSeasonSlug(season)) notFound();
  return <SeasonPage season={seasons[season]} />;
}
