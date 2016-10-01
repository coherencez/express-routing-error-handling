'use strict'
const mongoose = require('mongoose')
const HTML5_EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		match: [HTML5_EMAIL_VALIDATION, 'Please fill in a valid email address'],
		index: {unique: true}
	},
	password: {type: String, required: [true, 'Please enter a password longer than you think you need']},
})

userSchema.statics.findOneByEmail = function (email, cb) {
	const collection = this
	return collection.findOne({email}, cb)
}

module.exports = mongoose.model('User', userSchema)
