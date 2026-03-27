import { FadeIn } from "@/components/motion/fade-in";

export function PageIntro({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <FadeIn y={14}>
          <h1 className="max-w-[820px] text-[30px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#101010] md:text-[44px]">
            {title}
          </h1>
        </FadeIn>
        {body ? (
          <FadeIn delay={0.08} y={10}>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-neutral-600">{body}</p>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
