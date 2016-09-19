'use strict'
const { Router } = require('express')
  ,       bcrypt = require('bcrypt')
  ,      Contact = require('../models/contact')
  ,        Order = require('../models/order')
  ,         Size = require('../models/size')
  ,     Toppings = require('../models/toppings')
  ,         User = require('../models/user')
  ,     mongoose = require('mongoose')
  ,        route = Router()

  route.get('/', (req, res) => {
    res.render('index', {auth: true})
  })

  route.get('/about', (req,res) => {
    res.render('about', {title: 'About', john: true})
  })

  route.get('/contact', (req,res) => {
    res.render('contact', {title: 'Contact', doe: true})
  })

  route.post('/contact', (req,res,cb) => {
    Contact
      .create(req.body)
      .then(() => res.redirect('/'))
      .catch(cb)
  })

  route.get('/order', (req,res,cb) => {
    Promise.all([
      Size.find().sort({inches: 1}),
      Toppings.find()
      ])
      .then(([sizes, toppings]) => 
        res.render('order', {title: 'Order', order: true, sizes, toppings})
      )
      .catch(cb)
    
  })

  route.post('/order', ({body},res,cb) => {
    Order
      .create(body)
      .then(() => res.redirect('/'))
      .catch(({ errors }) => {
        Promise.all([ // retrieve sizes/toppings from DB again
          Promise.resolve(errors), // but pass errors as well
          Size.find().sort({ inches: 1 }),
          Toppings.find().sort({ name: 1 }),
        ])
      })
      .then(([errors,sizes,toppings,]) => {
        // UI/UX additions
        // send errors to renderer to change styling and add error messages
        // also, send the req.body to use as initial form input values
        res.render('order', { title: 'Order', sizes, toppings, errors, body })
      })
      .catch(cb)
  })

  route.get('/login', (req,res) => {
    res.render('login', {title: 'Login', login: true})
  })

  route.post('/login', ({body: {email, password}},res,cb) => {
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
          res.redirect('/')
        } else {
          res.render('login', {error: 'Email &/or password does not match'})
        }
      })
      .catch(cb)
  })

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









// express 3
// module.exports = function (app) {
//  app.get('/', (req, res) => {
//    // const x = 'y'
//    // x = 'z'
//    res.render('index', {auth: true})
//  })

//  app.get('/about', (req,res) => {
//    res.render('about', {title: 'About', john: true})
//  })

//  app.get('/contact', (req,res) => {
//    res.render('contact', {title: 'Contact', doe: true})
//  })

//  app.post('/contact', (req,res) => {
//    console.log(req.body)
//    res.redirect('/')
//  })
// }