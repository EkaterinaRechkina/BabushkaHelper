// const { postForm } = document.forms;
// const container = document.querySelector("#container");
console.log('helllooow');


// const API_URL = '/'
const form = document.querySelector('form');


form.addEventListener('submit', async (event) => {
  // * Если event.preventDefault() - то форма не отправляется,
  // * стр. не перезагружается, запись в БД не создаётся
  event.preventDefault();
  const title = event.target.username.value;
  const text = event.target.password.value;
  // console.log('значения', username, password);
  const boyObj = { username, password};
  const response = await fetch('/registration', {//!адрес с action из формы
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(boyObj),
  });
console.log(response, 'response', response.ok)
  if(response.ok){
    window.location = "/" //
  } else {
   console.log('что-то не так')

  }
  

 
});
