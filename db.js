const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/keke', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const userSchema = new Schema({
  tel: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  order: [{
    tel: Number,
    address: String,
    total: Number,
    cart: Array
  }],
  goods: [{
    name: String,
    img: String,
    category: String,
    price: String,
    num: {
      type: Number,
      default: 1
    }
  }]
})

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema);

// const foodList = [
//   {
//     "name": "初恋",
//     "img":"/img/d1.png",
//     "category": "drinks",
//     "price": 15
//   },
//   {
//     "name": "圣代",
//     "img":"/img/d2.png",
//     "category": "drinks",
//     "price": 10
//   },
//   {
//     "name": "清凉夏日",
//     "img":"/img/d3.png",
//     "category": "drinks",
//     "price": 8
//   },
//   {
//     "name": "青柠汁",
//     "img":"/img/d4.png",
//     "category": "drinks",
//     "price": 7
//   },
//   {
//     "name": "巧克力奶茶",
//     "img":"/img/d5.png",
//     "category": "drinks",
//     "price": 14
//   },
//   {
//     "name": "雪顶咖啡",
//     "img":"/img/d6.png",
//     "category": "drinks",
//     "price": 15
//   },
//   {
//     "name": "星云",
//     "img":"/img/d7.png",
//     "category": "drinks",
//     "price": 20
//   },
//   {
//     "name": "柠檬蜜柑茶",
//     "img":"/img/d8.png",
//     "category": "drinks",
//     "price": 16
//   },
//   {
//     "name": "芝士蛋糕",
//     "img":"/img/s1.png",
//     "category": "dessert",
//     "price": 18
//   },
//   {
//     "name": "蜂蜜冰淇淋千层",
//     "img":"/img/s2.png",
//     "category": "dessert",
//     "price": 20
//   },
//   {
//     "name": "草莓冰淇淋蛋糕",
//     "img":"/img/s3.png",
//     "category": "dessert",
//     "price": 17
//   },
//   {
//     "name": "草莓泡芙",
//     "img":"/img/s4.png",
//     "category": "dessert",
//     "price": 8
//   },
//   {
//     "name": "草莓巧克力塔",
//     "img":"/img/s5.png",
//     "category": "dessert",
//     "price": 12
//   },
//   {
//     "name": "蓝莓牛奶蛋糕",
//     "img":"/img/s6.png",
//     "category": "dessert",
//     "price": 15
//   },
//   {
//     "name": "覆盆子派",
//     "img":"/img/s7.png",
//     "category": "dessert",
//     "price": 22
//   },
//   {
//     "name": "抹茶草莓卷",
//     "img":"/img/s8.png",
//     "category": "dessert",
//     "price": 10
//   }
// ]
// function init(foodList){
//   foodList.map(item => {
//   new Food(item).save(function(err){
//     if (err) {
//       console.log(err);
//     }
//   });
//  })
// }
// init(foodList);

module.exports = {
  User,
  Food,
}