const presentButton = document.querySelector("#presentButton");
const presentVideo = document.querySelector("#presentVideo");

presentButton.addEventListener("click", function () {
  console.log("present", presentButton, presentVideo);
  presentVideo.style.display = "block";
});
