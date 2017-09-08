var config = require('./server/src/config/config')
var logger = require('./server/src/util/logger')
var app = require('./server/src/server')

app.listen(config.port)
logger.log('listening on http://localhost:' + config.port)