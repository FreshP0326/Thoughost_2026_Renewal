"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
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
          ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
          : { opacity: 0, y: 12, scale: 0.94, pointerEvents: "none" as const }
      }
      transition={{ duration: motionTokens.enterFast, ease: motionEasing.soft }}
      className="motion-surface fixed right-5 bottom-5 z-40 flex h-10 w-10 items-center justify-center border border-neutral-700 bg-[#171717]/96 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] hover:border-neutral-600 hover:bg-[#262626] hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
    >
      <ArrowUp size={18} strokeWidth={2} />
    </motion.button>
  );
}
