'use strict'
const { Router } = require('express')
const    Contact = require('../models/contact')
const      route = Router()

route.get('/contact', (req,res) => {
  res.render('contact', {title: 'Contact', doe: true})
})

route.post('/contact', (req,res,cb) => {
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(cb)
})

module.exports = route
