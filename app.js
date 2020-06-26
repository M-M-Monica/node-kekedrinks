const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router')
const app = express()

app.use(express.static('public'))
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'Molly_#137', //配置加密字符串
  resave: false,
  saveUninitialized: false
}))

app.use(router)

app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000, function () {
	console.log('3000running')
})