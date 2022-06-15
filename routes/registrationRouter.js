const { Router } = require("express");
const {  Granny, Grandchild} = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')
//!для хэширования паролей:
const bcrypt = require('bcrypt');
const saltRounds = 10;
//
const router = Router();

router.get('/registration', (req, res) => {
  res.render('./users/registration')
});

router.get('/registration', (req, res) => {
  res.render('users/registration');
})


router.post('/registration', async (req, res) => {
  const {granny_name,  password } = req.body      //достаем из инпута данные пользователя
  console.log(req.body);
  try {
    
    const checkUser = await Granny.findOne({where: {granny_name}})  // проверяем в БД наличие повторений  почты
    //!хэширование пароля
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    //проверяем, есть ли в БД такой логин и почта при регистрации
    if(!checkUser){
    
      const newUser = await Granny.create({       //создаем нового юзера
          granny_name, password: hashedPassword   //!вместо пароля передаем наш захэшированный пароль
        })

        //* вот тут вот создается сессия
          req.session.granny_name = newUser.granny_name // добавляем в сессию айди нового юзера
          // console.log(reg.session);
        
          res.redirect('/')
    } else { return res.render('error', {
      message: 'упс...такой емайл уже есть...(((',
      error: {}
    });}
   
    
    
    
  } catch (error) {
    console.log(error)
  }
  })
  




module.exports = router;
