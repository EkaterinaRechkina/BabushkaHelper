const granny = document.getElementById("granny");
const child = document.getElementById("child");
const grannyForm = document.querySelector(".grannyForm");
const childForm = document.querySelector(".childForm");
const choose = document.querySelector(".choose");

granny.addEventListener("click", (event) => {
  event.preventDefault();
  grannyForm.style.display = "block";
  choose.style.display = "none";
  console.log("adddddddd");
});

child.addEventListener("click", (event) => {
  event.preventDefault();
  childForm.style.display = "block";
  choose.style.display = "none";
  console.log("adddddddd");
});
