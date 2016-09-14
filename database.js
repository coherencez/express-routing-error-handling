'use strict'

const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://localhost:27017/pizzaparty'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGO_URI)

