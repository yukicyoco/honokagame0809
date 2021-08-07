"use strict";

{
  class Panel {
    constructor() {
      const section = document.createElement("section");
      section.classList.add("panel");

      this.img = document.createElement("img");
      // this.img.src = 'img/seven.png';★リロードする度にランダムなイメージを↓
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement("div");
      this.stop.textContent = "STOP";
      this.stop.classList.add("stop", "inactive"); //spin押してない時はinactive

      //ストップボタンの作動追加
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");
        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove("inactive"); //何度も遊べるように
          panelsLeft = 3;
        }
      });

      //imgとstopをsectionの子要素として追加/
      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      //mainにsection追加//
      main.appendChild(section);
      //ここを記述したら、htmlのmainの「section」内容をすべて削る
    }

    getRandomImage() {
      const images = ["img/ほのかaa.jpg", "img/だいきaa.jpg", "img/たびaa.jpg"];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      //スピンの処理を一定時間ごとに繰り返す処理
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src){
      //   return true;
      // }else{
      //   return false;
      // }
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add("unmatched");
    }

    activate() {
      this.img.classList.remove("unmatched");
      this.stop.classList.remove("inactive");
    }
  }

  // パネル同士を比較する処理なのでpanelsの外に書く
  //他の２枚とマッチしなかった場合
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    //panelインスタンスの生成→今回定数にする必要はないので直接
    //ここの操作で画面に要素が追加され画像が表示される
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  //あといくつ動いているパネルが残っているか変数で保持
  let panelsLeft = 3;

  const spin = document.getElementById("spin");
  spin.addEventListener("click", () => {
    //inactiveがついていたらそれ以上の処理をしないように
    if (spin.classList.contains("inactive")) {
      return;
    }
    spin.classList.add("inactive");
    panels.forEach((panel) => {
      panel.activate();
      panel.spin();
    });
  });
}
