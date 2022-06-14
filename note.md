1. Устанавливаем зависимости

- основные : sequelize, sequelize-cli, pg, pg-hstore, express, hbs
- dev-зависимости: nodemon

2. В основной файле (app.js) подключаем express и создаем его экземпляр:

const express = require("express");
const app = express();

- Создаем константу с портом
  const PORT = 3000;

- Начинаем слушать сервер
  app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
  });

- Описываем необходимые эндпойнты

Пример для рендеринга главной страницы:

app.get("/", async (req, res) => {
const allPosts = await Post.find();
res.render("index", { posts: allPosts });
});

- Чтобы нормально работал hbs, не забываем установить настройку
  app.set("view engine", "hbs");

  Если папка views лежит где-то в другом месте (например в src), надо прописать до нее путь иначе:
app.set("views", path.join(__dirname, "src", "views"));


- Чтобы можно было брать данные из тела POST-запроса, не забываем установить настройку
  app.use(express.urlencoded({ extended: true }));

3. Создаем папку views и в ней шаблоны страниц

- создаем файл layout.hbs, который является основой страниц.
  В нем прописываем место, куда будет помещаться весь контент
  {{{body}}}
- можно к лейауту подключить bootstrap

4. Подключаем бд



