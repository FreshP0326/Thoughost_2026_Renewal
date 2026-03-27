"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInSoft, fadeUpSoft, motionViewport, staggerFast, staggerStandard } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  fast?: boolean;
};

export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.1,
  fast = false,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...motionViewport, once, amount }}
      variants={shouldReduceMotion ? { hidden: {}, visible: {} } : fast ? staggerFast : staggerStandard}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div className={className} variants={shouldReduceMotion ? fadeInSoft : fadeUpSoft}>
      {children}
    </motion.div>
  );
}
