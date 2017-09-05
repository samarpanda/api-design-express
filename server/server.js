var express = require('express')
var app = express()
var api = require('./api/api')
var config = require('./config/config')
var logger = require('./util/logger')
var auth = require('./auth/routes')

require('mongoose').connect(config.db.url)

if(config.seed){
  require('./util/seed')
}

require('./middleware/appMiddleware')(app)

app.use('/api', api)
app.use('/auth', auth)

app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).send('Invalid token')
    return
  }

  logger.error(err.stack)
  res.status(500).send('Oops server error')
})

module.exports = app