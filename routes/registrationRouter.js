const { Router } = require("express");
const { User } = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')

const router = Router();



router.post('/registration',   async (req, res) => {
  const {username, status, password} = req.body
console.log(req.body)//достает

try {
  if(status === "gran") {

    const checkUser = await Granny.findOne({where: {granny_name}})// проверяем в БД наличие повторений  пользователя
    if(!checkUser){
  
      const newUser = await User.create({//создаем нового юзера
          username, email, password: hashedPassword //!вместо пароля передаем наш захэшированный пароль
        })
        //* вот тут вот создается сессия
          req.session.userName = newUser.username // добавляем в сессию айди нового юзера
          // console.log(reg.session);
          req.session.userEmail = newUser.email;
          req.session.userId = newUser.id;
        
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
