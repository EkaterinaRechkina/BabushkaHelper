const { Router } = require("express");
const { append } = require("express/lib/response");

const router = Router();

router.get("/", (req, res) => {
  res.render("grannyMain");
});

module.exports = router;
