'use strict'
const { Router } = require('express')
  ,     mongoose = require('mongoose')
  ,        route = Router()
  ,      contact = require('./contact')
  ,        login = require('./login')
  ,     register = require('./register')
  ,        about = require('./about')
  ,         home = require('./home')
  ,        order = require('./order')
  ,       logout = require('./logout')
  ,  guardRoutes = require('./guardRoutes')

  route.use(home)
  route.use(about)
  route.use(contact)
  route.use(login)
  route.use(register)

  // guard middleware
  route.use(guardRoutes)

  // hidden routes
  route.use(logout)
  route.use(order)



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
