"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { motionEasing, motionTokens } from "@/lib/motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        })
      }
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1, pointerEvents: "auto" as const }
          : { opacity: 0, scale: 0.94, pointerEvents: "none" as const }
      }
      transition={{ duration: motionTokens.enterFast, ease: motionEasing.soft }}
      className="motion-surface fixed top-1/2 right-[8px] z-40 flex h-[56px] w-[56px] items-center justify-center bg-[#2f2f2f] text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] hover:bg-[#393939]"
      style={{ marginTop: "-28px" }}
    >
      <svg width="28" height="18" viewBox="0 0 28 18" aria-hidden="true" focusable="false">
        <path d="M3 14L14 3L25 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    </motion.button>
  );
}
