"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { motionEasing, motionTokens } from "@/lib/motion";

import styles from "./thoughts-2-special.module.css";

const backgroundLayer = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.enterSlow,
      ease: motionEasing.soft,
    },
  },
};

const titleSequence = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(18px)",
    letterSpacing: "0.02em",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "-0.08em",
    transition: {
      duration: motionTokens.heroTrack,
      delay: 0.18,
      ease: motionEasing.emphasized,
    },
  },
};

const bodySequence = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(12px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionTokens.enterSlow,
      delay,
      ease: motionEasing.emphasized,
    },
  }),
};

const mediaSequence = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.985,
    filter: "blur(18px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionTokens.heroTrack,
      delay: 0.42,
      ease: motionEasing.emphasized,
    },
  },
};

export function Thoughts2EchoHero({
  title,
  summary,
  intro,
  media,
}: {
  title: string;
  summary: string;
  intro: string;
  media: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.94, 0.82]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.heroEcho}
      style={shouldReduceMotion ? undefined : { opacity: heroOpacity, y: heroY }}
    >
      <motion.div
        aria-hidden="true"
        className={styles.echoBackground}
        data-reduced-motion={shouldReduceMotion ? "true" : "false"}
        initial={shouldReduceMotion ? false : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        variants={backgroundLayer}
        style={shouldReduceMotion ? undefined : { y: backgroundY }}
      >
        <div className={styles.echoGlowPrimary} />
        <div className={styles.echoGlowSecondary} />
        <div className={styles.echoMistField} />
        <div className={styles.echoPulseField} />
        <div className={styles.echoSweepField} />
        <div className={styles.echoTrails}>
          <span className={styles.echoTrail} />
          <span className={styles.echoTrail} />
          <span className={styles.echoTrail} />
        </div>
        <div className={styles.echoRingLarge} />
        <div className={styles.echoRingMedium} />
        <div className={styles.echoRingSmall} />
      </motion.div>

      <div className={styles.echoFrame}>
        <div className={styles.echoCopy}>
          <motion.h1
            className={styles.echoTitle}
            initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
            animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
            variants={shouldReduceMotion ? undefined : titleSequence}
            transition={
              shouldReduceMotion
                ? {
                    duration: motionTokens.enterFast,
                    ease: motionEasing.soft,
                  }
                : undefined
            }
          >
            {title}
          </motion.h1>

          <div className={styles.echoCopyBody}>
            <motion.p
              className={styles.echoIntro}
              custom={0.32}
              initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
              animate={shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : "visible"}
              variants={shouldReduceMotion ? undefined : bodySequence}
              transition={
                shouldReduceMotion
                ? {
                      duration: motionTokens.enterFast,
                      delay: 0.04,
                      ease: motionEasing.soft,
                    }
                  : undefined
              }
            >
              {summary}
            </motion.p>
            <motion.p
              className={styles.echoText}
              custom={0.4}
              initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
              animate={shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : "visible"}
              variants={shouldReduceMotion ? undefined : bodySequence}
              transition={
                shouldReduceMotion
                ? {
                      duration: motionTokens.enterFast,
                      delay: 0.08,
                      ease: motionEasing.soft,
                    }
                  : undefined
              }
            >
              {intro}
            </motion.p>
          </div>
        </div>

        <motion.div
          className={styles.echoMediaWrap}
          data-reduced-motion={shouldReduceMotion ? "true" : "false"}
          initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
          animate={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : "visible"}
          variants={shouldReduceMotion ? undefined : mediaSequence}
          transition={
            shouldReduceMotion
              ? {
                  duration: motionTokens.enterBase,
                  delay: 0.1,
                  ease: motionEasing.soft,
                }
              : undefined
          }
          style={shouldReduceMotion ? undefined : { y: mediaY }}
        >
          <div className={styles.echoMediaFloat} data-reduced-motion={shouldReduceMotion ? "true" : "false"}>
            <div className={styles.echoMedia}>{media}</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
