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
      <div className="site-nav-frame py-12 lg:py-16">
        <FadeIn y={14}>
          <h1 className="type-page-title max-w-[820px] text-[#101010]">
            {title}
          </h1>
        </FadeIn>
        {body ? (
          <FadeIn delay={0.08} y={10}>
            <p className="type-summary mt-5 max-w-[760px]">{body}</p>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
