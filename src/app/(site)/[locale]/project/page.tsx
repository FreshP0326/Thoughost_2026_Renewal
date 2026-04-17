import type { Metadata } from "next";

import { ProjectCallHeader } from "@/components/site/project-call-header";
import { ProjectCallRuleGroup } from "@/components/site/project-call-rule-group";
import { ProjectCallSection } from "@/components/site/project-call-section";
import { withBasePathAsset } from "@/lib/base-path";
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
    description: project.intro,
    openGraph: {
      title: `${project.title} — Thoughost`,
      description: project.intro,
      images: [withBasePathAsset("/images/releases/KAKUSATSU SHOUJO 2.png")],
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
      <ProjectCallSection title={project.detailedRulesHeading}>
        <div className="max-w-[760px]">
          <ol className="space-y-4 text-[15px] leading-7 text-neutral-700">
            {project.projectRules.map((rule) => (
              <li key={rule} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                {rule}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[14px] font-medium text-[#101010]">{project.warning}</p>
        </div>
      </ProjectCallSection>
      <ProjectCallSection title={project.commonRulesHeading}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <ProjectCallRuleGroup group={project.commonRules.musicSubmission} />
          <ProjectCallRuleGroup group={project.commonRules.aboutSubmission} />
        </div>
      </ProjectCallSection>
      <ProjectCallSection title={project.rewards.title}>
        <ProjectCallRuleGroup group={project.rewards} hideTitle />
      </ProjectCallSection>
      <ProjectCallSection title={project.judgment.title} border={false}>
        <ProjectCallRuleGroup group={project.judgment} hideTitle />
      </ProjectCallSection>
    </>
  );
}
