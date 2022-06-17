const log = document.getElementById("log");
const pre = document.getElementsByClassName("pre");
const lang = "ru-RU";
let main = document.querySelector(".main"); // Получаем главное меню
let land = window.speechSynthesis.getVoices(); // Тестовый вызов для получения языков(Так как speech с 2018 года работает исключительно по активации.
const sound = document.getElementById("sound");
const myImg = document.querySelector(".img");
const uploadForm = document.querySelector("#upload");
const title = document.querySelector(".title");
const instructions = document.querySelector(".instructions");
const closeBtn = document.querySelector(".closeInstruction");
const presentButton = document.querySelector("#presentButton");
const presentVideo = document.querySelector("#presentVideo");

const containerMain = document.getElementById("container-main");
const startBtn = document.querySelector(".start");
const errorLogin = document.querySelector(".errorLogin");

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

startBtn.addEventListener("click", () => {
  const file = document.getElementById("file").files[0];
  if (!file) return;
  const lang = document.getElementById("langs").value;

  recognize(file, lang, updateProgress).then(setResult);
  console.log(log);
});

// Задаём стандартный язык произношения

activate.onclick = function () {
  // При нажатии на кнопку
  let reactivate = window.speechSynthesis.getVoices(); // Реактивируем получения языков воспроизводимости
  main.style.display = "block"; // Показываем основной блок
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

sound.addEventListener("click", speak);

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

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const btn = event.target;
  const img = event.target.myImg.value;
  console.log("img", img);
  const title = img.slice(12);
  console.log(title);
  const imgPath = `/img/${title}`;
  console.log(imgPath);
  const response = await fetch("/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, imgPath }),
  });

  console.log("response", response);
  const res = await response.json();
  console.log("res", res);
});

title.addEventListener("click", () => {
  title.style.display = "none";
  instructions.style.cssText = " background-color: white;display: block;";
});

closeBtn.addEventListener("click", () => {
  title.style.display = "block";
  instructions.style.cssText = "display: none;";
});

console.log(presentButton, presentVideo);

presentVideo.style.display = "none";
presentButton.addEventListener("click", function () {
  presentVideo.style.display = "block";
});
containerMain.addEventListener("click", () => {
  if (!localStorage.getItem("user")) {
    myImg.disabled = true;
    startBtn.disabled = true;
    sound.disabled = true;
    errorLogin.style.display = "block";
    errorLogin.innerHTML = "Пожалуйста, войдите или зарегистрируйтесь.";
  }
});
