'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,       session = require('../controllers/session')

  route.get('/logout', session.edit)

  route.post('/logout', session.destroy)

module.exports = route
