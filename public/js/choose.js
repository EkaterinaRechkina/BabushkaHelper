const granny = document.getElementById("granny");
const child = document.getElementById("child");
const grannyForm = document.querySelector(".grannyForm");
const childForm = document.querySelector(".childForm");
const choose = document.querySelector(".choose");

granny.addEventListener("click", (event) => {
  event.preventDefault();
  grannyForm.style.display = "block";
  choose.style.display = "none";
});

child.addEventListener("click", (event) => {
  event.preventDefault();
  childForm.style.display = "block";
  choose.style.display = "none";
});

document.querySelectorAll(".back").forEach((item) => {
  item.addEventListener("click", (event) => {
    grannyForm.style.display = "none";
    childForm.style.display = "none";
    choose.style.display = "flex";
  });
});
