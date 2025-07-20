// backend/roles.js

const defaultRoles = [
  {
    name: "قروي بسيط",
    key: "villageois",
    description: "هدفك البحث عن المستذئبين",
    image: "villageois.png"
  },
  {
    name: "ذئب عادي",
    key: "loup_garou",
    description: "يختار مع مجموعة الذئاب شخصًا لقتله",
    image: "loup_garou.png"
  },
  {
    name: "ذئب أسود",
    key: "loup_noir",
    description: "يسكت أحد القرويين لكي لا يدافع عن نفسه أو يتهم آخر",
    image: "loup_noir.png"
  },
  {
    name: "ذئب أزرق",
    key: "loup_bleu",
    description: "لا تراه العرافة في المرة الأولى",
    image: "loup_bleu.png"
  },
  {
    name: "الحامي",
    key: "protector",
    description: "يحمي شخصًا ويمكنه حماية نفسه بشرط عدم التكرار المتتالي",
    image: "protector.png"
  },
  {
    name: "العرافة",
    key: "seer",
    description: "تكتشف هوية أحد الأشخاص كل ليلة",
    image: "seer.png"
  },
  {
    name: "الساحرة",
    key: "witch",
    description: "تلغي هجمة الذئاب مرتين: مرة لنفسها ومرة لغيرها",
    image: "witch.png"
  },
  {
    name: "القاضي",
    key: "judge",
    description: "يحسم قرار التصويت في حالة التعادل",
    image: "judge.png"
  },
  {
    name: "السارق",
    key: "thief",
    description: "يسرق دور شخص آخر في اللعبة",
    image: "thief.png"
  },
  {
    name: "الصياد",
    key: "hunter",
    description: "إذا مات، يأخذ معه شخصًا آخر",
    image: "hunter.png"
  },
  {
    name: "ماوكلي",
    key: "mowgli",
    description: "يتحول إلى ذئب إذا مات أبوه بالتصويت",
    image: "mowgli.png"
  },
  {
    name: "أب ماوكلي",
    key: "mowgli_father",
    description: "إذا مات، يتحول ماوكلي إلى ذئب",
    image: "mowgli_father.png"
  },
  {
    name: "الغراب",
    key: "corbeau",
    description: "يحمى من أول هجوم عليه",
    image: "corbeau.png"
  },
  {
    name: "العاشقة",
    key: "amoureuse",
    description: "تختار شخصين يصبحان عشيقين ويدافعان عن بعضهما",
    image: "amoureuse.png"
  },
  {
    name: "الفضائي",
    key: "extra",
    description: "يكشف أدوار الآخرين، وإذا أخطأ مرتين يُقصى من اللعبة",
    image: "extra.png"
  }
];

module.exports = defaultRoles;
