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

router.get('/:id',(req,res)=>{
    db.BlogPost.findOne({where:{id:req.params.id}}).then(post=>{
        res.send(post)
    })
})

router.put('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.BlogPost.findOne({where:{id:req.params.id}}).then(post=>{
            if(req.session.user && req.session.user.id === post.HostId) {
                db.BlogPost.update({
                    title:req.body.title,
                    body:req.body.body
                },
                {where:{id:req.params.id}}
                ).then(updateResult=>{
                    res.send(updateResult);
                })
            }
        })
    }
})

router.delete('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.BlogPost.findOne({where:{id:req.params.id}}).then(post=>{
            if(req.session.user && req.session.user.id === post.HostId) {
                db.BlogPost.destroy({where:{id:req.params.id}}).then(deletedResult=>{
                    res.json(deletedResult);
                })
            }
            else {
                res.json('unauhtorized, not your blogPost')
            }
        })
    }
})

module.exports = router;