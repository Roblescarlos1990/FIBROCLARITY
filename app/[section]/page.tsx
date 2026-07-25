import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialPage from "../components/EditorialPage";
import {
  editorialPageOrder,
  editorialPages,
} from "../editorial/pages";

type EditorialRouteProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return editorialPageOrder.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: EditorialRouteProps): Promise<Metadata> {
  const { section } = await params;
  const page = editorialPages[section];
  if (!page) return {};
  return {
    title: page.title,
    description: page.deck,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.deck,
      type: "website",
      url: `/${page.slug}`,
    },
  };
}

export default async function EditorialRoute({
  params,
}: EditorialRouteProps) {
  const { section } = await params;
  const page = editorialPages[section];
  if (!page) notFound();
  return <EditorialPage page={page} />;
}
