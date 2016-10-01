'use strict'
const { Router } = require('express')
  ,        route = Router()

  route.use((req,res,next) => {
    if(req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  })

module.exports = route
