var express = require('express');
var router = express.Router();
const db = require("../../models");

router.get('/',(req,res)=>{
    db.Host.findAll({include:[db.BlogPost,db.Review,db.Episode]}).then(hosts=>{
        res.json(hosts);
        // res.render('test',{hosts});
    })
})

module.exports = router;