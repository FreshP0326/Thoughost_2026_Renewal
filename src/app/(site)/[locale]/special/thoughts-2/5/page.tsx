import { buildThoughts2EditionMetadata, renderThoughts2EditionPage } from "../edition-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return buildThoughts2EditionMetadata({ params, edition: "5" });
}

export default async function Thoughts2EditionFivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return renderThoughts2EditionPage({ params, edition: "5" });
}
