import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SocialLinks } from "@/components/site/social-links";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { FooterGroup, Locale, SocialIconLink } from "@/types/site";

export function SiteFooter({
  locale,
  groups,
  socialLinks,
  contactEmail,
  contactLabel,
  followUsLabel,
  quote,
  copyrightText,
  alignToHero = false,
}: {
  locale: Locale;
  groups: FooterGroup[];
  socialLinks: SocialIconLink[];
  contactEmail: string;
  contactLabel: string;
  followUsLabel: string;
  quote: string;
  copyrightText: string;
  alignToHero?: boolean;
}) {
  void alignToHero;

  return (
    <footer id="contact" className="bg-[#101010] text-white">
      <div className="site-nav-frame px-0 pt-[46px] pb-[20px]">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.9fr_1.05fr]">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-x-14 gap-y-6">
              {groups.map((group, index) => (
                <div key={`${group.title ?? "links"}-${index}`} className="space-y-3">
                  {group.title ? (
                    <p className="type-meta text-neutral-400">{group.title}</p>
                  ) : null}
                  <div className="space-y-2">
                    {group.links.map((item) => (
                      <Link
                        key={item.key}
                        href={withLocale(locale, item.href)}
                        className="motion-link block text-[14px] leading-[1.35] font-medium tracking-[0em] text-white hover:text-neutral-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Image
              src={withBasePathAsset("/thoughost-logo.svg")}
              alt="Thoughost"
              width={148}
              height={33}
              className="invert"
              style={{ width: "auto", height: "33px" }}
            />
          </div>
          <div className="hidden md:block" />
          <div className="space-y-4 md:justify-self-end">
            <div>
              <p className="type-meta text-neutral-400">{contactLabel}</p>
              <a href={`mailto:${contactEmail}`} className="motion-link mt-2 block text-[14px] leading-[1.35] font-medium text-neutral-200 hover:text-white">
                {contactEmail}
              </a>
            </div>
            <div>
              <p className="type-meta text-neutral-400">{followUsLabel}</p>
              <div className="mt-3">
                <SocialLinks links={socialLinks} dark />
              </div>
            </div>
          </div>
        </div>
        <FadeIn className="mt-[34px] pt-5 text-[11px] leading-[1.45] text-neutral-400" delay={0.08}>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p>{copyrightText}</p>
            <p>{quote}</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
