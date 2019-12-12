var express = require('express');
var router = express.Router();

var hostRoutes = require('./hostsController');
const authRoutes = require("./authController");

router.use('/hosts',hostRoutes)
router.use('/auth',authRoutes)

router.get('/',(req,res)=>{
    res.render("visitors/index");
})

module.exports = router;