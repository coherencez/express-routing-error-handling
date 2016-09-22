'use strict'

const Contact = require('../models/contact')

module.exports.new = (req,res) => {
  res.render('contact', {title: 'Contact', doe: true})
}

module.exports.create = (req,res,cb) => {
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(cb)
}
