const { Router } = require("express");
const { Library } = require("../db/models");
const path = require("path");

const router = Router();

router.post("/", async (req, res) => {
  const grannyId = res.locals.id;
  console.log("test", grannyId);
  const { title, imgPath } = req.body;
  const newImg = await Library.create({
    title: title,
    image: imgPath,
    granny_id: grannyId,
  });
  res.json({ status: true });
});

module.exports = router;
