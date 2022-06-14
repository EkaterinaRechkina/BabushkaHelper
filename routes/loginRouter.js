const { Router } = require("express");
// const { Post } = require("../db/models");

const router = Router();



router.get('/login', (req, res) => {
  res.render('users/login');
})




module.exports = router;
