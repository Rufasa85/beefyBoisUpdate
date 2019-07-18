var express = require('express');
var router = express.Router();
var apiRoutes = require('./api');
var hostRoutes = require('./hostsController');

router.use('/hosts',hostRoutes)
router.use('/api',apiRoutes)

router.get('/',(req,res)=>{
    res.send("index route")
})

module.exports = router;