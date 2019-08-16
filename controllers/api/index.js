const express = require('express');
const router = express.Router();
const hostAPIRoutes = require('./hostsApiController');
const blogAPIRoutes = require('./blogPostsApiController');

router.use('/hosts',hostAPIRoutes);
router.use('/blogPosts',blogAPIRoutes);

router.get('/',(req,res)=>{
    res.send("index API route, MOAR testing")
})

module.exports = router;