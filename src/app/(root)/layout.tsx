import type { Metadata } from "next";
import { Archivo, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";

import "../globals.css";

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

export const metadata: Metadata = {
  title: "Thoughost",
  description: "Thoughost rebuilt with a restrained, image-led presentation.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${notoSansJp.variable} ${notoSansSc.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="root-redirect" strategy="beforeInteractive">
          {`window.location.replace('./en/');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
