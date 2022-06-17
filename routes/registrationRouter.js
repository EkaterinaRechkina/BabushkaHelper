const { Router } = require("express");
const { Granny, Grandchild } = require("../db/models");
const {
  checkIsSession,
  checkIsNotSession,
} = require("../middlewares/index.middlewares");
//!для хэширования паролей:
const bcrypt = require("bcrypt");
const saltRounds = 10;
//
const router = Router();

router.get("/registration", (req, res) => {
  res.render("./users/registration");
});

router.get("/registration", (req, res) => {
  res.render("users/registration");
});

<<<<<<< HEAD
router.post("/registration/granny", async (req, res) => {
  const { granny_name, password } = req.body; //достаем из инпута данные пользователя
  console.log(req.body);
=======
router.post('/registration/granny', async (req, res) => {
  const {granny_name,  password } = req.body      //достаем из инпута данные пользователя
>>>>>>> bb50fbe50394e5222be5209840a90e876d90abf3
  try {
    const checkUser = await Granny.findOne({ where: { granny_name } }); // проверяем в БД наличие повторений  почты
    //!хэширование пароля
    console.log("checkUser", checkUser);
    //проверяем, есть ли в БД такой логин и почта при регистрации
<<<<<<< HEAD
    if (!checkUser) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await Granny.create({
        //создаем нового юзера
        granny_name,
        password: hashedPassword, //!вместо пароля передаем наш захэшированный пароль
      });

      //* вот тут вот создается сессия
      req.session.granny_name = newUser.granny_name; // добавляем в сессию айди нового юзера
      // req.session.userId = newUser.id // добавляем в сессию айди нового юзера
      req.session.granny_id = newUser.id;

      res.sendStatus(200);
    } else {
      return res.sendStatus(500); //подобрать подх ошибку
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
=======
    if(!checkUser){

      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const newUser = await Granny.create({       //создаем нового юзера
          granny_name, password: hashedPassword   //!вместо пароля передаем наш захэшированный пароль
        })

      req.session.granny_name = newUser.granny_name
      req.session.granny_id = newUser.id
      console.log("ЧТО ЭТО??", newUser.id); // добавляем в сессию айди нового юзера


      res.sendStatus(200)

    } else { return res.sendStatus(500)

    }
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
>>>>>>> bb50fbe50394e5222be5209840a90e876d90abf3
  }
});

module.exports = router;
