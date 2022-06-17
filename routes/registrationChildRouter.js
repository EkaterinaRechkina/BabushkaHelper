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
    const newGranny = await Granny.findOne({where: {granny_name: name}, raw: true})
    // console.log('!!!!!!!!!!!!!!!!!!!!!!', newGranny.granny_name);
    // console.log('NAME!!!', name);
    //проверяем, есть ли в БД такой логин и пароль при регистрации
    if(!checkUser){
      if(newGranny.granny_name === name){

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await Grandchild.create({       //создаем нового юзера
            granny_name,  name: name, password: hashedPassword, //!вместо пароля передаем наш захэшированный пароль
          })
        
          //* вот тут вот создается сессия
            req.session.granny_name = newUser.granny_name // добавляем в сессию айди нового юзера
            req.session.userId = newUser.id
            req.session.name = newUser.name
            // добавляем в сессию айди нового юзера

            console.log(req.session);

            res.sendStatus(200)
      }
    } else { return res.sendStatus(401)//ошибка при неправильном пароле или логине


  }
} catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
  })


module.exports = router;
