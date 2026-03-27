"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { createFadeUpSoft, fadeInSoft, motionViewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.15,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...motionViewport, once, amount }}
      variants={shouldReduceMotion ? fadeInSoft : createFadeUpSoft(18, delay)}
    >
      {children}
    </motion.div>
  );
}
