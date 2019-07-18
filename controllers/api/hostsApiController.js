var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("index API host route, MOAR testing")
})

module.exports = router;