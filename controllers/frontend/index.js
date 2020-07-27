var express = require('express');
var router = express.Router();
const db = require("../../models")

var hostRoutes = require('./hostsController');
const authRoutes = require("./authController");

router.use('/hosts',hostRoutes)
router.use('/auth',authRoutes)

router.get('/',(req,res)=>{
    db.Episode.findAll({
        order:[["createdAt","DESC"]],
        limit:6
    }).then(episodes=>{
        const jsonEps = episodes.map(episode=>episode.toJSON())
        const notFirst = jsonEps.slice(1);
        console.log(jsonEps);
        console.log(notFirst)
        res.render("visitors/index",{
            mostRecent:jsonEps[0],
            otherRecent:notFirst
        });
    })
})

module.exports = router;