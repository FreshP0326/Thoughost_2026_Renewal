import { redirect } from "next/navigation";

import { assertLocale, withLocale } from "@/lib/locale";

export default async function Thoughts2IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);

  redirect(withLocale(locale, "/special/thoughts-2/1"));
}
