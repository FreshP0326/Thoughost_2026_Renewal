import { FadeIn } from "@/components/motion/fade-in";
import type { ProjectCallViewModel } from "@/types/site";

const submitButtonClass =
  "mt-6 inline-flex border border-[#101010] bg-[#101010] px-5 py-3 text-[12px] font-semibold tracking-[0.08em] !text-white visited:!text-white hover:!text-white hover:bg-[#252525]";

export function ProjectCallHeader({ project }: { project: ProjectCallViewModel }) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="site-nav-frame py-12 lg:py-16">
        <FadeIn y={10} amount={0.12}>
          <h1 className="text-[19px] font-semibold tracking-[-0.03em] text-[#101010]">{project.sectionLabel}</h1>
        </FadeIn>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)] lg:items-end">
          <FadeIn y={14} amount={0.12}>
            <div>
              <h2 className="max-w-[720px] text-[34px] leading-[0.98] font-semibold tracking-[-0.05em] text-[#101010] md:text-[56px]">
                {project.title}
              </h2>
              <p className="mt-5 max-w-[720px] text-[15px] leading-7 text-neutral-700 md:text-[16px]">
                {project.intro}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05} y={16} amount={0.12}>
            <div className="border border-neutral-200 p-5 motion-surface hover:border-neutral-300">
              <dl className="space-y-4">
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{project.deadlineLabel}</dt>
                  <dd className="mt-1 text-[15px] font-semibold text-[#101010]">{project.deadline}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{project.releaseLabel}</dt>
                  <dd className="mt-1 text-[15px] font-semibold text-[#101010]">{project.release}</dd>
                </div>
              </dl>
              <a href={project.submitHref} target="_blank" rel="noreferrer" className={submitButtonClass}>
                {project.submitLabel}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
