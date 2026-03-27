"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { HeroSection } from "@/components/sections/hero";
import { NewsSection } from "@/components/sections/news";
import { ReleasesGridSection } from "@/components/sections/releases-grid";
import { HomeIntroOverlay, INTRO_TOTAL_MS } from "@/components/site/home-intro";
import type { HeroSlide, Locale, NewsCardItem, ReleaseGridItem } from "@/types/site";

const HOME_INTRO_KEY = "thoughost-home-intro-played";
type IntroState = "checking" | "playing" | "done";

export function HomeLanding({
  locale,
  heroSlides,
  newsTitle,
  newsMoreLabel,
  newsItems,
  releasesTitle,
  releasesMoreLabel,
  releaseItems,
}: {
  locale: Locale;
  heroSlides: HeroSlide[];
  newsTitle: string;
  newsMoreLabel: string;
  newsItems: NewsCardItem[];
  releasesTitle: string;
  releasesMoreLabel: string;
  releaseItems: ReleaseGridItem[];
}) {
  const [introState, setIntroState] = useState<IntroState>("checking");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const hasPlayed = window.sessionStorage.getItem(HOME_INTRO_KEY) === "1";
        setIntroState(hasPlayed ? "done" : "playing");
      } catch {
        setIntroState("playing");
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (introState !== "playing") {
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(HOME_INTRO_KEY, "1");
      } catch {}

      setIntroState("done");
    }, INTRO_TOTAL_MS);

    return () => window.clearTimeout(timer);
  }, [introState]);

  const introVisible = introState !== "done";
  const introComplete = introState === "done";

  return (
    <>
      <AnimatePresence>
        {introVisible ? <HomeIntroOverlay /> : null}
      </AnimatePresence>
      <HeroSection key={locale} locale={locale} slides={heroSlides} introComplete={introComplete} />
      <NewsSection locale={locale} title={newsTitle} moreLabel={newsMoreLabel} moreHref="/news" items={newsItems} />
      <ReleasesGridSection locale={locale} title={releasesTitle} moreLabel={releasesMoreLabel} items={releaseItems} />
    </>
  );
}
