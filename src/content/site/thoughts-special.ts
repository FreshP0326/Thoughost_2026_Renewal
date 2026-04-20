import { releases } from "./data";

import type {
  Locale,
  LocalizedText,
  ReleaseTrack,
  ThoughtsSpecialCard,
  ThoughtsSpecialCreditGroup,
  ThoughtsSpecialImage,
  ThoughtsSpecialImageGroup,
  ThoughtsSpecialPersonSection,
  ThoughtsSpecialViewModel,
} from "@/types/site";

type LocalizedParagraphs = {
  en: string[];
  zh: string[];
  ja: string[];
};

type LocalizedImageSource = Omit<ThoughtsSpecialImage, "alt" | "caption"> & {
  alt: LocalizedText;
  caption: LocalizedText;
};

type LocalizedImageGroupSource = {
  title: LocalizedText;
  images: LocalizedImageSource[];
};

type MusicCardSource = {
  title: string;
  subtitle: string;
  paragraphs: LocalizedParagraphs;
};

type ArtCardSource = {
  title: string;
  subtitle: LocalizedText;
  paragraphs: LocalizedParagraphs;
};

const thoughtsRelease = (() => {
  const release = releases.find((item) => item.slug === "thoughts");

  if (!release) {
    throw new Error("thoughts release entry is missing");
  }

  return release;
})();

function pickText(locale: Locale, value: LocalizedText) {
  return value[locale];
}

function pickParagraphs(locale: Locale, value: LocalizedParagraphs) {
  return value[locale];
}

function pickImage(locale: Locale, value: LocalizedImageSource): ThoughtsSpecialImage {
  return {
    key: value.key,
    src: value.src,
    width: value.width,
    height: value.height,
    alt: pickText(locale, value.alt),
    caption: pickText(locale, value.caption),
  };
}

const coverImage: LocalizedImageSource = {
  key: "cover",
  src: "/images/special/thoughts/cover.jpg",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts cover artwork",
    zh: "thoughts 封面图",
    ja: "thoughts ジャケットアート",
  },
  caption: {
    en: "Cover",
    zh: "封面",
    ja: "ジャケット",
  },
};

const backgroundImage: LocalizedImageSource = {
  key: "background",
  src: "/images/special/thoughts/background.png",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts background artwork",
    zh: "thoughts 封面背景",
    ja: "thoughts 背景アート",
  },
  caption: {
    en: "Cover background",
    zh: "封面背景",
    ja: "背景アート",
  },
};

const initialConceptOne: LocalizedImageSource = {
  key: "initial-1",
  src: "/images/special/thoughts/art-process/initial-1.png",
  width: 1000,
  height: 1353,
  alt: {
    en: "thoughts initial concept sketch one",
    zh: "thoughts 初期概念图一",
    ja: "thoughts 初期コンセプト 1",
  },
  caption: {
    en: "Initial concept 1",
    zh: "初期概念图 1",
    ja: "初期コンセプト 1",
  },
};

const initialConceptTwo: LocalizedImageSource = {
  key: "initial-2",
  src: "/images/special/thoughts/art-process/initial-2.jpg",
  width: 1000,
  height: 1352,
  alt: {
    en: "thoughts initial concept sketch two",
    zh: "thoughts 初期概念图二",
    ja: "thoughts 初期コンセプト 2",
  },
  caption: {
    en: "Initial concept 2",
    zh: "初期概念图 2",
    ja: "初期コンセプト 2",
  },
};

const characterSheet: LocalizedImageSource = {
  key: "character-sheet",
  src: "/images/special/thoughts/art-process/character-sheet.png",
  width: 2400,
  height: 1012,
  alt: {
    en: "thoughts character sheet",
    zh: "thoughts 人设三视图",
    ja: "thoughts キャラクター設定三面図",
  },
  caption: {
    en: "Character sheet",
    zh: "人设三视图",
    ja: "キャラクター設定三面図",
  },
};

const compositionOne: LocalizedImageSource = {
  key: "composition-1",
  src: "/images/special/thoughts/art-process/composition-1.jpg",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts composition study one",
    zh: "thoughts 构图探索一",
    ja: "thoughts 構図検討 1",
  },
  caption: {
    en: "Composition study 1",
    zh: "构图探索 1",
    ja: "構図検討 1",
  },
};

const compositionTwo: LocalizedImageSource = {
  key: "composition-2",
  src: "/images/special/thoughts/art-process/composition-2.jpg",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts composition study two",
    zh: "thoughts 构图探索二",
    ja: "thoughts 構図検討 2",
  },
  caption: {
    en: "Composition study 2",
    zh: "构图探索 2",
    ja: "構図検討 2",
  },
};

const compositionThree: LocalizedImageSource = {
  key: "composition-3",
  src: "/images/special/thoughts/art-process/composition-3.jpg",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts composition study three",
    zh: "thoughts 构图探索三",
    ja: "thoughts 構図検討 3",
  },
  caption: {
    en: "Composition study 3",
    zh: "构图探索 3",
    ja: "構図検討 3",
  },
};

const finalOne: LocalizedImageSource = {
  key: "final-1",
  src: "/images/special/thoughts/art-process/final-1.png",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts finishing step one",
    zh: "thoughts 完成过程一",
    ja: "thoughts 完成工程 1",
  },
  caption: {
    en: "Final process 1",
    zh: "完成过程 1",
    ja: "完成工程 1",
  },
};

const finalTwo: LocalizedImageSource = {
  key: "final-2",
  src: "/images/special/thoughts/art-process/final-2.png",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts finishing step two",
    zh: "thoughts 完成过程二",
    ja: "thoughts 完成工程 2",
  },
  caption: {
    en: "Final process 2",
    zh: "完成过程 2",
    ja: "完成工程 2",
  },
};

const finalThree: LocalizedImageSource = {
  key: "final-3",
  src: "/images/special/thoughts/art-process/final-3.png",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts finishing step three",
    zh: "thoughts 完成过程三",
    ja: "thoughts 完成工程 3",
  },
  caption: {
    en: "Final process 3",
    zh: "完成过程 3",
    ja: "完成工程 3",
  },
};

const finalFour: LocalizedImageSource = {
  key: "final-4",
  src: "/images/special/thoughts/art-process/final-4.png",
  width: 1000,
  height: 1000,
  alt: {
    en: "thoughts finishing step four",
    zh: "thoughts 完成过程四",
    ja: "thoughts 完成工程 4",
  },
  caption: {
    en: "Final process 4",
    zh: "完成过程 4",
    ja: "完成工程 4",
  },
};

const storyParagraphs = {
  zh: [
    "thoughts 这个系列的想法大约在两年前开始浮现。我们一直是比较胡来的创作思路，五年间，几乎是想到哪里就做到哪里。但随着时间的推移，渐渐地也想分享给你属于我们自己的声音。",
    "thoughts 的创作逻辑是一种逆向思维。先征集成员们想实现怎样的声音方向，汇总后经过讨论和细微的调整，得出专辑的主题和方向。这样的好处在于可以不用被主题所限制，可以最大程度地发挥所思所想，专辑也不会过于发散。可以说是真正地展现出我们的 “thoughts”。",
    "当然，作为首张专辑，还是不可避免地出现了一些过于命题作文的情况，在未来会逐渐调整。",
    "总之，thoughts 今后将作为 Thoughost “直接” 传达给你们我们所构想声音的系列，也就是所谓的 Thoughost Compilation Series。当然，这不意味着 Thoughost 的胡来结束了，我们正准备更尽情地发疯。",
    "第一张顺理成章地将主题定为了 “rebirth”。既象征这是 Thoughost 的下一步，也说明了本次整体的声音方向。听起来有些忧伤，仿佛被灰色笼罩的世界，在这之中抓住了一丝光亮。虽然是很不具象的画面，但大家都从不同的角度诠释了这一主题。",
    "更详细的创作幕后，请见下方各位的自我说明。",
    "感谢你们的支持。",
  ],
  en: [
    `The idea for the thoughts series began to emerge about two years ago. For most of these five years, our way of making things was fairly reckless: we simply made whatever came to mind, wherever it led us. But as time passed, we also started wanting to share a sound that felt more truly our own.`,
    `The way thoughts is made follows a kind of reverse logic. We first gather the kinds of sounds each member wants to realize, then after discussion and fine adjustment, we derive the album's theme and direction from that. The advantage is that the music does not have to be trapped by a theme from the start, while the record still avoids scattering too far. In that sense, it really is a direct display of our "thoughts."`,
    `Of course, as a first album, some parts still inevitably leaned a little too far toward being theme-driven exercises. That is something we will keep adjusting in the future.`,
    `In short, thoughts will become the series through which Thoughost more "directly" communicates the sounds we imagine to you - what we call the Thoughost Compilation Series. That does not mean our habit of doing things recklessly is over. If anything, we are preparing to go even more unrestrained.`,
    `It was only natural that the first release would take "rebirth" as its theme. It marks Thoughost's next step, and also points to the overall sonic direction of this work. There is a sadness to it, like a world covered in gray, with a single thread of light caught inside it. The image is abstract, but everyone interpreted that theme from a different angle.`,
    `For more detailed production notes, please read the statements from each contributor below.`,
    `Thank you for supporting us.`,
  ],
  ja: [
    "thoughts というシリーズの発想が浮かび始めたのは、およそ二年前のことでした。私たちはこれまでかなり奔放な作り方をしてきて、この五年間は思いついたところへそのまま突き進むように作品を作ってきました。けれど時間が経つにつれて、私たち自身の音をもう少しはっきり共有したいとも思うようになりました。",
    "thoughts の制作ロジックは、ある種の逆算的な考え方です。まずメンバーそれぞれが実現したい音の方向を集め、それを持ち寄って議論し、微調整を重ねた上で、アルバム全体のテーマと方向を導き出します。そうすることで、最初からテーマに縛られずに発想を最大限に広げながら、作品全体が散りすぎることも防げます。言ってしまえば、それこそが私たちの “thoughts” をそのまま見せる方法でした。",
    "もちろん、最初の一枚である以上、少しテーマ先行になりすぎた部分も避けられませんでした。その点は今後少しずつ調整していくつもりです。",
    "要するに、thoughts はこれから Thoughost が思い描く音を、より “直接的に” 伝えていくためのシリーズになります。いわば Thoughost Compilation Series です。もちろん、それは Thoughost の無茶が終わるという意味ではありません。むしろ、もっと思い切り暴れていく準備をしています。",
    "第一作のテーマが自然に “rebirth” になったのも当然でした。それは Thoughost の次の一歩を象徴すると同時に、今回の全体的なサウンドの方向も示しています。どこか物悲しく、灰色に覆われた世界の中で、一筋の光をつかみ取るような感覚です。とても抽象的なイメージではありますが、参加者それぞれが異なる角度からこのテーマを解釈してくれました。",
    "より詳しい制作の舞台裏は、この下にある各参加者のコメントをご覧ください。",
    "応援してくれてありがとうございます。",
  ],
} satisfies LocalizedParagraphs;

const musicCards = [
  {
    title: "VeetaCrush",
    subtitle: "TR 1: palette ii",
    paragraphs: {
      zh: ["没什么好说的，给大家表演一个冥想吧。 。o O (sb...)"],
      en: ["There is not much to say, so let me perform a little meditation for everyone. .o O (sb...)"],
      ja: ["特に語ることもないので、みんなの前でひとつ瞑想でもしておきます。 .o O (sb...)"],
    },
  },
  {
    title: "Joulez",
    subtitle: "TR 2: Awake",
    paragraphs: {
      zh: [
        "这次写 Drum'n'Bass 貌似和其他其他人有些风格重合。",
        "最初的时候写出来了一个很好听的动机，于是就把曲子的目标定为 thoughts 的发行曲目。",
        "这一次尝试用自己的声音唱 vocal，我想效果还可以。",
      ],
      en: [
        "This time, while writing Drum'n'Bass, my sound seemed to overlap a little with what some other people were doing.",
        "At the beginning I wrote a motif that sounded really good to me, so I decided to aim the track toward becoming part of thoughts.",
        "I also tried singing the vocal with my own voice this time. I think the result turned out fairly well.",
      ],
      ja: [
        "今回は Drum'n'Bass を書いていたら、少し他の人たちと方向が重なる感じになりました。",
        "最初の段階で自分でもかなり気に入ったモチーフができたので、そのまま thoughts の収録曲として仕上げることにしました。",
        "今回は自分の声で vocal も入れてみました。結果としては悪くなかったと思います。",
      ],
    },
  },
  {
    title: "潮音きつね",
    subtitle: "TR 3: 幽けきルミノールライト",
    paragraphs: {
      zh: [
        "最近写 techno 都比较 trance… 总之是以某款酒为灵感写的幻之乐曲，",
        "最后取了鲁米诺的微光为要传达的意象。",
      ],
      en: [
        "Lately, whenever I write techno, it tends to drift toward trance... anyway, this became a phantom-like track inspired by a certain drink.",
        "In the end, I chose the faint glimmer of luminol as the image I wanted to convey.",
      ],
      ja: [
        "最近 techno を書くと、どうしても少し trance 寄りになります……ともあれ、あるお酒を着想源にした幻想的な曲になりました。",
        "最後には、ルミノールのかすかな光を伝えたいイメージとして選びました。",
      ],
    },
  },
  {
    title: "望月真白",
    subtitle: "TR 4: Lucidandelion",
    paragraphs: {
      zh: [
        "企划本身去年秋 M3 之前应该就有在说了，构思到实际开始写沉淀了好几个月，一直在听 I've sound 还有各种 galgame 配乐。",
        "慢慢地就把 reference track 定成了这两首。",
        "Taishi 写给 すぽコン 的 Jet Loser，以及和青叶りんご合作砖的 inst 曲 The Inner Gaze-Will-。",
        "冲劲满满的碎拍和飘渺悠远的氛围感，虚幻飘渺的合成器与钢琴是我一直想试着做的声音。",
        "花了很多心血，但做出来后离想实现的效果还有距离，所以还会继续努力的。",
      ],
      en: [
        "The project itself had already been discussed before last autumn's M3. From the initial idea to the point where I actually started writing, it sat and developed for several months while I kept listening to I've sound and various galgame soundtracks.",
        "Little by little, those reference points settled into two specific tracks.",
        "They were Jet Loser, which Taishi wrote for すぽコン, and The Inner Gaze-Will-, an instrumental from his collaboration release with Aoba Ringo.",
        "The forceful broken beats and the distant, drifting atmosphere - together with unreal, floating synths and piano - were the kind of sound I had always wanted to try making.",
        "I put a lot of effort into it, but the finished result is still some distance away from what I wanted to achieve, so I will keep working at it.",
      ],
      ja: [
        "企画そのものの話は去年秋の M3 より前から出ていて、構想から実際に書き始めるまでに数か月寝かせていました。その間は I've sound や、いろいろな galgame の劇伴をずっと聴いていました。",
        "そうして少しずつ、参考にする曲が二つへと絞られていきました。",
        "Taishi が すぽコン に書いた Jet Loser と、青葉りんごとの合作盤に入っている inst 曲 The Inner Gaze-Will- です。",
        "勢いのあるブレイクビーツと、遠く漂うような空気感。幻のようなシンセとピアノは、ずっと自分でやってみたかった音でした。",
        "かなり力を注ぎましたが、仕上がったものはまだ理想としていた効果には届いていません。なので、これからも頑張り続けます。",
      ],
    },
  },
  {
    title: "wheatfox",
    subtitle: "TR 7: 6 p.m.",
    paragraphs: {
      zh: [
        "尝试做了一点 atmospheric 的 liquid funk。",
        "在采样和音色上主要考虑了 urban 的氛围感，声音参考：DualSide 的 impressesky 系列。",
        "（PS：这个社团的大部分作品我还蛮喜欢的，但是从 bandcamp 上来看听众并不多，大家有兴趣可以关注一下他们的 bandcamp 和 M3 现场活动）",
        "最后，这首曲子还塞了一个小彩蛋（划掉）。",
        "谢谢大家♥",
      ],
      en: [
        "I tried making a slightly atmospheric kind of liquid funk.",
        "In the samples and timbre, I mostly focused on an urban sense of atmosphere. A main reference point was DualSide's impressesky series.",
        "(PS: I really like a lot of that circle's work, but judging from Bandcamp they still do not have many listeners. If you are interested, please check out their Bandcamp and what they do at M3.)",
        "In the end, I also slipped a tiny easter egg into this track.",
        "Thank you, everyone ♥",
      ],
      ja: [
        "少し atmospheric な liquid funk をやってみました。",
        "サンプリングと音色では urban な空気感を強く意識しています。音の参考にしたのは DualSide の impressesky シリーズです。",
        "（PS: このサークルの作品はかなり好きなのですが、Bandcamp を見る限りまだリスナーは多くありません。気になった方はぜひ Bandcamp や M3 の現場も見てみてください。）",
        "最後に、この曲にはちょっとした小ネタも仕込んであります。",
        "みなさんありがとうございます ♥",
      ],
    },
  },
  {
    title: "Nirotiy",
    subtitle: "TR 8: Voix sacrée",
    paragraphs: {
      zh: [
        "自我 demo 库的一首 Tribal Techno 改变而成。",
        "当我了解到专辑封面的看板设定之后灵光一闪，于是试图用 Techno 作为载体进行叙事音乐的书写。",
        "Tribal 节奏象征混沌初开的人类足迹，后续由合成音捏造的 Key 以及 Woodwind 标识着人类对尚无法解释的事物的神化描写。Choir 和 Synth 的爆发将本曲推向高潮，经天灾或是人祸而逝去的生命又开始了新的轮转，而她身着一袭白衣，纤尘不染却只言不语。琴声结束，她将继续是悄无声息的见证者。",
        "如果你觉得我在 Neta 异度系列（尤其是 3）的话，恭喜你和我对上电波。",
      ],
      en: [
        "This track grew out of a Tribal Techno idea from my own demo archive.",
        "As soon as I understood the moodboard behind the album cover, something clicked, and I tried using Techno as the carrier for a more narrative kind of music writing.",
        "The tribal rhythm symbolizes humanity's first footprints as chaos begins to clear. The later keys and woodwind shapes made from synths mark the way humans mythologize what they still cannot explain. The eruption of choir and synth pushes the piece to its climax; lives lost to disaster or human cruelty begin another cycle, while she, dressed in white, remains spotless and silent. When the piano ends, she continues on as a witness without a voice.",
        "If you feel like I am referencing the Xeno series, especially 3, then congratulations - we are on the same wavelength.",
      ],
      ja: [
        "自分の demo ストックにあった Tribal Techno を発展させた曲です。",
        "アルバムのジャケットにあるビジュアル設定を知った瞬間に発想がつながって、Techno を器にして物語性のある音楽を書いてみようと思いました。",
        "Tribal のリズムは、混沌の中に刻まれる人類最初の足跡を象徴しています。その後に現れる synth で形作った key や woodwind は、まだ説明できないものを人が神話化していく姿の印です。Choir と synth の噴き上がりで曲は頂点に達し、天災や人災で失われた命はまた新しい輪転へ入っていきます。けれど白衣をまとった彼女だけは、汚れもなく、何も語らないままそこにいる。ピアノが終わったあとも、彼女は静かな目撃者であり続けます。",
        "もしここに異度シリーズ、とくに 3 のネタを感じたなら、おめでとうございます。完全に同じ電波です。",
      ],
    },
  },
  {
    title: "桃罐",
    subtitle: "TR 9: 曇天",
    paragraphs: {
      zh: [
        "最开始我想写的是一个与曇天完全不一样的曲子，但当我看到 TARA#376 老师的插画时，我完全调转了我的方向，写了一首与所有人都完全不同的曲子。",
        "词是听了三天的陈奕迅写出来的，但显然写出来的粤语并没有广东人听得懂。",
        "希望下次能做出更多的音乐。",
        "",
        "Tara 老师画的怎么这么好啊啊啊啊啊啊啊啊啊啊！！！！@！@！！！！",
      ],
      en: [
        "At first I wanted to write a track that would be completely different from 曇天, but when I saw TARA#376's illustration, I completely changed direction and ended up writing something unlike anyone else's on the album.",
        "I wrote the lyrics after listening to Eason Chan for three days, though obviously the Cantonese I wrote is probably not actually understandable to Cantonese speakers.",
        "I hope I can make even more music next time.",
        "",
        "How is TARA's drawing this good AAAAAAAAAA!!!!",
      ],
      ja: [
        "最初は 曇天 とはまったく別の方向の曲を書くつもりでした。でも TARA#376 さんのイラストを見た瞬間に完全に方向転換して、アルバムの中でも誰ともかぶらない曲になりました。",
        "歌詞は陳奕迅を三日間聴き続けて書いたのですが、出来上がった広東語はさすがに広東の人でもわからないと思います。",
        "次はもっとたくさん音楽を作れたらいいなと思っています。",
        "",
        "TARA 先生の絵、なんでこんなに良いんだよおおおおおお！！！！",
      ],
    },
  },
] satisfies MusicCardSource[];

const artCards = [
  {
    title: "TARA#376",
    subtitle: {
      en: "Illustration",
      zh: "插画",
      ja: "イラスト",
    },
    paragraphs: {
      zh: [
        "很高兴负责了本次专辑的封面插画和角色设计。",
        "自三年前开始了解 Thoughost 和他们的作品，并以公募形式参与过 2022 年的 “蒼” 合集，也画过一些 fanart。",
        "这次能参与新作的插画，真的非常高兴。",
        "",
        "因为是想灵的新系列，未来有着以同一角色展现不同的专辑主题的目的，所以先决定了角色设计。Konseki 给出的设计方向非常明确，所以没有花太长时间得出最终结果。如你所见非常合适！",
        "封面插图方面，由于这是首次针对专辑考虑构图，加上我并不算擅长这次需求的风格，尝试了非常非常多次。总之最后还是努力地找到了适合的美术方向。",
        "",
        "虽然最终结果可能仍旧不尽人意，看得出来缺乏专业的经验和技术，但我觉得是一个好的开始。",
        "希望今后也能和想灵，还有 thoughts 系列一起进步！",
      ],
      en: [
        "I was very happy to be responsible for the cover illustration and character design for this album.",
        `I first got to know Thoughost and their work about three years ago. I also took part in the 2022 "蒼" compilation through the open call and drew some fanart as well.`,
        "It really makes me happy to be part of the illustration work for this new release.",
        "",
        "Because this is a new series for Thoughost, with the idea that the same character can carry different album themes in the future, we began by deciding on the character design first. Konseki gave a very clear design direction, so it did not take too long to reach the final result. As you can see, it fits really well.",
        "For the cover illustration itself, this was my first time thinking about composition specifically for an album, and I am not especially good at the kind of style this request needed, so I tried again and again. In the end, I still managed to find an art direction that suited it.",
        "",
        "The final result may still fall short in some ways, and you can probably see the lack of professional experience and technique, but I think it is a good start.",
        "I hope I can keep improving together with Thoughost and the thoughts series from here on.",
      ],
      ja: [
        "今回のアルバムでは、ジャケットイラストとキャラクターデザインを担当できてとても嬉しかったです。",
        `Thoughost とその作品を知ったのは三年ほど前で、2022 年の「蒼」コンピにも公募参加したことがあり、fanart も描いていました。`,
        "今回こうして新作のイラストに関われたことを、本当に嬉しく思っています。",
        "",
        "これは Thoughost の新シリーズで、今後は同じキャラクターで違うアルバムテーマを見せていく意図があると聞いていたので、まずキャラクターデザインを決めるところから始めました。Konseki さんが示してくれた方向性がとても明確だったので、最終形にたどり着くまでそれほど時間はかかりませんでした。見ての通り、とてもよく合っていると思います。",
        "ジャケットイラストについては、アルバムのために構図を考えるのが今回初めてだったことと、自分が今回求められた作風を特別得意としているわけではなかったこともあって、本当に何度も何度も試しました。それでも最後には、この作品に合った美術の方向を見つけられたと思います。",
        "",
        "最終的な結果はまだ十分ではないかもしれませんし、経験や技術の不足も見えてしまうと思います。でも、それでも良いスタートになったと感じています。",
        "これからも Thoughost と、thoughts シリーズと一緒に成長していけたら嬉しいです。",
      ],
    },
  },
] satisfies ArtCardSource[];

const artProcessGroups = [
  {
    title: {
      en: "Initial Concepts",
      zh: "初期概念图",
      ja: "初期コンセプト",
    },
    images: [initialConceptOne, initialConceptTwo],
  },
  {
    title: {
      en: "Character Sheet",
      zh: "人设三视图",
      ja: "キャラクター設定三面図",
    },
    images: [characterSheet],
  },
  {
    title: {
      en: "Composition Studies",
      zh: "构图探索",
      ja: "構図検討",
    },
    images: [compositionOne, compositionTwo, compositionThree],
  },
  {
    title: {
      en: "Final Process",
      zh: "完成过程",
      ja: "完成工程",
    },
    images: [finalOne, finalTwo, finalThree, finalFour],
  },
  {
    title: {
      en: "Cover System",
      zh: "封面设计",
      ja: "カバーシステム",
    },
    images: [coverImage, backgroundImage],
  },
] satisfies LocalizedImageGroupSource[];

const konsekiRole = {
  en: "Art Direction & Design",
  zh: "艺术指导 / 设计",
  ja: "アートディレクション / デザイン",
} satisfies LocalizedText;

const konsekiParagraphs = {
  zh: [
    "从一开始，我就想找一位 “系列画家”。同这个系列共同成长，直观地感受到我们的成长。为此物色了很多人，最终决定让 TARA#376 担任系列画家。",
    "TARA#376 曾以 illness_liquor 的名义为我们提供过音乐，也为我们绘制过 fanart。虽然谈不上是那种第一眼就留下深刻印象的风格，但胜在复古、经典，是耐看的类型，符合我对这个系列的整体印象。从另一方面来说潜力很大，是可以一起并肩进步的伙伴，为此敲定了人选。",
    "这也是她第一次做系列角色的角色设计，为此较劲了脑汁，在深夜和我讨论角色呈现的方向时压力太大而落泪，对此我真的很愧疚和抱歉，也很感谢。最后呈现的角色是一位不花哨、不显眼、不突出，只是安静呆在那里，有点神秘，又有点神圣，谜团很多，像一张白纸一样的角色，甚至没有名字，我觉得很符合这个系列整体的氛围。",
    "我只提出了最初期的猜想，剩下的全是 TARA#376 一个人的构想，实在是了不起。",
    "下面有几个不同的构图方向。",
    "我选择了其中的一个版本，在一点一点的沟通和交流中推进了下去。",
    "我特意没有往复杂的方向做后期设计部分的工作，相反，从一开始我的脑子里只有 “怎样让 TARA#376 的作品更出挑” 和 “让整体的氛围更融洽”。以干净、简洁的印象推进，最后的效果看起来像是什么都没有加。",
    "我希望封面看起来就像碟片里收录的音乐一样，不浮躁，不惹人眼球，只是安静地躺在那里，等待你们的静静聆听，能作为一副一直看下去的作品。",
    "这么想的话，似乎在现在的浪潮中，显得有些不够惹人眼球，连我自己都觉得应该很难注意到它。",
    "最后的结果，个人来说我很满意，也希望你们会喜欢。",
  ],
  en: [
    `From the very beginning, I wanted to find a "series illustrator" - someone who could grow together with this series, so that our own growth could be felt directly through the work. I looked at many people, and in the end I chose TARA#376 for that role.`,
    "TARA#376 had already provided music for us under the name illness_liquor, and had also drawn fanart for us. It is not the kind of style that shocks you at first glance, but its strength lies in being retro, classic, and durable to look at. That matched my overall impression of this series. At the same time, I felt there was a lot of potential there: someone we could keep improving alongside. That is why I settled on her.",
    "This was also her first time designing a character for a continuing series. It took a lot of effort, and one night, while discussing the direction of the character late into the night, the pressure became so overwhelming that she cried. I still feel very guilty and sorry about that, and at the same time very grateful. The character we arrived at in the end is not flashy, not eye-catching, not assertive. She simply stays there quietly: a little mysterious, a little sacred, full of unanswered things, almost like a blank sheet of paper, not even given a name. I think that suits the atmosphere of this series very well.",
    "I only proposed the very earliest assumptions. Everything after that came from TARA#376 alone, which is honestly remarkable.",
    "Below are a few different composition directions.",
    "I picked one of those versions and kept pushing it forward bit by bit through conversation and exchange.",
    `I deliberately avoided taking the later design work in a more complicated direction. On the contrary, from the beginning there were only two thoughts in my head: "how do I make TARA#376's work stand out more" and "how do I make the atmosphere feel more cohesive." I kept pushing toward a clean and concise impression, and the final result looks almost as if nothing had been added at all.`,
    "I wanted the cover to look like the music contained on the disc itself: not restless, not asking for attention, simply resting there quietly and waiting for you to listen in silence, something that can remain in view for a long time.",
    "Seen that way, it may feel a little too understated in the current tide, to the point where even I sometimes think it could be difficult to notice.",
    "Personally, I am very satisfied with the final result, and I hope you will like it too.",
  ],
  ja: [
    "最初から、私は「シリーズ画家」を見つけたいと思っていました。このシリーズと一緒に成長し、その変化をまっすぐ感じ取れる相手です。そのためにたくさんの人を見て、最終的に TARA#376 さんにお願いすることに決めました。",
    "TARA#376 さんは illness_liquor 名義で私たちに音楽を提供してくれたこともあり、fanart も描いてくれていました。ひと目で強烈な印象を残すタイプの絵柄とは少し違いますが、レトロでクラシックで、長く見ていられる強さがある。それがこのシリーズに対する私の印象とよく合っていました。もう一つ大きかったのは、まだまだ一緒に伸びていける余地を感じたことです。そうして人選を固めました。",
    "これが彼女にとっても、シリーズもののキャラクターを設計する初めての経験でした。そのぶんかなり頭を使わせてしまって、深夜にキャラクターの見せ方について話していたとき、プレッシャーが大きすぎて泣かせてしまったこともあります。そのことには今でも申し訳なさと後ろめたさがありますし、それと同時に本当に感謝しています。最終的に出来上がったのは、派手でもなく、目立ちもしない、ただ静かにそこにいるだけの人物でした。少し神秘的で、少し神聖で、たくさんの謎を抱えた、白紙のような存在で、名前すらありません。私はそれがこのシリーズ全体の空気にとても合っていると思っています。",
    "私が出したのは最初のごく初期の仮説だけで、そこから先はほとんどすべて TARA#376 さん自身の構想です。本当にすごいことだと思います。",
    "下にはいくつか異なる構図の方向があります。",
    "その中の一つを選んで、少しずつ話し合いとやり取りを重ねながら先へ進めていきました。",
    "私は意図的に、後半のデザイン作業を複雑な方向へ持っていきませんでした。むしろ最初から頭の中にあったのは、「どうすれば TARA#376 さんの作品をもっと際立たせられるか」と「どうすれば全体の空気をもっとなじませられるか」という二つだけでした。清潔で簡潔な印象を押し進め、その結果、まるで何も足していないように見えるところまで持っていけたと思っています。",
    "ジャケットは、ディスクの中に入っている音楽そのもののように見えてほしかった。落ち着きなくもなく、目を引こうともしない。ただ静かにそこに横たわっていて、あなたが静かに聴いてくれるのを待っている。ずっと見続けられるような作品であってほしいと思いました。",
    "そう考えると、今の流れの中では少し地味すぎて、自分でも気づかれにくいのではないかと思うことがあります。",
    "それでも、最終的な結果には個人的にとても満足していますし、みなさんにも気に入ってもらえたら嬉しいです。",
  ],
} satisfies LocalizedParagraphs;

const labels = {
  introSection: {
    en: "Behind the Birth of thoughts",
    zh: "thoughts 诞生幕后",
    ja: "thoughts 誕生の舞台裏",
  },
  tracklist: {
    en: "Tracklist",
    zh: "Tracklist",
    ja: "Tracklist",
  },
  storyHeading: {
    en: "Production Notes",
    zh: "制作历程",
    ja: "制作の経緯",
  },
  musicSection: {
    en: "Behind the Music",
    zh: "音乐制作幕后",
    ja: "音楽制作の舞台裏",
  },
  artSection: {
    en: "Behind the Art & Design",
    zh: "艺术设计幕后",
    ja: "アートデザインの舞台裏",
  },
  creditsSection: {
    en: "Credits",
    zh: "Credits",
    ja: "Credits",
  },
  previousCard: {
    en: "Previous card",
    zh: "上一张",
    ja: "前へ",
  },
  nextCard: {
    en: "Next card",
    zh: "下一张",
    ja: "次へ",
  },
  closePreview: {
    en: "Close preview",
    zh: "关闭预览",
    ja: "プレビューを閉じる",
  },
} satisfies Record<
  "introSection" | "tracklist" | "storyHeading" | "musicSection" | "artSection" | "creditsSection" | "previousCard" | "nextCard" | "closePreview",
  LocalizedText
>;

const creditLabels = {
  releaseDate: {
    en: "Album Release Date",
    zh: "发售日期",
    ja: "発売日",
  },
  artists: {
    en: "Artist",
    zh: "参与艺术家",
    ja: "アーティスト",
  },
  mastering: {
    en: "Mastering",
    zh: "母带",
    ja: "マスタリング",
  },
  illustration: {
    en: "Illustration",
    zh: "插画",
    ja: "イラスト",
  },
  design: {
    en: "Art Direction & Design",
    zh: "艺术指导 / 设计",
    ja: "アートディレクション / デザイン",
  },
  webDesign: {
    en: "Special Page Web Design",
    zh: "特设页网页设计",
    ja: "特設ページ Web デザイン",
  },
} satisfies Record<"releaseDate" | "artists" | "mastering" | "illustration" | "design" | "webDesign", LocalizedText>;

export function getThoughtsSpecial(locale: Locale): ThoughtsSpecialViewModel {
  const tracks = thoughtsRelease.tracks?.[locale]?.map((track) => ({ ...track })) ?? thoughtsRelease.tracks?.en?.map((track) => ({ ...track })) ?? [];
  const artists = Array.from(new Set(tracks.map((track) => track.artist).filter((artist): artist is string => Boolean(artist))));
  const credits = thoughtsRelease.credits ?? {};

  return {
    title: pickText(locale, thoughtsRelease.title),
    labels: {
      introSection: pickText(locale, labels.introSection),
      tracklist: pickText(locale, labels.tracklist),
      storyHeading: pickText(locale, labels.storyHeading),
      musicSection: pickText(locale, labels.musicSection),
      artSection: pickText(locale, labels.artSection),
      creditsSection: pickText(locale, labels.creditsSection),
      previousCard: pickText(locale, labels.previousCard),
      nextCard: pickText(locale, labels.nextCard),
      closePreview: pickText(locale, labels.closePreview),
    },
    introSection: {
      coverImage: pickImage(locale, coverImage),
      tracklist: tracks satisfies ReleaseTrack[],
      storyParagraphs: pickParagraphs(locale, storyParagraphs),
    },
    musicCards: musicCards.map(
      (card): ThoughtsSpecialCard => ({
        title: card.title,
        subtitle: card.subtitle,
        paragraphs: pickParagraphs(locale, card.paragraphs),
      }),
    ),
    artCards: artCards.map(
      (card): ThoughtsSpecialCard => ({
        title: card.title,
        subtitle: pickText(locale, card.subtitle),
        paragraphs: pickParagraphs(locale, card.paragraphs),
      }),
    ),
    artProcessGroups: artProcessGroups.map(
      (group): ThoughtsSpecialImageGroup => ({
        title: pickText(locale, group.title),
        images: group.images.map((image) => pickImage(locale, image)),
      }),
    ),
    konsekiSection: {
      name: "Konseki Takane",
      role: pickText(locale, konsekiRole),
      paragraphs: pickParagraphs(locale, konsekiParagraphs),
      images: [compositionOne, compositionTwo, compositionThree].map((image) => pickImage(locale, image)),
    } satisfies ThoughtsSpecialPersonSection,
    credits: [
      {
        label: pickText(locale, creditLabels.releaseDate),
        values: [thoughtsRelease.releaseDate],
      },
      {
        label: pickText(locale, creditLabels.artists),
        values: artists,
      },
      {
        label: pickText(locale, creditLabels.mastering),
        values: [credits.mastering ?? "—"],
      },
      {
        label: pickText(locale, creditLabels.illustration),
        values: [credits.illustrator ?? "—"],
      },
      {
        label: pickText(locale, creditLabels.design),
        values: [credits.designer ?? "—"],
      },
      {
        label: pickText(locale, creditLabels.webDesign),
        values: ["wheatfox"],
      },
    ] satisfies ThoughtsSpecialCreditGroup[],
  };
}
