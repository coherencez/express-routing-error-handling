'use strict'

module.exports.index = (req,res) => {
  res.render('about', {title: 'About', john: true})
}
