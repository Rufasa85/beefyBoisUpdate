var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.send('hosts index route, testing')
})

module.exports = router;