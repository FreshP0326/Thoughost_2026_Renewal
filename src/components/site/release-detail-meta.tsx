import { FadeIn } from "@/components/motion/fade-in";

import type { ReleaseInfoField } from "@/types/site";

export function ReleaseDetailMeta({
  title,
  fields,
  compact = false,
}: {
  title: string;
  fields: ReleaseInfoField[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div>
        <p className="type-meta text-neutral-500">{title}</p>
        <div className="mt-4 grid gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {fields.map((field) => (
            <div key={field.label} className="border-t border-neutral-200 pt-3">
              <p className="type-meta text-neutral-500">{field.label}</p>
              <p className="mt-2 text-[15px] leading-[1.45] font-medium text-[#101010]">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="site-nav-frame py-12 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <FadeIn>
            <h2 className="type-section-title text-[#101010]">{title}</h2>
          </FadeIn>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {fields.map((field) => (
              <FadeIn key={field.label} className="border-t border-neutral-200 pt-4" delay={0.04}>
                <p className="type-meta text-neutral-500">{field.label}</p>
                <p className="mt-2 text-[16px] leading-[1.5] font-medium text-[#101010]">{field.value}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
