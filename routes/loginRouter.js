const { Router } = require("express");
// const { Post } = require("../db/models");

const router = Router();



router.get('/', (req, res) => {
  res.render('users/login');
})


router.post('/', (req, res) => {


  res.render('./grannyMain')
})



module.exports = router;
