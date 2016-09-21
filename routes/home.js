'use strict'
const { Router } = require('express')
  ,     route = Router()
  ,    { index } = require('../controllers/home')

route.get('/', index)

module.exports = route
