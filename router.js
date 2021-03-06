let express = require('express')
let router = express.Router()
let md5 = require('blueimp-md5')
let { User, Food } = require('./db.js')

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

router.get('/:food/:page', function (req, res) {
  let page = req.params.page
  let skip = (page-1)*4
  let food = [req.params.food]
  Food.find({category: food}).skip(skip).limit(4)
  .exec((err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    } 
  })   
})

router.post('/cart', (req, res)=> {
  let info = req.body
  let id = Object.keys(info)[0]
  User.findOne({tel: req.session.user.tel}, function(err, result){
    if(err){
      console.log(err);
    }else{
      let goodsItem = '';
      result.goods.forEach((item)=>{
        if (item._id == id) {
          goodsItem = item;
          item.num++;
        }
      });
      if (goodsItem) {
        result.save();
      }else{
        Food.findOne({_id: id}, function(err, doc){
          if(err){
            console.log(err);
          }else{
            if (doc) {
              result.goods.push(doc);
              result.save();
            }
            res.status(200).json({
              err_code: 0,
              message: 'OK'
            })
          }
        })
      }
    }
  })
})

router.get('/cart', (req, res)=> {
  User.findOne({tel: req.session.user.tel}, function(err, result){
    if(err){
      console.log(err);
    }else{
      res.send(result.goods)
    }
  })
})

router.delete('/cart/:id', (req, res)=> {
  let id = req.params.id;
  let data = [id];
  User.updateOne({
    tel: req.session.user.tel
  }, {
    $pull:{
      'goods':{
        '_id': data
      }
    }
  },function(err, result){
    if(err){
      console.log(err);
    }else{
      res.send({flag:1});
    }
  })
})

router.post('/pay', (req, res)=> {
  let info = req.body;
  User.findOne({tel: req.session.user.tel}, function(err, result){
    if(err){
      console.log(err);
    }else{
      let cartList = [];
      result.goods.forEach((item)=>{
        cartList.push(item);
      })
      let orderList = {
        tel: info.tel,
        address: info.address,
        total: info.total,
        cart: cartList
      }
      result.order.push(orderList);
      result.goods = [];
      result.save(function(err, doc){
        if(err){
          console.log(err);
        }else{
          res.send({flag:1,total: orderList.total});
        }
      });
    }
  })
})
module.exports = router