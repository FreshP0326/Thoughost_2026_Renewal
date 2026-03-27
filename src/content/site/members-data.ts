import type { LocalizedText, MemberGroupKey } from "@/types/site";

type MemberContentEntry = {
  slug: string;
  name: LocalizedText;
  role: LocalizedText;
  group: MemberGroupKey;
  image: string;
  bio?: LocalizedText;
  representativeTracks: Array<{
    releaseSlug: string;
    trackNumbers: string[];
  }>;
  links: { label: string; url: string }[];
};

export const aboutIntro = {
  title: {
    en: "ABOUT",
    zh: "关于",
    jp: "ABOUT",
  } satisfies LocalizedText,
  body: {
    en: "Thoughost is a doujin circle from China. We want to find creative sounds in the whole world.",
    zh: "Thoughost 是一个来自中国的同人社团。我们希望在世界各地找到具有创造力的声音。",
    jp: "Thoughost は中国発の同人サークルです。世界中から創造的なサウンドを見つけたいと考えています。",
  } satisfies LocalizedText,
} as const;

export const members: MemberContentEntry[] = [
  {
    slug: "kitsune",
    name: {
      en: "潮音きつね",
      zh: "潮音きつね",
      jp: "潮音きつね",
    },
    role: {
      en: "ARTIST",
      zh: "艺术家",
      jp: "ARTIST",
    },
    group: "members",
    image: "/images/artists/kitsune.jpg",
    bio: {
      en: `潮音きつね aka HERkomachi aka 黒猫です！\n\n主にtechnoなどの四つ打ち系を作っています。時々他のジャンル(ブレイクコアとか電波ソングとか)も試しています。最近はハードウェアシンセに熱中しています。\n\nななひらForever．．．`,
      zh: `潮音きつね aka HERkomachi aka 黒猫です！\n\n主にtechnoなどの四つ打ち系を作っています。時々他のジャンル(ブレイクコアとか電波ソングとか)も試しています。最近はハードウェアシンセに熱中しています。\n\nななひらForever．．．`,
      jp: `潮音きつね aka HERkomachi aka 黒猫です！\n\n主にtechnoなどの四つ打ち系を作っています。時々他のジャンル(ブレイクコアとか電波ソングとか)も試しています。最近はハードウェアシンセに熱中しています。\n\nななひらForever．．．`,
    },
    representativeTracks: [
      { releaseSlug: "thoughts", trackNumbers: ["03"] },
      { releaseSlug: "kakusatsu-shoujo-3", trackNumbers: ["07"] },
      { releaseSlug: "kakusatsu-shoujo", trackNumbers: ["01"] },
    ],
    links: [
      { label: "Twitter", url: "https://twitter.com/xo_kuroneko" },
      { label: "SoundCloud", url: "https://soundcloud.com/krnk-xo" },
      { label: "YouTube", url: "https://www.youtube.com/@xo_kuroneko" },
    ],
  },
  {
    slug: "konseki-takane",
    name: {
      en: "Konseki Takane",
      zh: "Konseki Takane",
      jp: "Konseki Takane",
    },
    role: {
      en: "DESIGNER",
      zh: "设计",
      jp: "DESIGNER",
    },
    group: "members",
    image: "/images/artists/konseki.jpg",
    bio: {
      en: `Graphic Designer. Responsible for most of the visual design and also set the main visual direction for each album. Occasionally as a DJ.\n\nFounded "DOUJiN LiFE'S CAFE", an organization for fans of doujin music, in order to promote doujin music in China.\n\n"The most beautiful thing in the world is a girl with beast ears wearing white stockings."`,
      zh: `Graphic Designer. Responsible for most of the visual design and also set the main visual direction for each album. Occasionally as a DJ.\n\nFounded "DOUJiN LiFE'S CAFE", an organization for fans of doujin music, in order to promote doujin music in China.\n\n"The most beautiful thing in the world is a girl with beast ears wearing white stockings."`,
      jp: `Graphic Designer. Responsible for most of the visual design and also set the main visual direction for each album. Occasionally as a DJ.\n\nFounded "DOUJiN LiFE'S CAFE", an organization for fans of doujin music, in order to promote doujin music in China.\n\n"The most beautiful thing in the world is a girl with beast ears wearing white stockings."`,
    },
    representativeTracks: [],
    links: [
      { label: "Twitter", url: "https://twitter.com/Konseki_Takane" },
      { label: "Bilibili", url: "https://space.bilibili.com/32101676" },
    ],
  },
  {
    slug: "mashiro",
    name: {
      en: "望月真白",
      zh: "望月真白",
      jp: "望月真白",
    },
    role: {
      en: "DJ&ARTIST",
      zh: "DJ / 艺术家",
      jp: "DJ&ARTIST",
    },
    group: "members",
    image: "/images/artists/mashiro.jpg",
    bio: {
      en: `Aka DJ MASHIRO (2), a DJ who loves Drummin’, Experimental sound.\n\nStarted music career w’ Doujin music, now show an interest in Denpa (galgame lol) culture.\n\nAlso works for GNG, a group about party night organization, digital magazine, radio sessions.`,
      zh: `Aka DJ MASHIRO (2), a DJ who loves Drummin’, Experimental sound.\n\nStarted music career w’ Doujin music, now show an interest in Denpa (galgame lol) culture.\n\nAlso works for GNG, a group about party night organization, digital magazine, radio sessions.`,
      jp: `Aka DJ MASHIRO (2), a DJ who loves Drummin’, Experimental sound.\n\nStarted music career w’ Doujin music, now show an interest in Denpa (galgame lol) culture.\n\nAlso works for GNG, a group about party night organization, digital magazine, radio sessions.`,
    },
    representativeTracks: [
      { releaseSlug: "s-l-v-t-mixture", trackNumbers: ["04", "05", "08"] },
      { releaseSlug: "kakusatsu-shoujo-3", trackNumbers: ["01", "09"] },
      { releaseSlug: "perpetual-status", trackNumbers: ["01"] },
      { releaseSlug: "depressive-emotional-compilation", trackNumbers: ["01"] },
    ],
    links: [{ label: "Twitter", url: "https://twitter.com/Dazzletek_" }],
  },
  {
    slug: "nirotiy",
    name: {
      en: "Nirotiy",
      zh: "Nirotiy",
      jp: "Nirotiy",
    },
    role: {
      en: "ARTIST",
      zh: "艺术家",
      jp: "ARTIST",
    },
    group: "members",
    image: "/images/artists/nirotiy.jpg",
    bio: {
      en: `Electronic Music Producer focused on HDM, Drum'n'Bass, and more.\n\nStarted production back from 2019 with my phone.\n\nPursue to convey emotions directly from myself or other people around me.\n\n"Something I claim myself to be."`,
      zh: `Electronic Music Producer focused on HDM, Drum'n'Bass, and more.\n\nStarted production back from 2019 with my phone.\n\nPursue to convey emotions directly from myself or other people around me.\n\n"Something I claim myself to be."`,
      jp: `Electronic Music Producer focused on HDM, Drum'n'Bass, and more.\n\nStarted production back from 2019 with my phone.\n\nPursue to convey emotions directly from myself or other people around me.\n\n"Something I claim myself to be."`,
    },
    representativeTracks: [
      { releaseSlug: "palette-of-clouds", trackNumbers: ["01", "03", "05"] },
      { releaseSlug: "series-planet-exploration-miranda", trackNumbers: ["01"] },
      { releaseSlug: "s-l-v-t-mixture", trackNumbers: ["01", "03", "06", "07", "10"] },
      { releaseSlug: "depressive-emotional-compilation", trackNumbers: ["13"] },
      { releaseSlug: "after-the-forerunner-e-p", trackNumbers: ["03"] },
      { releaseSlug: "thoughts", trackNumbers: ["08"] },
      { releaseSlug: "kakusatsu-shoujo", trackNumbers: ["03"] },
    ],
    links: [{ label: "Twitter", url: "https://twitter.com/nirotiy" }],
  },
  {
    slug: "laxeno57",
    name: {
      en: "Laxeno57",
      zh: "Laxeno57",
      jp: "Laxeno57",
    },
    role: {
      en: "ARTIST",
      zh: "艺术家",
      jp: "ARTIST",
    },
    group: "members",
    image: "/images/artists/laxeno57.jpg",
    bio: {
      en: `Hello, I'm Laxeno57.\n\nI'm interested in many styles of music, and I also produce a very wide variety of styles, some of which are extreme and far from each other, such as breakcore, rock and acoustic, and jazz, to name a few. I hope that my work will bring you images and aesthetics.`,
      zh: `Hello, I'm Laxeno57.\n\nI'm interested in many styles of music, and I also produce a very wide variety of styles, some of which are extreme and far from each other, such as breakcore, rock and acoustic, and jazz, to name a few. I hope that my work will bring you images and aesthetics.`,
      jp: `Hello, I'm Laxeno57.\n\nI'm interested in many styles of music, and I also produce a very wide variety of styles, some of which are extreme and far from each other, such as breakcore, rock and acoustic, and jazz, to name a few. I hope that my work will bring you images and aesthetics.`,
    },
    representativeTracks: [
      { releaseSlug: "after-the-forerunner-e-p", trackNumbers: ["02"] },
      { releaseSlug: "depressive-emotional-compilation", trackNumbers: ["20"] },
    ],
    links: [{ label: "Twitter", url: "https://twitter.com/Laxeno57" }],
  },
  {
    slug: "joulez",
    name: {
      en: "Joulez",
      zh: "Joulez",
      jp: "Joulez",
    },
    role: {
      en: "ARTIST&MASTERING",
      zh: "艺术家 / 母带",
      jp: "ARTIST&MASTERING",
    },
    group: "members",
    image: "/images/artists/joulez.jpg",
    bio: {
      en: `Hi there, this is Joulez.\n\nI'm currently the mastering engineer for Thoughost, and a producer of hardcore and other music here. I like Cities Skyline and eating good food. I believe in souls and spirits.\n\nYou might not be pronoucing my name right, but thats fine. Neither do I. May the spirit of health and fortune be with you.`,
      zh: `Hi there, this is Joulez.\n\nI'm currently the mastering engineer for Thoughost, and a producer of hardcore and other music here. I like Cities Skyline and eating good food. I believe in souls and spirits.\n\nYou might not be pronoucing my name right, but thats fine. Neither do I. May the spirit of health and fortune be with you.`,
      jp: `Hi there, this is Joulez.\n\nI'm currently the mastering engineer for Thoughost, and a producer of hardcore and other music here. I like Cities Skyline and eating good food. I believe in souls and spirits.\n\nYou might not be pronoucing my name right, but thats fine. Neither do I. May the spirit of health and fortune be with you.`,
    },
    representativeTracks: [
      { releaseSlug: "haru-no-shuen", trackNumbers: ["01"] },
      { releaseSlug: "asteria", trackNumbers: ["01", "02", "03", "04", "05", "06", "07", "08"] },
      { releaseSlug: "16-48", trackNumbers: ["01", "02", "09", "12"] },
      { releaseSlug: "depressive-emotional-compilation", trackNumbers: ["02", "18"] },
      { releaseSlug: "after-the-forerunner-e-p", trackNumbers: ["01"] },
      { releaseSlug: "thoughts", trackNumbers: ["02"] },
    ],
    links: [{ label: "Twitter", url: "https://twitter.com/JavelinMaxx" }],
  },
  {
    slug: "wheatfox",
    name: {
      en: "wheatfox",
      zh: "wheatfox",
      jp: "wheatfox",
    },
    role: {
      en: "ARTIST",
      zh: "艺术家",
      jp: "ARTIST",
    },
    group: "members",
    image: "/images/artists/wheatfox.jpg",
    bio: {
      en: `This is wheatfox, an electronic music producer.\n\nI mainly focus on genres of drum & bass, liquid funk, and jazz hip hop. also interested in game music scoring, garage music stuff, and hardware synthesizer design.\n\n"It's funny how the music put times in perspective Add a soundtrack to your life and perfect it"`,
      zh: `This is wheatfox, an electronic music producer.\n\nI mainly focus on genres of drum & bass, liquid funk, and jazz hip hop. also interested in game music scoring, garage music stuff, and hardware synthesizer design.\n\n"It's funny how the music put times in perspective Add a soundtrack to your life and perfect it"`,
      jp: `This is wheatfox, an electronic music producer.\n\nI mainly focus on genres of drum & bass, liquid funk, and jazz hip hop. also interested in game music scoring, garage music stuff, and hardware synthesizer design.\n\n"It's funny how the music put times in perspective Add a soundtrack to your life and perfect it"`,
    },
    representativeTracks: [
      { releaseSlug: "asteria", trackNumbers: ["06"] },
      { releaseSlug: "thoughts", trackNumbers: ["07"] },
      { releaseSlug: "depressive-emotional-compilation", trackNumbers: ["15"] },
    ],
    links: [
      { label: "Twitter", url: "https://twitter.com/wheat_fox" },
      { label: "Bilibili", url: "https://space.bilibili.com/305084932" },
    ],
  },
  {
    slug: "rmdyh",
    name: {
      en: "rmdyh",
      zh: "rmdyh",
      jp: "rmdyh",
    },
    role: {
      en: "WEB",
      zh: "网站",
      jp: "WEB",
    },
    group: "staff",
    image: "/images/artists/rmdyh.jpg",
    bio: {
      en: `This is rmdyh, with some understanding of web development. At Thoughost, I am responsible for building the homepage website.\n\nI like Galgames, rhythm games, and Touhou Project. I also play lots of games on my mobile, but I can hardly persist in playing one game every day for more than six months.\n\n"WELCOME TO OSU!"`,
      zh: `This is rmdyh, with some understanding of web development. At Thoughost, I am responsible for building the homepage website.\n\nI like Galgames, rhythm games, and Touhou Project. I also play lots of games on my mobile, but I can hardly persist in playing one game every day for more than six months.\n\n"WELCOME TO OSU!"`,
      jp: `This is rmdyh, with some understanding of web development. At Thoughost, I am responsible for building the homepage website.\n\nI like Galgames, rhythm games, and Touhou Project. I also play lots of games on my mobile, but I can hardly persist in playing one game every day for more than six months.\n\n"WELCOME TO OSU!"`,
    },
    representativeTracks: [],
    links: [{ label: "Github", url: "https://github.com/rmdyh" }],
  },
  {
    slug: "erua",
    name: {
      en: "Erua",
      zh: "Erua",
      jp: "Erua",
    },
    role: {
      en: "STAFF",
      zh: "工作人员",
      jp: "STAFF",
    },
    group: "staff",
    image: "/images/artists/erua.jpg",
    bio: {
      en: `Hi, Erua. here\n\nWorking hard in counter and support thoughost’s accounting.\n\nI often play MUG and SLG in my free time, or just lay down and space out, and I love varieties of music style that is hard to say which is my favorite.\n\nCan not live without soda water.\n\nAnime grils with sidetail is justice!`,
      zh: `Hi, Erua. here\n\nWorking hard in counter and support thoughost’s accounting.\n\nI often play MUG and SLG in my free time, or just lay down and space out, and I love varieties of music style that is hard to say which is my favorite.\n\nCan not live without soda water.\n\nAnime grils with sidetail is justice!`,
      jp: `Hi, Erua. here\n\nWorking hard in counter and support thoughost’s accounting.\n\nI often play MUG and SLG in my free time, or just lay down and space out, and I love varieties of music style that is hard to say which is my favorite.\n\nCan not live without soda water.\n\nAnime grils with sidetail is justice!`,
    },
    representativeTracks: [],
    links: [],
  },
];
