var express = require('express');
var router = express.Router(); 
const db  = require('../../models');

router.get('/',(req,res)=>{
    db.Review.findAll({include:[db.Host,db.Platform]}).then(Reviews=>{
        res.json(Reviews);
    })
});

router.post('/',(req,res)=>{
    console.log('posting review')
    console.log(req.session);
    if(!req.session.user){
        res.redirect('/')
    }
    else {
        db.Review.create({
          title:req.body.title,
          body:req.body.body,
          score:req.body.score,
          HostId:req.session.user.id 
        }).then(newReview=>{
            let platforms = req.body.platforms.split(",");
            platforms.forEach(platformId=>{
                newReview.addPlatform(platformId)
            })
            res.json(newReview)
            
        })
    }
})

router.get('/:id',(req,res)=>{
    db.Review.findOne({where:{id:req.params.id}}).then(review=>{
        res.send(review)
    })
})

router.put('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.Review.findOne({where:{id:req.params.id}}).then(review=>{
            if(req.session.user && req.session.user.id === review.HostId) {
                db.Review.update({
                    title:req.body.title,
                    body:req.body.body,
                    score:req.body.score
                },
                {where:{id:req.params.id}}
                ).then(updateResult=>{
                    res.send(updateResult);
                })
            }
            else {
                res.status("401").json("Unauthorized: Not your review")
            }
        })
    }
})

router.delete('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.Review.findOne({where:{id:req.params.id}}).then(review=>{
            if(req.session.user && req.session.user.id === review.HostId) {
                db.Review.destroy({where:{id:req.params.id}}).then(deletedResult=>{
                    res.json(deletedResult);
                })
            }
            else {
                res.json('unauhtorized, not your review')
            }
        })
    }
})

module.exports = router;