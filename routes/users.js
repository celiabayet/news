var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var userModel = require('../models/users')

//  SIGN UP 
router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var user = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.email
  })

  if(data != null){
    error.push('Utilisateur déjà présent')
  }

  if(req.body.username === ''
  || req.body.email === ''
  || req.body.password === ''
  ){
    error.push('Champs vides')
  }


  if(error.length === 0){

    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      language: 'fr'
    })
  
    user = await newUser.save()
  
    
    if(user){
      result = true
      token = user.token
    }
  }
  

  res.json({result, user, error, token})
})

// SIGN IN
router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null
  
  if(req.body.email == ''
  || req.body.password == ''
  ){
    error.push('champs vides')
  }

  if(error.length === 0){
    user = await userModel.findOne({
      email: req.body.email,
    })
  
    
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {
      error.push('email incorrect')
    }
  }
  

  res.json({result, user, error, token})


})

router.get('/username', async function(req,res,next){
  let username = null
  let user = await userModel.findOne({token: req.query.token})
  if(user != null){
    username = user.username
  }

  res.json({username})
})

// Language

router.get('/language', async function(req,res,next){
  let language = null
  let user = await userModel.findOne({token: req.query.token})
  if(user != null){
    language = user.language
  }
  res.json({language})
})

router.post('/language', async function(req,res,next){
  let user = await userModel.updateOne(
    { token: req.body.token},
    { language: req.body.language }
   );

  res.json({user})

})


router.get('/wishlist', async function(req,res,next){
  let data = await userModel.findOne({token: req.query.token}).populate('wishlist')
  let wishlist = data.wishlist
  
  res.json({wishlist})
})

module.exports = router;
