"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { fadeIn, motionTokens, pageFrame, pageOverlay } from "@/lib/motion";

export function PageTransitionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname ?? "page"}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={shouldReduceMotion ? fadeIn : pageFrame}
        className="relative min-h-full"
      >
        {!shouldReduceMotion ? (
          <motion.div
            aria-hidden="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageOverlay}
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%)]"
            transition={{ duration: motionTokens.pageEnter }}
          />
        ) : null}
        <div className="relative z-[2]">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
