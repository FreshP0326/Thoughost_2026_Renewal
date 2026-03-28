import type { Metadata } from "next";
import { Archivo, Noto_Sans_JP, Noto_Sans_SC, Poppins } from "next/font/google";

import "../../globals.css";
import { PageShell } from "@/components/site/page-shell";
import { supportedLocales } from "@/content/site/data";
import { withBasePathAsset } from "@/lib/base-path";
import { assertLocale } from "@/lib/locale";
import { getSiteConfig } from "@/server/services/site-service";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

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
        : locale === "ja"
          ? "Thoughost のリビルド版サイト。作品、企画、ビジュアル表現に焦点を当てています。"
          : "A rebuilt Thoughost site focused on releases, projects, and image-led presentation.",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Thoughost",
      description: config.footerQuote,
      images: [withBasePathAsset("/images/releases/KAKUSATSU SHOUJO 2.png")],
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

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${notoSansJp.variable} ${notoSansSc.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageShell locale={locale}>{children}</PageShell>
      </body>
    </html>
  );
}
