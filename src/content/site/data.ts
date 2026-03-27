import type { Locale, LocalizedText, SocialIconLink } from "@/types/site";
import { releases } from "./releases-data";

export { releases };

type ContentText = LocalizedText;

export const supportedLocales = ["en", "zh", "ja"] as const;

export const siteConfig = {
  defaultLocale: "en" as Locale,
  contactEmail: "thoughost.dm@gmail.com",
  copyrightText: "Copyright © 2020-2024 Thoughost All rights reserved.",
  footerQuote: {
    en: '"Finding creative sounds is our purpose."',
    zh: "“寻找具有创造力的声音，是我们的目的。”",
    ja: '「創造的なサウンドを見つけること、それが私たちの目的です。」',
  } satisfies ContentText,
};

export const socialLinks = [
  {
    platform: "X",
    label: "X",
    url: "https://x.com/thoughost",
    iconKey: "x",
  },
  {
    platform: "Bandcamp",
    label: "Bandcamp",
    url: "https://thoughost.bandcamp.com/",
    iconKey: "bandcamp",
  },
  {
    platform: "SoundCloud",
    label: "SoundCloud",
    url: "https://soundcloud.com/thoughost",
    iconKey: "soundcloud",
  },
  {
    platform: "Bilibili",
    label: "Bilibili",
    url: "https://space.bilibili.com/2004994075",
    iconKey: "bilibili",
  },
  {
    platform: "Dizzylab",
    label: "Dizzylab",
    url: "https://www.dizzylab.net/l/Thoughost/",
    iconKey: "dizzylab",
  },
] satisfies SocialIconLink[];

export const navigation = [
  {
    key: "project",
    href: "/project",
    label: { en: "NEXT PROJECT", zh: "下个项目", ja: "NEXT PROJECT" },
  },
  {
    key: "about",
    href: "/about",
    label: { en: "ABOUT", zh: "关于", ja: "ABOUT" },
  },
  {
    key: "news",
    href: "/news",
    label: { en: "NEWS", zh: "新闻", ja: "NEWS" },
  },
  {
    key: "releases",
    href: "/releases",
    label: { en: "DISCOGRAPHY", zh: "作品", ja: "DISCOGRAPHY" },
  },
  {
    key: "contact",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSe-kA6nNwropsvfp6No1fsUl1BFTn6oP-myHSnwsCNfXNayiQ/viewform",
    label: { en: "CONTACT", zh: "联系", ja: "CONTACT" },
  },
] as const;

export const featureFlags = {
  showNewsInNavigation: true,
} as const;

export const pageContent = {
  about: {
    title: {
      en: "ABOUT",
      zh: "关于",
      ja: "ABOUT",
    },
    body: {
      en: "Thoughost is a doujin circle from China. We want to find creative sounds in the whole world.",
      zh: "Thoughost 是一个来自中国的同人社团。我们希望在世界各地找到具有创造力的声音。",
      ja: "Thoughost は中国発の同人サークルです。世界中から創造的なサウンドを見つけたいと考えています。",
    },
  },
  thoughts: {
    title: {
      en: "Thoughts is an editorial notebook for process notes, future cuts, and unfinished sound sketches.",
      zh: "Thoughts 是一个编辑式笔记页，用来记录制作过程、未来切片与尚未完成的声音草图。",
      ja: "Thoughts は、制作メモ、次の断片、未完成の音スケッチを置くためのエディトリアル・ノートです。",
    },
    body: {
      en: "Entries stay short, image-led, and direct—more reference board than blog platform.",
      zh: "这里的条目保持简短、图像主导且直接，更像参考板，而不是传统博客。",
      ja: "各エントリーは短く、イメージ先行で、直接的。ブログというより参照ボードに近い場所です。",
    },
  },
};

export const blackHole = {
  title: {
    en: "BLACK HOLE",
    zh: "BLACK HOLE",
    ja: "BLACK HOLE",
  },
  status: {
    en: "COMING SONG",
    zh: "COMING SONG",
    ja: "COMING SONG",
  },
  summary: {
    en: "A future cut is forming inside BLACK HOLE.",
    zh: "BLACK HOLE 正在汇聚下一段声音。",
    ja: "BLACK HOLE の内側で、次の断片が生成されています。",
  },
  backLinkLabel: {
    en: "Back to Project",
    zh: "返回 Project",
    ja: "Project に戻る",
  },
  backLinkHref: "/project",
} as const;

export const projects = [
  {
    slug: "black-hole",
    title: { en: "BLACK HOLE", zh: "BLACK HOLE", ja: "BLACK HOLE" },
    summary: {
      en: "A visual and audio program collecting future Thoughost cuts.",
      zh: "用于收集 Thoughost 未来作品切片的视听企划。",
      ja: "Thoughost の次の断片を集めるための視聴覚プログラム。",
    },
    coverImage: "/images/releases/release-bar-1.png",
    href: "/special/black-hole",
  },
  {
    slug: "broadcast",
    title: { en: "BROADCAST", zh: "播报", ja: "BROADCAST" },
    summary: {
      en: "Short-form updates, release fragments, and collaboration previews.",
      zh: "短篇更新、发行碎片与合作预览。",
      ja: "短い更新、リリース断片、コラボレーションの予告。",
    },
    coverImage: "/images/releases/GROUND ATTACK!!!.png",
    href: "/project",
  },
];

export const projectCall = {
  title: {
    en: "KAKUSATSU SHOUJO 4",
    zh: "KAKUSATSU SHOUJO 4",
    ja: "KAKUSATSU SHOUJO 4",
  },
  summary: {
    en: "An open call for the next chapter of Thoughost’s anime-sampled, violence-and-cuteness compilation line.",
    zh: "面向 Thoughost 下一部以动画采样、暴力感与可爱感为核心的合集章节的公开征稿。",
    ja: "アニメ声サンプルと「暴力」「かわいさ」を軸に展開する Thoughost コンピレーション最新章の公募です。",
  },
  intro: {
    en: "As always, any genre is welcome. All tracks that fit “violence,” “madness,” and “cuteness” and use anime-style girl vocals as samples are welcome. For the overall mood of the series, please refer to previous works. We’re looking forward to your creative sound!",
    zh: "一如既往，风格不限。凡是围绕“暴力”“疯狂”“可爱”，并使用动画风格少女人声采样创作的作品，都欢迎投稿。整体气质请参考系列前作。期待听到你的创造性声音。",
    ja: "いつも通りジャンルは自由です。「暴力」「狂気」「かわいさ」に合い、アニメ調の少女ボイスをサンプルとして使った楽曲であれば歓迎します。シリーズ全体の空気感については過去作を参考にしてください。クリエイティブなサウンドをお待ちしています。",
  },
  deadline: {
    en: "June 30, 2026",
    zh: "2026 年 6 月 30 日",
    ja: "2026年6月30日",
  },
  release: {
    en: "Comic Market 108, 2026",
    zh: "2026 年 Comic Market 108",
    ja: "2026年 Comic Market 108",
  },
  submitHref: "https://forms.gle/oG1YHhTrJACY3RVi9",
  projectRules: [
    {
      en: "There are no strict limits to the length of your submission, but it is recommended to be no shorter than 3 minutes at the minimum.",
      zh: "投稿作品时长没有硬性限制，但建议不少于 3 分钟。",
      ja: "長さに厳密な制限はありませんが、最低でも 3 分以上を推奨します。",
    },
    {
      en: "The qualification of your submitted work will be primarily and heavily decided based on its quality. We will conduct a detailed examination of your submitted work.",
      zh: "作品是否入选将主要依据质量决定。我们会对提交内容进行详细审查。",
      ja: "採用可否は主に作品のクオリティによって判断されます。提出作品は詳細に確認します。",
    },
    {
      en: "You can use any vocal samples and voice synthesizing software (Vocaloid, SynthV, etc.) as your vocal, as long as you have the right to implement them in your work.",
      zh: "只要你拥有使用权，就可以自由使用任何人声采样或语音合成软件（Vocaloid、SynthV 等）作为作品中的 vocal。",
      ja: "権利上問題がない限り、ボーカルサンプルや音声合成ソフト（Vocaloid、SynthV など）は自由に使用できます。",
    },
  ],
  commonRules: {
    musicSubmission: {
      title: {
        en: "Music Submission Rules",
        zh: "作品规则",
        ja: "Music Submission Rules",
      },
      introLabel: {
        en: "What we want",
        zh: "我们想要……",
        ja: "What we want",
      },
      intro: {
        en: "The innovative and ideal sound.",
        zh: "有创意且充满个人风格的声音。",
        ja: "創造的で、その人らしさのあるサウンド。",
      },
      bulletsLabel: {
        en: "Please attention",
        zh: "请注意",
        ja: "Attention",
      },
      bullets: [
        {
          en: "One person may submit multiple entries.",
          zh: "一位投稿者可以提交多个作品。",
          ja: "一人で複数曲の応募が可能です。",
        },
        {
          en: "Previously released tracks are not accepted.",
          zh: "不接受已经公开发布过的作品。",
          ja: "既にリリース済みの楽曲は受け付けません。",
        },
        {
          en: "Bootleg tracks will not be accepted.",
          zh: "不接受 bootleg 曲目。",
          ja: "ブートレグ作品は受け付けません。",
        },
        {
          en: "You may use Vocaloid or similar vocal software, but the software name will not be shown in the album credits.",
          zh: "可以使用 Vocaloid 等语音合成软件，但软件名称不会写入专辑 credits。",
          ja: "VOCALOID 等の使用は自由ですが、使用した名称はアルバムのクレジットには記載しません。",
        },
        {
          en: "You retain the copyright of your tracks after joining this compilation.",
          zh: "作品收录后，曲目版权仍归投稿者所有。",
          ja: "コンピレーション参加後も、楽曲の著作権は投稿者に帰属します。",
        },
        {
          en: "To prevent plagiarism, we may request project files. If plagiarism is discovered after release, the track will be removed and responsibility will fall on the submitter.",
          zh: "为防止抄袭，我们可能会要求提供工程文件。若发行后发现抄袭，相关曲目将被移除，责任由投稿者承担。",
          ja: "盗作防止のため、必要に応じてプロジェクトファイルの提出をお願いする場合があります。発売後に盗用が判明した場合、楽曲は削除され、責任は投稿者に帰属します。",
        },
      ],
    },
    aboutSubmission: {
      title: {
        en: "About Submission",
        zh: "关于投稿",
        ja: "About Submission",
      },
      body: {
        en: "You can use the submit form or send demo tracks by email with a Dropbox or Google Drive link to thoughost.dm@gmail.com. The subject line should be “Submission of (Project title)”.",
        zh: "你可以使用提交表单，或通过邮件把 Dropbox / Google Drive 链接连同 demo 一起发送到 thoughost.dm@gmail.com。邮件标题建议写成“音乐投稿—（项目名称）”。",
        ja: "提出フォームを使うか、Dropbox / Google Drive のリンク付きでデモ音源を thoughost.dm@gmail.com へ送ってください。件名は「Submission of (Project title)」を推奨します。",
      },
      requiredInfoLabel: {
        en: "Please include",
        zh: "邮件中请附上",
        ja: "Please include",
      },
      requiredInfo: [
        {
          en: "A brief introduction of yourself.",
          zh: "简短的自我介绍。",
          ja: "簡単な自己紹介。",
        },
        {
          en: "Track title.",
          zh: "曲目标题。",
          ja: "曲名。",
        },
        {
          en: "Artist name.",
          zh: "活动名义 / 艺术家名。",
          ja: "アーティスト名義。",
        },
        {
          en: "Genre.",
          zh: "风格。",
          ja: "ジャンル。",
        },
        {
          en: "Your email address.",
          zh: "联系邮箱。",
          ja: "連絡用メールアドレス。",
        },
        {
          en: "Your social account such as X / Facebook.",
          zh: "你的社交账号，如 X / Facebook。",
          ja: "X / Facebook などの活動先アカウント。",
        },
      ],
      specNote: {
        en: "Submission tracks must be unmastered, at -6 dB, 44.1 kHz, 16-bit or greater WAV files. A self-mastered version may also be included.",
        zh: "投稿音频需为未母带处理、-6 dB、44.1 kHz、16-bit 或更高规格的 WAV 文件，也可以同时附上 self-mastered 版本。",
        ja: "提出音源は、未マスタリング、-6 dB、44.1 kHz、16-bit 以上の WAV ファイルでお願いします。セルフマスタリング版を同時に添付しても構いません。",
      },
    },
  },
  rewards: {
    title: {
      en: "Rewards",
      zh: "奖励与回报",
      ja: "Rewards",
    },
    introLabel: {
      en: "You will get",
      zh: "你将会得到……",
      ja: "You will get",
    },
    intro: {
      en: "Accepted participants will receive the mastered results and the related release assets.",
      zh: "入选者将获得母带处理后的作品以及相关发行素材。",
      ja: "採用者にはマスタリング済み音源とリリース関連素材を提供します。",
    },
    bullets: [
      {
        en: "All mastered tracks.",
        zh: "所有已母带处理完成的曲目。",
        ja: "マスタリング済みの全楽曲。",
      },
      {
        en: "All design artwork.",
        zh: "所有设计成品。",
        ja: "アートワーク一式。",
      },
      {
        en: "One-year proceeds from the album will be split with participants and paid in the 1st, 4th, 8th, and 12th month after release.",
        zh: "专辑发行后一年内的收益将与参与者分成，并在发行后的第 1、4、8、12 个月结算。",
        ja: "発売後 1 年間の収益は参加者で分配し、発売後 1・4・8・12 か月目に支払います。",
      },
    ],
  },
  judgment: {
    title: {
      en: "Judgment",
      zh: "关于审核",
      ja: "Judgment",
    },
    body: {
      en: "Thoughost members are responsible for the judgment, with possible external assistance when necessary. The process will take about one month. We will only contact accepted participants and will not provide individual comments on the tracks.",
      zh: "审核主要由 Thoughost 成员负责，必要时会邀请外部协助。整个过程大约需要一个月。我们只会联系入选者，不会对每首投稿单独给出反馈。",
      ja: "審査は Thoughost メンバーが担当し、必要に応じて外部の協力を仰ぐ場合があります。審査期間はおよそ 1 か月で、採用者のみに連絡し、個別講評は行いません。",
    },
  },
  labels: {
    section: { en: "PROJECT", zh: "项目", ja: "PROJECT" },
    deadline: { en: "Submission Deadline", zh: "截止日期", ja: "締切" },
    release: { en: "Scheduled Release", zh: "预定发行", ja: "発売予定" },
    submit: { en: "Submit", zh: "提交", ja: "応募" },
    projectBrief: { en: "Project Brief", zh: "项目说明", ja: "Project Brief" },
    projectRules: { en: "Project Rules", zh: "项目规则", ja: "Project Rules" },
    commonRules: { en: "Common Rules", zh: "通用规则", ja: "Common Rules" },
    warning: {
      en: "Failure to adhere to these rules may result in disqualification.",
      zh: "若未遵守以上规则，投稿可能会被取消资格。",
      ja: "ルールに沿わない作品は審査対象外となる場合があります。",
    },
    finalCtaTitle: {
      en: "Send us your next cut.",
      zh: "把你的下一首作品交给我们。",
      ja: "次の一曲を送ってください。",
    },
    finalCtaBody: {
      en: "Use the form for the fastest route, or contact us by email if you need to send supporting material.",
      zh: "优先使用表单提交；如果你需要补充说明或发送附加材料，也可以通过邮件联系。",
      ja: "最短ルートは提出フォームです。補足資料が必要な場合はメールでもご連絡ください。",
    },
    fallback: {
      en: "Fallback contact",
      zh: "备用联系方式",
      ja: "Fallback contact",
    },
  },
} as const;
