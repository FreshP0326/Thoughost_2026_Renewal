"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { withBasePathAsset } from "@/lib/base-path";
import { motionEasing, motionTokens } from "@/lib/motion";

const INTRO_TOTAL_MS = 1320;

export function HomeIntroOverlay() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : motionTokens.exitFast, ease: motionEasing.emphasized }}
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-[#101010]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0.02)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(180deg,rgba(255,255,255,0.36)_0,rgba(255,255,255,0.36)_1px,transparent_1px,transparent_3px)]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.14, 0.05, 0.1, 0.06] }}
        transition={{ duration: motionTokens.introShort, delay: 0.04, ease: motionEasing.exit, times: [0, 0.2, 0.42, 0.68, 1] }}
        className="absolute inset-0 bg-white"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.12, 0.06] }}
        transition={{ duration: motionTokens.introBase, delay: 0.08, ease: motionEasing.emphasized }}
        className="absolute inset-[18px] border border-white/8 md:inset-[26px]"
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0.84 }}
        animate={{ opacity: shouldReduceMotion ? 0 : 0.14, scaleY: 1 }}
        transition={{ duration: motionTokens.enterFast, delay: 0.12, ease: motionEasing.emphasized }}
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/25"
      />
      <div className="absolute inset-0">
        {[16, 34, 66, 84].map((left, index) => (
          <motion.div
            key={left}
            initial={{ opacity: 0, scaleY: 0.88 }}
            animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.18, 0], scaleY: 1 }}
            transition={{ duration: motionTokens.introShort, delay: 0.08 + index * 0.04, ease: motionEasing.emphasized }}
            className="absolute top-0 bottom-0 w-px bg-white/14"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.42, 0.3], y: 0 }}
        transition={{ duration: motionTokens.introShort, delay: 0.14, ease: motionEasing.emphasized }}
        className="absolute left-6 top-6 text-[9px] tracking-[0.24em] text-white/54 uppercase md:left-8 md:top-8 md:text-[10px]"
      >
        THOUGHTFORM / ARCHIVE
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.38, 0.26], y: 0 }}
        transition={{ duration: motionTokens.introShort, delay: 0.16, ease: motionEasing.emphasized }}
        className="absolute bottom-6 right-6 text-right text-[9px] tracking-[0.22em] text-white/46 uppercase md:bottom-8 md:right-8 md:text-[10px]"
      >
        <div>RELEASE / PROJECT / SIGNAL</div>
        <div className="mt-1">MOTION SYSTEM INTRO</div>
      </motion.div>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: [0, 0.82, 0.68, 1], y: [14, 2, 1, 0], scale: [0.94, 1.015, 0.995, 1] }
        }
        transition={{ duration: motionTokens.introBase, delay: 0.18, ease: motionEasing.emphasized, times: [0, 0.28, 0.54, 1] }}
        className="absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src={withBasePathAsset("/thoughost-logo.svg")}
          alt=""
          width={224}
          height={49}
          priority
          className="h-auto w-[184px] invert md:w-[264px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.84, scaleY: 0.92 }}
        animate={{ opacity: shouldReduceMotion ? 0 : 1, scaleX: 1, scaleY: 1 }}
        transition={{ duration: motionTokens.introShort, delay: 0.18, ease: motionEasing.emphasized }}
        className="absolute top-1/2 left-1/2 z-[1] h-[92px] w-[220px] -translate-x-1/2 -translate-y-1/2 border border-white/14 md:h-[116px] md:w-[312px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.55, 0.14, 0] }}
        transition={{ duration: motionTokens.introBase, delay: 0.16, ease: motionEasing.emphasized, times: [0, 0.26, 0.62, 1] }}
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/38"
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.36, 0.08], scaleX: 1 }}
        transition={{ duration: motionTokens.introShort, delay: 0.2, ease: motionEasing.emphasized }}
        className="absolute left-1/2 top-1/2 h-[148px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-white/12"
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.4, 0.14], scaleX: 1 }}
        transition={{ duration: motionTokens.introShort, delay: 0.28, ease: motionEasing.emphasized }}
        className="absolute left-1/2 top-[calc(50%+44px)] h-px w-[180px] origin-center -translate-x-1/2 bg-white/22 md:top-[calc(50%+56px)] md:w-[240px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.58, 0.18] }}
        transition={{ duration: motionTokens.introBeat, delay: 0.32, ease: motionEasing.emphasized }}
        className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 text-[9px] tracking-[0.24em] text-white/54 uppercase md:top-[calc(50%+60px)] md:text-[10px]"
      >
        THOUGHTFORM / OPENING SIGNAL
      </motion.div>

      <div className="absolute inset-0 grid grid-cols-[20vw_60vw_20vw] md:grid-cols-[20vw_60vw_20vw]">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: shouldReduceMotion ? "-100%" : "-100%" }}
          transition={{ duration: motionTokens.introPanel, delay: 0.6, ease: motionEasing.emphasized }}
          className="relative border-r border-white/18 bg-[#101010]"
        />
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: motionTokens.introBase, delay: 0.5, ease: motionEasing.emphasized }}
          className="origin-center border-r border-l border-white/18 bg-[#101010]"
        />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: shouldReduceMotion ? "100%" : "100%" }}
          transition={{ duration: motionTokens.introPanel, delay: 0.6, ease: motionEasing.emphasized }}
          className="relative border-l border-white/18 bg-[#101010]"
        />
      </div>
      <div className="absolute inset-0">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: shouldReduceMotion ? 0 : 1 }}
          transition={{ duration: motionTokens.introShort, delay: 0.2, ease: motionEasing.emphasized }}
          className="absolute top-1/2 left-1/2 h-px w-[210px] origin-center -translate-x-1/2 -translate-y-1/2 bg-white/45 md:w-[300px]"
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.44, 0], x: 0 }}
          transition={{ duration: motionTokens.introShort, delay: 0.24, ease: motionEasing.emphasized }}
          className="absolute top-1/2 left-[calc(50%-150px)] h-px w-[84px] -translate-y-[26px] bg-white/18 md:left-[calc(50%-204px)] md:w-[118px]"
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.44, 0], x: 0 }}
          transition={{ duration: motionTokens.introShort, delay: 0.24, ease: motionEasing.emphasized }}
          className="absolute top-1/2 right-[calc(50%-150px)] h-px w-[84px] -translate-y-[26px] bg-white/18 md:right-[calc(50%-204px)] md:w-[118px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldReduceMotion ? 0 : [0, 0.24, 0] }}
          transition={{ duration: motionTokens.introBeat, delay: 0.38, ease: motionEasing.emphasized }}
          className="absolute left-1/2 top-1/2 h-[66px] w-[calc(100%-84px)] -translate-x-1/2 -translate-y-1/2 border-y border-white/8 md:h-[88px] md:w-[calc(100%-128px)]"
        />
      </div>
    </motion.div>
  );
}

export { INTRO_TOTAL_MS };
