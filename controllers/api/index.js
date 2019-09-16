const express = require('express');
const router = express.Router();
const hostAPIRoutes = require('./hostsApiController');
const blogAPIRoutes = require('./blogPostsApiController');
const reviewAPIRoutes = require('./reviewApiController');

router.use('/hosts',hostAPIRoutes);
router.use('/blogPosts',blogAPIRoutes);
router.use('/reviews',reviewAPIRoutes);

router.get('/',(req,res)=>{
    res.send("index API route, MOAR testing")
})

module.exports = router;