'use strict'
const passport = require('passport')
// login logic
module.exports.new = (req,res) => {
  res.render('login', {title: 'Login', login: true})
}

module.exports.create = (req,res,next) => {
  passport.authenticate('local', (err,user,msg) => {
    if(err) { return next(err) }
    if(!user) { return res.render('login', msg) }

    req.logIn(user, err => {
      if(err) { return next(err) }
      res.redirect('/')
    })
  })(req,res,next)
}

// logout logic
module.exports.edit = (req,res) => {
  if(req.session.email) {
    res.render('logout', {title: 'Logout'})
  } else {
    res.redirect('/login')
  }
}

module.exports.destroy = (req,res) => {
  req.logout()
  res.redirect('/login')
}
