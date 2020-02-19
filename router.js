const express = require('express')
const router = express.Router()
const md5 = require('blueimp-md5')
const { User, Food } = require('./db.js')

router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user 
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res, next) {
  const body = req.body
  User.findOne({
    tel: body.tel,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'telephone or password is invalid.'
      })
    }
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/register', function (req, res, next) {
  res.render('register.html')
})

router.post('/register', function (req, res, next) {
  const body = req.body
  User.findOne({
    tel: body.tel
  }, function (err, data) {
    if (err) {
      return next(err)
    }
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'telephone aleady exists.'
      })
      return res.send(`手机号或者密码已存在，请重试`)
    }
    body.password = md5(body.password)
    new User(body).save(function (err, user) {
      if (err) {
        return next(err)
      }
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
})

router.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/login')
})

router.get('/drinks', function (req, res) {
  Food.find({category: 'drinks'}, (err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  });   
})

router.get('/desert', function (req, res) {
  Food.find({category: 'desert'}, (err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  });   
})

module.exports = router