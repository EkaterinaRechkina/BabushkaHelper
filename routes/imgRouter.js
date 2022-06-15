const { Router } = require("express");
// const multer = require("multer");
const { Library } = require("../db/models");
const path = require("path");

const router = Router();

// const uploadPath = "public/img";
// let imgName;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     imgName = file.originalname;
//     cb(null, imgName);
//   },
// });

// const upload = multer({ storage });

router.post("/", async (req, res) => {
  granny_id = 1;
  // const test = res.locals.granny_id;
  // console.log("test", test);
  const { title, imgPath } = req.body;
  const newImg = await Library.create({
    title: title,
    image: imgPath,
    granny_id,
  });
  res.json({ status: true });
});

module.exports = router;
