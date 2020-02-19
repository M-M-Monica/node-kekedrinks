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
  }
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
const foodList = [
  {
    "name": "巧克力奶茶",
    "img":"/img/d5.png",
    "category": "drinks",
    "price": 14
  },
  {
    "name": "雪顶咖啡",
    "img":"/img/d6.png",
    "category": "drinks",
    "price": 15
  },
  {
    "name": "星云",
    "img":"/img/d7.png",
    "category": "drinks",
    "price": 20
  },
  {
    "name": "柠檬蜜柑茶",
    "img":"/img/d8.png",
    "category": "drinks",
    "price": 16
  },
  {
    "name": "草莓巧克力塔",
    "img":"/img/s5.png",
    "category": "desert",
    "price": 12
  },
  {
    "name": "蓝莓牛奶蛋糕",
    "img":"/img/s6.png",
    "category": "desert",
    "price": 15
  },
  {
    "name": "覆盆子派",
    "img":"/img/s7.png",
    "category": "desert",
    "price": 22
  },
  {
    "name": "抹茶草莓卷",
    "img":"/img/s8.png",
    "category": "desert",
    "price": 10
  }
]
function init(foodList){
  foodList.map(item => {
  new Food(item).save(function(err){
    if (err) {
      console.log(err);
    }
  });
 })
}
init(foodList);

module.exports = {
  User,
  Food
}