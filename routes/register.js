'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,       bcrypt = require('bcrypt')
  ,         User = require('../models/user')

  route.get('/register', (req,res) => {
    res.render('register', {title: 'Register', register: true})
  })

  route.post('/register', ({body: {email,password,confirmation}},res,cb) => {
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
          // return User.create({email, password})
        }
      })
      .then(hash => User.create({email, password: hash}))
      .then(() => res.redirect('/'))
      .catch(cb)
    } else {
      res.render('register', {title: 'Register', error: 'Password && password confirmation do not match'})
    }
  })

module.exports = route
