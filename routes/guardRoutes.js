'use strict'
const { Router } = require('express')
  ,        route = Router()

  route.use((req,res,next) => {
    if(req.session.email) {
      next()
    } else {
      res.redirect('/login')
    }
  })

module.exports = route
