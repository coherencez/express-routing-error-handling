'use strict'

module.exports.index = (req,res) => {
  if(req.session.email) {
    res.render('logout', {title: 'Logout'})
  } else {
    res.redirect('/login')
  }
}

module.exports.destroy = (req,res) => {
  req.session.destroy((err) => {
    if(err) throw err
    res.redirect('/login')
  })
}
