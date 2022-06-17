console.log("helllooow CHILD");
const errorChild = document.querySelector("#errorChild");
const { formChild } = document;
console.log(formChild, "formChild");

formChild.addEventListener("submit", async (event) => {
  // * Если event.preventDefault() - то форма не отправляется,
  // * стр. не перезагружается, запись в БД не создаётся
  event.preventDefault();

  const granny_name = event.target.usernameChild.value; //по назв инпута
  const password = event.target.passwordChild.value;
  const name = event.target.nickNameChild.value;

  const bodyObj = { granny_name, password, name };
  console.log(bodyObj, "JS+++++++++++++++++++++");

  const action = event.target.action; //из формы action
  const response = await fetch(action, {
    //!адрес с action из формы\

    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  });
  console.log(response, "response", response.ok);
  if (response.ok) {
    localStorage.setItem("user", "user");

    window.location = "/"; //
  } else {
    console.log("что-то не так");
    errorChild.innerText =
      "Что-то пошло не так, проверьте, что поля заполнены и такая бабушка зарегистрирована";
  }
});
