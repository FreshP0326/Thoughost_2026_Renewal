import { buildThoughts2EditionMetadata, renderThoughts2EditionPage } from "../edition-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return buildThoughts2EditionMetadata({ params, edition: "4" });
}

export default async function Thoughts2EditionFourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return renderThoughts2EditionPage({ params, edition: "4" });
}
