import type { Locale, LocalizedText, SocialIconLink } from "@/types/site";
import { releases } from "./releases-data";

export { releases };

type ContentText = LocalizedText;

export const supportedLocales = ["en", "zh", "jp"] as const;

export const siteConfig = {
  defaultLocale: "en" as Locale,
  contactEmail: "thoughost.dm@gmail.com",
  copyrightText: "Copyright © 2020-2024 Thoughost All rights reserved.",
  footerQuote: {
    en: '"Finding creative sounds is our purpose."',
    zh: "“寻找具有创造力的声音，是我们的目的。”",
    jp: '「創造的なサウンドを見つけること、それが私たちの目的です。」',
  } satisfies ContentText,
};

export const socialLinks = [
  {
    platform: "X",
    label: "X",
    url: "https://x.com/",
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
    url: "https://soundcloud.com/",
    iconKey: "soundcloud",
  },
] satisfies SocialIconLink[];

export const navigation = [
  {
    key: "project",
    href: "/project",
    label: { en: "NEXT PROJECT", zh: "下个项目", jp: "NEXT PROJECT" },
  },
  {
    key: "about",
    href: "/about",
    label: { en: "ABOUT", zh: "关于", jp: "ABOUT" },
  },
  {
    key: "releases",
    href: "/releases",
    label: { en: "DISCOGRAPHY", zh: "作品", jp: "DISCOGRAPHY" },
  },
  {
    key: "contact",
    href: "/#contact",
    label: { en: "CONTACT", zh: "联系", jp: "CONTACT" },
  },
] as const;

export const newsItems = [
  {
    slug: "site-refresh",
    date: "2024.12.22",
    title: {
      en: "Thoughost site refresh enters the next project phase.",
      zh: "Thoughost 网站更新进入下一个项目阶段。",
      jp: "Thoughost のサイト刷新は次のプロジェクトフェーズに入ります。",
    },
    href: "/project",
  },
  {
    slug: "new-release-window",
    date: "2024.11.10",
    title: {
      en: "Kakusatsu Shoujo 2 physical and digital release window announced.",
      zh: "《Kakusatsu Shoujo 2》实体与数字发行窗口公布。",
      jp: "『Kakusatsu Shoujo 2』のフィジカル / デジタル発売時期を公開。",
    },
    href: "/releases/kakusatsu-shoujo-2",
  },
  {
    slug: "artist-collab",
    date: "2024.08.08",
    title: {
      en: "New collaboration lineup expands Thoughost’s visual direction.",
      zh: "新的合作阵容拓展了 Thoughost 的视觉方向。",
      jp: "新しいコラボレーション陣が Thoughost のビジュアルの方向性を広げます。",
    },
    href: "/about",
  },
  {
    slug: "thoughts-open",
    date: "2024.07.21",
    title: {
      en: "Thoughts archive opens with notes on rhythm, noise, and editing.",
      zh: "Thoughts 页面上线，收录关于节奏、噪音与剪辑的笔记。",
      jp: "Thoughts アーカイブ公開。リズム、ノイズ、編集に関するノートを掲載。",
    },
    href: "/special/thoughts",
  },
];

export const pageContent = {
  about: {
    title: {
      en: "ABOUT",
      zh: "关于",
      jp: "ABOUT",
    },
    body: {
      en: "Thoughost is a doujin circle from China. We want to find creative sounds in the whole world.",
      zh: "Thoughost 是一个来自中国的同人社团。我们希望在世界各地找到具有创造力的声音。",
      jp: "Thoughost は中国発の同人サークルです。世界中から創造的なサウンドを見つけたいと考えています。",
    },
  },
  thoughts: {
    title: {
      en: "Thoughts is an editorial notebook for process notes, future cuts, and unfinished sound sketches.",
      zh: "Thoughts 是一个编辑式笔记页，用来记录制作过程、未来切片与尚未完成的声音草图。",
      jp: "Thoughts は、制作メモ、次の断片、未完成の音スケッチを置くためのエディトリアル・ノートです。",
    },
    body: {
      en: "Entries stay short, image-led, and direct—more reference board than blog platform.",
      zh: "这里的条目保持简短、图像主导且直接，更像参考板，而不是传统博客。",
      jp: "各エントリーは短く、イメージ先行で、直接的。ブログというより参照ボードに近い場所です。",
    },
  },
};

export const blackHole = {
  title: {
    en: "BLACK HOLE",
    zh: "BLACK HOLE",
    jp: "BLACK HOLE",
  },
  status: {
    en: "COMING SONG",
    zh: "COMING SONG",
    jp: "COMING SONG",
  },
  summary: {
    en: "A future cut is forming inside BLACK HOLE.",
    zh: "BLACK HOLE 正在汇聚下一段声音。",
    jp: "BLACK HOLE の内側で、次の断片が生成されています。",
  },
  backLinkLabel: {
    en: "Back to Project",
    zh: "返回 Project",
    jp: "Project に戻る",
  },
  backLinkHref: "/project",
} as const;

export const projects = [
  {
    slug: "black-hole",
    title: { en: "BLACK HOLE", zh: "BLACK HOLE", jp: "BLACK HOLE" },
    summary: {
      en: "A visual and audio program collecting future Thoughost cuts.",
      zh: "用于收集 Thoughost 未来作品切片的视听企划。",
      jp: "Thoughost の次の断片を集めるための視聴覚プログラム。",
    },
    coverImage: "/images/releases/release-bar-1.png",
    href: "/special/black-hole",
  },
  {
    slug: "broadcast",
    title: { en: "BROADCAST", zh: "播报", jp: "BROADCAST" },
    summary: {
      en: "Short-form updates, release fragments, and collaboration previews.",
      zh: "短篇更新、发行碎片与合作预览。",
      jp: "短い更新、リリース断片、コラボレーションの予告。",
    },
    coverImage: "/images/releases/GROUND ATTACK!!!.png",
    href: "/project",
  },
];

export const projectCall = {
  title: {
    en: "KAKUSATSU SHOUJO 4",
    zh: "KAKUSATSU SHOUJO 4",
    jp: "KAKUSATSU SHOUJO 4",
  },
  summary: {
    en: "An open call for the next chapter of Thoughost’s anime-sampled, violence-and-cuteness compilation line.",
    zh: "面向 Thoughost 下一部以动画采样、暴力感与可爱感为核心的合集章节的公开征稿。",
    jp: "アニメ声サンプルと「暴力」「かわいさ」を軸に展開する Thoughost コンピレーション最新章の公募です。",
  },
  intro: {
    en: "As always, any genre is welcome. All tracks that fit “violence,” “madness,” and “cuteness” and use anime-style girl vocals as samples are welcome. For the overall mood of the series, please refer to previous works. We’re looking forward to your creative sound!",
    zh: "一如既往，风格不限。凡是围绕“暴力”“疯狂”“可爱”，并使用动画风格少女人声采样创作的作品，都欢迎投稿。整体气质请参考系列前作。期待听到你的创造性声音。",
    jp: "いつも通りジャンルは自由です。「暴力」「狂気」「かわいさ」に合い、アニメ調の少女ボイスをサンプルとして使った楽曲であれば歓迎します。シリーズ全体の空気感については過去作を参考にしてください。クリエイティブなサウンドをお待ちしています。",
  },
  deadline: {
    en: "June 30, 2026",
    zh: "2026 年 6 月 30 日",
    jp: "2026年6月30日",
  },
  release: {
    en: "Comic Market 108, 2026",
    zh: "2026 年 Comic Market 108",
    jp: "2026年 Comic Market 108",
  },
  submitHref: "https://forms.gle/oG1YHhTrJACY3RVi9",
  projectRules: [
    {
      en: "There are no strict limits to the length of your submission, but it is recommended to be no shorter than 3 minutes at the minimum.",
      zh: "投稿作品时长没有硬性限制，但建议不少于 3 分钟。",
      jp: "長さに厳密な制限はありませんが、最低でも 3 分以上を推奨します。",
    },
    {
      en: "The qualification of your submitted work will be primarily and heavily decided based on its quality. We will conduct a detailed examination of your submitted work.",
      zh: "作品是否入选将主要依据质量决定。我们会对提交内容进行详细审查。",
      jp: "採用可否は主に作品のクオリティによって判断されます。提出作品は詳細に確認します。",
    },
    {
      en: "You can use any vocal samples and voice synthesizing software (Vocaloid, SynthV, etc.) as your vocal, as long as you have the right to implement them in your work.",
      zh: "只要你拥有使用权，就可以自由使用任何人声采样或语音合成软件（Vocaloid、SynthV 等）作为作品中的 vocal。",
      jp: "権利上問題がない限り、ボーカルサンプルや音声合成ソフト（Vocaloid、SynthV など）は自由に使用できます。",
    },
  ],
  commonRules: {
    musicSubmission: {
      title: {
        en: "Music Submission Rules",
        zh: "作品规则",
        jp: "Music Submission Rules",
      },
      introLabel: {
        en: "What we want",
        zh: "我们想要……",
        jp: "What we want",
      },
      intro: {
        en: "The innovative and ideal sound.",
        zh: "有创意且充满个人风格的声音。",
        jp: "創造的で、その人らしさのあるサウンド。",
      },
      bulletsLabel: {
        en: "Please attention",
        zh: "请注意",
        jp: "Attention",
      },
      bullets: [
        {
          en: "One person may submit multiple entries.",
          zh: "一位投稿者可以提交多个作品。",
          jp: "一人で複数曲の応募が可能です。",
        },
        {
          en: "Previously released tracks are not accepted.",
          zh: "不接受已经公开发布过的作品。",
          jp: "既にリリース済みの楽曲は受け付けません。",
        },
        {
          en: "Bootleg tracks will not be accepted.",
          zh: "不接受 bootleg 曲目。",
          jp: "ブートレグ作品は受け付けません。",
        },
        {
          en: "You may use Vocaloid or similar vocal software, but the software name will not be shown in the album credits.",
          zh: "可以使用 Vocaloid 等语音合成软件，但软件名称不会写入专辑 credits。",
          jp: "VOCALOID 等の使用は自由ですが、使用した名称はアルバムのクレジットには記載しません。",
        },
        {
          en: "You retain the copyright of your tracks after joining this compilation.",
          zh: "作品收录后，曲目版权仍归投稿者所有。",
          jp: "コンピレーション参加後も、楽曲の著作権は投稿者に帰属します。",
        },
        {
          en: "To prevent plagiarism, we may request project files. If plagiarism is discovered after release, the track will be removed and responsibility will fall on the submitter.",
          zh: "为防止抄袭，我们可能会要求提供工程文件。若发行后发现抄袭，相关曲目将被移除，责任由投稿者承担。",
          jp: "盗作防止のため、必要に応じてプロジェクトファイルの提出をお願いする場合があります。発売後に盗用が判明した場合、楽曲は削除され、責任は投稿者に帰属します。",
        },
      ],
    },
    aboutSubmission: {
      title: {
        en: "About Submission",
        zh: "关于投稿",
        jp: "About Submission",
      },
      body: {
        en: "You can use the submit form or send demo tracks by email with a Dropbox or Google Drive link to thoughost.dm@gmail.com. The subject line should be “Submission of (Project title)”.",
        zh: "你可以使用提交表单，或通过邮件把 Dropbox / Google Drive 链接连同 demo 一起发送到 thoughost.dm@gmail.com。邮件标题建议写成“音乐投稿—（项目名称）”。",
        jp: "提出フォームを使うか、Dropbox / Google Drive のリンク付きでデモ音源を thoughost.dm@gmail.com へ送ってください。件名は「Submission of (Project title)」を推奨します。",
      },
      requiredInfoLabel: {
        en: "Please include",
        zh: "邮件中请附上",
        jp: "Please include",
      },
      requiredInfo: [
        {
          en: "A brief introduction of yourself.",
          zh: "简短的自我介绍。",
          jp: "簡単な自己紹介。",
        },
        {
          en: "Track title.",
          zh: "曲目标题。",
          jp: "曲名。",
        },
        {
          en: "Artist name.",
          zh: "活动名义 / 艺术家名。",
          jp: "アーティスト名義。",
        },
        {
          en: "Genre.",
          zh: "风格。",
          jp: "ジャンル。",
        },
        {
          en: "Your email address.",
          zh: "联系邮箱。",
          jp: "連絡用メールアドレス。",
        },
        {
          en: "Your social account such as X / Facebook.",
          zh: "你的社交账号，如 X / Facebook。",
          jp: "X / Facebook などの活動先アカウント。",
        },
      ],
      specNote: {
        en: "Submission tracks must be unmastered, at -6 dB, 44.1 kHz, 16-bit or greater WAV files. A self-mastered version may also be included.",
        zh: "投稿音频需为未母带处理、-6 dB、44.1 kHz、16-bit 或更高规格的 WAV 文件，也可以同时附上 self-mastered 版本。",
        jp: "提出音源は、未マスタリング、-6 dB、44.1 kHz、16-bit 以上の WAV ファイルでお願いします。セルフマスタリング版を同時に添付しても構いません。",
      },
    },
  },
  rewards: {
    title: {
      en: "Rewards",
      zh: "奖励与回报",
      jp: "Rewards",
    },
    introLabel: {
      en: "You will get",
      zh: "你将会得到……",
      jp: "You will get",
    },
    intro: {
      en: "Accepted participants will receive the mastered results and the related release assets.",
      zh: "入选者将获得母带处理后的作品以及相关发行素材。",
      jp: "採用者にはマスタリング済み音源とリリース関連素材を提供します。",
    },
    bullets: [
      {
        en: "All mastered tracks.",
        zh: "所有已母带处理完成的曲目。",
        jp: "マスタリング済みの全楽曲。",
      },
      {
        en: "All design artwork.",
        zh: "所有设计成品。",
        jp: "アートワーク一式。",
      },
      {
        en: "One-year proceeds from the album will be split with participants and paid in the 1st, 4th, 8th, and 12th month after release.",
        zh: "专辑发行后一年内的收益将与参与者分成，并在发行后的第 1、4、8、12 个月结算。",
        jp: "発売後 1 年間の収益は参加者で分配し、発売後 1・4・8・12 か月目に支払います。",
      },
    ],
  },
  judgment: {
    title: {
      en: "Judgment",
      zh: "关于审核",
      jp: "Judgment",
    },
    body: {
      en: "Thoughost members are responsible for the judgment, with possible external assistance when necessary. The process will take about one month. We will only contact accepted participants and will not provide individual comments on the tracks.",
      zh: "审核主要由 Thoughost 成员负责，必要时会邀请外部协助。整个过程大约需要一个月。我们只会联系入选者，不会对每首投稿单独给出反馈。",
      jp: "審査は Thoughost メンバーが担当し、必要に応じて外部の協力を仰ぐ場合があります。審査期間はおよそ 1 か月で、採用者のみに連絡し、個別講評は行いません。",
    },
  },
  labels: {
    section: { en: "PROJECT", zh: "项目", jp: "PROJECT" },
    deadline: { en: "Submission Deadline", zh: "截止日期", jp: "締切" },
    release: { en: "Scheduled Release", zh: "预定发行", jp: "発売予定" },
    submit: { en: "Submit", zh: "提交", jp: "応募" },
    projectBrief: { en: "Project Brief", zh: "项目说明", jp: "Project Brief" },
    projectRules: { en: "Project Rules", zh: "项目规则", jp: "Project Rules" },
    commonRules: { en: "Common Rules", zh: "通用规则", jp: "Common Rules" },
    warning: {
      en: "Failure to adhere to these rules may result in disqualification.",
      zh: "若未遵守以上规则，投稿可能会被取消资格。",
      jp: "ルールに沿わない作品は審査対象外となる場合があります。",
    },
    finalCtaTitle: {
      en: "Send us your next cut.",
      zh: "把你的下一首作品交给我们。",
      jp: "次の一曲を送ってください。",
    },
    finalCtaBody: {
      en: "Use the form for the fastest route, or contact us by email if you need to send supporting material.",
      zh: "优先使用表单提交；如果你需要补充说明或发送附加材料，也可以通过邮件联系。",
      jp: "最短ルートは提出フォームです。補足資料が必要な場合はメールでもご連絡ください。",
    },
    fallback: {
      en: "Fallback contact",
      zh: "备用联系方式",
      jp: "Fallback contact",
    },
  },
} as const;
