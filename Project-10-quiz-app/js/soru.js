function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

const soruListesi = [
  new Soru(
    "1- Hangisi Javascript paket yönetim uygulamasıdır?",
    { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" },
    "d"
  ),
  new Soru(
    "2- Hangisi frontend kapsamında değerlendirilmez?",
    { a: "css.js", b: "html", c: "javascript", d: "sql" },
    "d"
  ),
  new Soru(
    "3- Hangisi backend kapsamında değerlendirilir?",
    { a: "Node.js", b: "Typescript", c: "Angular", d: "React" },
    "a"
  ),
  new Soru(
    "4- Hangisi javascript programlama dilini kullanmaz?",
    { a: "React", b: "Angular", c: "Vue.js", d: "asp.net" },
    "d"
  ),
];
