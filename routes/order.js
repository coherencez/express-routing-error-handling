'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,        order = require('../controllers/order')


  route.get('/order', order.new)

  route.post('/order', order.create)

module.exports = route
