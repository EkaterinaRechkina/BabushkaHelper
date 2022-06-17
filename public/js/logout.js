const logoutBtn = document.getElementById('logout')

logoutBtn.addEventListener('click', async () => {

const response = await fetch('/logout',
    {
      method: "GET",
      credentials: "include",
      headers: {
      "Content-type": "application/json",
    },

  });
  if(response.ok){

    localStorage.removeItem('user')

    window.location = "/" //
  } else {
   console.log('что-то не так')

  }
    }
  )

