"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SiteLogo } from "@/components/site/logo";
import { SocialLinks } from "@/components/site/social-links";
import { withLocale } from "@/lib/locale";
import { motionDurations, motionEasing } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Locale, NavItem, SocialIconLink } from "@/types/site";

export function SiteHeader({
  locale,
  navigation,
  socialLinks,
}: {
  locale: Locale;
  navigation: NavItem[];
  socialLinks: SocialIconLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="z-50 border-b border-[var(--page-divider)] bg-white">
      <div className="mx-auto flex h-[54px] w-full max-w-[880px] items-center justify-between gap-12 px-4 sm:gap-14 sm:px-5 lg:gap-20 lg:px-0">
        <SiteLogo locale={locale} />
        <div className="flex items-center gap-2 lg:gap-[10px]">
          <nav className="hidden items-center gap-[26px] lg:flex xl:gap-[30px]">
            {navigation.map((item) => {
              const href = withLocale(locale, item.href);
              const active = pathname === href || (item.href !== "/" && pathname?.startsWith(href));

              return (
                <Link
                  key={item.key}
                  href={href}
                  style={item.key === "project" ? { color: "#f04034" } : undefined}
                  className={cn(
                    "group relative text-[10px] leading-none font-semibold tracking-[0.03em] text-[var(--page-ink)] motion-link hover:text-neutral-500",
                    item.key === "project" && "text-[#f04034] hover:text-[#f04034]",
                    active && "text-[#ce3f36]",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "motion-surface absolute -bottom-[8px] left-0 h-px bg-current",
                      active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-8 w-8 items-center justify-center border border-[var(--page-divider)] motion-surface lg:hidden"
          >
            <motion.span
              key={open ? "open" : "closed"}
              initial={shouldReduceMotion ? false : { opacity: 0, rotate: open ? -18 : 18 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: motionDurations.fast, ease: motionEasing.emphasized }}
              className="inline-flex"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </button>
          <div className="hidden h-3.5 w-px bg-[var(--page-divider)] lg:block" />
          <div className="hidden lg:block">
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: motionDurations.base, ease: motionEasing.emphasized }}
            className="overflow-hidden border-t border-[var(--page-divider)] bg-white lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.04,
                    delayChildren: shouldReduceMotion ? 0 : 0.02,
                  },
                },
              }}
              className="mx-auto flex max-w-[880px] flex-col px-4 py-4 sm:px-6"
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.key}
                  variants={{
                    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: motionDurations.fast, ease: motionEasing.emphasized },
                    },
                  }}
                >
                  <Link
                    href={withLocale(locale, item.href)}
                    onClick={() => setOpen(false)}
                    style={item.key === "project" ? { color: "#f04034" } : undefined}
                    className={cn(
                      "block border-b border-neutral-100 py-3 text-[12px] font-semibold tracking-[0.06em] text-[var(--page-ink)] motion-link hover:text-neutral-500",
                      item.key === "project" && "text-[#f04034]",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <SocialLinks links={socialLinks} />
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
