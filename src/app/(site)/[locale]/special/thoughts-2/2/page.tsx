import { featuredThoughts2Edition } from "@/content/site/thoughts2-special";

import { buildThoughts2EditionMetadata, redirectToFeaturedThoughts2Edition } from "../edition-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return buildThoughts2EditionMetadata({ params, edition: featuredThoughts2Edition });
}

export default async function Thoughts2EditionTwoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return redirectToFeaturedThoughts2Edition({ params });
}
