const { postForm, editForm } = document.forms // достаю все инпуты из форм
const container = document.querySelector('#container'); // выделяю нужный див по id
const API_URL = '/allPosts'

const editEntryForm = document.querySelector('#editEntryForm');

const createCard = ({ title, id, image }) =>
`<div data-card class="col-3">
<div class="card">
<img src=${image} class="card-img-top" alt={{title}} />
<div class="card-body">
  <h5 class="card-title">${title}</h5>
  <a href="/post/${id}" class="btn btn-card btn-success">Изменить</a>
  <button data-danger=${id} type="button" class="btn btn-danger btn-card ">Удалить</button>
</div>
</div>`



postForm?.addEventListener('submit', async (event) => { // ставлю ивент листнер на всю форму
  event.preventDefault()
  console.log(event.target); // прекращение отправки формы по умолчанию
  const { action, method } = event.target // из инпута пользователя event.target я достаю action и method
  try {
    const formData = new FormData(event.target) // это прототип из пришедшего event.target
    const data = Object.fromEntries(formData)// преобразовывает в объект форму
    const response = await fetch(action, { // обращение на ручку, то есть на значение action
      method, // метод тоже передастся сам
      headers: {
        'Content-Type': 'application/json', // мы посылаем в fetch чтобы данные записались в базу данных и вернулись оттуда запросом
      },
      body: JSON.stringify(data), // fetch встроенный адрес
    })
    if (response.ok) {
      const result = await response.json()// объект со значккениями
      container.insertAdjacentHTML('afterbegin', createCard(result)) // применяем к div контейнеру выбранному свойство вовнутрь всавляем созданный со всеми элементами базы
      event.target.reset() // очищвет поле
    }
  } catch (error) {
    console.log(error);
  }
});


// editEntryForm?.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const response = await fetch(`/entries/${event.target.dataset.entryid}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       title: event.target.title.value,
//       body: event.target.body.value
//     })
//   });

//   const responseJson = await response.json();

//   if (!responseJson.isUpdateSuccessful) {
//     const errorDiv = document.createElement('div');
//     errorDiv.classList.add('error');
//     errorDiv.innerText = responseJson.errorMessage;
//     event.target.parentElement.append(errorDiv);
//     return;
//   }

//   window.location = `/entries/${responseJson.entryID}`;
// });

console.log(editForm);

editForm?.addEventListener('submit', async (event) => { // ставлю ивент листнер на всю форму
  event.preventDefault()
  console.log(event.target.id);
  const { action, method } = event.target // из инпута пользователя event.target я достаю action и method
  try {
    const formData = new FormData(event.target) // это прототип из пришедшего event.target
    const data = Object.fromEntries(formData)// преобразовывает в объект форму

    const response = await fetch(`/allPosts/${event.target.id}`, { // обращение на ручку, то есть на значение action
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.target.title.value,
        image: event.target.image.value
      })
      // fetch встроенный адрес
    })

    if (response.ok) {
      const result = await response.json()// объект со значккениями
      container.insertAdjacentHTML('afterbegin', createCard(result)) // применяем к div контейнеру выбранному свойство вовнутрь всавляем созданный со всеми элементами базы
      event.target.reset() // очищвет поле
    }

    } catch (error) {
    console.log(error);
    }

    window.location = `/allPosts`;
});



container?.addEventListener('click', async (event) => {
  const { danger } = event.target.dataset

  if (danger) {
    const response = await fetch(`${API_URL}/${danger}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      const card = event.target.closest('[data-card]') //удаляем через дата карту
      card.remove()
    }
  }
})

