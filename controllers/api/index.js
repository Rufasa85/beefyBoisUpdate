var express = require('express');
var router = express.Router();
var hostAPIRoutes = require('./hostsApiController');

router.use('/hosts',hostAPIRoutes)

router.get('/',(req,res)=>{
    res.send("index API route, MOAR testing")
})

module.exports = router;