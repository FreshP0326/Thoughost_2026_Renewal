import type { Metadata } from "next";

import { ProjectCallCta } from "@/components/site/project-call-cta";
import { ProjectCallHeader } from "@/components/site/project-call-header";
import { ProjectCallRuleGroup } from "@/components/site/project-call-rule-group";
import { ProjectCallSection } from "@/components/site/project-call-section";
import { assertLocale } from "@/lib/locale";
import { getProjectCall } from "@/server/services/site-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const project = getProjectCall(locale);

  return {
    title: `${project.title} — Thoughost`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Thoughost`,
      description: project.summary,
      images: ["/images/releases/KAKUSATSU SHOUJO 2.png"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const project = getProjectCall(locale);

  return (
    <>
      <ProjectCallHeader project={project} />
      <ProjectCallSection title={project.projectBriefLabel}>
        <div className="max-w-[760px]">
          <p className="text-[15px] leading-7 text-neutral-700 md:text-[16px]">{project.intro}</p>
          <div className="mt-10 border-t border-neutral-200 pt-5">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{project.projectRulesLabel}</p>
            <ol className="mt-4 space-y-4 text-[15px] leading-7 text-neutral-700">
              {project.projectRules.map((rule) => (
                <li key={rule} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ProjectCallSection>
      <ProjectCallSection title={project.commonRulesHeading}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <ProjectCallRuleGroup group={project.commonRules.musicSubmission} />
          <ProjectCallRuleGroup group={project.commonRules.aboutSubmission} />
        </div>
        <p className="mt-8 max-w-[760px] border-t border-neutral-200 pt-5 text-[14px] font-medium text-[#101010]">
          {project.warning}
        </p>
      </ProjectCallSection>
      <ProjectCallSection title={project.rewards.title}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <ProjectCallRuleGroup group={project.rewards} />
          <ProjectCallRuleGroup group={project.judgment} />
        </div>
      </ProjectCallSection>
      <ProjectCallCta project={project} />
    </>
  );
}
