'use strict'
const { compare } = require('bcrypt')
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

userSchema.methods.comparePassword = function(password, cb) {
	const user = this
  // support calback and `Promise` pattern
	if(typeof cb === 'function') {
		return comparePassword(password, user.password, cb)
	}

	return new Promise((resolve, reject) => {
		compare(password, user.password, (err, matches) => {
			err ? reject(err) : resolve(matches)
		})
	})
}

module.exports = mongoose.model('User', userSchema)
