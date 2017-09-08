var router = require('express').Router();

// Mount other routers
router.use('/users', require('./user/userRoutes'))

module.exports = router;