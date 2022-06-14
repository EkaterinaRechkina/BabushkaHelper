const { Router } = require("express");
// const { Post } = require("../db/models");



const router = Router();


router.get('/register', (req, res) => {
  res.render('users/registration');
})





module.exports = router;
