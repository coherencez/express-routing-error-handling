'use strict'

const User = require('../models/user')

module.exports.new = (req,res) => {
  res.render('register', {title: 'Register', register: true})
}

module.exports.create = ({body: {email,password,confirmation}},res,cb) => {
  if(password === confirmation) {
    User
    .findOneByEmail({email})
    .then(user => {
      if(user) {
         return res.render('register', {title: 'Email is already registered'})
      }
      return User.create({email, password})
    })
    .then(() => res.redirect('/'))
    .catch(cb)
  } else {
    res.render('register', {title: 'Register', error: 'Password && password confirmation do not match'})
  }
}
