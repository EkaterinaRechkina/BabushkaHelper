1. Routes
   В проекте может быть большое количество ручек(endpoints) и неудобно прописывать все их в одной файле.
   Для удобства принято выносить их в разные файлы.

- Создаем папку src/routes.
  Названия файлов в ней должны оканчиваться на .router.js (не обязательно, но так удобнее)

В файле отдельного роута подключаем express и создаем экземпляр роутера:

const express = require("express")
const router = express.Router()

- Переносим  ! ))) все обработчики ручек из основного файла в наш роутер (или пишем новые),
  только теперь мы их вызываем не на экземпляре экспресса, а на экземпляре роутера:
  (и не забываем импортировать сюда модель)

router.get("/", async (req, res) => {
const allPosts = await Post.findAll();
res.render("index", { posts: allPosts });
});

- Экспортируем router и импортируем в app.js. Подключаем
  app.use("/posts", postRoutes);

  !!!Важно!!!
  Мы прописываем путь ("/posts") в основном файле
  app.use("/posts", postRoutes);

И уже в самом роуте не прописываем. Например так в итоге сгенерируется в /post/add
router.post("/add", async (req, res) => {});

2. Partials

Мы можем вынести повторяющиеся части разметки в так называемые кусочки Partials
Для этого создаем папку partials внутри views и создаем в ней необходимые шаблоны
Чтобы вставить их куда-то, используем синтаксис {{>название}}

Если папка views находится не в корне проекта, то надо явно зарегистрировать путь
hbs.registerPartials(path.join(\_\_dirname, "src", "views", "partials"));

3. Параметризованные запросы
   Уникальная часть пути, например у детальных страниц новостей. В обработчике ручки пишется через :
   Например:
   router.get("/:postId", async (req, res) => {
   const postId = req.params.postId;
   });

4. Middleware (промежуточные обработчики)
   Есть готовые в express, например:
   app.use(express.urlencoded({ extended: true }));

Но можно написать самостоятельно:
app.use((req, res, next)=>{
// какой-то код

    next() //  обязательно вызывать

});

req ============= middleware ========(обработчик)=====> res

npx sequelize-cli model:generate --name Post --attributes title:string,image_url:string

Сессии: express-session
Хранилище сессий: session-file-store

Если используем session-file-store , ВАЖНО добавить папку sessions в nodemonConfig.ignore

<script>
  "nodemonConfig": {
    "ignore": [
      "sessions/*"
    ]
  },
</script>

Не забудьте спрятать папку sessions/ в .gitignore

Пример конфигурации сессии

<script>
  const sessionConfig = {
    store: new FileStore(), // хранилище сессий
    key: 'sid', // ключ куки
    secret: 'secret', // шифрование id сессии
    resave: false, // пересохранение сессии (когда что-то поменяли - false)
    saveUninitialized: false, // сохраняем пустую сессию (чтоб посмотреть)
    httpOnly: true, // нельзя изменить куки с фронта
    cookie: { expires: 24 * 60 * 60e3 },
  }
  app.use(session(sessionConfig)) // подключаем до роутов
</script>

Для хэширования пароля используем bcrypt
bcrypt (hash, compare)

Удаление куки и сессий:

<script>
  req.session.destroy()
  res.clearCookie('sid')
</script>

npx sequelize model:generate --name User --attributes password:string,email:string
