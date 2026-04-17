"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { isSiteHomePath } from "@/lib/locale";
import { motionTokens, pageOverlay } from "@/lib/motion";
import type { Locale } from "@/types/site";

export function PageTransitionShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHomeRoute = isSiteHomePath(pathname, locale);

  return (
    <div key={pathname ?? "page"} className="relative min-h-full">
      {!shouldReduceMotion && !isHomeRoute ? (
        <motion.div
          key={`page-overlay-${pathname ?? "page"}`}
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          variants={pageOverlay}
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.12)_48%,rgba(255,255,255,0)_100%)]"
          transition={{ duration: motionTokens.pageEnter }}
        />
      ) : null}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
