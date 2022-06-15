require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");

// const indexRouter = require("./routes/indexRouter");
const grannyRouter = require("./routes/granny.routes");
// const postsRouter = require('./routes/posts.routes')
const registrationRouter = require("./routes/registrationRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const allPostsRouter = require("./routes/allPostsRouter");
const imgUploadRouter = require("./routes/imgRouter");
const logoutRouter = require('./routes/logoutRouter.js')

const app = express();
const PORT = process.env.PORT || 3000;


//! шаг 1настройка сессии
const session = require('express-session') //кука
const FileStore = require('session-file-store')(session);//хранение сессий

app.set("view engine", "hbs");
// app.set("views", path.join(process.env.PWD, "views"));

// hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));
hbs.registerPartials(`${__dirname}/views/partials`); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//! шаг 2 настройки сессии
const sessionConfig = {
  store: new FileStore(), // хранилище сессий
  name: process.env.COOKIE_NAME, // ключ куки(енв)
  secret: process.env.SECRET, // шифрование id сессии(в данном случае поменяли на енв )
  resave: false, // пересохранение сессии (когда что-то поменяли - false)
  saveUninitialized: false, // сохраняем пустую сессию (чтоб посмотреть)
  httpOnly: true, // нельзя изменить куки с фронта
  cookie: { expires: 24 * 60 * 60e3 },
};

app.use(session(sessionConfig))
//---------------------------------------------------------------
//TODO ПОРЯДОК ОЧЕНЬ ВАЖЕН!!! вот этого что снизу!
//!мидлвара, которая применятся к каждому обработчику, проверка-есть ли сессия
//!тут сохраняем данные из сессии для использования в наших ХБСках
app.use((req, res, next) => {

  if(req.session.username) {
    res.locals.username = req.session.username
  }
  next()
})


app.use("/", grannyRouter);
app.use("/", registrationRouter);
app.use("/login", loginRouter);
app.use("/allPosts", allPostsRouter);
app.use("/upload", imgUploadRouter);
app.use('/logout', logoutRouter)

// app.use((req, res, next) => {
//   // if (req.session.userId) {
//   res.locals.granny_id = 1;
//   // запись в локальную переменную для hbs
//   // }
//   next(); // если нет сессии то будет next()
// });

app.listen(PORT, () => {
  console.log(`Everything is great on PORT ${PORT}`);
});
