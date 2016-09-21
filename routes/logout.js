'use strict'
const { Router } = require('express')
  ,        route = Router()

  route.get('/logout', (req,res) => {
    if(req.session.email) {
      res.render('logout', {title: 'Logout'})
    } else {
      res.redirect('/login')
    }
  })

  route.post('/logout', (req,res) => {
    req.session.destroy((err) => {
      if(err) throw err
      res.redirect('/login')
    })
  })

module.exports = route
