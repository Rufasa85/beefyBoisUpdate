var express = require('express');
var router = express.Router(); 
const db  = require('../../models');

router.get('/',(req,res)=>{
    db.BlogPost.findAll({include:[db.Host]}).then(blogPosts=>{
        res.json(blogPosts);
    })
});

router.post('/',(req,res)=>{
    console.log('posting to blog')
    console.log(req.session);
    if(!req.session.user){
        res.redirect('/')
    }
    else {
        db.BlogPost.create({
          title:req.body.title,
          body:req.body.body,
          HostId:req.session.user.id 
        }).then(newBlogPost=>{
            res.json(newBlogPost)
        })
    }
})

module.exports = router;