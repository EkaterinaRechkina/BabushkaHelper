require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");


const grannyRouter = require("./routes/granny.routes");
const registrationRouter = require("./routes/registrationRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const allPostsRouter = require("./routes/allPostsRouter");
const imgUploadRouter = require("./routes/imgRouter");
const logoutRouter = require("./routes/logoutRouter.js");
const registrationChildRouter = require("./routes/registrationChildRouter");
const app = express();
const PORT = process.env.PORT || 3000;

hbs.registerHelper("each_upto", function (ary, max, options) {
  if (!ary || ary.length == 0) return options.inverse(this);

  let result = [];
  for (let i = 0; i < max && i < ary.length; ++i)
    result.push(options.fn(ary[i]));
  return result.join("");
});

hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));


const session = require("express-session"); //кука
const FileStore = require("session-file-store")(session); //хранение сессий

app.set("view engine", "hbs");

hbs.registerPartials(`${__dirname}/views/partials`);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const sessionConfig = {
  store: new FileStore(), 
  name: process.env.COOKIE_NAME, 
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: false, 
  httpOnly: true, 
  cookie: { expires: 24 * 60 * 60e3 },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  if (req.session.name) {
    res.locals.granny_name = req.session.granny_name;
    res.locals.userId = req.session.id;
    res.locals.name = req.session.name;
  } else if (req.session.granny_name) {
    res.locals.granny_name = req.session.granny_name;
    res.locals.userId = req.session.id;
  }
  console.log("имя внучки", req.session.name);
  console.log(req.session.granny_name);
  next();
});

app.use("/", grannyRouter);
app.use("/", registrationRouter);
app.use("/", registrationChildRouter);
app.use("/login", loginRouter);
app.use("/allPosts", allPostsRouter);
app.use("/upload", imgUploadRouter);
app.use("/logout", logoutRouter);

app.listen(PORT, () => {
  console.log(`Everything is great on PORT ${PORT}`);
});
