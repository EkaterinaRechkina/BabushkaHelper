//Распознаем изображение
// import Tesseract from "tesseract.js";

const log = document.getElementById("log");
const pre = document.getElementsByClassName("pre");
function recognize(file, lang, logger) {
  return Tesseract.recognize(file, lang, { logger }).then(
    ({ data: { text } }) => {
      return text;
    }
  );
}

function updateProgress(data) {
  log.innerHTML = "";
  const statusText = document.createTextNode(data.status);
  const progress = document.createElement("progress");
  progress.max = 1;
  progress.value = data.progress;
  log.appendChild(statusText);
  log.appendChild(progress);
}

function setResult(text) {
  log.innerHTML = "";
  text = text.replace(/\n\s*\n/g, "\n");
  // const pre = document.createElement("pre");
  pre.innerHTML = text;
  //   log.appendChild(pre);
  log.append(pre.innerHTML);
  console.log("pre", pre);
}

document.querySelector(".start").addEventListener("click", () => {
  const file = document.getElementById("file").files[0];
  if (!file) return;
  const lang = document.getElementById("langs").value;

  recognize(file, lang, updateProgress).then(setResult);
  console.log(log);
});

let lang = "ru-RU"; // Задаём стандартный язык произношения

let main = document.querySelector(".main"); // Получаем главное меню
let sel = document.querySelector("#lang"); // Получаем селектор для наполнение
let land = window.speechSynthesis.getVoices(); // Тестовый вызов для получения языков(Так как speech с 2018 года работает исключительно по активации.
activate.onclick = function () {
  // При нажатии на кнопку
  let reactivate = window.speechSynthesis.getVoices(); // Реактивируем получения языков воспроизводимости
  reactivate.forEach(function (c) {
    //Для каждого элемента
    let opt = document.createElement("option"); // Создаём option
    opt.value = c.lang; // В value помещяем код языка
    opt.innerText = c.name; // В текст option название языка
    sel.appendChild(opt); // Добавляем в селект
  });
  // document.querySelector("#activate").style.display = "none"; // Скрываем начальную кнопку
  main.style.display = "block"; // Показываем основной блок
};

sel.onchange = function () {
  // При выборе селекта
  lang = this.value; // Меняем язык на выбранный
};
const speech = window.speechSynthesis; // Объявляем переменные
function speak() {
  window.speechSynthesis.cancel();

  // Функция речи
  let voices;
  let voice = "";
  let ourvoice = []; // Сюда будем складывать доступные звуки браузера
  if (!ourvoice.length) {
    // Если равно нулю, то...
    voices = speech.getVoices(); // Получаем все языки
    console.log("length", voices.length);
  }

  for (let i = 0; i < voices.length; i++) {
    // Находим указанный в списке
    if (lang == voices[i].lang) {
      voice = voices[i]; // Ставим язык как параметр
    }
  }

  const readme = new SpeechSynthesisUtterance(pre.innerHTML); // вводим текст
  console.log("readme", readme);
  readme.voice = voice; // Задаём язык произношения
  console.log(readme.voice);

  speech.speak(readme); // Произносим
  window.speechSynthesis.resume();

  setInterval(() => {
    speechSynthesis.pause();
    speechSynthesis.resume();
  }, 5000);
}

const sound = document.getElementById("sound");

sound.addEventListener("click", speak);

const myImg = document.querySelector(".img");

myImg.onchange = function (event) {
  const target = event.target;

  if (!FileReader) {
    alert("FileReader не поддерживается — облом");
    return;
  }

  if (!target.files.length) {
    alert("Ничего не загружено");
    return;
  }

  let fileReader = new FileReader();
  fileReader.onload = function () {
    img1.src = fileReader.result;
  };

  fileReader.readAsDataURL(target.files[0]);
};

const title = document.querySelector(".title");
const instructions = document.querySelector(".instructions");
title.addEventListener("click", () => {
  // instructions.style.display = "block";
  instructions.style.cssText =
    " background-color: white;opacity: 0.8;display: block;";
});

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  // instructions.style.d = "hidden";
  // instructions.remove();
  instructions.style.cssText = "display: none;";
});
