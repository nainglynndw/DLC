const Quiz = [
  {
    title: "က", //used as main title in homescreen
    id: 1, //just main id

    data: [
      //used as each lesson data
      {
        id: 1, //lesson id
        name: "၁", //lesson number for view in homescreen
        sub: "၁", //lesson sub title
        type: "Tracing", //lesson type
        data: require("../assets/lesson_gif/1.ka_gyi.gif"), //used to construct UI and question data
        question: "", //used as question to view
        answer: "", //used  to check answer
        anim: require("../assets/Animal/cat.json"), // users as lesson animation in homescreen
        sound: require("../assets/Music/sound/1.ka.mp3"),
      },
      {
        id: 2,
        name: "၁",
        sub: "၂",
        type: "Train",
        data: ["က", "တ", "ဃ", "ထ", "က", "ယ", "တ", "ယ", "က", "ယ", "သ", "က"],
        question: "က",
        answer: "က",
        anim: require("../assets/Animal/baby.json"),
        sound: require("../assets/Music/sound/1.ka.mp3"),
      },
      {
        id: 3,
        name: "၁",
        sub: "၃",
        type: "Matching",
        data: [
          {
            anim: require("../assets/Animal/baby.json"),
            title: "ကလေး",
            id: "က",
          },
          {
            anim: require("../assets/Animal/dog.json"),
            title: "ခွေး",
            id: "ခ",
          },
        ],
        question: "က",
        answer: "က",
        anim: require("../assets/Animal/dance.json"),
        sound: require("../assets/Music/sound/1.ka.mp3"),
      },
      {
        id: 4,
        name: "၁",
        sub: "၄",
        type: "DnD",
        data: [
          { id: "က", img: require("../assets/dropItems/star.png") },
          { id: "ဂ", img: require("../assets/dropItems/moon.png") },
          { id: "ယ", img: require("../assets/dropItems/sun.png") },
          { id: "င", img: require("../assets/dropItems/cloud.png") },
        ],
        question: "က",
        answer: "က",
        anim: require("../assets/Animal/crab.json"),
        sound: require("../assets/Music/sound/1.ka.mp3"),
      },
    ],
  },
  {
    title: "ခ",
    id: 2,
    data: [
      {
        id: 1,
        name: "၂",
        sub: "၁",
        type: "Tracing",
        data: require("../assets/lesson_gif/2.kha_kway.gif"),
        question: "ခ",
        answer: "ခ",
        anim: require("../assets/Animal/dog.json"),
      },
      {
        id: 2,
        name: "၂",
        sub: "၂",
        type: "Train",
        data: ["ခ", "ဆ", "စ", "စ", "ေ", "ခ", "င", "ခ", "၁", "ဆ", "ပ", "ခ"],
        question: "ခ",
        answer: "ခ",
        anim: require("../assets/Animal/fork.json"),
      },
      {
        id: 3,
        name: "၂",
        sub: "၃",
        type: "Matching",
        data: [
          {
            anim: require("../assets/Animal/guitar.json"),
            title: "ကလေး",
            id: "က",
          },
          {
            anim: require("../assets/Animal/dog.json"),
            title: "ခွေး",
            id: "ခ",
          },
        ],
        question: "ခ",
        answer: "ခ",
        anim: require("../assets/Animal/dance.json"),
      },
    ],
  },
  {
    title: "ဂ",
    id: 3,
    data: [
      {
        id: 1,
        name: "၃",
        sub: "၁",
        type: "Tracing",
        data: require("../assets/lesson_gif/3.ga_ngal.gif"),
        question: "ဂ",
        answer: "ဂ",
        anim: require("../assets/Animal/guitar.json"),
      },
      {
        id: 2,
        name: "၃",
        sub: "၂",
        type: "Train",
        data: ["ဂ", "ပ", "င", "င", "ပ", "ဂ", "က", "ဂ", "၁", "ဂ", "ယ", "ခ"],
        question: "ဂ",
        answer: "ဂ",
        anim: require("../assets/Animal/crab.json"),
      },
      {
        id: 3,
        name: "၃",
        sub: "၃",
        type: "Matching",
        data: [
          {
            anim: require("../assets/Animal/crab.json"),
            title: "ကလေး",
            id: "ဂ",
          },
          {
            anim: require("../assets/Animal/dog.json"),
            title: "ခွေး",
            id: "ခ",
          },
        ],
        question: "ဂ",
        answer: "ဂ",
        anim: require("../assets/Animal/golf.json"),
      },
    ],
  },
  {
    title: "င",
    data: [
      {
        id: 1,
        name: "၄",
        sub: "၁",
        type: "Tracing",
        data: "1",
        question: "င",
        answer: "င",
        anim: require("../assets/Animal/guitar.json"),
      },
      {
        id: 2,
        name: "၄",
        sub: "၂",
        type: "Train",
        data: ["ဂ", "ပ", "င", "င", "၁", "ပ", "ပ", "ဝ", "င", "၁", "ယ", "င"],
        question: "င",
        answer: "င",
        anim: require("../assets/Animal/crab.json"),
      },
      {
        id: 3,
        name: "၄",
        sub: "၃",
        type: "Matching",
        data: [
          {
            anim: require("../assets/Animal/baby.json"),
            title: "ကလေး",
            id: "က",
          },
          {
            anim: require("../assets/Animal/chili.json"),
            title: "ငရုတ်သီး",
            id: "င",
          },
        ],
        question: "င",
        answer: "င",
        anim: require("../assets/Animal/golf.json"),
      },
    ],
  },
  {
    title: "စ",
    data: [
      {
        id: 1,
        name: "၅",
        sub: "၁",
        type: "Tracing",
        data: "1",
        question: "စ",
        answer: "စ",
        anim: require("../assets/Animal/chili.json"),
      },
      {
        id: 2,
        name: "၅",
        sub: "၂",
        type: "Train",
        data: ["စ", "ဓ", "ဇ", "ခ", "ဓ", "စ", "ပ", "စ", "ဇ", "ဆ", "ပ", "စ"],
        question: "စ",
        answer: "စ",
        anim: require("../assets/Animal/book.json"),
      },
      {
        id: 3,
        name: "၅",
        sub: "၃",
        type: "Matching",
        data: [
          {
            anim: require("../assets/Animal/book.json"),
            title: "စာအုပ်",
            id: "စ",
          },
          {
            anim: require("../assets/Animal/cloud.json"),
            title: "တိမ်",
            id: "တ",
          },
        ],
        question: "စ",
        answer: "စ",
        anim: require("../assets/Animal/dance.json"),
      },
    ],
  },
];

export { Quiz };
