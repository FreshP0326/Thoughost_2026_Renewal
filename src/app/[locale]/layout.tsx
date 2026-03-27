import type { Metadata } from "next";

import { PageShell } from "@/components/site/page-shell";
import { assertLocale } from "@/lib/locale";
import { getSiteConfig } from "@/server/services/site-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const config = getSiteConfig(locale);

  return {
    title: "Thoughost",
    description:
      locale === "zh"
        ? "Thoughost 官方网站重构版，聚焦作品、项目与视觉表达。"
        : locale === "jp"
          ? "Thoughost のリビルド版サイト。作品、企画、ビジュアル表現に焦点を当てています。"
          : "A rebuilt Thoughost site focused on releases, projects, and image-led presentation.",
    metadataBase: new URL("http://localhost:3000"),
    openGraph: {
      title: "Thoughost",
      description: config.footerQuote,
      images: ["/images/releases/KAKUSATSU SHOUJO 2.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);

  return <PageShell locale={locale}>{children}</PageShell>;
}
