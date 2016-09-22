'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,     register = require('../controllers/register')


  route.get('/register', register.new)

  route.post('/register', register.create)

module.exports = route
