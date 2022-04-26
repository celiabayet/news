var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var articleModel = require('../models/articles')

router.get('/wishlist', async function(res, req, next){
   console.log(`token: ${req.query.token}`)
  // let wishlist = await userModel.findOne({token: req.query.token}).populate('article')
  // console.log(`wishlist: ${wishlist}`)
  console.log('ca marche')
  
  res.json({result: true})
  // res.json(wishlist)
})

router.post('/wishlist', async function(req,res,next){
  let article = await articleModel.findOne(
    { title: req.body.title},
   );

  if(!article){
    let newArticle = new articleModel({
      img: req.body.img,
      title: req.body.title,
      description: req.body.desc,
      language: req.body.language,
    })
    article = await newArticle.save()
  }

  console.log(article)
  let user = await userModel.updateOne(
    { token: req.body.token}, //the doc to update
    { wishlist: [article.id] } // keys to update
      );
  console.log(user)

  res.json({user})
})

module.exports = router;