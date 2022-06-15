// const { postForm } = document.forms;
// const container = document.querySelector("#container");
console.log("helllooow");

const form = document.querySelector("form");

console.log(form, "form");
form.addEventListener("submit", async (event) => {
  // * Если event.preventDefault() - то форма не отправляется,
  // * стр. не перезагружается, запись в БД не создаётся
  event.preventDefault();

  const granny_name = event.target.username.value; //по назв инпута
  const password = event.target.password.value;
  // console.log('значения', username, password);
  const bodyObj = { granny_name, password };
  console.log(bodyObj);

  const response = await fetch("/registration", {
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
    window.location = "/"; //
  } else {
    console.log("что-то не так");
  }
});
