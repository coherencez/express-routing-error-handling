'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,       logout = require('../controllers/logout')

  route.get('/logout', logout.index)

  route.post('/logout', logout.destroy)

module.exports = route
