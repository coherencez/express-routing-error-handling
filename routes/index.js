'use strict'
const { Router } = require('express')
	,       route = Router()


route.get('/', (req, res) => {
	// const x = 'y'
	// x = 'z'
  res.render('index', {auth: true})
})

route.get('/about', (req,res) => {
	res.render('about', {title: 'About', john: true})
})

route.get('/contact', (req,res) => {
	res.render('contact', {title: 'Contact', doe: true})
})

route.post('/contact', (req,res) => {
	console.log(req.body)
	res.redirect('/')
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