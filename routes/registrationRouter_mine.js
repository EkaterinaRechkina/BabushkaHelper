const { Router } = require("express");
const { Granny } = require("../db/models");
const { Grandchild } = require("../db/models");

const router = Router();

const saltRounds = 10

router.get('/registration', (req, res) => {
  res.render('./users/registration')
});


router.post('/registration', async (req, res) => {
  const { grandchild_name, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds) //хешируем пароль
    const newUser = await User.create({
      grandchild_name, password: hashedPassword,  //создаем в ДБ нового юзера
    })

    req.session.userId = newUser.id
    req.session.grandchild_name = newUser.grandchild_name
    // добавляем в сессию айди нового юзера

    res.redirect('/entries')
  } catch (error) {
    console.log(error);
    res.redirect('/registration')
  }
});




module.exports = router;
