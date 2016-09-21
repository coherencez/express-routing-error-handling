'use strict'
const { Router } = require('express')
const      route = Router()
  ,       bcrypt = require('bcrypt')
  ,         User = require('../models/user')


route.get('/login', (req,res) => {
  res.render('login', {title: 'Login', login: true})
})

route.post('/login', ({session, body: {email, password}},res,cb) => {
  User
    .findOne({email})
    .then(user => {
      if(user) {
        // if user exists, compare hashes, then either resolve or reject
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, matches) => {
              if (err) {
                reject(err)
              } else {
                resolve(matches)
              }
            })
          })
      } else {
        res.render('login', {error: 'Email does not exist in our system'})
      }
    })
    .then(matches => {
      // if user exists, and password matches, redirect to main page
      if(matches) {
        session.email = email
        res.redirect('/')
      } else {
        res.render('login', {error: 'Email &/or password does not match'})
      }
    })
    .catch(cb)
})

module.exports = route
