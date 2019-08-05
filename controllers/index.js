var express = require('express');
var router = express.Router();
var apiRoutes = require('./api');
var hostRoutes = require('./hostsController');
const authRoutes = require("./authController");

router.use('/hosts',hostRoutes)
router.use('/api',apiRoutes)
router.use('/auth',authRoutes)

router.get('/',(req,res)=>{
    res.send("index route")
})

router.get('/addsessions',(req,res)=>{
    req.session.addedthing = 'yay for sessions';
    res.redirect('/readsessions');
})

router.get('/readsessions',(req,res)=>{
    res.json(req.session)
})

module.exports = router;