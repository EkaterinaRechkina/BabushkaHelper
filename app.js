require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const indexRouter = require('./routes/indexRouter')
// const postsRouter = require('./routes/posts.routes')
const registrationRouter = require('./routes/registrationRouter')
const loginRouter = require('./routes/loginRouter.js')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'views'))

hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'))

app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/',registrationRouter)
app.use('/', loginRouter)
// app.use('/posts', postsRouter)

app.listen(PORT, () => {
  console.log(`Everything is great on PORT ${PORT}`)
})
