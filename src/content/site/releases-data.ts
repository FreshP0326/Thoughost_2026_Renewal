import type { ReleaseEntry } from "@/types/site";

const standardStore = {
  en: "Thoughost Bandcamp / Dizzylab",
  zh: "Thoughost Bandcamp / Dizzylab",
  ja: "Thoughost Bandcamp / Dizzylab",
};

function createBandcampLinks(path: string) {
  return [
    {
      platform: "Bandcamp",
      label: "Bandcamp",
      url: `https://thoughost.bandcamp.com${path}`,
    },
  ];
}

function createPurchaseLinks(path: string, dizzylabId?: string) {
  const links: NonNullable<ReleaseEntry["purchaseLinks"]> = [
    {
      label: "Bandcamp",
      url: `https://thoughost.bandcamp.com${path}`,
      kind: "bandcamp" as const,
    },
  ];

  if (dizzylabId) {
    links.push({
      label: "Dizzylab",
      url: `https://www.dizzylab.net/d/${dizzylabId}`,
      kind: "dizzylab" as const,
    });
  }

  return links;
}

function createBandcampPrice(amount: number) {
  const formatted = amount.toLocaleString("en-US");

  return {
    en: `¥${formatted} JPY or more`,
    zh: `¥${formatted} JPY 起`,
    ja: `¥${formatted} JPY〜`,
  };
}

const nameYourPrice = {
  en: "Name your price",
  zh: "自定价格",
  ja: "Name your price",
};

function createTracklist(tracks: string[]) {
  return {
    en: tracks,
    zh: tracks,
    ja: tracks,
  };
}

function createDetailedTracks(tracks: Array<{ number?: string; title: string; artist?: string; disc?: string }>) {
  return {
    en: tracks,
    zh: tracks,
    ja: tracks,
  };
}

function createUniformArtistTracks(tracks: string[], artist: string) {
  return createDetailedTracks(
    tracks.map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      artist,
    })),
  );
}

export const releases: ReleaseEntry[] = [
  {
    slug: "thoughts-2",
    title: {
      en: "thoughts 2",
      zh: "thoughts 2",
      ja: "thoughts 2",
    },
    heroTitle: {
      en: "thoughts\n2",
      zh: "thoughts\n2",
      ja: "thoughts\n2",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2026.04.26",
    modelNumber: "THGO-0011",
    price: {
      en: "Venue ¥1,500 / Mail order ¥1,980",
      zh: "场贩 ¥1,500 / 通贩 ¥1,980",
      ja: "会場 ¥1,500 / 通販 ¥1,980",
    },
    store: {
      en: "M3-2026 Spring venue sale / Mail order page (TBA)",
      zh: "M3-2026 春场贩 / 通贩页面准备中",
      ja: "M3-2026春 会場頒布 / 通販ページ準備中",
    },
    coverImage: "/images/releases/thoughts-2.png",
    heroImage: "/images/releases/thoughts-2.png",
    teaser: {
      en: "Fourteen tracks drifting through hesitation, afterimages, and pale-green residue as the thoughts series turns further inward.",
      zh: "14 首曲目沿着迟疑、残像与雾绿余波缓慢推进，让 thoughts 系列进一步向内折叠。",
      ja: "ためらい、残像、淡いグリーンの余波を14曲でなぞりながら、thoughts シリーズをさらに内側へ折り込んでいく一作。",
    },
    summary: {
      en: `"Discover our own sound."

thoughts 2 is the second chapter in the series, keeping the page and the package equally quiet while the music drifts through hesitation, code, residue, and disappearing light.

Across fourteen tracks, circle members and guests move between fragile melody, suspended tension, and dissolving edges. The result is less a loud statement than a long inward echo.`,
      zh: `“Discover our own sound.”

《thoughts 2》是这个系列的第二章。它延续了包装与页面都主动后退的姿态，让音乐在迟疑、代码、余波与逐渐消散的光里继续向内推进。

14 首曲目由社团成员与 Guest 共同完成，在脆弱的旋律、悬置的张力与缓慢溶解的边界之间来回移动。它不是一次高声宣告，更像一次很长的内向回响。`,
      ja: `“Discover our own sound.”

『thoughts 2』はシリーズの第2章です。パッケージもページも一歩引いたまま、音だけがためらい、コード、残響、消えていく光の中をさらに内側へ進みます。

14曲ではサークルメンバーとゲストが、かすかな旋律、宙吊りの緊張、ほどけていく輪郭のあいだを行き来します。大きな宣言というより、長く残る内向きの反響に近い作品です。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "TARA#376",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "Fading Echoes",
      "Fluorescent",
      "landingfailure.orz",
      "winding stairs",
      "stutter and dissolve",
      "Seven...",
      "Valkyrie",
      "循環の果てにて、",
      "DEPICT CODE",
      "間",
      "Drown...",
      "Southern Barbarian in Oversized Clothes",
      "Don't Leave Me",
      "ending",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "Fading Echoes", artist: "ARMYTOM" },
      { number: "02", title: "Fluorescent", artist: "wheatfox" },
      { number: "03", title: "landingfailure.orz", artist: "nova+z" },
      { number: "04", title: "winding stairs", artist: "Aki Sz" },
      { number: "05", title: "stutter and dissolve", artist: "イベライ / Emelia" },
      { number: "06", title: "Seven...", artist: "sanmal" },
      { number: "07", title: "Valkyrie", artist: "Joulez" },
      { number: "08", title: "循環の果てにて、", artist: "潮音きつね" },
      { number: "09", title: "DEPICT CODE", artist: "Nirotiy" },
      { number: "10", title: "間", artist: "四度夜 霊" },
      { number: "11", title: "Drown...", artist: "望月真白" },
      { number: "12", title: "Southern Barbarian in Oversized Clothes", artist: "Kolaa ft. Money Master" },
      { number: "13", title: "Don't Leave Me", artist: "Irish Kappa" },
      { number: "14", title: "ending", artist: "VeetaCrush" },
    ]),
    links: [],
    specialLink: "https://thoughost.com/special/thoughts-2/1",
    isFeatured: true,
  },
  {
    slug: "2000-invasion",
    title: {
      en: "2000% INVASION",
      zh: "2000% INVASION",
      ja: "2000% INVASION",
    },
    heroTitle: {
      en: "2000%\nINVASION",
      zh: "2000%\nINVASION",
      ja: "2000%\nINVASION",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2025.10.26",
    subtitle: {
      en: "5th Anniversary Compilation",
      zh: "五周年纪念合集",
      ja: "5周年記念コンピレーション",
    },
    coverImage: "/images/releases/2000-invasion.jpg",
    heroImage: "/images/releases/2000-invasion.jpg",
    teaser: {
      en: "A fifth-anniversary rush of 2000s club power, reviving rave euphoria with a full-scale all-star lineup.",
      zh: "五周年纪念大作，把 2000s 舞池记忆与全明星阵容一起重新点燃。",
      ja: "2000s クラブの高揚感を、オールスター編成で鮮烈に呼び戻す5周年記念作。",
    },
    summary: {
      en: `For anyone who wants to hear the sound of the 2000s on the dancefloor once again, this is the answer.

Across fourteen tracks, Thoughost’s fifth-anniversary release brings back the rush of rave, eurobeat, bubblegum dance, happy hardcore, and disco, with a large guest lineup and vocal appearances from Konseki Takane and Rin★.`,
      zh: `献给想再一次在舞池听到2000s声音的你！

全14曲超豪华艺术家阵容，加上 Konseki Takane 与 Rin★ 的献声，把 RAVE / EUROBEAT / BUBBLEGUM DANCE / HAPPY HARDCORE / DISCO 等各种令人怀念的声音重新点燃。`,
      ja: `GET YOUR 2000s POWER!!!!!

甦る、その懐かしいシンセサイザー。あの頃のレイヴサウンドを、もう一度クラブで鳴らしたい人へ向けた Thoughost 五周年記念作です。

RAVE / EUROBEAT / BUBBLEGUM DANCE / HAPPY HARDCORE / DISCO を横断しながら、あの時代の熱量を現代のフロアへ撃ち返します。`,
    },
    modelNumber: "THGO-0010",
    price: createBandcampPrice(2000),
    store: {
      en: "DIVERSE DIRECT / Thoughost Bandcamp / Dizzylab",
      zh: "DIVERSE DIRECT / Thoughost Bandcamp / Dizzylab",
      ja: "DIVERSE DIRECT / Thoughost Bandcamp / Dizzylab",
    },
    credits: {
      illustrator: "TARA#376",
      designer: "Konseki Takane",
      mastering: "Joulez",
    },
    tracklist: createTracklist([
      "HIT THE RAVE ANTHEM",
      "Grooooovy↑",
      "Afterglow",
      "Call Me",
      "Lumière",
      "Ravenaissance",
      "New Player Adventure",
      "CATCH THE FIRE feat. Konseki Takane",
      "Better Walk Away",
      "Soda",
      "Surf the Ravenet",
      "Exhausting Mind",
      "Music Is My Savior",
      "Dream So Real",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "HIT THE RAVE ANTHEM", artist: "nova+z" },
      { number: "02", title: "Grooooovy↑", artist: "潮音きつね" },
      { number: "03", title: "Afterglow", artist: "inaharu" },
      { number: "04", title: "Call Me", artist: "Nirotiy" },
      { number: "05", title: "Lumière", artist: "wheatfox" },
      { number: "06", title: "Ravenaissance", artist: "Ouuuuuu x DazzEdgh" },
      { number: "07", title: "New Player Adventure", artist: "FreshP" },
      { number: "08", title: "CATCH THE FIRE feat. Konseki Takane", artist: "HASEKO" },
      { number: "09", title: "Better Walk Away", artist: "Violet Delta" },
      { number: "10", title: "Soda", artist: "57Lab" },
      { number: "11", title: "Surf the Ravenet", artist: "Hazecat" },
      { number: "12", title: "Exhausting Mind", artist: "板烧鹅尼子 feat. Rin★" },
      { number: "13", title: "Music Is My Savior", artist: "Supa7onyz" },
      { number: "14", title: "Dream So Real", artist: "Valtrax" },
    ]),
    links: createBandcampLinks("/album/2000-invasion"),
    purchaseLinks: [
      {
        label: "Bandcamp",
        url: "https://thoughost.bandcamp.com/album/2000-invasion",
        kind: "bandcamp",
      },
      {
        label: "Dizzylab",
        url: "https://www.dizzylab.net/d/THGO-0010",
        kind: "dizzylab",
      },
      {
        label: "DIVERSE DIRECT",
        url: "https://www.diverse.direct/thoughost/thgo-0010/",
        kind: "diverse",
      },
    ],
    circleLink: "https://www.diverse.direct/thoughost/",
    itemListLink: "https://www.diverse.direct/itemlist/?circle_id=Thoughost",
    isHero: true,
    isFeatured: true,
  },
  {
    slug: "moonshine-001",
    title: {
      en: "MOONSHINE #001",
      zh: "MOONSHINE #001",
      ja: "MOONSHINE #001",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2025.10.26",
    modelNumber: "THGO-009",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/moonshine-001.jpg",
    heroImage: "/images/releases/moonshine-001.jpg",
    teaser: {
      en: "An all-techno compilation that drifts from hypnosis to pressure, gathering eleven distinct shades of midnight motion.",
      zh: "以 techno 为核心的 11 曲合辑，把夜色、压力与微醺感并排推进。",
      ja: "微酔いの夜気とともに、11 のテクノが静かに深まっていくコンピレーション。",
    },
    summary: {
      en: `This is the flavor of moonshine: tonight, sink into that gentle intoxication.

MOONSHINE #001 is a techno compilation featuring eleven tracks with sharply different personalities, from deep pressure to machine-cut grooves.

Alongside Thoughost members, the release brings in guests including A.I., Project-G, Irish Kappa, Yazavva, NANO_TAN, FISHY, Y., and KeiuO.`,
      zh: `"月光"的醍醐味，今宵且沉醉于微醺之中。

TECHNO 合辑《MOONSHINE #001》收录 11 首个性鲜明的 Techno 作品，从低频压迫到机械律动，把夜色里的不同温度逐一展开。

除社团成员外，本作还邀请到 A.I. / Project-G / Irish Kappa / Yazavva / NANO_TAN / FISHY / Y. / KeiuO 组成豪华 Guest 阵容。`,
      ja: `MOONSHINE の醍醐味、今宵はほろ酔いに浸ろう。

TECHNO コンピレーション「MOONSHINE #001」には、多彩なスタイルのテクノ全11曲を収録。深く沈む反復から硬質なグルーヴまで、夜の気配をそれぞれの質感で描いています。`,
    },
    credits: {
      mastering: "火烧",
      illustrator: "豆腐",
      designer: "豆腐",
    },
    tracklist: createTracklist([
      "long out of nacht",
      "a4",
      "Ground State",
      "BIAS",
      "Disoriented Field",
      "Proc",
      "Acid Cagger",
      "DUNGEON TECH",
      "STAGE 5 GAS",
      "MIRAI",
      "Something out of Your TECHNO",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "long out of nacht", artist: "Nirotiy" },
      { number: "02", title: "a4", artist: "A.I." },
      { number: "03", title: "Ground State", artist: "Project-G" },
      { number: "04", title: "BIAS", artist: "潮音きつね" },
      { number: "05", title: "Disoriented Field", artist: "Irish Kappa" },
      { number: "06", title: "Proc", artist: "Yazavva" },
      { number: "07", title: "Acid Cagger", artist: "NANO_TAN" },
      { number: "08", title: "DUNGEON TECH", artist: "FISHY" },
      { number: "09", title: "STAGE 5 GAS", artist: "Y." },
      { number: "10", title: "MIRAI", artist: "KeiuO" },
      { number: "11", title: "Something out of Your TECHNO", artist: "Darkness Peach" },
    ]),
    links: createBandcampLinks("/album/moonshine-001"),
    purchaseLinks: createPurchaseLinks("/album/moonshine-001", "THGO-009"),
    heroTitle: {
      en: "MOONSHINE\n#001",
      zh: "MOONSHINE\n#001",
      ja: "MOONSHINE\n#001",
    },
    isHero: true,
    isFeatured: true,
  },
  {
    slug: "haru-no-shuen",
    title: {
      en: "春ノ終焉",
      zh: "春ノ終焉",
      ja: "春ノ終焉",
    },
    artistName: "Joulez, 月見静華",
    releaseType: "Single",
    releaseDate: "2025.07.25",
    modelNumber: "TGSG-002",
    price: nameYourPrice,
    store: standardStore,
    coverImage: "/images/releases/haru-no-shuen.jpg",
    heroImage: "/images/releases/haru-no-shuen.jpg",
    teaser: {
      en: "A short, fading-season single that turns the end of spring into one last clear afterglow.",
      zh: "把春天谢幕时刻写成一首安静余韵的单曲。",
      ja: "春の終わりを、静かな余韻として閉じ込めたシングル。",
    },
    summary: {
      en: `This is the curtain call of spring.

Joulez and 月見静華 shape the end of the season into a single song, keeping the arrangement restrained while letting the emotion sink in slowly and clearly.

It is a small farewell, but one that leaves a long afterglow behind it.`,
      zh: `这是春天的谢幕。

Joulez 与月見静華把季节尽头的情绪压进这一首歌里，用克制的旋律和缓慢下坠的情感，把最后一点春意留在空气中。

它并不张扬，却把告别的余温拉得很长。`,
      ja: `春の終焉、ここに。

Joulez と月見静華が、季節の切れ目に残る感情を一曲へと閉じ込めました。抑えた旋律のまま、余韻だけがゆっくりと深く沈んでいきます。

小さな別れを、長く残る残響として描いたシングルです。`,
    },
    tracklist: createTracklist(["春ノ終焉"]),
    tracks: createUniformArtistTracks(["春ノ終焉"], "Joulez, 月見静華"),
    links: createBandcampLinks("/track/--17"),
    purchaseLinks: createPurchaseLinks("/track/--17", "TGSG-002"),
    isFeatured: true,
  },
  {
    slug: "thoughts",
    title: {
      en: "thoughts",
      zh: "thoughts",
      ja: "thoughts",
    },
    heroTitle: {
      en: "thoughts",
      zh: "thoughts",
      ja: "thoughts",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2025.04.27",
    modelNumber: "THGO-008",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/thoughts.jpg",
    heroImage: "/images/releases/thoughts.jpg",
    teaser: {
      en: "A new Thoughost series built around one theme per release, beginning here with rebirth.",
      zh: "以单一主题贯穿多种声音的新系列，从“rebirth”开始展开。",
      ja: "ひとつのテーマを多様な音で掘り下げる新シリーズ、その出発点は「rebirth」。",
    },
    summary: {
      en: `"Discover our own sound."

thoughts is a new series from Thoughost, built around carrying one theme through many different genres and perspectives. The first theme is "rebirth."

This chapter brings in VeetaCrush, Rayven, かたぎり, and Aki Sz as guests, while TARA#376 establishes the visual direction for the series.`,
      zh: `新系列《thoughts》，以各种各样的音乐贯彻同一个主题，挖掘属于 Thoughost 自己的声音。

这一次的主题是“rebirth”。不同创作者会从各自的语言、情绪与结构出发，去描绘再生、余辉与重新开始的瞬间。

本作邀请到 VeetaCrush / Rayven / かたぎり / Aki Sz 作为 Guest，同时由 TARA#376 担任《thoughts》系列画家。`,
      ja: `"Discover our own sound."

新シリーズ「thoughts」は、さまざまなジャンルを通してひとつのテーマを貫くシリーズです。今回のテーマは「rebirth」。

VeetaCrush、Rayven、かたぎり、Aki Sz をゲストに迎え、さらに TARA#376 が「thoughts」シリーズのイラストレーターを担当しています。`,
    },
    credits: {
      mastering: "Valtrax",
      illustrator: "TARA#376",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "palette ii",
      "Awake",
      "幽けきルミノールライト",
      "Lucidandelion",
      "Titania",
      "December",
      "6 p.m.",
      "Voix sacrée",
      "曇天",
      "Epilogue",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "palette ii", artist: "VeetaCrush" },
      { number: "02", title: "Awake", artist: "Joulez" },
      { number: "03", title: "幽けきルミノールライト", artist: "潮音きつね" },
      { number: "04", title: "Lucidandelion", artist: "望月真白" },
      { number: "05", title: "Titania", artist: "Aki Sz" },
      { number: "06", title: "December", artist: "かたぎり" },
      { number: "07", title: "6 p.m.", artist: "wheatfox" },
      { number: "08", title: "Voix sacrée", artist: "Nirotiy" },
      { number: "09", title: "曇天", artist: "桃罐" },
      { number: "10", title: "Epilogue", artist: "Rayven" },
    ]),
    links: createBandcampLinks("/album/thoughts"),
    purchaseLinks: createPurchaseLinks("/album/thoughts", "THGO-008"),
    specialLink: "https://thoughost.com/special/thoughts",
    isHero: true,
    isFeatured: true,
  },
  {
    slug: "asteria",
    title: {
      en: "Asteria",
      zh: "Asteria",
      ja: "Asteria",
    },
    artistName: "Joulez",
    releaseType: "Album",
    releaseDate: "2025.04.27",
    modelNumber: "TGEP-003",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/asteria.jpg",
    heroImage: "/images/releases/asteria.jpg",
    teaser: {
      en: "Joulez returns with a starlit solo record that opens outward through four distinct remixes.",
      zh: "Joulez 回归后的个人作品，把星光意象与四首 remix 一起展开成完整叙事。",
      ja: "静寂から戻った Joulez が、星の光と4つのリミックスで描くソロ作品。",
    },
    summary: {
      en: `Returning from silence, Joulez brings back the power of starlight.

Asteria is the first work he created after resuming musical activity. It reconnects with familiar sounds while folding in tones shaped by newer experiences.

Himawari writes and sings on tracks two and three, and four stylistically different remixes let the record refract its core theme in different colors.`,
      zh: `从寂静中回归，带回星光的力量。

《Asteria》是 Joulez 重回创作后的首部作品。在重拾熟悉声音的同时，也加入了从各种体验中获得的新声音，让整张作品带着更开阔的光感和距离感。

Himawari 为 Track 2 与 3 作词并献唱，歌词与人声的交汇让星空仿佛近在咫尺；另有四首风格迥异的 Remix，在不同方向上继续闪烁。`,
      ja: `静寂の中から戻ってきて、星の光の力を手にした。

『Asteria』は、Joulez が音楽活動を再開して初めて作った作品です。昔ながらのサウンドを活かしつつ、新しい経験から生まれた音も加えています。

Track 2 と 3 では Himawari が作詞とボーカルを担当。さらに4種類のリミックスを収録し、それぞれが違う色で光っています。`,
    },
    credits: {
      producer: "Joulez",
      mastering: "Joulez",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "Tessarect of light and stars",
      "Asteria",
      "宙知らぬ星",
      "欠片都市 -the shattered past-",
      "Asteria (AiSS Piano Quartet Arr.)",
      "Asteria (wheatfox's Neural Botany Mix)",
      "Asteria (望月真白's Jungle Mixed Up)",
      "Asteria (Nirotiy's 'Call of Hecate' ver.)",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "Tessarect of light and stars", artist: "Joulez" },
      { number: "02", title: "Asteria", artist: "Joulez; Himawari" },
      { number: "03", title: "宙知らぬ星", artist: "Joulez; Himawari" },
      { number: "04", title: "欠片都市 -the shattered past-", artist: "Joulez" },
      { number: "05", title: "Asteria (AiSS Piano Quartet Arr.)", artist: "Joulez / AiSS" },
      { number: "06", title: "Asteria (wheatfox's Neural Botany Mix)", artist: "Joulez / wheatfox" },
      { number: "07", title: "Asteria (望月真白's Jungle Mixed Up)", artist: "Joulez / 望月真白" },
      { number: "08", title: "Asteria (Nirotiy's 'Call of Hecate' ver.)", artist: "Joulez / Nirotiy" },
    ]),
    links: createBandcampLinks("/album/asteria"),
    purchaseLinks: createPurchaseLinks("/album/asteria", "TGEP-003"),
    heroTitle: {
      en: "ASTERIA",
      zh: "ASTERIA",
      ja: "ASTERIA",
    },
    isHero: true,
    isFeatured: true,
  },
  {
    slug: "palette-of-clouds",
    title: {
      en: "palette of clouds",
      zh: "palette of clouds",
      ja: "palette of clouds",
    },
    artistName: "Nirotiy",
    releaseType: "EP",
    releaseDate: "2024.10.27",
    modelNumber: "TGEP-002",
    price: createBandcampPrice(500),
    store: standardStore,
    coverImage: "/images/releases/palette-of-clouds.jpg",
    heroImage: "/images/releases/palette-of-clouds.jpg",
    teaser: {
      en: "Nirotiy’s first EP turns cloud forms into a palette for memory, weather, and human feeling.",
      zh: "Nirotiy 的首张 EP 把云层变化写成情绪与故事的调色盘。",
      ja: "雲の形を感情の色へと変えていく、Nirotiy 初の EP。",
    },
    summary: {
      en: `Nirotiy 1st EP.

On the planet beneath us, there are countless silent witnesses, and among them are the clouds overhead. Shaped by temperature, pressure, and light, they change form endlessly.

This EP treats those clouds not just as weather charts, but as vessels for human feeling: summer walks beneath broken cumulus, autumn reflection under stratocumulus, winter endings under nimbostratus, and spring farewells under cirrostratus.`,
      zh: `Nirotiy 1st EP.

我们脚下这颗星球上，有着无数无声的见证者，其中之一便是头顶的云朵。它们受温度、气压与光线影响，展现出多种多样的形态。

虽然云朵通常被记录成云图，为人们提供天气判断的依据，但在这里，它们也成为人类情感的寄托。夏日晨间的散步、秋日晚湖边的冥想、冬日下午的悲剧终章，以及春天里的作别，都被放进这块名为云层的调色盘里。`,
      ja: `Nirotiy 1st EP.

私たちの頭上にある雲は、温度、気圧、そして光によってさまざまな姿を見せる、静かな目撃者です。

この作品では、雲をただの気象記号としてではなく、人の感情を受け止める器として捉えています。夏の朝、秋の夕暮れ、冬の終幕、春の別れ。そうした景色を、雲というパレットで描いた EP です。`,
    },
    tracklist: createTracklist([
      "cirrostratus fibratus",
      "stratocumulus undulatus",
      "cumulonimbus",
      "noctilucent clouds",
      "nimbostratus (2024)",
    ]),
    tracks: createUniformArtistTracks(
      ["cirrostratus fibratus", "stratocumulus undulatus", "cumulonimbus", "noctilucent clouds", "nimbostratus (2024)"],
      "Nirotiy",
    ),
    links: createBandcampLinks("/album/palette-of-clouds"),
    purchaseLinks: createPurchaseLinks("/album/palette-of-clouds", "TGEP-002"),
    isFeatured: true,
  },
  {
    slug: "kakusatsu-shoujo-3",
    title: {
      en: "KAKUSATSU SHOUJO 3",
      zh: "KAKUSATSU SHOUJO 3",
      ja: "KAKUSATSU SHOUJO 3",
    },
    heroTitle: {
      en: "KAKUSATSU\nSHOUJO 3",
      zh: "KAKUSATSU\nSHOUJO 3",
      ja: "KAKUSATSU\nSHOUJO 3",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2024.08.12",
    modelNumber: "THGO-007",
    price: createBandcampPrice(1000),
    store: standardStore,
    coverImage: "/images/releases/kakusatsu-shoujo-3.jpg",
    heroImage: "/images/releases/kakusatsu-shoujo-3.jpg",
    teaser: {
      en: "The third impact of KAKUSATSU SHOUJO, sharpening chaos, violence, and cuteness into ten tracks.",
      zh: "核杀少女第三次冲击，把回归阵容与新面孔压进 10 首更锋利的作品里。",
      ja: "『KAKUSATSU SHOUJO』第三の衝撃。狂気とかわいさを、さらに鋭く10曲へ圧縮した一作。",
    },
    summary: {
      en: `KAKUSATSU SHOUJO, third impact.

This chapter pushes the series further with ten tracks of sharper pressure, brighter rupture, and a more focused collision between cuteness and violence.

Returning names such as M9RVEN, かたぎり, Aki, and Null Specification are joined by newcomers Moetek and Yakumo, alongside open-call winner nova+z.`,
      zh: `核杀少女、三次冲击。

不仅 M9RVEN、かたぎり、Aki、Null Specification 回归，还有新面孔 Moetek、Yakumo，以及公开募集获胜者 nova+z，一起将这张作品推向更尖锐的方向。

全10曲的《KAKUSATSU SHOUJO 3》把系列里标志性的混乱、暴力与可爱再次压缩并增幅。`,
      ja: `核殺少女、三度目の衝撃。

M9RVEN、かたぎり、Aki、Null Specification の再参加に加え、Moetek、Yakumo、そして公募採用の nova+z が加わり、シリーズの輪郭をさらに鋭く押し広げます。

全10曲の『KAKUSATSU SHOUJO 3』は、混乱、暴力、そしてかわいさの衝突を、これまで以上に研ぎ澄ませた一作です。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "だんごむし",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "ぶっこぬき音源！ブレイクコアで抜いてしまったサキュバス賀馬ちゃん！",
      "Sekarashikh",
      "DJ Momo is Nothing Without her TEK Feat.The Operation",
      "Tanuki-Mujina Incident",
      "クソアニメは、ニオイで分かりまするぞ",
      "Inversion",
      "しかのこシコシコ腰パンパン",
      "RmL3Th",
      "FOOTPRINTS -雨ノ宮-",
      "天狱",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "ぶっこぬき音源！ブレイクコアで抜いてしまったサキュバス賀馬ちゃん！", artist: "M9RVEN, 望月真白" },
      { number: "02", title: "Sekarashikh", artist: "Moetek" },
      { number: "03", title: "DJ Momo is Nothing Without her TEK Feat.The Operation", artist: "DJ Momo" },
      { number: "04", title: "Tanuki-Mujina Incident", artist: "かたぎり" },
      { number: "05", title: "クソアニメは、ニオイで分かりまするぞ", artist: "nova+z" },
      { number: "06", title: "Inversion", artist: "Aki" },
      { number: "07", title: "しかのこシコシコ腰パンパン", artist: "潮音きつね_H" },
      { number: "08", title: "RmL3Th", artist: "Null Specification" },
      { number: "09", title: "FOOTPRINTS -雨ノ宮-", artist: "望月真白" },
      { number: "10", title: "天狱", artist: "Yakumo" },
    ]),
    links: createBandcampLinks("/album/kakusatsu-shoujo-3"),
    purchaseLinks: createPurchaseLinks("/album/kakusatsu-shoujo-3", "THGO-007"),
    isHero: true,
    isFeatured: true,
  },
  {
    slug: "ephemanent",
    title: {
      en: "Ephemanent",
      zh: "Ephemanent",
      ja: "Ephemanent",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2024.04.28",
    modelNumber: "THGO-006",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/ephemanent.jpg",
    heroImage: "/images/releases/ephemanent.jpg",
    teaser: {
      en: "A freeform hardcore compilation filled with dreamlike glow, nostalgia, and full-throttle lift.",
      zh: "以 freeform hardcore 为核，把梦幻、怀旧与高速推进一起拉满的合集。",
      ja: "夢幻とノスタルジアをまとった Freeform Hardcore コンピレーション。",
    },
    summary: {
      en: `Dreamlike timbres, nostalgic feeling, and a renewed vision of freeform hardcore.

Ephemanent gathers those elements into one compilation, pushing forward with speed and emotional brightness while keeping a sense of melodrama suspended in the air.

It is a record built to surge upward, but never at the cost of feeling.`,
      zh: `梦幻的音色、怀旧的感受、全新的 FREEFORM HARDCORE。

《Ephemanent》将这些元素集中为一张合集，在高速推进中保留旋律的明亮、情绪的抬升与一点遥远的宇宙感。

它既追求速度，也不放弃感性，是一张把上升感持续拉满的作品。`,
      ja: `夢幻的な音色、懐かしさ、そして新しい FREEFORM HARDCORE。

『Ephemanent』は、それらをひとつに束ねたコンピレーションです。疾走感を前面に出しながらも、感情の高まりときらめきを手放しません。

速さの中に、しっかりとした情感を残す一作です。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "铫",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "Cinder Glade",
      "Beryl",
      "Angel Generator",
      "Garnet",
      "Universe Outsiderz",
      "So What",
      "Event Horizon",
      "Nightmare Trigger",
      "Berzerk",
      "Code Name:Macrocosmos",
      "沉渊低语 (Whispers of Looming Shadows)",
      "星冴ゆる霜穹",
      "Erotomania (除名システム Recover)",
      "Herzschlag (Heartbeat)",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "Cinder Glade", artist: "DJ Momo & ちよもも" },
      { number: "02", title: "Beryl", artist: "Kokomochi" },
      { number: "03", title: "Angel Generator", artist: "Ouuuuuu" },
      { number: "04", title: "Garnet", artist: "KaKi" },
      { number: "05", title: "Universe Outsiderz", artist: "Normal1zer" },
      { number: "06", title: "So What", artist: "Project-G" },
      { number: "07", title: "Event Horizon", artist: "Hyphen" },
      { number: "08", title: "Nightmare Trigger", artist: "MiYAjY" },
      { number: "09", title: "Berzerk", artist: "Joulez" },
      { number: "10", title: "Code Name:Macrocosmos", artist: "Irish Kappa" },
      { number: "11", title: "沉渊低语 (Whispers of Looming Shadows)", artist: "Nirotiy" },
      { number: "12", title: "星冴ゆる霜穹", artist: "潮音きつね_H" },
      { number: "13", title: "Erotomania (除名システム Recover)", artist: "ETIA." },
      { number: "14", title: "Herzschlag (Heartbeat)", artist: "Nirotiy" },
    ]),
    links: createBandcampLinks("/album/ephemanent"),
    purchaseLinks: createPurchaseLinks("/album/ephemanent", "THGO-006"),
    isFeatured: true,
  },
  {
    slug: "16-48",
    title: {
      en: "16:48",
      zh: "16:48",
      ja: "16:48",
    },
    artistName: "Joulez",
    releaseType: "Album",
    releaseDate: "2023.05.02",
    modelNumber: "TGSL-001",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/16-48.jpg",
    heroImage: "/images/releases/16-48.jpg",
    teaser: {
      en: "Joulez’s first solo album turns three years of work into a diary of music, poetry, and memory.",
      zh: "Joulez 的首张个人专辑，把三年的积累写成音乐、诗歌与记忆的合集。",
      ja: "3年の結晶を、音楽と詩と記憶の流れへと束ねた Joulez 初のソロ・アルバム。",
    },
    summary: {
      en: `After six years of creating music, electronic artist Joulez released his first solo album through Thoughost. 16:48 is the culmination of three years of work.

It is a collection of music, poetry, and photography, a space where emotions flow and remain.

Across twelve tracks, the record invites you to listen through a more inward, private story.`,
      zh: `经历了六年的创作生涯后，电子音乐人 Joulez 在 Thoughost 推出了自己的第一张个人专辑《16:48》，这是他三年来的结晶。

《16:48》是一张音乐、诗歌与摄影交织而成的作品集，情感在其中流动、驻留，也在十二首乐曲里逐渐展开属于他内心的故事。

听，焦耳。`,
      ja: `Joulez にとって『16:48』は、音楽活動再開後ではなく、長い制作の積み重ねの先に生まれた最初のソロ・アルバムです。3年にわたる歩みが、ここへ結晶しています。

この作品は、音楽、詩、そして写真が交差するコレクションであり、感情が流れ、留まり続ける場所でもあります。

12曲を通して、彼の内側にある物語へ静かに耳を傾けるアルバムです。`,
    },
    credits: {
      producer: "Joulez",
      mastering: "Joulez",
      designer: "紺 aka Konseki Takane",
    },
    tracklist: createTracklist([
      "to Introduce…",
      "i love u / hate myself",
      "a.ll the things I love(d)",
      "continuous deep imagination",
      "sunset (another time)",
      "mermaid of crystal cave",
      "just like glass",
      "unmarked trace",
      "forget.bat",
      "p229 (an interlude)",
      "22-46 november 4th",
      "Or?",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "to Introduce…", artist: "Joulez" },
      { number: "02", title: "i love u / hate myself", artist: "Joulez / 除名システム" },
      { number: "03", title: "a.ll the things I love(d)", artist: "Joulez" },
      { number: "04", title: "continuous deep imagination", artist: "Joulez" },
      { number: "05", title: "sunset (another time)", artist: "Joulez" },
      { number: "06", title: "mermaid of crystal cave", artist: "Joulez" },
      { number: "07", title: "just like glass", artist: "Joulez" },
      { number: "08", title: "unmarked trace", artist: "Joulez" },
      { number: "09", title: "forget.bat", artist: "Joulez / lola螺旯 / 除名システム" },
      { number: "10", title: "p229 (an interlude)", artist: "Joulez" },
      { number: "11", title: "22-46 november 4th", artist: "Joulez" },
      { number: "12", title: "Or?", artist: "Joulez / lola螺旯" },
    ]),
    links: createBandcampLinks("/album/16-48"),
    purchaseLinks: createPurchaseLinks("/album/16-48", "TGSL-001"),
    detailMeta: {
      heroEyebrow: {
        en: "Joulez 1st Solo Album.",
        zh: "Joulez 首张个人专辑。",
        ja: "Joulez 1st Solo Album.",
      },
      discTitle: {
        en: "DISC 1",
        zh: "DISC 1",
        ja: "DISC 1",
      },
      artworkDownloadUrl: "/images/releases/16-48.jpg",
      credit: {
        produceComposeArrangeMastering: {
          en: "Joulez",
          zh: "Joulez",
          ja: "Joulez",
        },
        poetry: {
          en: "Joulez, odorin, lola螺旯",
          zh: "Joulez、odorin、lola螺旯",
          ja: "Joulez, odorin, lola螺旯",
        },
        vocal: {
          en: "lola螺旯 (9 & 12), 除名システム (2 & 9)",
          zh: "lola螺旯（9、12），除名システム（2、9）",
          ja: "lola螺旯 (9 & 12), 除名システム (2 & 9)",
        },
        design: {
          en: "紺 aka Konseki Takane",
          zh: "紺 aka Konseki Takane",
          ja: "紺 aka Konseki Takane",
        },
      },
    },
    isFeatured: true,
  },
  {
    slug: "after-the-forerunner-e-p",
    title: {
      en: "After the Forerunner e.p.",
      zh: "After the Forerunner e.p.",
      ja: "After the Forerunner e.p.",
    },
    artistName: "Thoughost",
    releaseType: "EP",
    releaseDate: "2023.04.30",
    modelNumber: "TGEP-001",
    price: createBandcampPrice(500),
    store: standardStore,
    coverImage: "/images/releases/after-the-forerunner-e-p.jpg",
    heroImage: "/images/releases/after-the-forerunner-e-p.jpg",
    teaser: {
      en: "A six-track EP about influence, inheritance, and the path that begins after the forerunners.",
      zh: "以“先驱者之后”为题，把启发、继承与继续前行写成六首作品的 EP。",
      ja: "先駆者のあとに始まる、自分たちの歩みを描いた6曲入り EP。",
    },
    summary: {
      en: `They opened a way for us to be inspired, motivated, and dedicated. That is why we call them the forerunners.

After the forerunner, we began our own journey of liberation, emotion, and realization.

This six-track EP is about what comes after influence: not imitation, but the decision to keep walking forward on the road they revealed.`,
      zh: `正是因为他们的启发，我们才会开始音乐创作，因此称呼他们为“先驱者”。

在先驱者之后，我们将继续沿着这条路走下去，把灵感、情绪与实践一点点变成自己的声音。

这张六曲 EP 所写的，不只是影响本身，更是继承之后继续前行的意志。`,
      ja: `道を示したからこそ、先駆者である。影響を受けたからこそ、私たちの音楽活動は始まった。

先駆者の足跡を追いながら、私たちはこの道を歩き続けていく。

『After the Forerunner e.p.』は、影響を受けたその先で、自分たちの旅が始まる瞬間をまとめた作品です。`,
    },
    credits: {
      mastering: "Joulez",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "rotfeldzestroerer",
      "Lumos",
      "zentrifugale",
      "No Excuse",
      "You Are The One",
      "白华",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "rotfeldzestroerer", artist: "Joulez" },
      { number: "02", title: "Lumos", artist: "Laxeno57" },
      { number: "03", title: "zentrifugale", artist: "Nirotiy" },
      { number: "04", title: "No Excuse", artist: "DJ Momo" },
      { number: "05", title: "You Are The One", artist: "Irish Kappa" },
      { number: "06", title: "白华", artist: "AiSS" },
    ]),
    links: createBandcampLinks("/album/after-the-forerunner-e-p"),
    purchaseLinks: createPurchaseLinks("/album/after-the-forerunner-e-p", "TGEP-001"),
    isFeatured: true,
  },
  {
    slug: "depressive-emotional-compilation",
    title: {
      en: "蒼 -depressive & emotional compilation-",
      zh: "蒼 -depressive & emotional compilation-",
      ja: "蒼 -depressive & emotional compilation-",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2022.10.30",
    modelNumber: "THGO-005",
    price: createBandcampPrice(1500),
    store: standardStore,
    coverImage: "/images/releases/depressive-emotional-compilation.jpg",
    heroImage: "/images/releases/depressive-emotional-compilation.jpg",
    teaser: {
      en: "A large-scale emotional compilation tracing blue-toned collapse, fragility, and endurance across many voices.",
      zh: "以“蒼”为核心，把脆弱、抑郁与残存意志压进深蓝叙事中的大型合集。",
      ja: "深い青の感情を、多数のアーティストで描き出す大規模コンピレーション。",
    },
    summary: {
      en: `To keep living is to keep layering guilt. Then is being born itself a kind of curse?

A blue bird flies upward, tirelessly, toward a sky far beyond reach. Beneath that image, this release gathers thoughts of collapse, yearning, and bodies already coming apart.

Beginning in China and extending to artists active across Japan, the UK, France, Russia, and beyond, this compilation brings together internet musicians to describe that one grey-blue emotion hidden in the heart.`,
      zh: `先人说苟且而活此事，就是罪孽的堆积。那我们被生下来这件事，是否是一场诅咒？

一只青鸟向着极高的天空飞翔，遮断太阳，仿佛自己也要变成耀眼的存在。而在这份眩目之下，是下坠、妄想、破碎与再也无法维系完整的肉体。

以中国为起点，日本、英国、法国、俄罗斯等地活跃于互联网中的音乐人在这里相遇，用各自的声音去描写心中那一抹独特的灰蓝色感情。`,
      ja: `生き続けることは、罪を重ねることだ。生まれることは、呪いではないのか。

蒼い鳥は、ずっと遠くの空へ向かって飛び続ける。眩しい太陽を遮り、自らもまた眩しい存在になろうとするその姿の下で、落下、妄想、破損、そして持ちこたえられない肉体の感覚が積み重なっていく。

このコンピレーションは、そうした深い青の感情を、各地のインターネット音楽家たちがそれぞれの方法で描き出した作品です。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "枝乃間",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "蒼~track 1 lost~",
      "I love u hate myself",
      "Não me lembro da última vez, que eu sai do meu quarto",
      "Mnemosyne",
      "Stale Incense",
      "Payphone",
      "kiss in october",
      "Dementia",
      "Core of Ascension [Single Vers.]",
      "私",
      "Solitray World",
      "fun^10 x int^40",
      "死声",
      "Obelisk",
      "zexistenze",
      "Endlessly Colorless",
      "SAD_POETRY",
      "Or from July 24th",
      "MeaningLess",
      "Anthropocene",
      "l'espoire  en",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "蒼~track 1 lost~", artist: "望月真白" },
      { number: "02", title: "I love u hate myself", artist: "Joulez" },
      { number: "03", title: "Não me lembro da última vez, que eu sai do meu quarto", artist: "f1d31" },
      { number: "04", title: "Mnemosyne", artist: "l!a" },
      { number: "05", title: "Stale Incense", artist: "terminus" },
      { number: "06", title: "Payphone", artist: "Uhp1QVQ" },
      { number: "07", title: "kiss in october", artist: "Kawaii amen girl" },
      { number: "08", title: "Dementia", artist: "Holly" },
      { number: "09", title: "Core of Ascension [Single Vers.]", artist: "Ultima Aevum" },
      { number: "10", title: "私", artist: "Urtica_Ferox_" },
      { number: "11", title: "Solitray World", artist: "rbZodiacX" },
      { number: "12", title: "fun^10 x int^40", artist: "zot!k" },
      { number: "13", title: "死声", artist: "Nirotiy" },
      { number: "14", title: "Obelisk", artist: "ELECTR" },
      { number: "15", title: "zexistenze", artist: "wheatfox" },
      { number: "16", title: "Endlessly Colorless", artist: "oblivious" },
      { number: "17", title: "SAD_POETRY", artist: "illness liquor" },
      { number: "18", title: "Or from July 24th", artist: "Joulez" },
      { number: "19", title: "MeaningLess", artist: "CarameL." },
      { number: "20", title: "Anthropocene", artist: "Laxeno57" },
      { number: "21", title: "l'espoire  en", artist: "BLUE NOISE" },
    ]),
    links: createBandcampLinks("/album/depressive-emotional-compilation"),
    purchaseLinks: createPurchaseLinks("/album/depressive-emotional-compilation", "THGO-005"),
  },
  {
    slug: "kakusatsu-shoujo-2",
    title: {
      en: "KAKUSATSU SHOUJO 2",
      zh: "KAKUSATSU SHOUJO 2",
      ja: "KAKUSATSU SHOUJO 2",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2022.04.24",
    modelNumber: "THGO-004",
    price: createBandcampPrice(1200),
    store: standardStore,
    coverImage: "/images/releases/kakusatsu-shoujo-2.jpg",
    heroImage: "/images/releases/kakusatsu-shoujo-2.jpg",
    teaser: {
      en: "KAKUSATSU SHOUJO returns with fourteen tracks of greater chaos, violence, and sampled frenzy.",
      zh: "第二章回归，把“Kawaii, Bouryoku, Sampling.”进一步推向更混乱更暴力的方向。",
      ja: "『KAKUSATSU SHOUJO』再来。より混沌と暴力を増した14曲の第二章。",
    },
    summary: {
      en: `KAKUSATSU SHOUJO returns.

Built on the phrase "Kawaii, Bouryoku, Sampling.", this second chapter pushes everything further toward more chaotic and violent sound.

Alongside returning contributors such as Dz'Xa, かたぎり, and citybridge, new guests including pencil and Null Specification join a fourteen-track release shaped as a louder, madder volume.`,
      zh: `KAKUSATSU SHOUJO、归来。

在“Kawaii, Bouryoku, Sampling.”的基础上更进一步，“更混乱和暴力的声音”是本次的主题。

不仅 Dz'Xa、かたぎり、citybridge 回归，更有 pencil、Null Specification 作为新 Guest 加入。全14曲的《KAKUSATSU SHOUJO 2》是一册更狂气、更膨胀的作品。`,
      ja: `KAKUSATSU SHOUJO、再来。

“Kawaii, Bouryoku, Sampling.” を土台にしながら、第二章ではさらに混沌と暴力を強めたサウンドをテーマにしています。

Dz'Xa、かたぎり、citybridge の再参加に加え、pencil、Null Specification も新たに加わり、全14曲のより狂気的な一冊へと仕上がりました。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "だんごむし",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "うに娘二次創作ガイドライン違反作品",
      "physching",
      "Cannibal Cooker",
      "Roppongi Crisis",
      "REGETNI",
      "天井から見ると",
      "Secrets",
      "#WE_STILL_LOVE_PERFUME",
      "Iconos Del Anime",
      "Aria'Grief Seed'",
      "殻殺 -Instant Bullet-",
      "Succubus Gabber",
      "There's no reality",
      "LET ME SAY SANK YOU",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "うに娘二次創作ガイドライン違反作品", artist: "潮音きつね_H" },
      { number: "02", title: "physching", artist: "Lax1u57" },
      { number: "03", title: "Cannibal Cooker", artist: "Null Specification" },
      { number: "04", title: "Roppongi Crisis", artist: "pencil" },
      { number: "05", title: "REGETNI", artist: "Dz'Xa" },
      { number: "06", title: "天井から見ると", artist: "四度月白" },
      { number: "07", title: "Secrets", artist: "Aki" },
      { number: "08", title: "#WE_STILL_LOVE_PERFUME", artist: "かたぎり" },
      { number: "09", title: "Iconos Del Anime", artist: "GoldenEggs" },
      { number: "10", title: "Aria'Grief Seed'", artist: "Nirotiy" },
      { number: "11", title: "殻殺 -Instant Bullet-", artist: "望月真白" },
      { number: "12", title: "Succubus Gabber", artist: "M9RVEN" },
      { number: "13", title: "There's no reality", artist: "citybridge" },
      { number: "14", title: "LET ME SAY SANK YOU", artist: "二重死後磁場" },
    ]),
    links: createBandcampLinks("/album/kakusatsu-shoujo-2"),
    purchaseLinks: createPurchaseLinks("/album/kakusatsu-shoujo-2", "THGO-004"),
  },
  {
    slug: "s-l-v-t-mixture",
    title: {
      en: "S.L.V.T: MIXTURE",
      zh: "S.L.V.T: MIXTURE",
      ja: "S.L.V.T: MIXTURE",
    },
    artistName: "Nirotiy & 望月真白",
    releaseType: "Collaboration",
    releaseDate: "2022.03.12",
    modelNumber: "THGO-003",
    price: createBandcampPrice(800),
    store: standardStore,
    coverImage: "/images/releases/s-l-v-t-mixture.jpg",
    heroImage: "/images/releases/s-l-v-t-mixture.jpg",
    teaser: {
      en: "A split release from Nirotiy and 望月真白, decoding dark synthetic mass, halation, and malfunctioning flow.",
      zh: "Nirotiy 与望月真白的合作专辑，把深暗色无机质流动写成一场解码。",
      ja: "深く暗い無機質な流れを解読していく、Nirotiy と望月真白のスプリット作品。",
    },
    summary: {
      en: `Inside a flowing, dark, inorganic mass, colors bloom like malfunctioning halation.

Decode it, and you may catch a glimpse of everything hidden inside this mixture.

S.L.V.T: MIXTURE is a split album by Thoughost members Nirotiy and 望月真白, with additional participation from 空読無 白眼 and Coredump Breaks.`,
      zh: `MIXTURE：深暗色的无机质流动中，晕染上故障般的颜色。

解码它吧。一窥其中潜伏的结构、噪声与不断变形的情绪。

这张《S.L.V.T: MIXTURE》由 Thoughost 成员 Nirotiy 与望月真白共同制作，并特别邀请空読無 白眼与 Coredump Breaks 参与。`,
      ja: `流れの中で誤作動の色にハレーションを起こした、深く暗い無機質な塊。

それをデコードしよう。この MIXTURE に含まれるすべてを垣間見るために。

Nirotiy と望月真白によるスプリット作品であり、異なる質感がひとつの塊としてせめぎ合うアルバムです。`,
    },
    credits: {
      mastering: "Joulez",
      illustrator: "Nirotiy",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "Verwirrung (Confusion) - Club Edit",
      "CHAOSHAN WISEGUYS",
      "Jiehkki (Glacier)",
      "INFERNAL AFFAIRS",
      "Hollow Heaven Underneath",
      "Bluntungen (Blood)",
      "Verwirrung - 空読無 白眼 REMIX",
      "INFERNAL AFFAIRS - Coredump Breaks REMIX",
      "MEGA BANGiN TUNES BATT1E",
      "Jiehkki (Glacier) - D3llketa MaxhIro REMIXXX",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "Verwirrung (Confusion) - Club Edit", artist: "Nirotiy" },
      { number: "02", title: "CHAOSHAN WISEGUYS", artist: "DJ MASHIRO (2)" },
      { number: "03", title: "Jiehkki (Glacier)", artist: "Nirotiy" },
      { number: "04", title: "INFERNAL AFFAIRS", artist: "望月真白" },
      { number: "05", title: "Hollow Heaven Underneath", artist: "望月真白 ft. Nirotiy" },
      { number: "06", title: "Bluntungen (Blood)", artist: "Nirotiy" },
      { number: "07", title: "Verwirrung - 空読無 白眼 REMIX", artist: "Nirotiy" },
      { number: "08", title: "INFERNAL AFFAIRS - Coredump Breaks REMIX", artist: "望月真白" },
      { number: "09", title: "MEGA BANGiN TUNES BATT1E", artist: "The DJ 白手 Producer (2)" },
      { number: "10", title: "Jiehkki (Glacier) - D3llketa MaxhIro REMIXXX", artist: "Nirotiy" },
    ]),
    links: createBandcampLinks("/album/s-l-v-t-mixture"),
    purchaseLinks: createPurchaseLinks("/album/s-l-v-t-mixture", "THGO-003"),
  },
  {
    slug: "trixxck",
    title: {
      en: "TRIXXCK",
      zh: "TRIXXCK",
      ja: "TRIXXCK",
    },
    artistName: "Thoughost; Silent Xords",
    releaseType: "Collaboration",
    releaseDate: "2021.11.03",
    modelNumber: "TGSP-001",
    price: createBandcampPrice(500),
    store: standardStore,
    coverImage: "/images/releases/trixxck.jpg",
    heroImage: "/images/releases/trixxck.jpg",
    teaser: {
      en: "A Halloween EP from Thoughost and Silent Xords, charged with horror tension and overstimulated club energy.",
      zh: "Thoughost × Silent Xords 的万圣节合作 EP，把惊悚感与俱乐部张力一起推高。",
      ja: "Thoughost × Silent Xords による、ハロウィン仕様の高緊張 EP。",
    },
    summary: {
      en: `Thoughost × Silent Xords special Halloween EP.

TRIXXCK is built around tense synths, sharpened surfaces, and a restless club pulse, keeping the whole release hovering between horror mood and physical momentum.`,
      zh: `Thoughost × Silent Xords 特别合作万圣节 EP。

《TRIXXCK》把惊悚感合成器、脏锐的质地和高度兴奋的俱乐部张力压进同一张作品里，让整张 EP 始终处于一种不安又上头的状态。`,
      ja: `Thoughost × Silent Xords Special Halloween EP。

『TRIXXCK』は、ホラーの気配をまとったシンセと鋭い質感、落ち着かないクラブの脈動で押し切る一作です。`,
    },
    credits: {
      mastering: "BlueWind",
      illustrator: "SCAF",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "Intro",
      "MADCINE",
      "The Blood Spitted On Me",
      "ジレンマと枯れ葉",
      "Verdammnis",
      "Nothing but escape",
      "fish_man feat. Nirotiy",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "Intro", artist: "Nirotiy" },
      { number: "02", title: "MADCINE", artist: "Nirotiy" },
      { number: "03", title: "The Blood Spitted On Me", artist: "BlueWind" },
      { number: "04", title: "ジレンマと枯れ葉", artist: "DJ Mashiro (2)" },
      { number: "05", title: "Verdammnis", artist: "Nirotiy" },
      { number: "06", title: "Nothing but escape", artist: "Black201" },
      { number: "07", title: "fish_man feat. Nirotiy", artist: "潮音きつね_H" },
    ]),
    links: createBandcampLinks("/album/trixxck"),
    purchaseLinks: createPurchaseLinks("/album/trixxck", "TGSP-001"),
  },
  {
    slug: "ground-attack",
    title: {
      en: "GROUND ATTACK!!!",
      zh: "GROUND ATTACK!!!",
      ja: "GROUND ATTACK!!!",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2021.04.05",
    modelNumber: "THGO-002",
    price: createBandcampPrice(1000),
    store: standardStore,
    coverImage: "/images/releases/ground-attack.jpg",
    heroImage: "/images/releases/ground-attack.jpg",
    teaser: {
      en: "A high-pressure compilation driven by funkot, hard bass, donk, and tribecore with reckless physical energy.",
      zh: "以 funkot、hard bass、donk、tribecore 为主轴的高压“土嗨大碟”。",
      ja: "Funkot / Hard Bass / Donk / Tribecore を一気に叩き込む高圧コンピレーション。",
    },
    summary: {
      en: `GROUND ATTACK!!! is Thoughost’s second compilation, built around funkot, hard bass, donk, and tribecore.

The project began from a shared fascination with their raw physical drive: "wooden fish music," "pipe-knocking music," and the impulsive force that makes these styles impossible to ignore.

Alongside circle members and open-call winners, the release brings in Japanese funkot producers Aki, hayato87b, Liet NRC, and totsumal, tekno producer 4nzu, and longtime friend citybridge.`,
      zh: `《GROUND ATTACK!!!》是 Thoughost 的第二张合辑专辑，以 Funkot / Hard Bass / Donk / Tribecore 为创作主轴。

Funkot 在国内被戏称为“敲木鱼音乐”，Hard Bass 和 Donk 又因标志性的 Donkbass 音色被戏称为“敲水管音乐”，再加上我们一直着迷于 Tribecore 那股原始的冲劲，于是有了这张专辑的企划灵感。

除了社团成员与公开募集入选者外，本作还邀请了来自日本的 Funkot 好手 Aki、hayato87b、Liet NRC、totsumal，tekno 制作人 4nzu，以及老朋友 citybridge。`,
      ja: `『GROUND ATTACK!!!』は、Funkot / Hard Bass / Donk / Tribecore を主軸に据えた Thoughost の第2コンピレーションです。

それぞれのジャンルが持つ原始的な勢いと身体性に惹かれたことが、この企画の出発点になりました。

サークルメンバーや公募採用者に加え、日本の Funkot プロデューサー Aki、hayato87b、Liet NRC、totsumal、tekno 制作人 4nzu、そして citybridge を迎えた一作です。`,
    },
    credits: {
      mastering: "Joulez, Project Nirvana",
      illustrator: "SHIKA",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "quick intro to 2021 mashup meta",
      "massage seat",
      "Barbie Disco Tribe",
      "BF",
      "Vertigo",
      "Wrench Mind",
      "ロシア Donky Rave",
      "Cherrylike",
      "TWINS",
      "Yarasete Yuri Girl",
      "fallen",
      "Hypoxia_Mrs.SYR",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "quick intro to 2021 mashup meta", artist: "jakka" },
      { number: "02", title: "massage seat", artist: "Black201" },
      { number: "03", title: "Barbie Disco Tribe", artist: "Aki" },
      { number: "04", title: "BF", artist: "hayato87b" },
      { number: "05", title: "Vertigo", artist: "Liet NRC" },
      { number: "06", title: "Wrench Mind", artist: "totsumal" },
      { number: "07", title: "ロシア Donky Rave", artist: "★Lolitwinx★" },
      { number: "08", title: "Cherrylike", artist: "ELECTR" },
      { number: "09", title: "TWINS", artist: "4nzu" },
      { number: "10", title: "Yarasete Yuri Girl", artist: "Moetek" },
      { number: "11", title: "fallen", artist: "citybridge" },
      { number: "12", title: "Hypoxia_Mrs.SYR", artist: "潮音きつね" },
    ]),
    links: createBandcampLinks("/album/ground-attack"),
    purchaseLinks: createPurchaseLinks("/album/ground-attack", "THGO-002"),
  },
  {
    slug: "perpetual-status",
    title: {
      en: "Perpetual Status -転生する天使-",
      zh: "Perpetual Status -転生する天使-",
      ja: "Perpetual Status -転生する天使-",
    },
    artistName: "DJ Mashiro (2)",
    releaseType: "Single",
    releaseDate: "2020.09.09",
    price: nameYourPrice,
    store: {
      en: "Thoughost Bandcamp",
      zh: "Thoughost Bandcamp",
      ja: "Thoughost Bandcamp",
    },
    coverImage: "/images/releases/perpetual-status.jpg",
    heroImage: "/images/releases/perpetual-status.jpg",
    teaser: {
      en: "A standalone DJ Mashiro (2) single built around denpa-game intensity and the motif of reincarnating angels.",
      zh: "以电波系名作与“转生天使”意象为核心的一首独立单曲。",
      ja: "電波系ゲームの狂気と“転生する天使”のモチーフを重ねた単曲。",
    },
    summary: {
      en: `Made in response to one of the wildest cult denpa galgames, Sayonara o Oshiete: comment te dire adieu.

Composed by 望月真白 aka DJ Mashiro (2), this standalone track balances upward momentum with a darker image of reincarnation and disquiet underneath.

It is a small release, but one tied to a very specific emotional reference point.`,
      zh: `这是一首围绕电波系名作《さよならを教えて ～comment te dire adieu～》而生的独立单曲。

由望月真白，也就是 DJ Mashiro (2) 作曲，在上扬感与不安感之间维持着微妙平衡，让“转生天使”的意象缓慢下沉。

它篇幅不长，却有着非常明确而浓重的情绪坐标。`,
      ja: `数ある電波系作品の中でも強烈な存在感を放つ『さよならを教えて ～comment te dire adieu～』へ向けた一曲。

DJ Mashiro (2) こと望月真白が手がけたこの単曲は、上昇感のある流れの下に、“転生する天使”の不穏なイメージを静かに沈めています。`,
    },
    tracklist: createTracklist(["Perpetual Status -転生する天使-"]),
    tracks: createUniformArtistTracks(["Perpetual Status -転生する天使-"], "DJ Mashiro (2)"),
    links: createBandcampLinks("/track/perpetual-status"),
    purchaseLinks: createPurchaseLinks("/track/perpetual-status"),
  },
  {
    slug: "series-planet-exploration-miranda",
    title: {
      en: "Series Planet Exploration - Miranda -",
      zh: "Series Planet Exploration - Miranda -",
      ja: "Series Planet Exploration - Miranda -",
    },
    artistName: "Nirotiy",
    releaseType: "Single",
    releaseDate: "2020.07.10",
    modelNumber: "TGSG-001",
    price: nameYourPrice,
    store: standardStore,
    coverImage: "/images/releases/series-planet-exploration-miranda.jpg",
    heroImage: "/images/releases/series-planet-exploration-miranda.jpg",
    teaser: {
      en: "A sci-fi single inspired by Miranda and Verona Rupes, turning planetary scale into sensation and song.",
      zh: "以米兰达与维罗纳断崖为灵感，把宇宙尺度写进声音的一首科幻单曲。",
      ja: "ミランダとヴェローナ・ルーペスの巨大さを、感覚と音へ変換した探査シングル。",
    },
    summary: {
      en: `Miranda, the fifth satellite of Uranus, lies far from Earth and holds Verona Rupes, one of the tallest cliffs in the solar system.

Thinking about that five-to-ten-kilometer drop, and the explosion and shattering that formed it, Nirotiy set out to turn those ideas into sensation and song.

This track begins a series of planetary explorations translated into sound.`,
      zh: `米兰达，天王星的第五卫星，离地球极远，并拥有太阳系中最高的悬崖之一：维罗纳断崖。

当人类意识到无垠宇宙的宏大时，心中便会萌生探索欲。Nirotiy 虽非天文学专业人士，但正因想象那道约 5～10 公里深的绝壁，以及它形成时的爆裂与粉碎，才试着把这些感受写进一首歌里。

这首作品也成为“行星探索”系列的起点。`,
      ja: `ミランダ。天王星の第五衛星。

地球から遠く離れたその場所には、太陽系でも屈指の高さを持つ崖、ヴェローナ・ルーペスがあります。その深さ5〜10kmにも及ぶ断崖と、それを形づくった爆発や粉砕のイメージから、この曲は生まれました。

いくつもの曲を通してさまざまな惑星を探っていく、その最初の一歩となるシングルです。`,
    },
    tracklist: createTracklist(["Series Planet Exploration - Miranda -"]),
    tracks: createUniformArtistTracks(["Series Planet Exploration - Miranda -"], "Nirotiy"),
    links: createBandcampLinks("/track/series-planet-exploration-miranda"),
    purchaseLinks: createPurchaseLinks("/track/series-planet-exploration-miranda", "TGSG-001"),
  },
  {
    slug: "kakusatsu-shoujo",
    title: {
      en: "KAKUSATSU SHOUJO",
      zh: "KAKUSATSU SHOUJO",
      ja: "KAKUSATSU SHOUJO",
    },
    artistName: "Thoughost",
    releaseType: "Compilation",
    releaseDate: "2020.06.05",
    modelNumber: "THGO-001",
    price: createBandcampPrice(800),
    store: standardStore,
    coverImage: "/images/releases/kakusatsu-shoujo.jpg",
    heroImage: "/images/releases/kakusatsu-shoujo.jpg",
    teaser: {
      en: "The first KAKUSATSU SHOUJO compilation, setting the project’s early lolicore identity in place.",
      zh: "KAKUSATSU SHOUJO 的起点，把“可爱、暴力、采样”第一次完整落成合辑。",
      ja: "“かわいさ、暴力、サンプリング”を最初に形にした KAKUSATSU SHOUJO の原点。",
    },
    summary: {
      en: `"Cute, violent, sampling."

KAKUSATSU SHOUJO is the compilation where that phrase first took shape as a full Thoughost release, bringing together manic energy, lolicore pressure, and a deliberately unstable sense of rupture.

With help from invited Japanese artists and artwork by 桜都あるす, it became one of the earliest statements of the project’s identity.`,
      zh: `“可爱，暴力，采样”。

《KAKUSATSU SHOUJO》把这句话第一次完整做成了一张合辑。凶暴而又可爱的气质、萝莉核取向的冲击感，以及采样带来的断裂感，都在这里定下了早期轮廓。

本作邀请了几位日本友人参与，也请来了曾为 m1dy 与扑杀少女工坊等绘制封面的桜都あるす担任封面，是系列真正的起点。`,
      ja: `“かわいさ、暴力、サンプリング”。

『KAKUSATSU SHOUJO』は、その言葉を最初にひとつのコンピレーションとして結晶させた作品です。凶暴さとかわいさ、そしてサンプリングによる断裂感が、この時点ですでに強く刻まれています。

日本の参加アーティストと、桜都あるすによるアートワークを迎えたこの一作は、シリーズの原点となりました。`,
    },
    credits: {
      mastering: "iOM",
      illustrator: "桜都あるす",
      designer: "Konseki Takane",
    },
    tracklist: createTracklist([
      "DigDigすぴーど243.4⁉︎_管人の闇a.k.a.ナカノヒト",
      "家族会議",
      "Senpai , I want your amen break!!!!♡",
      "アーメンとペトラ",
      "HITENSION+",
      "STRONG 280",
      "Miu Gakuen Tennis",
      "Warp A null",
      "Never Ends",
    ]),
    tracks: createDetailedTracks([
      { number: "01", title: "DigDigすぴーど243.4⁉︎_管人の闇a.k.a.ナカノヒト", artist: "潮音きつね_H" },
      { number: "02", title: "家族会議", artist: "uet" },
      { number: "03", title: "Senpai , I want your amen break!!!!♡", artist: "Nirotiy" },
      { number: "04", title: "アーメンとペトラ", artist: "蛇壊乃音" },
      { number: "05", title: "HITENSION+", artist: "Dz'Xa" },
      { number: "06", title: "STRONG 280", artist: "かたぎり" },
      { number: "07", title: "Miu Gakuen Tennis", artist: "Davidsan as hino_amane" },
      { number: "08", title: "Warp A null", artist: "Lzie" },
      { number: "09", title: "Never Ends", artist: "citybridge" },
    ]),
    links: createBandcampLinks("/album/kakusatsu-shoujo"),
    purchaseLinks: createPurchaseLinks("/album/kakusatsu-shoujo", "THGO-001"),
  },
];
