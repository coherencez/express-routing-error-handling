'use strict'
const { Router } = require('express')
  ,     route = Router()

route.get('/about', (req,res) => {
  res.render('about', {title: 'About', john: true})
})

module.exports = route
