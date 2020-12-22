import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp");

const deactivationPlayer = () => {
  temp.style.display = "none";
  playerBtn.forEach(item => item.classList.remove("active"));
  playerBlock.forEach(item => item.classList.remove("active"));
}; // скрытие неактивного плеера

playerBtn.forEach((btn, index) => btn.addEventListener("click", () => {
  deactivationPlayer();
  btn.classList.add("active");
  playerBlock[index].classList.add('active');
})); // отображение выбранного плеера при нажатии на соответсвующую ему кнопку

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();