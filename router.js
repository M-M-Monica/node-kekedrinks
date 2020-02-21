let express = require('express')
let router = express.Router()
let md5 = require('blueimp-md5')
let { User, Food, Good } = require('./db.js')

router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user 
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res, next) {
  let body = req.body
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
  let body = req.body
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
    body.password = md5(md5(body.password))
    //console.log(body);
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

router.post('/cart', (req, res)=> {
  let info = req.body
  let id = Object.keys(info)[0]
  //let data = [id]
  //console.log(data)
  //console.log(id)
  // User.find({tel: '18813738689'}, function(err, result){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.send(id);
      
  //   }
  // })
  var aaron = new User({ _id: 0, name: 'Aaron' });
  new Good({
    _id: id,
    _user: aaron._id 
  }).save(function(err, data){
    if(err){console.log(err);}else{console.log(data)}
  });
  User.
    findOne({ tel: '1234567' }).
    populate({ path: 'goods' }).
    exec(function(err,data){
      console.log(data);
    });
})

router.get('/user', (req, res)=> {
  User.find({tel: '1234567'}, function(err, result){
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
})
module.exports = router