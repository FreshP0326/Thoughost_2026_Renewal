"use client";

import { usePathname } from "next/navigation";

import { PageTransitionShell } from "@/components/motion/page-transition-shell";
import { BackToTop } from "@/components/site/back-to-top";
import { DevRuntimeGuard } from "@/components/site/dev-runtime-guard";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { getFooter, getNavigation, getSocialLinks } from "@/server/services/site-service";
import type { Locale } from "@/types/site";

export function PageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navigation = getNavigation(locale);
  const socialLinks = getSocialLinks();
  const footer = getFooter(locale);

  return (
    <>
      <DevRuntimeGuard />
      <SiteHeader
        locale={locale}
        pathname={pathname ?? `/${locale}`}
        navigation={navigation}
        socialLinks={socialLinks}
      />
      <main className="flex-1">
        <PageTransitionShell>{children}</PageTransitionShell>
      </main>
      <SiteFooter
        locale={locale}
        groups={footer.groups}
        socialLinks={footer.socialLinks}
        contactEmail={footer.contactEmail}
        contactLabel={footer.contactLabel}
        followUsLabel={footer.followUsLabel}
        quote={footer.quote}
        copyrightText={footer.copyrightText}
      />
      <BackToTop />
    </>
  );
}
