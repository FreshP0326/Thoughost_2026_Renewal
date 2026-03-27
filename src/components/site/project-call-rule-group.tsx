import type { ProjectCallRuleGroup } from "@/types/site";

export function ProjectCallRuleGroup({ group }: { group: ProjectCallRuleGroup }) {
  return (
    <article className="border-t border-neutral-200 pt-5">
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#101010]">{group.title}</h3>
      {group.introLabel ? <p className="mt-4 text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{group.introLabel}</p> : null}
      {group.intro ? <p className="mt-2 text-[15px] leading-7 text-neutral-700">{group.intro}</p> : null}
      {group.body ? <p className="mt-4 text-[15px] leading-7 text-neutral-700">{group.body}</p> : null}
      {group.bulletsLabel ? <p className="mt-5 text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{group.bulletsLabel}</p> : null}
      {group.bullets?.length ? (
        <ul className="mt-3 space-y-3 text-[15px] leading-7 text-neutral-700">
          {group.bullets.map((item) => (
            <li key={item} className="border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {group.requiredInfoLabel ? (
        <p className="mt-5 text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{group.requiredInfoLabel}</p>
      ) : null}
      {group.requiredInfo?.length ? (
        <ul className="mt-3 space-y-2 text-[15px] leading-7 text-neutral-700">
          {group.requiredInfo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {group.specNote ? <p className="mt-5 text-[15px] leading-7 text-neutral-700">{group.specNote}</p> : null}
    </article>
  );
}
