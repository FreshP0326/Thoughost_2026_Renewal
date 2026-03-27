"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeIn, maskReveal, motionViewport } from "@/lib/motion";

export function ImageReveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...motionViewport, once, amount }}
      variants={shouldReduceMotion ? fadeIn : maskReveal(delay)}
    >
      {children}
    </motion.div>
  );
}
