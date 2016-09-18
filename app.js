'use strict'

const               express = require('express')
	,              bodyParser = require('body-parser')
	,                   chalk = require('chalk')
	,                     app = express()
	,                    port = process.env.PORT || 3000
	,               {connect} = require('./database')
	,                  routes = require('./routes/')

// pug config
app.set('port', port)
app.set('view engine', 'pug')

// middlewarez
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, cb) => {
	console.log(`[${Date()}]`, chalk.cyan(`${req.method} ${req.url}`), req.headers['user-agent'])
	cb()
})
app.locals.company = 'Pizza Go'
app.locals.erros = {} //errors & body added to avoid guard statements
app.locals.body = {} //i.e. value=(body && body.name) vs value=body.name

// routes
// express 4 version
app.use(routes)

// express 3 version
// routes(app)

// error handling middleware
app.use((req, res, next) => {
	// console.error('404')
	// const err = Error('Not Found')
	// err.status = 404
	// next(err)
	res.render('404')
})

app.use((err, req, res, next) => {
	console.log('Error Happened bitch')
	res.sendStatus(err. status || 500)
	console.error(`[${Date()}]`, chalk.red(`${req.method} ${req.url}`), `Error(${chalk.red(res.statusCode)}): ${chalk.red(res.statusMessage)}`)
	console.error(err.stack)
})


// connect to MONGODB, then initiate node/express to listen for incoming reqs
connect()
	.then(() => {
		app.listen(port, () => {
			console.log(`Express server listening on port ${port}`)
		})
	})
	.catch(console.error)


