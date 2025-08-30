class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music("Sultân-ı Yegâh", "Tuğçe", "1.png", "1.mp3"),
  new Music("Yaşım Çocuk", "Tuğçe", "2.png", "2.mp3"),
];
