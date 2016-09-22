'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,      session = require('../controllers/session')


route.get('/login', session.new)

route.post('/login', session.create)

module.exports = route
