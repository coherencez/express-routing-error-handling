'use strict'

const  bcrypt = require('bcrypt')
  ,      User = require('../models/user')

module.exports.new = (req,res) => {
  res.render('register', {title: 'Register', register: true})
}

module.exports.create = ({body: {email,password,confirmation}},res,cb) => {
  if(password === confirmation) {
    User
    .findOne({email})
    .then(user => {
      if(user) {
        res.render('register', {title: 'Register', error: 'Email in use'})
      } else {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, 15, (err, hash) => {
            if(err) { reject(err) }
            else { resolve(hash)}
          })
        })
      }
    })
    .then(hash => User.create({email, password: hash}))
    .then(() => res.redirect('/'))
    .catch(cb)
  } else {
    res.render('register', {title: 'Register', error: 'Password && password confirmation do not match'})
  }
}
