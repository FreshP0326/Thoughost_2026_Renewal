import type { ProjectCallViewModel } from "@/types/site";

const submitButtonClass =
  "inline-flex border border-[#101010] bg-[#101010] px-6 py-3 text-[12px] font-semibold tracking-[0.08em] !text-white visited:!text-white hover:!text-white hover:bg-[#252525]";

export function ProjectCallCta({ project }: { project: ProjectCallViewModel }) {
  return (
    <section className="bg-[#f3f3f3]">
      <div className="site-nav-frame py-12 lg:py-14">
        <div className="grid gap-8 border-t border-[#101010] pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="text-[30px] leading-[1.04] font-semibold tracking-[-0.04em] text-[#101010] md:text-[42px]">
              {project.finalCtaTitle}
            </h2>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-neutral-700">{project.finalCtaBody}</p>
            <p className="mt-5 text-[12px] font-semibold tracking-[0.08em] text-neutral-500">{project.fallbackLabel}</p>
            <a
              href={`mailto:${project.contactEmail}`}
              className="mt-2 inline-block text-[15px] font-medium text-[#101010] underline-offset-4 hover:underline"
            >
              {project.contactEmail}
            </a>
          </div>
          <a href={project.submitHref} target="_blank" rel="noreferrer" className={submitButtonClass}>
            {project.submitLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
