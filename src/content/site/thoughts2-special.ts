import type { Locale, LocalizedText } from "@/types/site";

export const thoughts2ReleaseSlug = "thoughts-2";

export const thoughts2Editions = ["1", "2", "3", "4", "5"] as const;
export const featuredThoughts2Edition = "3" as const;
const visibleThoughts2Editions = [featuredThoughts2Edition] as const;

export type Thoughts2Edition = (typeof thoughts2Editions)[number];

type LocalizedParagraphs = {
  en: string[];
  zh: string[];
  ja: string[];
};

type LocalizedMetaEntry = {
  label: LocalizedText;
  value: LocalizedText;
};

type Thoughts2Material = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
};

type Thoughts2EditionConfig = {
  label: LocalizedText;
  shortTitle: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
};

type Thoughts2PageTwoButton = {
  label: LocalizedText;
  href?: string;
  kind: "bandcamp" | "mail-order" | "detail";
};

type Thoughts2PageTwoStaffRow = {
  label: LocalizedText;
  value: LocalizedText;
};

const sharedTagline = {
  en: "Discover our own sound.",
  zh: "Discover our own sound.",
  ja: "Discover our own sound.",
} satisfies LocalizedText;

const sharedIntro = {
  en: "thoughts 2 keeps the series moving inward, across fourteen tracks full of hesitation, afterimages, and dissolving code.",
  zh: "《thoughts 2》把这个系列继续往内侧推进，14 首曲目沿着迟疑、残像与逐渐溶解的代码缓慢移动。",
  ja: "『thoughts 2』はシリーズをさらに内側へ押し進め、ためらいと残像、ほどけていくコードを14曲の中で静かに巡らせます。",
} satisfies LocalizedText;

const sharedManifesto = {
  en: [
    "The packaging does not shout. It hesitates, keeps distance, and lets the image breathe. The page should follow that discipline instead of over-explaining the work.",
    "The figure, the circular traces, and the washed paper-green palette already define the emotional temperature. Online, the job is to extend that temperature into motion, sequence, and silence.",
    "Where purchase links or crossfade previews are not confirmed yet, the page should stay honest: mark them as coming soon and let the composition hold the space.",
  ],
  zh: [
    "这套包装并不大声。它迟疑、后退，给图像留下呼吸空间。网页也应该遵循这种克制，而不是用大量解释去盖住作品本身。",
    "人物、圆环轨迹与洗淡后的纸张雾绿，已经把整张专辑的温度定下来了。网页要做的，是把这种温度延长成运动、顺序与停顿。",
    "凡是尚未确认的购买链接或试听内容，都应该诚实地保持占位，而不是假装信息已经完整。",
  ],
  ja: [
    "このパッケージは大声で主張しません。ためらいながら距離を取り、絵そのものに呼吸を残しています。ページもその節度を守るべきです。",
    "人物、円環の痕跡、洗い流したようなペーパーグリーン。その三つで作品の温度はすでに決まっています。ウェブでは、その温度を動きと順序、そして余白へ引き延ばします。",
    "販売リンクや試聴素材がまだ確定していない部分は、無理に埋めず、Coming Soon として正直に置いておく前提です。",
  ],
} satisfies LocalizedParagraphs;

const echoProductionNotesTitle = {
  en: "Production Notes",
  zh: "制作历程",
  ja: "制作历程",
} satisfies LocalizedText;

const echoProductionNotes = {
  en: [
    "The idea for the thoughts series first appeared about two years ago. Our approach has always been a little unruly. For five years we mostly made whatever felt right in the moment. As time passed, though, we also wanted to share a sound that felt unmistakably our own.",
    'The way thoughts is built is a kind of reverse thinking. We first gathered the kinds of sounds each member wanted to realize, then discussed and refined them until the album theme and direction emerged. The advantage is that the music never has to be trapped by a preset concept, while the record still avoids drifting too far apart. In that sense, it really is a direct display of our "thoughts."',
    "Even so, because this is the first album in the series, a few parts still ended up feeling a little too much like theme assignments. That is something we plan to keep adjusting in the future.",
    'From here on, thoughts will be the series through which Thoughost directly delivers the sounds we imagine, in other words the Thoughost Compilation Series. That does not mean the chaos is over. If anything, we are getting ready to go even further.',
    'It felt natural for the first title to revolve around "rebirth." It points to Thoughost\'s next step, but also describes the overall emotional direction of the album. There is sadness in it, as if the world were covered in gray, yet somewhere inside it a small piece of light is still being held onto. It is not a literal image, but everyone interpreted that theme from a different angle.',
    "For more detailed notes from behind the making of the album, please continue to the individual statements below.",
    "Thank you for your support.",
  ],
  zh: [
    "thoughts 这个系列的想法大约在两年前开始浮现。 我们一直是比较胡来的创作思路，五年间，几乎是想到哪里就做到哪里。 但随着时间的推移，渐渐地也想分享给你属于我们自己的声音。",
    'thoughts 的创作逻辑是一种逆向思维。 先征集成员们想实现怎样的声音方向，汇总后经过讨论和细微的调整，得出专辑的主题和方向。 这样的好处在于可以不用被主题所限制，可以最大程度的发挥所思所想，专辑也不会过于发散。 可以说是真正的展现出我们的 "thoughts"。',
    "当然，作为首张专辑，还是不可避免地出现了一些过于命题作文的情况，在未来会逐渐调整。",
    '总之，thoughts 今后将作为 Thoughost "直接"传达给你们我们所构想声音的系列，也就是所谓的 Thoughost Compilation Series 。 当然，这不意味着 Thoughost 的胡来结束了，我们正准备更尽情的发疯。',
    '第一张顺理成章地将主题定为了 "rebirth"。 既象征这是 Thoughost 的下一步，也说明了本次整体的声音方向。 听起来有些忧伤，仿佛被灰色笼罩的世界，在这之中抓住了一丝光亮。 虽然是很不具象的画面，但大家都从不同的角度诠释了这一主题。',
    "更详细的创作幕后，请见下方各位的自我说明。",
    "感谢你们的支持。",
  ],
  ja: [
    "thoughts 这个系列的想法大约在两年前开始浮现。 我们一直是比较胡来的创作思路，五年间，几乎是想到哪里就做到哪里。 但随着时间的推移，渐渐地也想分享给你属于我们自己的声音。",
    'thoughts 的创作逻辑是一种逆向思维。 先征集成员们想实现怎样的声音方向，汇总后经过讨论和细微的调整，得出专辑的主题和方向。 这样的好处在于可以不用被主题所限制，可以最大程度的发挥所思所想，专辑也不会过于发散。 可以说是真正的展现出我们的 "thoughts"。',
    "当然，作为首张专辑，还是不可避免地出现了一些过于命题作文的情况，在未来会逐渐调整。",
    '总之，thoughts 今后将作为 Thoughost "直接"传达给你们我们所构想声音的系列，也就是所谓的 Thoughost Compilation Series 。 当然，这不意味着 Thoughost 的胡来结束了，我们正准备更尽情的发疯。',
    '第一张顺理成章地将主题定为了 "rebirth"。 既象征这是 Thoughost 的下一步，也说明了本次整体的声音方向。 听起来有些忧伤，仿佛被灰色笼罩的世界，在这之中抓住了一丝光亮。 虽然是很不具象的画面，但大家都从不同的角度诠释了这一主题。',
    "更详细的创作幕后，请见下方各位的自我说明。",
    "感谢你们的支持。",
  ],
} satisfies LocalizedParagraphs;

const sharedMeta: LocalizedMetaEntry[] = [
  {
    label: { en: "Release date", zh: "发行日期", ja: "発売日" },
    value: { en: "2026.04.26", zh: "2026.04.26", ja: "2026.04.26" },
  },
  {
    label: { en: "Event", zh: "活动", ja: "イベント" },
    value: {
      en: "M3-2026 Spring @ Tokyo Ryutsu Center (TRC)",
      zh: "M3-2026 春 @ 東京流通センター (TRC)",
      ja: "M3-2026春 @ 東京流通センター (TRC)",
    },
  },
  {
    label: { en: "Booth", zh: "摊位", ja: "スペース" },
    value: { en: "コ-28b / First Exhibition Hall", zh: "コ-28b / 第一展示场", ja: "コ-28b / 第一展示場" },
  },
  {
    label: { en: "Specification", zh: "规格", ja: "仕様" },
    value: { en: "Pressed CD, 14 tracks", zh: "14 曲 Press CD", ja: "14曲入りプレスCD" },
  },
  {
    label: { en: "Price", zh: "价格", ja: "価格" },
    value: {
      en: "Venue ¥1,500 / Mail order ¥1,980",
      zh: "场贩 ¥1,500 / 通贩 ¥1,980",
      ja: "会場 ¥1,500 / 通販 ¥1,980",
    },
  },
  {
    label: { en: "Mastering", zh: "母带", ja: "マスタリング" },
    value: { en: "Joulez", zh: "Joulez", ja: "Joulez" },
  },
  {
    label: { en: "Illustration", zh: "插画", ja: "イラスト" },
    value: { en: "TARA#376", zh: "TARA#376", ja: "TARA#376" },
  },
  {
    label: { en: "Design", zh: "设计", ja: "デザイン" },
    value: { en: "Konseki Takane", zh: "Konseki Takane", ja: "Konseki Takane" },
  },
];

const materials: Thoughts2Material[] = [
  {
    key: "cover",
    src: "/images/special/thoughts-2/cover.png",
    width: 1072,
    height: 1072,
    alt: { en: "thoughts 2 cover artwork", zh: "thoughts 2 封面", ja: "thoughts 2 ジャケット" },
    caption: { en: "Cover art", zh: "封面", ja: "ジャケット" },
  },
  {
    key: "obi",
    src: "/images/special/thoughts-2/obi.png",
    width: 396,
    height: 1072,
    alt: { en: "thoughts 2 obi strip", zh: "thoughts 2 侧封", ja: "thoughts 2 帯" },
    caption: { en: "Obi / spine", zh: "侧封 / spine", ja: "帯 / spine" },
  },
  {
    key: "credits",
    src: "/images/special/thoughts-2/booklet-credits.png",
    width: 1072,
    height: 1072,
    alt: { en: "thoughts 2 booklet credits page", zh: "thoughts 2 内页 staff 页", ja: "thoughts 2 ブックレットクレジット面" },
    caption: { en: "Booklet credits", zh: "内页 / staff", ja: "ブックレット / credit" },
  },
  {
    key: "back-cover",
    src: "/images/special/thoughts-2/back-cover.png",
    width: 1327,
    height: 1055,
    alt: { en: "thoughts 2 back cover with tracklist", zh: "thoughts 2 背卡与曲目页", ja: "thoughts 2 バックインレイ" },
    caption: { en: "Back cover / full tracklist", zh: "背卡 / 完整曲目", ja: "バックインレイ / tracklist" },
  },
  {
    key: "rings",
    src: "/images/special/thoughts-2/rings.png",
    width: 1327,
    height: 1055,
    alt: { en: "thoughts 2 inner rings artwork", zh: "thoughts 2 圆环内页", ja: "thoughts 2 リングページ" },
    caption: { en: "Inner rings", zh: "圆环内页", ja: "リング面" },
  },
  {
    key: "disc",
    src: "/images/special/thoughts-2/disc.png",
    width: 1021,
    height: 1021,
    alt: { en: "thoughts 2 disc print", zh: "thoughts 2 CD 盘面", ja: "thoughts 2 CD盤面" },
    caption: { en: "Disc print", zh: "CD 盘面", ja: "CD盤面" },
  },
];

const editionConfigs: Record<Thoughts2Edition, Thoughts2EditionConfig> = {
  1: {
    label: { en: "Edition I", zh: "版本 一", ja: "Edition I" },
    shortTitle: { en: "Poster", zh: "海报版", ja: "ポスター版" },
    summary: {
      en: "Lead with the cover and treat the first viewport like a printed poster.",
      zh: "把封面推到最前面，让首屏像一张印刷海报。",
      ja: "ジャケットを正面に据え、ファーストビューを一枚のポスターとして扱う版。",
    },
    description: {
      en: "Cover-led composition, vertical title, and a restrained release rail.",
      zh: "封面主导、纵排标题、克制的信息轨。",
      ja: "カバー主導、縦組みタイトル、抑えた情報レール。",
    },
  },
  2: {
    label: { en: "Edition II", zh: "版本 二", ja: "Edition II" },
    shortTitle: { en: "Spine", zh: "侧封版", ja: "スパイン版" },
    summary: {
      en: "Build the page out of spine logic, labels, and narrow typesetting rhythms.",
      zh: "用侧封逻辑、标签和窄幅排版来组织整页。",
      ja: "帯やスパインの文法をそのままページ全体へ拡張する版。",
    },
    description: {
      en: "Editorial rails, typographic spacing, and release data as composition.",
      zh: "把排版间距和发行信息本身当作构图主体。",
      ja: "タイポグラフィと発行情報そのものを構図化する。",
    },
  },
  3: {
    label: { en: "Edition III", zh: "版本 三", ja: "Edition III" },
    shortTitle: { en: "Echo", zh: "回声版", ja: "エコー版" },
    summary: {
      en: "Make the tracklist the loudest object, surrounded by fading rings and residue.",
      zh: "把曲目列表抬成主角，让它被残响与圆环包围。",
      ja: "トラックリストを中心に置き、残響と円環で囲む版。",
    },
    description: {
      en: "Track-first, atmospheric, and slightly more submerged than the packaging itself.",
      zh: "曲目优先、氛围更深、更像沉入页面内部。",
      ja: "曲目主導で、パッケージよりさらに少し沈んだ空気感。",
    },
  },
  4: {
    label: { en: "Edition IV", zh: "版本 四", ja: "Edition IV" },
    shortTitle: { en: "Material", zh: "印刷版", ja: "マテリアル版" },
    summary: {
      en: "Treat the package as an online exhibition and let the printed surfaces carry the story.",
      zh: "把整套包装当成线上展陈，让纸面自己讲述作品。",
      ja: "パッケージ全体をオンライン展示のように見せる版。",
    },
    description: {
      en: "Large printed surfaces, crop studies, and quiet captions.",
      zh: "大幅印刷面、局部研究与安静的注记。",
      ja: "大きな紙面、クロップの観察、静かなキャプション。",
    },
  },
  5: {
    label: { en: "Edition V", zh: "版本 五", ja: "Edition V" },
    shortTitle: { en: "Ring", zh: "圆环版", ja: "リング版" },
    summary: {
      en: "Let the concentric motif drift through the whole page and pull the reader through it.",
      zh: "让同心圆母题贯穿整页，把阅读视线一层层往里拉。",
      ja: "同心円のモチーフをページ全体に流し込み、視線を内側へ引き込む版。",
    },
    description: {
      en: "Concentric rhythm, disc imagery, and a more experimental final movement.",
      zh: "更强调盘面、圆环节奏与实验性的收束方式。",
      ja: "盤面と円環のリズムを強く押し出した実験寄りの終盤構成。",
    },
  },
};

const pageTwoContent = {
  overviewIntro: {
    en: "A Tokusetsu-style reading of thoughts 2: cover first, then release facts, then the package opened out as one linear announcement page.",
    zh: "以 Tokusetsu 风格重新诠释《thoughts 2》：先给封面，再给发行概览，再把整套包装按单页告知站的方式展开。",
    ja: "『thoughts 2』を Tokusetsu 的な単ページ告知サイトとして再構成した版。まずジャケット、次に概要、その後にパッケージ全体を順に開いていきます。",
  } satisfies LocalizedText,
  aboutParagraphs: {
    en: [
      "thoughts 2 is the second chapter in the series, moving away from a loud statement and toward a slower, inward pressure.",
      "The package language is built from washed paper-green, circular traces, a suspended figure, and a lot of white space. Page 2 keeps those ingredients, but organizes them like a classic release announcement page.",
      "Streaming previews and final mail-order links are still pending. Instead of hiding that, the page keeps a complete structure and marks unfinished release logistics honestly.",
    ],
    zh: [
      "《thoughts 2》是这个系列的第二章。它不再试图高声宣告，而是把重心移向更缓慢、更内向的压力。",
      "这套包装的语言由洗淡后的纸张雾绿、圆环痕迹、悬置的人物姿态与大量留白构成。页面 2 保留这些元素，但把它们整理成更经典的单页特设告知页。",
      "试听与最终通贩链接仍在准备中。这里不会回避这一点，而是保留完整段落结构，并诚实标注尚未完成的发行信息。",
    ],
    ja: [
      "『thoughts 2』はシリーズの第2章であり、大きな宣言よりも、ゆっくりと内側へ沈む圧力を選んだ作品です。",
      "パッケージは洗い流したようなペーパーグリーン、円環の痕跡、宙に浮いた人物像、そして大量の余白でできています。page 2 ではそれらを保ったまま、よりクラシックな告知ページの流れに並べ替えます。",
      "試聴と最終的な通販リンクはまだ準備中です。このページではそれを隠さず、完成した構造の中に未確定要素を正直に残します。",
    ],
  } satisfies LocalizedParagraphs,
  storeCtas: [
    {
      label: {
        en: "Bandcamp (Soon)",
        zh: "Bandcamp（准备中）",
        ja: "Bandcamp（準備中）",
      },
      kind: "bandcamp",
    },
    {
      label: {
        en: "Mail Order (Soon)",
        zh: "通贩（准备中）",
        ja: "通販（準備中）",
      },
      kind: "mail-order",
    },
    {
      label: {
        en: "Release Detail",
        zh: "发行详情",
        ja: "リリース詳細",
      },
      href: "/releases/thoughts-2",
      kind: "detail",
    },
  ] satisfies Thoughts2PageTwoButton[],
  shareLabels: {
    x: {
      en: "Share on X",
      zh: "分享到 X",
      ja: "X で共有",
    },
    copy: {
      en: "Copy Link",
      zh: "复制链接",
      ja: "リンクをコピー",
    },
    copied: {
      en: "Copied",
      zh: "已复制",
      ja: "コピー済み",
    },
  } satisfies Record<"x" | "copy" | "copied", LocalizedText>,
  staffRows: [
    {
      label: { en: "Mastering", zh: "母带", ja: "Mastering" },
      value: { en: "Joulez", zh: "Joulez", ja: "Joulez" },
    },
    {
      label: { en: "Illustration", zh: "插画", ja: "Illustration" },
      value: { en: "TARA#376", zh: "TARA#376", ja: "TARA#376" },
    },
    {
      label: { en: "Design", zh: "设计", ja: "Design" },
      value: { en: "Konseki Takane", zh: "Konseki Takane", ja: "Konseki Takane" },
    },
  ] satisfies Thoughts2PageTwoStaffRow[],
};

function pickText(locale: Locale, value: LocalizedText) {
  return value[locale];
}

function pickParagraphs(locale: Locale, value: LocalizedParagraphs) {
  return value[locale];
}

export function isThoughts2Edition(value: string): value is Thoughts2Edition {
  return thoughts2Editions.includes(value as Thoughts2Edition);
}

export function getThoughts2EditionHref(edition: Thoughts2Edition) {
  return `/special/thoughts-2/${edition}`;
}

export function getThoughts2Special(locale: Locale, edition: Thoughts2Edition) {
  return {
    edition,
    releaseSlug: thoughts2ReleaseSlug,
    title: "thoughts 2",
    tagline: pickText(locale, sharedTagline),
    intro: pickText(locale, sharedIntro),
    manifesto: pickParagraphs(locale, sharedManifesto),
    meta: sharedMeta.map((item) => ({
      label: pickText(locale, item.label),
      value: pickText(locale, item.value),
    })),
    materials: materials.map((item) => ({
      ...item,
      alt: pickText(locale, item.alt),
      caption: pickText(locale, item.caption),
    })),
    editions: visibleThoughts2Editions.map((item) => ({
      key: item,
      href: getThoughts2EditionHref(item),
      label: pickText(locale, editionConfigs[item].label),
      shortTitle: pickText(locale, editionConfigs[item].shortTitle),
      summary: pickText(locale, editionConfigs[item].summary),
      description: pickText(locale, editionConfigs[item].description),
    })),
    currentEdition: {
      key: edition,
      label: pickText(locale, editionConfigs[edition].label),
      shortTitle: pickText(locale, editionConfigs[edition].shortTitle),
      summary: pickText(locale, editionConfigs[edition].summary),
      description: pickText(locale, editionConfigs[edition].description),
    },
    placeholders: {
      streaming:
        locale === "zh" ? "试听公开后更新" : locale === "ja" ? "試聴は公開後に更新" : "Streaming preview will be added after announcement",
      mailOrder:
        locale === "zh" ? "通贩链接准备中" : locale === "ja" ? "通販リンク準備中" : "Mail-order link is being prepared",
    },
    pageTwo: {
      overviewIntro: pickText(locale, pageTwoContent.overviewIntro),
      aboutParagraphs: pickParagraphs(locale, pageTwoContent.aboutParagraphs),
      storeCtas: pageTwoContent.storeCtas.map((item) => ({
        label: pickText(locale, item.label),
        href: item.href,
        kind: item.kind,
      })),
      shareLabels: {
        x: pickText(locale, pageTwoContent.shareLabels.x),
        copy: pickText(locale, pageTwoContent.shareLabels.copy),
        copied: pickText(locale, pageTwoContent.shareLabels.copied),
      },
      staffRows: pageTwoContent.staffRows.map((item) => ({
        label: pickText(locale, item.label),
        value: pickText(locale, item.value),
      })),
    },
    echoProductionNotes: {
      title: pickText(locale, echoProductionNotesTitle),
      paragraphs: pickParagraphs(locale, echoProductionNotes),
    },
    labels: {
      editionSwitcher: locale === "zh" ? "版本切换" : locale === "ja" ? "エディション切替" : "Edition switcher",
      overview: "Release Info",
      about: "About",
      gallery: "Gallery",
      manifesto: "Series Notes",
      materials: "Printed Matter",
      tracks: "Track Index",
      tracklist: "Tracklist",
      contributors: "Contributors",
      staff: "Staff",
      releaseDetail: locale === "zh" ? "发行详情页" : locale === "ja" ? "リリース詳細" : "Release detail",
      versionStatement: locale === "zh" ? "当前版本" : locale === "ja" ? "Current edition" : "Current edition",
      availability: "Availability",
      specialEditions: locale === "zh" ? "Five interpretations" : locale === "ja" ? "Five interpretations" : "Five interpretations",
    },
  };
}
