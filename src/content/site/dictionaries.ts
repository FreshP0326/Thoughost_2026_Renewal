import type { Dictionary, Locale } from "@/types/site";

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    localeLabel: "EN",
    home: {
      news: "NEWS",
      releases: "RELEASES",
      more: "MORE",
      learnMore: "Learn more",
    },
    nav: {
      nextProject: "NEXT PROJECT",
      about: "ABOUT",
      discography: "DISCOGRAPHY",
      contact: "CONTACT",
      thoughts: "THOUGHTS",
    },
    footer: {
      email: "EMAIL",
      followUs: "FOLLOW US",
      blackHole: "BLACK HOLE",
      quote: '"Finding creative sounds is our purpose."',
    },
    pages: {
      aboutHeading: "About",
      discographyHeading: "Discography",
      projectHeading: "Project",
      thoughtsHeading: "Thoughts",
    },
    about: {
      aboutIntroHeading: "About",
      membersHeading: "MEMBERS",
      staffHeading: "STAFF",
      viewProfile: "View profile",
      representativeWorks: "Representative Works",
      links: "Links",
      close: "Close",
      memberNotFound: "This member profile is not available.",
    },
  },
  zh: {
    localeLabel: "中",
    home: {
      news: "新闻",
      releases: "发行作品",
      more: "更多",
      learnMore: "了解更多",
    },
    nav: {
      nextProject: "下个项目",
      about: "关于",
      discography: "作品",
      contact: "联系",
      thoughts: "思绪",
    },
    footer: {
      email: "邮箱",
      followUs: "关注我们",
      blackHole: "BLACK HOLE",
      quote: "“寻找具有创造力的声音，是我们的目的。”",
    },
    pages: {
      aboutHeading: "关于",
      discographyHeading: "作品目录",
      projectHeading: "项目",
      thoughtsHeading: "思绪",
    },
    about: {
      aboutIntroHeading: "关于",
      membersHeading: "MEMBERS",
      staffHeading: "STAFF",
      viewProfile: "查看详情",
      representativeWorks: "代表作品",
      links: "链接",
      close: "关闭",
      memberNotFound: "未找到对应成员资料。",
    },
  },
  jp: {
    localeLabel: "日",
    home: {
      news: "NEWS",
      releases: "RELEASES",
      more: "MORE",
      learnMore: "Learn more",
    },
    nav: {
      nextProject: "NEXT PROJECT",
      about: "ABOUT",
      discography: "DISCOGRAPHY",
      contact: "CONTACT",
      thoughts: "THOUGHTS",
    },
    footer: {
      email: "EMAIL",
      followUs: "FOLLOW US",
      blackHole: "BLACK HOLE",
      quote: "「創造的なサウンドを見つけること、それが私たちの目的です。」",
    },
    pages: {
      aboutHeading: "About",
      discographyHeading: "Discography",
      projectHeading: "Project",
      thoughtsHeading: "Thoughts",
    },
    about: {
      aboutIntroHeading: "About",
      membersHeading: "MEMBERS",
      staffHeading: "STAFF",
      viewProfile: "プロフィールを見る",
      representativeWorks: "Representative Works",
      links: "Links",
      close: "Close",
      memberNotFound: "このメンバープロフィールは利用できません。",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}
