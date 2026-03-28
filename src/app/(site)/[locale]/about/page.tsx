import { Suspense } from "react";

import { MemberDetailDialog } from "@/components/site/member-detail-dialog";
import { MemberGrid } from "@/components/site/member-grid";
import { PageIntro } from "@/components/site/page-intro";
import { FadeIn } from "@/components/motion/fade-in";
import { assertLocale } from "@/lib/locale";
import { getAboutPage } from "@/server/services/site-service";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const aboutPage = getAboutPage(locale);
  const allMembers = aboutPage.groups.flatMap((group) => group.members);

  return (
    <>
      <PageIntro title={aboutPage.introTitle} />
      <section className="bg-white py-12 md:py-16">
        <div className="site-nav-frame">
          <FadeIn>
            <p className="mb-8 max-w-[760px] text-[14px] leading-7 text-neutral-600 md:mb-10">
              {aboutPage.introBody}
            </p>
          </FadeIn>
          <MemberGrid locale={locale} groups={aboutPage.groups} viewProfileLabel={aboutPage.labels.viewProfile} />
        </div>
      </section>
      <Suspense fallback={null}>
        <MemberDetailDialog
          locale={locale}
          members={allMembers}
          labels={{
            profileOverview: aboutPage.labels.profileOverview,
            representativeWorks: aboutPage.labels.representativeWorks,
            featuredTracks: aboutPage.labels.featuredTracks,
            selectedReleases: aboutPage.labels.selectedReleases,
            releaseAppearances: aboutPage.labels.releaseAppearances,
            trackAppearances: aboutPage.labels.trackAppearances,
            latestRelease: aboutPage.labels.latestRelease,
            links: aboutPage.labels.links,
            close: aboutPage.labels.close,
            memberNotFound: aboutPage.labels.memberNotFound,
          }}
        />
      </Suspense>
    </>
  );
}
