var express = require('express');
var router = express.Router(); 
const db  = require('../../models');

router.get('/',(req,res)=>{
    db.Episode.findAll({include:[db.Host]}).then(Episodes=>{
        res.json(Episodes);
    })
});

router.post('/',(req,res)=>{
    console.log('posting episode')
    console.log(req.session);
    if(!req.session.user){
        res.redirect('/')
    }
    else {
        db.Episode.create({
          title:req.body.title,
          description:req.body.description,
          number:req.body.number
        }).then(newEpisode=>{
            newEpisode.addHost(req.session.user.id);
            res.json(newEpisode);
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