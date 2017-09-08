var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var config = require('../config/config')

var checkToken = expressJwt({secret: config.secrets.jwt})
var User = require('../api/user/userModel')

exports.decodeToken = function(){
  return function(req, res, next){
    if(req.query && req.query.hasOwnProperty('access_token')){
      req.headers.authorization = 'Bearer ' + req.query.access_token
    }

    checkToken(req, res, next)
  }
}

exports.getFreshUser = function(){
  return function(req, res, next){
    console.log(req.user)
    User.findById(req.user._id)
      .then(function(user){
        if(!user){
          res.status(401).send('Unauthorized')
        } else {
          req.user = user
          next()
        }
      }, function(err){
        next(err)
      })
  }
}

exports.verifyUser = function(){
  return function(req, res, next){
    var username = req.body.username
    var password = req.body.password

    if(!username || !password){
      res.status(400).send('Username & Password needed')
    }

    User.findOne({username: username})
      .then(function(user){
        if(!user){
          res.status(401).send('No user with given username')
        } else {
          if(!user.authenticate(password)){
            res.status(401).send('Wrong password')
          } else {
            req.user = user
            next()
          }
        }
      }, function(err){
        next(err)
      })
  }
}

exports.signToken = function(id){
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  )
}