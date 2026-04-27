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

type Thoughts2EchoStatement = {
  name: string;
  role?: string;
  paragraphs: string[];
};

const sharedTagline = {
  en: "Discover our own sound.",
  zh: "Discover our own sound.",
  ja: "Discover our own sound.",
} satisfies LocalizedText;

const sharedIntro = {
  en: "「thoughts」から「thoughts 2」へ。シリーズがここから始まる。 今回のテーマは「hesitate」です。 14名のアーティストによる『思考』を、IDM / アンビエント / ブレイクビーツなど多彩なジャンルで形にしました。",
  zh: "「thoughts」から「thoughts 2」へ。シリーズがここから始まる。 今回のテーマは「hesitate」です。 14名のアーティストによる『思考』を、IDM / アンビエント / ブレイクビーツなど多彩なジャンルで形にしました。",
  ja: "「thoughts」から「thoughts 2」へ。シリーズがここから始まる。 今回のテーマは「hesitate」です。 14名のアーティストによる『思考』を、IDM / アンビエント / ブレイクビーツなど多彩なジャンルで形にしました。",
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
    "全新的想法，彷徨的终点。系列第二作——「thoughts 2」",
    '本次的主题是——"hesitate"',
    "之前也提到过，Thoughost的成员大多都是00年左右出生，现在已经走出了校园，在职场中打拼了一些时间。面对各种之前从未遇到过的压力，还有两点一线永远没有终点的生活，一边是理想、另一边是现实，各种各样的话题在无时无刻冲击着我们，\"迷茫\"是我们这个世代的共同话题，理所当然成为了第二作的主题。",
    "「thoughts」与「thoughts 2」是互为上下篇的关系，它们共同组成了这个系列的开篇。实际上我们从未赋予这个系列真正意义上的故事，只是捕捉到一些概念，由各位艺术家的作品逐渐具象化成现在的样子，就这样，这个世界模模糊糊地出现了。让我们没想到的是，2的处处都与1相呼应，在创作时并未着重朝这个方向推进，这令我们自己也意想不到，但话又说回来，也是这个系列迷人的部分。",
    "在「thoughts」发行后，我们开始思考，总觉得少了些什么，也许这样还不是系列真正完全态。所以我们再次调整了创作方向，结果每个人都顺利地向着想要探索的声音方向迈进了一步，把自己的想法融入了自己的作品中，非常顺利。可以说「thoughts 2」确定了这个系列是怎样的形状，每个人的创作都达到了自己的新高度，「thoughts 2」是我们现在的集大成之作。因此我们衷心地邀请您来听一听。",
    "最后，日语的宣传语是这样的：「thoughts」から「thoughts 2」へ。シリーズがここから始まる。",
    "这是一句双关，从 \"1\" 到 \"2\" 象征着系列化的确定，也象征着1和2一起组成了系列的开篇。",
  ],
  zh: [
    "全新的想法，彷徨的终点。系列第二作——「thoughts 2」",
    '本次的主题是——"hesitate"',
    "之前也提到过，Thoughost的成员大多都是00年左右出生，现在已经走出了校园，在职场中打拼了一些时间。面对各种之前从未遇到过的压力，还有两点一线永远没有终点的生活，一边是理想、另一边是现实，各种各样的话题在无时无刻冲击着我们，\"迷茫\"是我们这个世代的共同话题，理所当然成为了第二作的主题。",
    "「thoughts」与「thoughts 2」是互为上下篇的关系，它们共同组成了这个系列的开篇。实际上我们从未赋予这个系列真正意义上的故事，只是捕捉到一些概念，由各位艺术家的作品逐渐具象化成现在的样子，就这样，这个世界模模糊糊地出现了。让我们没想到的是，2的处处都与1相呼应，在创作时并未着重朝这个方向推进，这令我们自己也意想不到，但话又说回来，也是这个系列迷人的部分。",
    "在「thoughts」发行后，我们开始思考，总觉得少了些什么，也许这样还不是系列真正完全态。所以我们再次调整了创作方向，结果每个人都顺利地向着想要探索的声音方向迈进了一步，把自己的想法融入了自己的作品中，非常顺利。可以说「thoughts 2」确定了这个系列是怎样的形状，每个人的创作都达到了自己的新高度，「thoughts 2」是我们现在的集大成之作。因此我们衷心地邀请您来听一听。",
    "最后，日语的宣传语是这样的：「thoughts」から「thoughts 2」へ。シリーズがここから始まる。",
    "这是一句双关，从 \"1\" 到 \"2\" 象征着系列化的确定，也象征着1和2一起组成了系列的开篇。",
  ],
  ja: [
    "全新的想法，彷徨的终点。系列第二作——「thoughts 2」",
    '本次的主题是——"hesitate"',
    "之前也提到过，Thoughost的成员大多都是00年左右出生，现在已经走出了校园，在职场中打拼了一些时间。面对各种之前从未遇到过的压力，还有两点一线永远没有终点的生活，一边是理想、另一边是现实，各种各样的话题在无时无刻冲击着我们，\"迷茫\"是我们这个世代的共同话题，理所当然成为了第二作的主题。",
    "「thoughts」与「thoughts 2」是互为上下篇的关系，它们共同组成了这个系列的开篇。实际上我们从未赋予这个系列真正意义上的故事，只是捕捉到一些概念，由各位艺术家的作品逐渐具象化成现在的样子，就这样，这个世界模模糊糊地出现了。让我们没想到的是，2的处处都与1相呼应，在创作时并未着重朝这个方向推进，这令我们自己也意想不到，但话又说回来，也是这个系列迷人的部分。",
    "在「thoughts」发行后，我们开始思考，总觉得少了些什么，也许这样还不是系列真正完全态。所以我们再次调整了创作方向，结果每个人都顺利地向着想要探索的声音方向迈进了一步，把自己的想法融入了自己的作品中，非常顺利。可以说「thoughts 2」确定了这个系列是怎样的形状，每个人的创作都达到了自己的新高度，「thoughts 2」是我们现在的集大成之作。因此我们衷心地邀请您来听一听。",
    "最后，日语的宣传语是这样的：「thoughts」から「thoughts 2」へ。シリーズがここから始まる。",
    "这是一句双关，从 \"1\" 到 \"2\" 象征着系列化的确定，也象征着1和2一起组成了系列的开篇。",
  ],
} satisfies LocalizedParagraphs;

const echoStatements = [
  {
    name: "Konseki Takane",
    role: "Art Direction & Design",
    paragraphs: [
      "「thoughts」系列的艺术方向，在 1 中就和 TARA#376 一起确立好了，所以，「thoughts 2」要做的第一件事就是延续这样的方向，让它一眼就能看出系列的特征。",
      "本次 TARA#376 依然绘制了非常精彩的插画，在收到并确认后，确立了主题色和主要元素“水”。",
      "在绘画阶段时，我只是确定了使用哪一个版本的构图，剩下的全由 TARA#376 发挥。完成品意外地能对上 1 的画面，这就是之前提到的“在创作时并未着重朝这个方向推进，但成品却巧合地处处充满关联”。从这个意义上来说，「thoughts 2」真的是一张自然流淌出来的专辑。",
      "由于 TARA#376 的插画完成度已经非常高，我能做的就是尽可能匹配专辑整体的氛围，进行细节上的各种调整，让 TARA#376 的画作更加出彩。我依然坚持不使用夸张的设计元素，“平静又自然”始终是这个系列在专辑设计中追求的目标。",
      "在原本的画作中，背景出现了两个圆，TARA#376 说这是即兴画上去的，我临时起意改成了破碎的镜子，让画面整体看起来更接近世界观。",
      "收到实体盘的朋友们可以尝试把 2 的盘面倒过来，与 1 结合着看，也许能找到世界观的一些蛛丝马迹。",
      "最后，希望你们能喜欢。「thoughts 3」再见！",
    ],
  },
  {
    name: "nova+z",
    role: "landingfailure.orz",
    paragraphs: [
      "哎呀，我是 nova+z。不是 nova-z，也不是 nova*z，更不是 nova/z，是 nova+z。",
      "hesitate，刚拿到这个主题时，我完全没有任何“想法”。我习惯先框定一个曲风的范围再进行创作，此前通过公募的形式在 Thoughost 参与的两首曲目也是如此。有时过于自由会让我找不着北，所以迟迟没有动笔。",
      "总之就是因为这样那样的事，扭伤了膝盖，然后因为这样那样的事，搞得我很懊恼。哎，我有个主意，为什么不把这件事写进歌里呢？",
      "我把这段时间体会到的感受转换成抽象的语言，基于这个感觉开始创作。",
      "“想发力却踩空，想落地却漂浮。”",
      "并且，这是一种恶性循环，不细讲。如果有人能注意到 Intro 和 Outro 之间的某种联系就好了，呼呼。",
      "等腿差不多能动了，我就开始着手制作。其实全曲的 Drum+Bass+Perc 三者来自同一条轨道，因为我想试试能不能尽量缩减轨道数量，但是画 Automation 太地狱！这带来了很多限制，但有时限制不一定就是坏事。",
      "结果 Vocal 轨道数量爆炸了。也许我就不该有“随便录点什么”的想法，一旦开始了，我就想做完它。就是过程有点地狱。这是我第一次如此大量地录制自己的声音，音频编辑不太熟练，旋律也没想明白，想到哪就录到哪，和声就直接往里唱，对上了就 OK。",
      "和新年的鞭炮声斗智斗勇，你放我躲，你不放我录，怎么不算是一种 hesitate 呢（笑）。",
      "还有，没想到用上了去年散步时顺手做的 Field Recording，当时的路线也是从医院走回家，和曲子里要表达的一样，很巧。",
      "这是我第一次作为 Thoughost 的正式成员参与专辑，也是第一次这么完整地参与一张专辑的制作过程，更直观地感受到了制作背后的不易。",
      "原来被热爱驱动是这种感觉。相比 DTM 的时长，我的作品数量少得可怜，创作热情也早就被现生的事情消磨光了。kon 爷发给我的加入 Thoughost 的邀请，确实让我有了一些能打开 DAW 的勇气和动力。",
      "彷徨吗？那就让它彷徨着吧，谁能知道路的尽头是什么。不知道，我们才有了出发的理由。",
    ],
  },
  {
    name: "四度夜 靈",
    role: "間",
    paragraphs: [
      "時【間】",
      "空【間】",
      "難以填補的隙【間】。",
    ],
  },
  {
    name: "wheatfox",
    role: "Fluorescent",
    paragraphs: [
      "作为 6 p.m. 的精神续作，本曲将场景从城市入夜推进至朦胧深夜。灵感源于 Serani Poji 于 2002 年发行的专辑《ワンルームサバイバル》中的一首 UK Garage——《胸にアイタ穴》（空虚的内心）。",
      "《Fluorescent》则试图描绘浮华都市夜色下，内心空虚之人的意象。",
      "“流萤断续光，一明一灭一尺间……”",
      "——立花北枝《萤》",
    ],
  },
  {
    name: "Nirotiy",
    role: "DEPICT CODE",
    paragraphs: [
      "虽然这首歌参与到专辑当中，但在 thoughts 2 的企划开催之前我就已经想做这首歌了。当时我在 Youtube 上看到了 5 键时代的 beatmania 曲目以及古早 DDR 的采样来源的整理视频，挖到了不少自己喜欢的老歌(AM-3P, KEEP ON MOVIN', Look To The Sky, super highway)，其中就有启发了本曲的 area code.",
      "area code 全程都是同一个节奏型，用失真电吉他 solo 作为填充材料，加上一大堆精巧裁切的 vocal sample 和 atmos 之后成型。而其全长版本，area code 2011 更加偏向于氛围了；配合新的女声 vocal 之后，与原曲相比更加阴郁且氛围隽永；如果我按照这个方向走的话，会很符合这张专辑的基调——迷惘。",
      "但实际上在进入制作期间的时候，大部分曲目都是重氛围的类型；这让我为了专辑的流畅度考虑开始转往新的方向。我如何在保证氛围抒情部分不受影响的情况下让这首歌听起来更加躁动呢？此时，另一首歌给了我急需的灵感；Dissolved Girl。",
      "这首由 Trip-Hop 大师制作人组合 Massive Attack 出品的 Dissolved Girl 在保证氛围和女声吟唱的 Trip-Hop 为基底的同时，将声音取向更加工业化，然后在 Bridge 中让 Fuzz 电吉他同时作为氛围和内容的填充；搭配上经典的摇滚鼓组实现了我想做到的效果。",
      "于是，最后的想法就此成型了：以 BIG BEAT 为脊梁，辅以原声质感居多的打击乐组，致敬 area code 的节奏型以及人声采样的变化；最后再进入 Atmo 和女声吟唱的闭环。",
      "迷惘本身不应该只是一种状态，它也应该像悲痛一样有阶段可循。在看似无处可去的局面当中疯狂的尝试浑身解数尝试打破僵局无果之后，燃烧殆尽的自我质疑对我来说更符合陷入迷惘的定义。",
    ],
  },
  {
    name: "05",
    role: "stutter and dissolve",
    paragraphs: [
      "一转眼一年过去了~~~",
      "但是比起之前创作欲望下降了不少，现实里很多杂七杂八的事情比较烦恼。然后这次大家选出来的主题是——hesitate，说实话还是比较符合目前自己的状态的。",
      "选择了最熟悉也是最粗暴，切割叠加并打开 beat repeat random amenbreak 的方法来呈现它，不料成了整张合集里最狂暴的一首曲子。",
      "听完本次的曲子你可能觉得：这么狂？！所以就是依然保留一些虚无缥缈的合成器，其余部分即兴发狂，但是整体有一种统一感——这也是今后想要继续追求的东西。",
    ],
  },
] satisfies Thoughts2EchoStatement[];

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
    echoStatements,
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
      behindTheMusic: "Behind the Music",
      releaseDetail: locale === "zh" ? "发行详情页" : locale === "ja" ? "リリース詳細" : "Release detail",
      versionStatement: locale === "zh" ? "当前版本" : locale === "ja" ? "Current edition" : "Current edition",
      availability: "Availability",
      specialEditions: locale === "zh" ? "Five interpretations" : locale === "ja" ? "Five interpretations" : "Five interpretations",
    },
  };
}
