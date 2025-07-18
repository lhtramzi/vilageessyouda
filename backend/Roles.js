// backend/roles.js

Const defaultRoles = [
  {
    Name : " قروي بسيط ",
    Key : " villageois ",
    Description : " هدفك البحث عن المستذئبين ",
    Image : " villageois.png "
  },
  {
    Name : " ذئب عادي ",
    Key : " loup_garou ",
    Description : " يختار مع مجموعة الذئاب شخصًا لقتله ",
    Image : " loup_garou.png "
  },
  {
    Name : " ذئب أسود ",
    Key : " loup_noir ",
    Description : " يسكت أحد القرويين لكي لا يدافع عن نفسه أو يتهم آخر ",
    Image : " loup_noir.png "
  },
  {
    Name : " ذئب أزرق ",
    Key : " loup_bleu ",
    Description : " لا تراه العرافة في المرة الأولى ",
    Image : " loup_bleu.png "
  },
  {
    Name : " الحامي ",
    Key : " protector ",
    Description : " يحمي شخصًا ويمكنه حماية نفسه بشرط عدم التكرار المتتالي ",
    Image : " protector.png "
  },
  {
    Name : " العرافة ",
    Key : " seer ",
    Description : " تكتشف هوية أحد الأشخاص كل ليلة ",
    Image : " seer.png "
  },
  {
    Name : " الساحرة ",
    Key : " witch ",
    Description : " تلغي هجمة الذئاب مرتين : مرة لنفسها ومرة لغيرها ",
    Image : " witch.png "
  },
  {
    Name : " القاضي ",
    Key : " judge ",
    Description : " يحسم قرار التصويت في حالة التعادل ",
    Image : " judge.png "
  },
  {
    Name : " السارق ",
    Key : " thief ",
    Description : " يسرق دور شخص آخر في اللعبة ",
    Image : " thief.png "
  },
  {
    Name : " الصياد ",
    Key : " hunter ",
    Description : " إذا مات، يأخذ معه شخصًا آخر ",
    Image : " hunter.png "
  },
  {
    Name : " ماوكلي ",
    Key : " mowgli ",
    Description : " يتحول إلى ذئب إذا مات أبوه بالتصويت ",
    Image : " mowgli.png "
  },
  {
    Name : " أب ماوكلي ",
    Key : " mowgli_father ",
    Description : " إذا مات، يتحول ماوكلي إلى ذئب ",
    Image : " mowgli_father.png "
  },
  {
    Name : " الغراب ",
    Key : " corbeau ",
    Description : " يحمى من أول هجوم عليه ",
    Image : " corbeau.png "
  },
  {
    Name : " العاشقة ",
    Key : " amoureuse ",
    Description : " تختار شخصين يصبحان عشيقين ويدافعان عن بعضهما ",
    Image : " amoureuse.png "
  },
  {
    Name : " الفضائي ",
    Key : " extra ",
    Description : " يكشف أدوار الآخرين، وإذا أخطأ مرتين يُقصى من اللعبة ",
    Image : " extra.png "
  }
] ;

Module.exports = defaultRoles ;
