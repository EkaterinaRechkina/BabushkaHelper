const { Router } = require("express");
const { Library } = require("../db/models");
const router = Router();



router.get('/', async (req, res) => {
  try {
    const posts = await Library.findAll({ // сортировка всех картинок
      order: [['createdAt', 'DESC']]
    })

    res.render('allPosts', { posts }) // рендрим индекс hbs и передаем в нее параметры
  } catch (error) {
    res.end()
  }
})

module.exports = router
