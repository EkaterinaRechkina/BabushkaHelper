const checkIsSession = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/')
  } else {
    next()
  }
}

const checkIsNotSession = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/')
  } else {
    next()
  }
}
