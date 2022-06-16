const { Router } = require("express");
const {  Granny, Grandchild} = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')
// //!для хэширования паролей:
const bcrypt = require('bcrypt');
const saltRounds = 10;
//
const router = Router();

router.get("/registration", (req, res) => {
  res.render("./users/registration");
});

// router.get('/registrationChild', (req, res) => {
//   res.render('users/registration');
// })

router.post('/registration/child', async (req, res) => {
  const { granny_name, password, name } = req.body      //достаем из инпута данные пользователя
  console.log(req.body, '---------------BACK');
  try {
    
    const checkUser = await Grandchild.findOne({where: {granny_name}})  // проверяем в БД наличие повторений  почты
    //!хэширование пароля
    
    //проверяем, есть ли в БД такой логин и пароль при регистрации
    if(!checkUser){
      
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const newUser = await Grandchild.create({       //создаем нового юзера
          granny_name, password: hashedPassword, name: name  //!вместо пароля передаем наш захэшированный пароль
        })

        //* вот тут вот создается сессия
          req.session.granny_name = newUser.granny_name // добавляем в сессию айди нового юзера
          req.session.userId = newUser.id // добавляем в сессию айди нового юзера
          
          // console.log(reg.session);
        
          res.sendStatus(200)
    } else { return res.sendStatus(401)//ошибка при неправильном пароле или логине 
   

  } 
} catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
  })
  

module.exports = router;
