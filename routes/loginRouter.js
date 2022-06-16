const { Router } = require("express");
const { Granny, Grandchild } = require("../db/models");
const {
  checkIsSession,
  checkIsNotSession,
} = require("../middlewares/index.middlewares");
const router = Router();

//!для хэширования паролей:
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", (req, res) => {
  res.render("users/login");
});

router.post("/", async (req, res) => {
  const { granny_name, password } = req.body;
  console.log(req.body);
  try {
    const granny = await Granny.findOne({
      where: {
        granny_name,
      },
    });
    console.log(granny, "бабушка в таблице");

    const newChild = await Grandchild.findOne({
      where: {
        granny_name,
      },
    });
    console.log(newChild);
    const user = granny || newChild;

    if (!user) {
      // res.send('ошибка')
      console.log("===================");
      return res.sendStatus(404);
    }

    const isValidPass = await bcrypt.compare(password, user.password); //расхэшируем пароль

    //затем проверяем пароль
    if (!isValidPass) {
      // throw Error('неправильный пароль...')
      return res.sendStatus(404); //рповерить оши
      // res.render('/error')

      //если прошли роверки на логин и пароль, создаем сессию
    } else {
      req.session.granny_name = user.granny_name;
      req.session.granny_id = user.id;
      res.json(user);
      // добавляем в сессию айди нового юзера
      // res.redirect('/')
    }
  } catch (error) {
    console.error("ошибка", error);
    res.sendStatus(404);
  }
});

// router.post('/', (req, res) => {

//   res.render('./grannyMain')
// })

module.exports = router;
