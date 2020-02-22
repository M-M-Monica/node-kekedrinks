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
  secret: 'sec', //配置加密字符串
  resave: false,
  saveUninitialized: false
}))

app.use(router)

app.listen(3000, function () {
  console.log('3000running')
})