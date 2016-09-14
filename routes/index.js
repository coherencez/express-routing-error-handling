'use strict'
const { Router } = require('express')
  ,      Contact = require('../models/contact')
  ,        Order = require('../models/order')
  ,        Size = require('../models/size')
  ,    Toppings = require('../models/toppings')
  , mongoose = require('mongoose')
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

	route.post('/contact', (req,res,next) => {
		Contact
		  .create(req.body)
			.then(() => res.redirect('/'))
			.catch(next)
	})

	route.get('/order', (req,res, next) => {
		Promise.all([
			Size.find().sort(),
			Toppings.find()
			])
			.then(([sizes, toppings]) => 
				res.render('order', {title: 'Order', order: true, sizes, toppings})
			)
			.catch(next)
		
	})

	route.post('/order', (req,res,next) => {
		Order
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(next)
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