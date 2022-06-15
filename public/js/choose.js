const granny = document.getElementById("granny");
const child = document.getElementById("child");
const grannyForm = document.querySelector(".grannyForm");
const choose = document.querySelector(".choose");

console.log(granny);
granny.addEventListener("click", (event) => {
  event.preventDefault();
  grannyForm.style.display = "block";
  choose.style.display = "none";
  console.log("adddddddd");
});
