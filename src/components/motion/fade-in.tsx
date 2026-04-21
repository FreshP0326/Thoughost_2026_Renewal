"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { createFadeUp, fadeIn, motionViewport } from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function FadeIn({
  children,
  className,
  style,
  delay = 0,
  y = 16,
  once = true,
  amount = 0.16,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const variant = shouldReduceMotion ? fadeIn : createFadeUp(y, delay);

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...motionViewport, once, amount }}
      variants={variant}
    >
      {children}
    </motion.div>
  );
}
