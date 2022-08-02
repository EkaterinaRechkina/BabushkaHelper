console.log("helllooow CHILD");
const errorChild = document.querySelector("#errorChild");
const { formChild } = document;

formChild.addEventListener("submit", async (event) => {

  event.preventDefault();

  const granny_name = event.target.usernameChild.value; //по назв инпута
  const password = event.target.passwordChild.value;
  const name = event.target.nickNameChild.value;

  const bodyObj = { granny_name, password, name };

  const action = event.target.action; //из формы action
  const response = await fetch(action, {

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
    console.log("что-то не так");
    errorChild.innerText =
      "Что-то пошло не так, проверьте, что поля заполнены и такая бабушка зарегистрирована";
  }
});
