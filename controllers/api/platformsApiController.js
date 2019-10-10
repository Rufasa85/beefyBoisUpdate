var express = require('express');
var router = express.Router(); 
const db  = require('../../models');

router.get('/',(req,res)=>{
    db.Platform.findAll({include:[db.Review]}).then(platforms=>{
        res.json(platforms);
    })
});

router.post('/',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else {
        db.Platform.create({
          name:req.body.name
        }).then(newPlatform=>{
            res.json(newPlatform)
        })
    }
})

router.get('/:id',(req,res)=>{
    db.Platform.findOne({where:{id:req.params.id}}).then(platform=>{
        res.send(platform)
    })
})

router.put('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.Platform.findOne({where:{id:req.params.id}}).then(review=>{
            db.Platform.update({
                name:req.body.name
            },
            {where:{id:req.params.id}}
            ).then(updateResult=>{
                res.send(updateResult);
            })
        })
    }
})

router.delete('/:id',(req,res)=>{
    if(!req.session.user){
        res.redirect('/')
    }
    else{
        db.Platform.findOne({where:{id:req.params.id}}).then(review=>{
            db.Platform.destroy({where:{id:req.params.id}}).then(deletedResult=>{
                res.json(deletedResult);
            })
        })
    }
})

module.exports = router;