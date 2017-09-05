var User = require('../api/user/userModel')
// var Post = require('../api/post/postModel')
// var Category = require('../api/category/categoryModel')
var _ = require('lodash')
var logger = require('./logger')

logger.log('Seeding the Database')

var users = [
  {username: 'samar', password: 'pass'},
  {username: 'daniel', password: 'pass'},
  {username: 'dummy', password: 'pass'}
]

var createDoc = function(model, doc){
  return new Promise(function(resolve, reject){
    new model(doc).save(function(err, saved){
      return err ? reject(err) : resolve(saved)
    })
  })
}

var cleanDB = function(){
  logger.log('... cleaning the DB')
  var cleanPromises = [User]
    .map(function(model){
      return model.remove().exec()
    })
  return Promise.all(cleanPromises)
}

var createUsers = function(data){
  var promises = users.map(function(user){
    return createDoc(User, user)
  })

  return Promise.all(promises)
    .then(function(users){
      return _.merge({users: users}, data || {})
    })
}

cleanDB()
  .then(createUsers)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger))