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
  intro: {
    en: `As always, any genre is welcome. All tracks that fit "violence," "madness," and "cuteness" and use anime-style girl vocals as samples are welcome. For the overall mood of the series, please refer to previous works. We're looking forward to your creative sound!`,
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
      en: "You can use any vocal samples and voice synthesizing software(Vocaloid, SynthV, etc.) as your vocal, as long as you have the right to implement them in your work.",
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
        en: "WHAT WE WANT",
        zh: "我们想要……",
        ja: "WHAT WE WANT:（サウンドについて）",
      },
      intro: {
        en: "The innovative and ideal sound.",
        zh: "有创意且充满个人风格的音乐。",
        ja: "クリエイティブかつ個性のあるサウンド。",
      },
      bulletsLabel: {
        en: "Please attention!!!",
        zh: "请注意！！！",
        ja: "ATTENTION:（共通ルールについて）",
      },
      bullets: [
        {
          en: "One person could submit multiple entries.",
          zh: "一个人可以提交多个曲目。",
          ja: "一人で何作品でも応募可能です。",
        },
        {
          en: "The submission of released pieces is prohibited.",
          zh: "禁止提交已经发布过的作品。",
          ja: "既にリリースされた曲は受付を致しません。",
        },
        {
          en: "Bootleg tracks will not be accepted.",
          zh: "bootleg曲目将不会被接受。",
          ja: "ブートレグトラックに関しましては受付を致しません。",
        },
        {
          en: "You can use Vocaloid as the component of your track, but the name of Vocaloid will not be shown in the credits of the album.",
          zh: "您可以使用Vocaloid作为曲子的组成部分，但Vocaloid的名字将不会出现在专辑的credits中。",
          ja: "VOCALOIDの使用に関して制約は致しませんが、ただし使用したVOCALOIDの名前はクレジットに記載致しません。",
        },
        {
          en: "You will keep the full copyright of your tracks after entering this compilation.",
          zh: "在被收录进合辑后，您仍然保留您曲目的所有版权。",
          ja: "Thoughostは提出者の音源の権利を保持しません。当選した曲も、落選した曲も、ご自由にお使い下さい。（但し当選した曲をネットでアップロードする場合は、自分のマスタリングバージョンをお使いください）",
        },
        {
          en: "In order to prevent plagiarism, we may ask for the individual files of your tracks. If we discover that you plagiarise after the release of the album, your tracks will be removed and you will be fully responsible for any damage that may cause.",
          zh: "为了防止抄袭，我们可能会要求您提供您曲目的工程文件，如果在专辑发行后发现了您存在抄袭行为，您的曲目将会被删除，且您将承担由此造成的全部责任。",
          ja: "盗作防止の為、通過者がパラデータの提出をして頂く場合が御座います。発売後に他作品の盗用が発覚した場合は、費用や予想される売上を含め、全ての責任を負って頂きます。",
        },
      ],
    },
    aboutSubmission: {
      title: {
        en: "About Submission",
        zh: "关于投稿",
        ja: "ABOUT SUBMISSION（提出について）",
      },
      body: {
        en: 'You can click the Contact button on our homepage to send the demo tracks, or send via email with the link of Dropbox/Google Drive including the demo tracks to thoughost.dm@gmail.com. The title of the email should be "Submission of (Project title)".',
        zh: '您可以点击主页里的“contact”按钮向我们发送您的曲目，或者通过电子邮件将Dropbox/Google Drive的链接连同曲目一起发送到thoughost.dm@gmail.com。电子邮件的标题请写成”音乐提交—（项目的名称）。',
        ja: "HPの「Contact」ボタンをクリックして、応募曲を送信することが出来ます。 また、下記のメールアドレスより、応募曲を送信するのも可能で御座います。その際は、DropboxやGoogle DriveなどのURLで提出するか、またはメールに音源を添付してください。件名は「（標題）応募曲ご提出の件」にしていただければ幸いです。 （thoughost.dm@gmail.com）",
      },
      requiredInfoLabel: {
        en: "Moreover, participants are required to include the following information in the email:",
        zh: "此外，参与者还需在邮件中包含以下信息：",
        ja: "音源とともに、以下の情報を書いてお送り下さい。",
      },
      requiredInfo: [
        {
          en: "A brief introduction of yourself.",
          zh: "简单的自我介绍",
          ja: "自己紹介",
        },
        {
          en: "Title of your tracks.",
          zh: "你的曲目标题",
          ja: "曲名",
        },
        {
          en: "Artist name.",
          zh: "活动名义",
          ja: "活動名義",
        },
        {
          en: "Genre",
          zh: "风格",
          ja: "ジャンル",
        },
        {
          en: "Your email address",
          zh: "你的电子邮件地址",
          ja: "連絡用メールアドレス",
        },
        {
          en: "Your twitter/facebook account.",
          zh: "你的twitter/facebook帐号",
          ja: "活動場所（twitter/facebookアカウントなど）",
        },
      ],
      specNote: {
        en: "The submission tracks must be an unmastered, -6db, 44.1kHz, 16-bit or greater .wav file. You could also submit the self-mastered version at the same time.",
        zh: "您提交的曲目必须是未经母带，-6db，44.1kHz，16bit或更大的.wav文件，同时你也可以提交self-mastered版本。",
        ja: "提出する音源は、未マスタリングの-6db, 44.1kHz, 16-bit（あるいは16-bit以上）wavファイルをお送り下さい。",
      },
    },
  },
  rewards: {
    title: {
      en: "Rewards",
      zh: "奖励与回报",
      ja: "REWARD（報酬について）",
    },
    introLabel: {
      en: "You will get",
      zh: "你将会得到……",
      ja: "公募通過者の方には",
    },
    intro: {
      en: "",
      zh: "",
      ja: "",
    },
    bullets: [
      {
        en: "All mastered tracks.",
        zh: "所有已经母带处理过的曲目。",
        ja: "アルバムのマスター済トラック。",
      },
      {
        en: "All design artwork.",
        zh: "所有的设计作品。",
        ja: "アルバムのアートワークのデータをお送り致します。",
      },
      {
        en: "We will split one-year proceeds from the album with the participants and pay them in the 1st, 4th, 8th, and 12th month after the album release. Payment can be processed by PayPal (for overseas participants) or Amazon Giftcard (for Japanese participants).",
        zh: "我们会在专辑发行后的第一个月、第四个月、第八个月和第十二个月将专辑的收入分给参与者。付款方式为PayPal（海外参与者）或Amazon礼品卡（日本参与者），以及支付宝（国内参与者）。",
        ja: "また、報酬につきましては、１年間の売上を参加の作曲者の人数に等分して、発売日からの第1、4、8、12月にお支払いいたします。 日本に在住していらっしゃる方はアマゾンギフトカードでお支払いいたします。海外に在住していらっしゃる方はPaypalでお支払いいたします。",
      },
    ],
  },
  judgment: {
    title: {
      en: "ABOUT JUDGMENT",
      zh: "关于审核",
      ja: "JUDGMENT（審査について）",
    },
    body: {
      en: "Thoughost’s members are responsible for the judgment of this compilation, and we may ask for external assistance for judgment in some situations. The judgment process will take around one month. We will only contact persons whose entries that are accepted, and will not provide any comments on your tracks.",
      zh: "想灵的成员将负责审核。在某些情况下，出于负责的态度考虑，我们可能会邀请外援参与审核的判断。审核的过程大约需要一个月的时间。在审核结束后，我们将只会给被收录的参与者联系，同时我们不会对您的作品给出任何评论和建议。",
      ja: "審査は、当サークルのメンバーが行います。また、状況によっては外部からお招きしたゲスト審査員のご意見を求める場合が御座います。 審査には約1ヶ月が掛かります。なお、通過者にしか連絡は致しません。曲のコメントは聞かれましても、原則お答えいたしません。あらかじめ御了承下さい。",
    },
  },
  labels: {
    section: { en: "PROJECT", zh: "项目", ja: "PROJECT" },
    deadline: { en: "Submission Deadline:", zh: "截止日期：", ja: "〆切：" },
    release: { en: "Scheduled release:", zh: "发行日期：", ja: "発売日：" },
    submit: { en: "Submit", zh: "提交", ja: "応募" },
    detailedRules: { en: "Detailed Rules:", zh: "具体规则：", ja: "ルール" },
    projectRules: { en: "Detailed Rules:", zh: "具体规则：", ja: "ルール" },
    commonRules: { en: "COMMON RULES", zh: "COMMON RULES", ja: "COMMON RULES" },
    warning: {
      en: "Failure to adhere to these rules will result in the disqualification of your submission.",
      zh: "请注意，如果您的曲目不符合以上规则，我们将不会进行收录。",
      ja: "ルールに合わない作品は、審査対象外となりますので、ご注意ください。",
    },
  },
} as const;
