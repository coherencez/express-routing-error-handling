'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,      contact = require('../controllers/contact')

route.get('/contact', contact.new)

route.post('/contact', contact.create)

module.exports = route
