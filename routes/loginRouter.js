const { Router } = require("express");
const {  Granny, Grandchild} = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')
const router = Router();

//!для хэширования паролей:
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res) => {
  res.render('users/login');
})

router.post('/', async(req, res) => {
  const { granny_name, password} = req.body
console.log(req.body);
  try {
   const user = await Granny.findOne({
        where: {
          granny_name,
        },
      })
  console.log(user)
  
  //сначала проверяем по логину в базе
      if(!user) {
        // throw Error('такого логина нет...')
        return res.render('error', {
          message: 'упс...такого логина не существует...(((',
          error: {}
        });
         }
   
  
  const isValidPass = await bcrypt.compare(password, user.password)//расхэшируем пароль
  
   //затем проверяем пароль 
  if(!isValidPass) {
    // throw Error('неправильный пароль...')
    return res.render('error', { //TODO return обязателен везде!
      message: '!!!неправильный пароль...попробуйте еще',
      error: {}
    });
    // res.render('/error')
  
    //если прошли роверки на логин и пароль, создаем сессию
  } else {
    req.session.granny_name = user.granny_name // добавляем в сессию айди нового юзера
    // // console.log(reg.session);
   
  
    res.redirect('/')
    
  }
   



} catch (error) {
    console.error(error)
  }
})

//!убить куки и сессию
router.get('/logout', checkIsNotSession, (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.COOKIE_NAME)
  
  res.render('/')
})


// router.post('/', (req, res) => {


//   res.render('./grannyMain')
// })


module.exports = router;
