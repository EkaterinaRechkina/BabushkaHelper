const { Router } = require("express");
const { Library } = require("../db/models");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Library.findAll({
      // сортировка всех картинок
      order: [["createdAt", "DESC"]],
    });

    res.render("allPosts", { posts }); // рендрим индекс hbs и передаем в нее параметры
  } catch (error) {
    res.end();
  }
});

router
  .route("/") // на этом роуте два метода
  .post(async (req, res) => {
    const { title, image } = req.body;
    try {
      const newPost = await Library.create({ title, image }); // данные вносятся в таблицу и возвращают назад значение нового поста
      res.json(newPost);
    } catch (error) {
      console.log(err);
      res.end();
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Library.findByPk(id);

      res.json(post);
    } catch (error) {
      res.end();
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Library.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

router.get("/:id/edit", async (req, res) => {
  const entry = await Library.findOne({ where: { id: req.params.id } });
  res.render("formEdit", { entry });
});

router.put("/:id", async (req, res) => {
  let entry;
  console.log(req.params.id);
  try {
    entry = await Library.findOne({ where: { id: req.params.id } });
    await entry.update({ title: req.body.title, image: req.body.image });
  } catch (error) {
    return res.json({
      isUpdateSuccessful: false,
      errorMessage: "Не удалось обновить запись в базе данных.",
    });
  }
  res.sendStatus(200);
});

module.exports = router;
