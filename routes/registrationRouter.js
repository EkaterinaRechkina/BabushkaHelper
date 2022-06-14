const { Router } = require("express");
// const { Post } = require("../db/models");

const router = Router();



router.get('/registration', (req, res) => {
  res.render('users/registration');
})




module.exports = router;
