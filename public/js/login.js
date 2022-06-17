console.log("helllooow LOGIIIN");

const form = document.querySelector("form");
const errorUser = document.querySelector(".errorUser");
// console.log(form, "form");
form.addEventListener("submit", async (event) => {
  // * Если event.preventDefault() - то форма не отправляется,
  // * стр. не перезагружается, запись в БД не создаётся
  event.preventDefault();

  const granny_name = event.target.username.value; //по назв инпута
  console.log(granny_name, "===========12");
  const password = event.target.password.value;
  const bodyObj = { granny_name, password};

  console.log(bodyObj);

  const response = await fetch("/login", {
    //!адрес с action из формы\

    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  });
    console.log(response, 'response', response.ok)
  if(response.ok){

    localStorage.setItem('user', 'user');

    window.location = "/"
  //  const result = await response.json()//с сервера
  } else {
    console.log("что-то не так");
    errorUser.innerText = "Такого пользователя нет.Зарегистрируйтесь!";
  }
});
