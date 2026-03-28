"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import { motionEasing, motionTokens } from "@/lib/motion";
import type { HeroSlide, Locale } from "@/types/site";

const AUTOPLAY_MS = 6000;

type HeroDirection = -1 | 1;

function getWrappedIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getDirection(fromIndex: number, targetIndex: number, length: number): HeroDirection {
  if (targetIndex === fromIndex) {
    return 1;
  }

  const forwardDistance = (targetIndex - fromIndex + length) % length;
  const backwardDistance = (fromIndex - targetIndex + length) % length;

  return forwardDistance <= backwardDistance ? 1 : -1;
}

function getSlideImagePositions(slide: HeroSlide) {
  return {
    left: slide.desktopImagePosition?.left ?? "center center",
    main: slide.desktopImagePosition?.main ?? "center center",
    right: slide.desktopImagePosition?.right ?? "center center",
    mobile: slide.mobileImagePosition ?? slide.desktopImagePosition?.main ?? "center center",
  };
}

function getCleanTitle(title: string) {
  return title.replace(/\n/g, " ");
}

function HeroHeadline({ slide, includeSubtitle }: { slide: HeroSlide; includeSubtitle: boolean }) {
  const titleLines = slide.title.split("\n");

  return (
    <div className="max-w-[440px]">
      <h1 className="font-ulagadi inline-flex flex-col items-start gap-0 text-[34px] leading-[0.8] tracking-[-0.1em] text-white uppercase sm:text-[46px] md:text-[62px] lg:text-[76px]">
        {titleLines.map((line) => (
          <span key={`${slide.slug}-${line}`} className="inline-flex bg-black px-[2px] py-0">
            {line}
          </span>
        ))}
      </h1>
      {includeSubtitle && slide.subtitle ? (
        <p className="mt-4 hidden max-w-[430px] text-[13px] leading-[1.7] font-normal text-white/86 lg:block">
          {slide.subtitle}
        </p>
      ) : null}
    </div>
  );
}

function HeroFooter({ slide }: { slide: HeroSlide }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <span className="inline-flex bg-black px-[4px] py-[1px] text-[14px] leading-none font-semibold tracking-[-0.03em] text-white md:text-[16px]">
        {slide.ctaLabel}
      </span>
      <div className="hidden text-right md:block">
        <p className="text-[11px] leading-none font-medium tracking-[0.06em] text-white/72 uppercase">Thoughost</p>
        <p className="mt-1.5 text-[12px] leading-[1.5] font-normal text-white/78">{getCleanTitle(slide.title)}</p>
      </div>
    </div>
  );
}

function HeroProgressBar({
  active,
  progress,
}: {
  active: boolean;
  progress: number;
}) {
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  return (
    <span className="hero-progress-track relative block h-[var(--hero-dot-height)] w-[var(--hero-dot-width)] overflow-hidden bg-white/24">
      {active ? (
        <motion.span
          className="hero-progress-fill absolute inset-y-0 left-0 bg-white"
          animate={{ scaleX: clampedProgress, opacity: 1 }}
          transition={{ duration: 0.08, ease: "linear" }}
          style={{ width: "100%", transformOrigin: "left center" }}
        />
      ) : (
        <motion.span
          className="absolute inset-y-0 left-0 w-[38%] bg-white/54"
          animate={{ opacity: 0.64, scaleX: 0.96 }}
          transition={{ duration: 0.24, ease: motionEasing.soft }}
        />
      )}
    </span>
  );
}

function DesktopSidePane({
  slide,
  side,
  interactive,
  onClick,
}: {
  slide: HeroSlide;
  side: "left" | "right";
  interactive: boolean;
  onClick: () => void;
}) {
  const positions = getSlideImagePositions(slide);
  const imagePosition = side === "left" ? positions.left : positions.right;
  const imageSrc = side === "left" ? slide.leftImage : slide.rightImage;
  const alignmentClass = side === "left" ? "items-start text-left" : "items-end text-right";
  const dividerClass = side === "left" ? "right-0" : "left-0";

  const content = (
    <>
      <Image
        src={withBasePathAsset(imageSrc)}
        alt=""
        fill
        loading="eager"
        sizes="20vw"
        className="hero-pane-image object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="hero-pane-overlay absolute inset-0" data-pane-tone="side" />
      <div className={`absolute inset-y-0 ${dividerClass} w-px bg-white/88`} />
      <div className={`hero-pane-content absolute inset-x-0 bottom-0 z-10 flex p-4 ${alignmentClass}`} data-pane-content="side">
        <span className="hero-pane-chip">
          {getCleanTitle(slide.title)}
        </span>
      </div>
    </>
  );

  if (!interactive) {
    return (
      <div aria-hidden="true" className="hero-pane hero-pane-side relative hidden overflow-hidden bg-black lg:block" data-pane-emphasis="side">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Show ${getCleanTitle(slide.title)}`}
      onClick={onClick}
      className="hero-pane hero-pane-side hero-pane-hit relative hidden overflow-hidden bg-black lg:block"
      data-pane-emphasis="side"
    >
      {content}
    </button>
  );
}

function DesktopCenterPane({
  slide,
  locale,
  interactive,
}: {
  slide: HeroSlide;
  locale: Locale;
  interactive: boolean;
}) {
  const positions = getSlideImagePositions(slide);

  const content = (
    <>
      <Image
        src={withBasePathAsset(slide.mainImage)}
        alt={slide.title}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1023px) 100vw, 60vw"
        className="hero-pane-image object-cover"
        style={{ objectPosition: positions.main }}
      />
      <div className="hero-pane-overlay absolute inset-0" data-pane-tone="center" />
      <div className="absolute inset-y-0 left-0 w-px bg-white/88" />
      <div className="absolute inset-y-0 right-0 w-px bg-white/88" />
      <div className="hero-pane-content absolute inset-x-0 top-0 z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-8" data-pane-content="center">
        <HeroHeadline slide={slide} includeSubtitle />
        <HeroFooter slide={slide} />
      </div>
    </>
  );

  if (!interactive) {
    return (
      <div aria-hidden="true" className="hero-pane hero-pane-center relative hidden overflow-hidden bg-black lg:block" data-pane-emphasis="center">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={withLocale(locale, slide.ctaHref)}
      aria-label={slide.title}
      className="hero-pane hero-pane-center hero-pane-hit relative hidden overflow-hidden bg-black lg:block"
      data-pane-emphasis="center"
    >
      {content}
    </Link>
  );
}

function DesktopHeroLayer({
  slides,
  activeIndex,
  locale,
  interactive,
  direction,
  shouldReduceMotion,
  onPrevious,
  onNext,
}: {
  slides: HeroSlide[];
  activeIndex: number;
  locale: Locale;
  interactive: boolean;
  direction: HeroDirection;
  shouldReduceMotion: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const previousIndex = getWrappedIndex(activeIndex - 1, slides.length);
  const nextIndex = getWrappedIndex(activeIndex + 1, slides.length);
  const frameInitialX = getPaneEntryOffset(direction, "center", shouldReduceMotion);

  return (
    <motion.div
      className="site-hero-frame h-full min-h-[var(--hero-height-desktop)] min-w-full"
      animate={{ x: "0%" }}
      initial={{ x: frameInitialX, opacity: shouldReduceMotion ? 1 : 0.86 }}
      transition={{ duration: shouldReduceMotion ? motionTokens.tap : motionTokens.heroPreview, ease: motionEasing.soft }}
    >
      <DesktopSidePane
        slide={slides[previousIndex]}
        side="left"
        interactive={interactive}
        onClick={onPrevious}
      />
      <DesktopCenterPane
        slide={slides[activeIndex]}
        locale={locale}
        interactive={interactive}
      />
      <DesktopSidePane
        slide={slides[nextIndex]}
        side="right"
        interactive={interactive}
        onClick={onNext}
      />
    </motion.div>
  );
}

function getPaneEntryOffset(direction: HeroDirection, pane: "left" | "center" | "right", shouldReduceMotion: boolean) {
  if (shouldReduceMotion) {
    return "0%";
  }

  if (pane === "center") {
    return direction === 1 ? "1.1%" : "-1.1%";
  }

  if (pane === "left") {
    return direction === 1 ? "-1.6%" : "-0.8%";
  }

  return direction === 1 ? "0.8%" : "1.6%";
}

function MobileHeroSlide({
  slide,
  locale,
  priority,
}: {
  slide: HeroSlide;
  locale: Locale;
  priority: boolean;
}) {
  const positions = getSlideImagePositions(slide);

  return (
    <Link href={withLocale(locale, slide.ctaHref)} aria-label={slide.title} className="block h-full w-full">
      <Image
        src={withBasePathAsset(slide.mainImage)}
        alt={slide.title}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        sizes="100vw"
        className="hero-pane-image object-cover"
        style={{ objectPosition: positions.mobile }}
      />
      <div className="hero-pane-overlay absolute inset-0" data-pane-tone="center" />
      <div className="hero-pane-content absolute inset-x-0 top-0 z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6" data-pane-content="center">
        <HeroHeadline slide={slide} includeSubtitle={false} />
        <HeroFooter slide={slide} />
      </div>
    </Link>
  );
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<HeroDirection>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const reduceMotionPreference = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotionPreference);
  const safeSlides = Array.isArray(slides) ? slides.slice(0, 5) : [];
  const progressFrame = useRef<number | null>(null);
  const progressStartAt = useRef<number | null>(null);
  const progressValueRef = useRef(0);
  const lastFrameAt = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);

  const transitionDurationMs = shouldReduceMotion ? 20 : 560;

  const finishTransitionWindow = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
    }

    transitionTimer.current = window.setTimeout(() => {
      setIsTransitioning(false);
      transitionTimer.current = null;
    }, transitionDurationMs);
  }, [transitionDurationMs]);

  useEffect(() => {
    if (safeSlides.length <= 1 || shouldReduceMotion || !introComplete) {
      return;
    }

    if (paused || isTransitioning) {
      if (progressFrame.current !== null) {
        window.cancelAnimationFrame(progressFrame.current);
        progressFrame.current = null;
      }

      return;
    }

    const step = (timestamp: number) => {
      if (progressStartAt.current === null) {
        progressStartAt.current = timestamp - progressValueRef.current * AUTOPLAY_MS;
      }

      if (lastFrameAt.current !== null && timestamp - lastFrameAt.current < 14) {
        progressFrame.current = window.requestAnimationFrame(step);
        return;
      }

      lastFrameAt.current = timestamp;
      const elapsed = timestamp - progressStartAt.current;
      const nextProgress = Math.min(elapsed / AUTOPLAY_MS, 1);
      progressValueRef.current = nextProgress;
      setProgressValue(nextProgress);

      if (nextProgress >= 1) {
        setDirection(1);
        setIsTransitioning(true);
        setActiveIndex((current) => getWrappedIndex(current + 1, safeSlides.length));
        progressValueRef.current = 0;
        setProgressValue(0);
        progressStartAt.current = null;
        lastFrameAt.current = null;
        finishTransitionWindow();
        progressFrame.current = window.requestAnimationFrame(step);
        return;
      }

      progressFrame.current = window.requestAnimationFrame(step);
    };

    progressFrame.current = window.requestAnimationFrame(step);

    return () => {
      if (progressFrame.current !== null) {
        window.cancelAnimationFrame(progressFrame.current);
        progressFrame.current = null;
      }
      lastFrameAt.current = null;
    };
  }, [finishTransitionWindow, introComplete, isTransitioning, paused, safeSlides.length, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  if (!safeSlides.length) {
    return null;
  }

  const requestTransition = (targetIndex: number) => {
    if (safeSlides.length <= 1 || targetIndex === activeIndex || isTransitioning) {
      return;
    }

    setDirection(getDirection(activeIndex, targetIndex, safeSlides.length));
    setIsTransitioning(true);
    setActiveIndex(targetIndex);
    progressValueRef.current = 0;
    setProgressValue(0);
    progressStartAt.current = null;
    lastFrameAt.current = null;
    finishTransitionWindow();
  };

  const desktopVariants = {
    enter: (entryDirection: HeroDirection) => ({
      opacity: shouldReduceMotion ? 1 : 0.24,
      x: shouldReduceMotion ? "0%" : entryDirection === 1 ? "0.9%" : "-0.9%",
      scale: 1,
      filter: "blur(0px)",
    }),
    center: {
      opacity: 1,
      x: "0%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? motionTokens.tap : 0.4,
        ease: motionEasing.soft,
      },
    },
    exit: (entryDirection: HeroDirection) => ({
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? "0%" : entryDirection === 1 ? "-0.7%" : "0.7%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? motionTokens.tap : 0.28,
        ease: motionEasing.soft,
      },
    }),
  };

  const mobileVariants = {
    enter: (entryDirection: HeroDirection) => ({
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? "0%" : entryDirection === 1 ? "2.2%" : "-2.2%",
      scale: 1,
      filter: "blur(0px)",
    }),
    center: {
      opacity: 1,
      x: "0%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? motionTokens.tap : 0.38,
        ease: motionEasing.soft,
      },
    },
    exit: (entryDirection: HeroDirection) => ({
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? "0%" : entryDirection === 1 ? "-1.6%" : "1.6%",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? motionTokens.tap : 0.3,
        ease: motionEasing.soft,
      },
    }),
  };

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[var(--page-divider)] bg-white">
      <div
        className="w-screen"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative min-h-[var(--hero-height-mobile)] overflow-hidden md:min-h-[var(--hero-height-tablet)] lg:min-h-[var(--hero-height-desktop)]">
          <div className="relative hidden min-h-[var(--hero-height-desktop)] lg:block">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={safeSlides[activeIndex].slug}
                custom={direction}
                variants={desktopVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.div
                  className="hero-stage-veil absolute inset-0 z-10"
                  initial={{ opacity: shouldReduceMotion ? 0 : 0.08 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? motionTokens.tap : 0.18, ease: motionEasing.soft }}
                />
                <DesktopHeroLayer
                  slides={safeSlides}
                  activeIndex={activeIndex}
                  locale={locale}
                  interactive={!isTransitioning}
                  direction={direction}
                  shouldReduceMotion={shouldReduceMotion}
                  onPrevious={() => requestTransition(getWrappedIndex(activeIndex - 1, safeSlides.length))}
                  onNext={() => requestTransition(getWrappedIndex(activeIndex + 1, safeSlides.length))}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[var(--hero-height-mobile)] md:min-h-[var(--hero-height-tablet)] lg:hidden">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={safeSlides[activeIndex].slug}
                custom={direction}
                variants={mobileVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.div
                  className="hero-stage-veil absolute inset-0 z-10"
                  initial={{ opacity: shouldReduceMotion ? 0 : 0.06 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? motionTokens.tap : 0.18, ease: motionEasing.soft }}
                />
                <MobileHeroSlide slide={safeSlides[activeIndex]} locale={locale} priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-4 lg:pb-3">
            <div className="flex items-center gap-[6px]">
              {safeSlides.map((slide, slideIndex) => {
                const isActive = slideIndex === activeIndex;

                return (
                  <button
                    key={slide.slug}
                    type="button"
                    aria-label={`Go to slide ${slideIndex + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => requestTransition(slideIndex)}
                    disabled={isTransitioning}
                    className="group flex items-center disabled:cursor-default"
                  >
                    <HeroProgressBar active={isActive} progress={isActive ? progressValue : 0} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
