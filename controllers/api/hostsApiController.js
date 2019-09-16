var express = require('express');
var router = express.Router();
const db = require("../../models");

router.get('/',(req,res)=>{
    db.Host.findAll({include:[db.BlogPost]}).then(hosts=>{
        res.json(hosts);
    })
})

module.exports = router;