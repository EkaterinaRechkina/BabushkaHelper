const { Router } = require("express");
const {  Granny, Grandchild} = require("../db/models");
const { checkIsSession, checkIsNotSession } = require('../middlewares/index.middlewares')

const router = Router();


router.get('/registration', (req, res) => {
  res.render('users/registration');
})


router.post('/registration',   async (req, res) => {
  const {username, status, password, nickNameGranny } = req.body
console.log(req.body)//достает

try {
  if(status === "gran") {

    const checkUser = await Granny.findOne({where: {granny_name: username}})// проверяем в БД наличие повторений  пользователя
    if(!checkUser){
  
      const newUser = await Granny.create({//создаем нового юзера
        granny_name: username, password 
        })
        //* вот тут вот создается сессия
          req.session.username = newUser.username // добавляем в сессию айди нового юзера 
          //! куков нет!!!
          // // console.log(reg.session);
          // req.session.userId = newUser.id;
        
          res.redirect('/')
    } else { return res.render('error', {
      message: 'ОЙ!...ТАКОЕ ИМЯ УЖЕ ЕСТЬ...(((',
      error: {}
    });}
  } else { //если зарегистрировалась НЕ бабуля
    const checkUser2 = await Granny.findOne({where: {granny_name: nickNameGranny}})// проверяем в БД наличие повторений  пользователя
    if(checkUser2){
  
      const newUser2 = await Grandchild.create({//создаем новую внучку, если в БД нашлась ее бабуля 
        grandchild_name: username, password //!где айди бабушки ===??? добавить связь
        })
        //* вот тут вот создается сессия
          req.session.username2 = newUser2.username // добавляем в сессию айди нового юзера 
          //! куков нет!!!
      
          // req.session.userId = newUser.id;
        
          res.redirect('/')
    } else { return res.render('error', {
      message: 'ОЙ!...мы не нашли бабулю...(((',
      error: {}
    });}

  }

} catch (error) {
  console.log(error)
}
  res.render('users/registration');
})





module.exports = router;
