var express = require('express');
var router = express.Router();
var apiRoutes = require('./api');
var frontEndRoutes = require('./frontend/');


router.use('/api',apiRoutes);
router.use('/',frontEndRoutes);


module.exports = router;