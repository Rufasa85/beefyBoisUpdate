var express = require('express');
var router = express.Router();
const db = require('../../models')
const bcrypt = require('bcrypt');

router.get('/login',(req,res)=>{
    res.render('hosts/login');
})

router.post('/login',(req,res)=>{
    db.Host.findOne({where:{name:req.body.name}}).then(dbUser=>{
        let loggedIn = bcrypt.compareSync(req.body.password,dbUser.password);
        if(loggedIn) {
            req.session.user = dbUser
        }
        else {
            req.session.user= false;
            req.session.error = 'auth failed bro'
        }
        res.send(req.session);
    })
})

module.exports = router;