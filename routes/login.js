'use strict'
const { Router } = require('express')
const      route = Router()
  ,      login = require('../controllers/login')


route.get('/login', login.new)

route.post('/login', login.create)

module.exports = route
