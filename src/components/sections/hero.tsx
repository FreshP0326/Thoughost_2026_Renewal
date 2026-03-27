"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import { motionDurations, motionEasing } from "@/lib/motion";
import type { HeroSlide, Locale } from "@/types/site";

function getSlideImagePositions(slug: string) {
  if (slug === "kakusatsu-shoujo") {
    return {
      left: "left center",
      main: "center center",
      right: "right center",
    };
  }

  if (slug === "ground-attack") {
    return {
      left: "left center",
      main: "center center",
      right: "right center",
    };
  }

  return {
    left: "left center",
    main: "center center",
    right: "right center",
  };
}

export function HeroSection({
  locale,
  slides,
}: {
  locale: Locale;
  slides: HeroSlide[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const safeSlides = Array.isArray(slides) ? slides : [];
  const activeIndex = safeSlides.length === 0 ? 0 : index % safeSlides.length;
  const activeSlide = safeSlides[activeIndex];
  const previousIndex = safeSlides.length === 0 ? 0 : (activeIndex - 1 + safeSlides.length) % safeSlides.length;
  const nextIndex = safeSlides.length === 0 ? 0 : (activeIndex + 1) % safeSlides.length;
  const previousSlide = safeSlides[previousIndex];
  const nextSlide = safeSlides[nextIndex];

  useEffect(() => {
    if (safeSlides.length <= 1 || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeSlides.length);
    }, 5900);

    return () => window.clearInterval(timer);
  }, [paused, safeSlides.length]);

  if (safeSlides.length === 0) {
    return null;
  }

  const titleLines = activeSlide.title.split("\n");
  const positions = getSlideImagePositions(activeSlide.slug);
  const previousPositions = getSlideImagePositions(previousSlide.slug);
  const nextPositions = getSlideImagePositions(nextSlide.slug);

  const goToIndex = (targetIndex: number) => {
    setPaused(true);
    setIndex(targetIndex);

    window.setTimeout(() => {
      setPaused(false);
    }, 2200);
  };

  return (
    <section className="border-b border-[var(--page-divider)] bg-white">
      <div className="mx-auto w-full max-w-[1919px]">
        <div
          className="relative h-[382px] overflow-hidden md:h-[396px] lg:h-[408px] xl:h-[422px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${locale}-${activeSlide.slug}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: motionDurations.base, ease: motionEasing.emphasized }}
              className="absolute inset-0 grid grid-cols-[1fr] md:grid-cols-[0.9fr_2.42fr_0.9fr]"
            >
              <button
                type="button"
                aria-label={`Show ${previousSlide.title}`}
                onClick={() => goToIndex(previousIndex)}
                className="group relative hidden overflow-hidden bg-black text-left md:block"
              >
                <Image
                  src={withBasePathAsset(previousSlide.leftImage)}
                  alt=""
                  fill
                  className="motion-image object-cover saturate-[0.78] group-hover:opacity-95 group-hover:brightness-105"
                  style={{ objectPosition: previousPositions.left }}
                  sizes="22vw"
                  priority={false}
                />
                <div className="motion-overlay absolute inset-0 bg-[var(--hero-mask-strong)] group-hover:bg-black/58" />
                <div className="absolute inset-y-0 right-0 w-px bg-white/92" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-start p-4">
                  <span className="motion-surface motion-lift-subtle inline-flex bg-black/90 px-[3px] py-0 text-[12px] leading-none font-bold tracking-[-0.04em] text-white opacity-[0.72] group-hover:opacity-100">
                    {previousSlide.title.replace("\n", " ")}
                  </span>
                </div>
              </button>

              <Link
                href={withLocale(locale, activeSlide.ctaHref)}
                aria-label={activeSlide.title}
                className="motion-image-group relative overflow-hidden bg-black"
              >
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.94, scale: 1.028 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.94, scale: 1.012 }}
                  transition={{ duration: motionDurations.hero, ease: motionEasing.emphasized }}
                  className="absolute inset-0"
                >
                  <Image
                    src={withBasePathAsset(activeSlide.mainImage)}
                    alt={activeSlide.title}
                    fill
                    className="motion-image object-cover"
                    style={{ objectPosition: positions.main }}
                    sizes="(max-width: 767px) 100vw, 56vw"
                    priority
                  />
                </motion.div>
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.7 }}
                  transition={{ duration: motionDurations.slow, ease: motionEasing.emphasized }}
                  className="motion-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.05)_28%,rgba(0,0,0,0.14)_100%)]"
                />
                <div className="absolute inset-y-0 left-0 hidden w-px bg-white/92 md:block" />
                <div className="absolute inset-y-0 right-0 hidden w-px bg-white/92 md:block" />

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionDurations.slow, delay: 0.06, ease: motionEasing.emphasized }}
                  className="absolute left-4 top-4 max-w-[270px] sm:left-5 sm:top-5 sm:max-w-[340px] md:left-8 md:top-6 md:max-w-[430px]"
                >
                  <h1 className="font-ulagadi inline-flex max-w-[410px] flex-col items-start text-[29px] leading-[0.72] tracking-[-0.1em] text-white sm:text-[38px] md:text-[56px] lg:text-[60px]">
                    {titleLines.map((line, lineIndex) => (
                      <motion.span
                        key={line}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: motionDurations.base,
                          delay: 0.08 + lineIndex * 0.04,
                          ease: motionEasing.emphasized,
                        }}
                        className="mb-0 inline-flex w-max self-start bg-black px-[1px] py-0 leading-[0.74] font-black"
                      >
                        {line}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionDurations.base, delay: 0.18, ease: motionEasing.emphasized }}
                  className="absolute left-4 bottom-4 z-10 sm:left-5 sm:bottom-5 md:left-8 md:bottom-8"
                >
                  <span
                    className="motion-link inline-flex w-fit items-center justify-center bg-black px-[2px] py-0 text-[17px] leading-[0.9] font-black tracking-[-0.06em] text-white hover:opacity-[0.74] md:text-[20px]"
                    style={{ color: "#ffffff" }}
                  >
                    {activeSlide.ctaLabel}
                  </span>
                </motion.div>
              </Link>

              <button
                type="button"
                aria-label={`Show ${nextSlide.title}`}
                onClick={() => goToIndex(nextIndex)}
                className="group relative hidden overflow-hidden bg-[#0e2430] text-left md:block"
              >
                <Image
                  src={withBasePathAsset(nextSlide.rightImage)}
                  alt=""
                  fill
                  className="motion-image object-cover contrast-[0.96] saturate-[0.88] group-hover:opacity-95 group-hover:brightness-105"
                  style={{ objectPosition: nextPositions.right }}
                  sizes="22vw"
                  priority={false}
                />
                <div className="motion-overlay absolute inset-0 bg-[var(--hero-mask-medium)] group-hover:bg-black/26" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4">
                  <span className="motion-surface motion-lift-subtle inline-flex bg-black/90 px-[3px] py-0 text-[12px] leading-none font-bold tracking-[-0.04em] text-white opacity-[0.72] group-hover:opacity-100">
                    {nextSlide.title.replace("\n", " ")}
                  </span>
                </div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
