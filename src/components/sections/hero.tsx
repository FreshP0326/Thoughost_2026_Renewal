"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import { motionEasing, motionTokens } from "@/lib/motion";
import type { HeroSlide, Locale } from "@/types/site";

const AUTOPLAY_MS = 6000;

function getSlideImagePositions(slide: HeroSlide) {
  return {
    left: slide.desktopImagePosition?.left ?? "center center",
    right: slide.desktopImagePosition?.right ?? "center center",
    mobile: slide.mobileImagePosition ?? slide.desktopImagePosition?.main ?? "center center",
  };
}

export function HeroSection({
  locale,
  slides,
  introComplete = true,
}: {
  locale: Locale;
  slides: HeroSlide[];
  introComplete?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const safeSlides = Array.isArray(slides) ? slides.slice(0, 5) : [];

  const activeIndex = safeSlides.length === 0 ? 0 : index % safeSlides.length;
  const previousIndex = safeSlides.length === 0 ? 0 : (activeIndex - 1 + safeSlides.length) % safeSlides.length;
  const nextIndex = safeSlides.length === 0 ? 0 : (activeIndex + 1) % safeSlides.length;
  const activeSlide = safeSlides[activeIndex];
  const previousSlide = safeSlides[previousIndex];
  const nextSlide = safeSlides[nextIndex];

  useEffect(() => {
    if (safeSlides.length <= 1 || paused || shouldReduceMotion || !introComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % safeSlides.length);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, introComplete, paused, safeSlides.length, shouldReduceMotion]);

  if (!safeSlides.length || !activeSlide || !previousSlide || !nextSlide) {
    return null;
  }

  const previewLabels = {
    previous: previousSlide.title.replace("\n", " "),
    next: nextSlide.title.replace("\n", " "),
  };

  const goToSlide = (targetIndex: number) => {
    setIndex(targetIndex);
  };

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[var(--page-divider)] bg-white">
      <div className="w-screen">
        <div
          className="col-span-full grid min-h-[var(--hero-height-mobile)] overflow-hidden md:min-h-[var(--hero-height-tablet)] lg:min-h-[var(--hero-height-desktop)] lg:grid-cols-[minmax(0,var(--hero-side-width))_minmax(0,var(--hero-center-max))_minmax(0,var(--hero-side-width))]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            aria-label={`Show ${previewLabels.previous}`}
            onClick={() => goToSlide(previousIndex)}
            className="group relative hidden overflow-hidden bg-black lg:block"
          >
            <Image
              src={withBasePathAsset(previousSlide.leftImage)}
              alt=""
              fill
              loading="eager"
              sizes="21vw"
              className="motion-image object-cover saturate-[0.82] group-hover:scale-[1.02]"
              style={{ objectPosition: getSlideImagePositions(previousSlide).left }}
            />
            <div className="motion-overlay absolute inset-0 bg-[var(--hero-mask-strong)] group-hover:bg-black/58" />
            <div className="absolute inset-y-0 right-0 w-px bg-white/88" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="inline-flex bg-black/88 px-[3px] py-0 text-[12px] font-bold tracking-[-0.04em] text-white">
                {previewLabels.previous}
              </span>
            </div>
          </button>

          <div className="relative overflow-hidden bg-black">
            <motion.div
              animate={{ x: `${-activeIndex * 100}%` }}
              transition={{
                duration: shouldReduceMotion ? motionTokens.tap : motionTokens.heroSlide,
                ease: motionEasing.soft,
              }}
              className="flex h-full"
            >
              {safeSlides.map((slide) => {
                const positions = getSlideImagePositions(slide);
                const titleLines = slide.title.split("\n");

                return (
                  <div key={slide.slug} className="relative h-full min-w-full overflow-hidden">
                    <Link href={withLocale(locale, slide.ctaHref)} aria-label={slide.title} className="block h-full w-full">
                      <Image
                        src={withBasePathAsset(slide.mainImage)}
                        alt={slide.title}
                        fill
                        loading={slide.slug === activeSlide.slug ? "eager" : "lazy"}
                        fetchPriority={slide.slug === activeSlide.slug ? "high" : undefined}
                        sizes="(max-width: 1023px) 100vw, 64vw"
                        className="object-cover"
                        style={{ objectPosition: positions.mobile }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.28)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.28)_100%)]" />
                      <div className="absolute inset-y-0 left-0 hidden w-px bg-white/88 lg:block" />
                      <div className="absolute inset-y-0 right-0 hidden w-px bg-white/88 lg:block" />
                      <div className="absolute inset-x-0 top-0 z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-8">
                        <div className="max-w-[440px]">
                          <motion.h1
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: activeSlide.slug === slide.slug ? 1 : 0.72, y: activeSlide.slug === slide.slug ? 0 : 4 }}
                            transition={{ duration: motionTokens.heroInitial, ease: motionEasing.emphasized }}
                            className="font-ulagadi inline-flex flex-col items-start gap-0 text-[34px] leading-[0.8] tracking-[-0.1em] text-white uppercase sm:text-[46px] md:text-[62px] lg:text-[76px]"
                          >
                            {titleLines.map((line) => (
                              <span key={`${slide.slug}-${line}`} className="inline-flex bg-black px-[2px] py-0">
                                {line}
                              </span>
                            ))}
                          </motion.h1>
                          {slide.subtitle ? (
                            <motion.p
                              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                              animate={{ opacity: activeSlide.slug === slide.slug ? 1 : 0.5, y: 0 }}
                              transition={{ duration: motionTokens.enterBase, delay: 0.04, ease: motionEasing.soft }}
                              className="mt-4 hidden max-w-[420px] text-[12px] leading-[1.55] font-medium text-white/88 lg:block"
                            >
                              {slide.subtitle}
                            </motion.p>
                          ) : null}
                        </div>
                        <div className="flex items-end justify-between gap-4">
                          <span className="inline-flex bg-black px-[3px] py-0 text-[15px] leading-none font-black tracking-[-0.06em] text-white md:text-[18px]">
                            {slide.ctaLabel}
                          </span>
                          <div className="hidden text-right md:block">
                            <p className="text-[10px] font-semibold tracking-[0.12em] text-white/72 uppercase">Thoughost</p>
                            <p className="mt-1.5 text-[11px] leading-[1.45] text-white/78">{slide.title.replace("\n", " ")}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4 sm:px-5 sm:pb-5 md:justify-center md:px-6 md:pb-4 lg:pb-3">
              <div className="flex items-center gap-[6px]">
                {safeSlides.map((slide, slideIndex) => {
                  const isActive = slideIndex === activeIndex;

                  return (
                    <button
                      key={slide.slug}
                      type="button"
                      aria-label={`Go to slide ${slideIndex + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goToSlide(slideIndex)}
                      className="group flex items-center"
                    >
                      <span className="relative block h-[var(--hero-dot-height)] w-[var(--hero-dot-width)] overflow-hidden rounded-full bg-white/38">
                        {isActive ? (
                          <span
                            key={`${slide.slug}-${activeIndex}`}
                            data-paused={paused || shouldReduceMotion || !introComplete}
                            className="hero-progress-fill absolute inset-y-0 left-0 rounded-full bg-white"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <span className="absolute inset-0 rounded-full bg-white/70 opacity-85" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Show ${previewLabels.next}`}
            onClick={() => goToSlide(nextIndex)}
            className="group relative hidden overflow-hidden bg-black lg:block"
          >
            <Image
              src={withBasePathAsset(nextSlide.rightImage)}
              alt=""
              fill
              loading="eager"
              sizes="21vw"
              className="motion-image object-cover saturate-[0.9] group-hover:scale-[1.02]"
              style={{ objectPosition: getSlideImagePositions(nextSlide).right }}
            />
            <div className="motion-overlay absolute inset-0 bg-[var(--hero-mask-medium)] group-hover:bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-right">
              <span className="inline-flex bg-black/88 px-[3px] py-0 text-[12px] font-bold tracking-[-0.04em] text-white">
                {previewLabels.next}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
