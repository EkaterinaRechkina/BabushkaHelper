const { Router } = require("express");
const { User, Granny } = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')

const router = Router();


router.get('/registration', (req, res) => {
  res.render('users/registration');
})


router.post('/registration',   async (req, res) => {
  const {username, status, password} = req.body
console.log(req.body)//достает

try {
  if(status === "gran") {

    const checkUser = await Granny.findOne({where: {granny_name: username}})// проверяем в БД наличие повторений  пользователя
    if(!checkUser){
  
      const newUser = await Granny.create({//создаем нового юзера
        granny_name: username, password //! надо  ли при рег-ии данные внучек???
        })
        //* вот тут вот создается сессия
          // req.session.username = newUser.username // добавляем в сессию айди нового юзера 
          //! куков нет!!!
          // // console.log(reg.session);
          // req.session.userId = newUser.id;
        
          res.redirect('/')
    } else { return res.render('error', {
      message: 'ОЙ!...ТАКОЕ ИМЯ УЖЕ ЕСТЬ...(((',
      error: {}
    });}
  }

} catch (error) {
  console.log(error)
}
  res.render('users/registration');
})





module.exports = router;
