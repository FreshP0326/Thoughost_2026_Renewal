import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { SectionHeading } from "@/components/site/section-heading";
import { MemberCard } from "@/components/site/member-card";
import type { AboutGroupViewModel, Locale } from "@/types/site";

export function MemberGrid({
  locale,
  groups,
  viewProfileLabel,
}: {
  locale: Locale;
  groups: AboutGroupViewModel[];
  viewProfileLabel: string;
}) {
  return (
    <div className="space-y-12 md:space-y-16">
      {groups.map((group) => (
        <section key={group.key}>
          <FadeIn>
            <SectionHeading title={group.label} />
          </FadeIn>
          <StaggerGroup className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-3 lg:grid-cols-4" density="base">
            {group.members.map((member, index) => (
              <MemberCard
                key={member.slug}
                locale={locale}
                member={member}
                viewProfileLabel={viewProfileLabel}
                imageLoading={index < 4 ? "eager" : "lazy"}
              />
            ))}
          </StaggerGroup>
        </section>
      ))}
    </div>
  );
}
