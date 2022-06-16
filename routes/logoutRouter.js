const { Router } = require("express");
const {  Granny, Grandchild} = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares');
const { route } = require("./registrationRouter");
const router = Router();

//!убить куки и сессию
router.get('/', checkIsSession, (req, res) => {
  console.log('DO');
  req.session.destroy();
  console.log('posle');
  res.clearCookie(process.env.COOKIE_NAME)
  res.json('200')
})


module.exports = router;
