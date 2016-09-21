'use strict'
const { Router } = require('express')
  ,     route = Router()

route.get('/', (req, res) => {
  res.render('index', {auth: true})
})

module.exports = route
