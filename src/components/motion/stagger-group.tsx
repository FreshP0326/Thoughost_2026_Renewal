"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeIn, motionViewport, staggerContainer, staggerItem } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  density?: "tight" | "base";
};

export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.08,
  density = "base",
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...motionViewport, once, amount }}
      variants={shouldReduceMotion ? { hidden: {}, visible: {} } : staggerContainer(density)}
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
    <motion.div className={className} variants={shouldReduceMotion ? fadeIn : staggerItem}>
      {children}
    </motion.div>
  );
}
