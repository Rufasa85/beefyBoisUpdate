var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("hosts page")
})

module.exports = router;