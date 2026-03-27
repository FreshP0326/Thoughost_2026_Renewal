"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { SiteLogo } from "@/components/site/logo";
import { SocialLinks } from "@/components/site/social-links";
import { withLocale } from "@/lib/locale";
import { drawerContent, motionEasing, motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Locale, NavItem, SocialIconLink } from "@/types/site";

export function SiteHeader({
  locale,
  pathname,
  navigation,
  socialLinks,
}: {
  locale: Locale;
  pathname: string;
  navigation: NavItem[];
  socialLinks: SocialIconLink[];
}) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="site-header z-50 border-b border-[var(--page-divider)] bg-white">
      <div className="site-hero-frame">
        <div className="col-span-full flex h-[var(--header-height)] items-center justify-between gap-6 px-4 sm:px-6 md:px-0 lg:col-start-2 lg:col-end-3">
          <SiteLogo locale={locale} />
          <div className="flex items-center gap-2 md:gap-[10px]">
            <nav className="hidden items-center gap-[28px] lg:flex xl:gap-[34px]">
              {navigation.map((item) => {
                const isExternal = /^https?:\/\//.test(item.href);
                const href = isExternal ? item.href : withLocale(locale, item.href);
                const active = isExternal ? false : pathname === href || (item.href !== "/" && pathname?.startsWith(href));

                return (
                  <Link
                    key={item.key}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    style={item.key === "project" ? { color: "#f04034" } : undefined}
                    className={cn(
                      "group relative text-[10px] leading-none font-semibold tracking-[0.03em] text-[var(--page-ink)] uppercase motion-link hover:text-neutral-500",
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
            <div className="hidden h-3.5 w-px bg-[var(--page-divider)] lg:block" />
            <div className="hidden lg:block">
              <SocialLinks links={socialLinks} />
            </div>
            <LocaleSwitcher locale={locale} pathname={pathname} placement="header" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--page-divider)] motion-surface lg:hidden"
            >
              <motion.span
                key={open ? "open" : "closed"}
                initial={shouldReduceMotion ? false : { opacity: 0, rotate: open ? -18 : 18 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: motionTokens.hover, ease: motionEasing.emphasized }}
                className="inline-flex"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerContent}
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
              className="mx-auto flex max-w-[var(--content-max)] flex-col px-4 py-4 sm:px-6"
            >
              {navigation.map((item) => {
                const isExternal = /^https?:\/\//.test(item.href);
                const href = isExternal ? item.href : withLocale(locale, item.href);
                const active = isExternal ? false : pathname === href || (item.href !== "/" && pathname?.startsWith(href));

                return (
                  <motion.div
                    key={item.key}
                    variants={{
                      hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: motionTokens.enterFast, ease: motionEasing.emphasized },
                      },
                    }}
                  >
                    <Link
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      style={item.key === "project" ? { color: "#f04034" } : undefined}
                      className={cn(
                        "block border-b border-neutral-100 py-4 text-[13px] font-semibold tracking-[0.08em] text-[var(--page-ink)] uppercase motion-link hover:text-neutral-500",
                        item.key === "project" && "text-[#f04034]",
                        active && "text-[#ce3f36]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
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
