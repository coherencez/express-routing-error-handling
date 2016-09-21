'use strict'
const { Router } = require('express')
  ,        route = Router()
  ,        Order = require('../models/order')
  ,         Size = require('../models/size')
  ,     Toppings = require('../models/toppings')

  route.get('/order', (req,res,cb) => {
    Promise.all([
      Size.find().sort({inches: 1}),
      Toppings.find()
      ])
      .then(([sizes, toppings]) =>
        res.render('order', {title: 'Order', order: true, sizes, toppings})
      )
      .catch(cb)

  })

  route.post('/order', ({body},res,cb) => {
    Order
      .create(body)
      .then(() => res.redirect('/'))
      .catch(({ errors }) => {
        Promise.all([ // retrieve sizes/toppings from DB again
          Promise.resolve(errors), // but pass errors as well
          Size.find().sort({ inches: 1 }),
          Toppings.find().sort({ name: 1 }),
        ])
      })
      .then(([errors,sizes,toppings,]) => {
        // UI/UX additions
        // send errors to renderer to change styling and add error messages
        // also, send the req.body to use as initial form input values
        res.render('order', { title: 'Order', sizes, toppings, errors, body })
      })
      .catch(cb)
  })

module.exports = route
