const popup = document.querySelector(".modal");
const popupImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  popup.style.display = "none";
};

//   if (event.key === "Escape") {
//     closePopup();
//   }

document.querySelectorAll("#myImg").forEach((item) => {
  item.addEventListener("click", (event) => {
    popup.style.display = "block";
    popupImg.src = event.target.src;
    captionText.innerHTML = event.target.alt;
  });
});
