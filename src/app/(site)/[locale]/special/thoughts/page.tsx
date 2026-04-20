import { notFound } from "next/navigation";

import { ThoughtsSpecial } from "@/components/site/thoughts-special";
import { getThoughtsSpecial } from "@/content/site/thoughts-special";
import { assertLocale } from "@/lib/locale";
import { getReleaseBySlug } from "@/server/services/site-service";

export default async function ThoughtsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const release = getReleaseBySlug(locale, "thoughts");

  if (!release) {
    notFound();
  }

  const page = getThoughtsSpecial(locale);

  return <ThoughtsSpecial release={release} page={page} />;
}
