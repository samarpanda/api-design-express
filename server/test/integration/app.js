var config = require('../../src/config/config')
var app = require('../../src/server')
var logger = require('../../src/util/logger')

app.listen(config.port)
logger.log('listening on http://localhost:' + config.port)

module.exports = {
  app,
  config,
  logger
}