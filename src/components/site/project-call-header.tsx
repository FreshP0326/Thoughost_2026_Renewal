import type { ProjectCallViewModel } from "@/types/site";

const submitButtonClass =
  "mt-6 inline-flex border border-[#101010] bg-[#101010] px-5 py-3 text-[12px] font-semibold tracking-[0.08em] !text-white visited:!text-white hover:!text-white hover:bg-[#252525]";

export function ProjectCallHeader({ project }: { project: ProjectCallViewModel }) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-500">{project.sectionLabel}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)] lg:items-end">
          <div>
            <h1 className="max-w-[720px] text-[34px] leading-[0.98] font-semibold tracking-[-0.05em] text-[#101010] md:text-[56px]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[720px] text-[15px] leading-7 text-neutral-700 md:text-[16px]">
              {project.summary}
            </p>
          </div>
          <div className="border border-neutral-200 p-5">
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
        </div>
      </div>
    </section>
  );
}
