import { buildThoughts2EditionMetadata, renderThoughts2EditionPage } from "../edition-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return buildThoughts2EditionMetadata({ params, edition: "3" });
}

export default async function Thoughts2EditionThreePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return renderThoughts2EditionPage({ params, edition: "3" });
}
