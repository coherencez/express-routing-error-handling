'use strict'
const { Router } = require('express')
  ,     route = Router()
  ,  { index } = require('../controllers/about')

route.get('/about', index)

module.exports = route
