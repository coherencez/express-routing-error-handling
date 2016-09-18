'use strict'
const { Router } = require('express')
  ,      Contact = require('../models/contact')
  ,        Order = require('../models/order')
  ,         Size = require('../models/size')
  ,     Toppings = require('../models/toppings')
  ,     mongoose = require('mongoose')
	,        route = Router()

	route.get('/', (req, res) => {
  	res.render('index', {auth: true})
	})

	route.get('/about', (req,res) => {
		res.render('about', {title: 'About', john: true})
	})

	route.get('/contact', (req,res) => {
		res.render('contact', {title: 'Contact', doe: true})
	})

	route.post('/contact', (req,res,cb) => {
		Contact
		  .create(req.body)
			.then(() => res.redirect('/'))
			.catch(cb)
	})

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
				res.render('order', { page: 'Order', sizes, toppings, errors, body })
			})
			.catch(cb)
	})

module.exports = route









// express 3
// module.exports = function (app) {
// 	app.get('/', (req, res) => {
// 		// const x = 'y'
// 		// x = 'z'
// 	  res.render('index', {auth: true})
// 	})

// 	app.get('/about', (req,res) => {
// 		res.render('about', {title: 'About', john: true})
// 	})

// 	app.get('/contact', (req,res) => {
// 		res.render('contact', {title: 'Contact', doe: true})
// 	})

// 	app.post('/contact', (req,res) => {
// 		console.log(req.body)
// 		res.redirect('/')
// 	})
// }