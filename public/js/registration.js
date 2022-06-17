const form = document.querySelector("form");
const errorGranny = document.querySelector(".errorGranny");

form.addEventListener("submit", async (event) => {
  // * Если event.preventDefault() - то форма не отправляется,
  // * стр. не перезагружается, запись в БД не создаётся
  event.preventDefault();

  const granny_name = event.target.username.value; //по назв инпута
  const password = event.target.password.value;
  const bodyObj = { granny_name, password };

  const response = await fetch("/registration/granny", {
    //!адрес с action из формы\

    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  });
  if (response.ok) {
    localStorage.setItem("user", "user");

    window.location = "/";
  } else {
    errorGranny.innerText = "Пользователь с таким именем уже сушествует";
  }
});
