'use strict'
const mongoose = require('mongoose')
const HTML5_EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports = mongoose.model('Order', {
	name: {type: String, required: [true, 'Please enter your name']},
	email: {
		type: String, 
		required: true, 
		lowercase: true,
		match: [HTML5_EMAIL_VALIDATION, 'Please fill in a valid email address']
	},
	phone: {type: String, required: [true, 'Please enter a valid phone number']},
	size: {type: String, required: [true, 'Please select a valid size']},
	toppings: {type: [String], default: ['Cheese']},
})