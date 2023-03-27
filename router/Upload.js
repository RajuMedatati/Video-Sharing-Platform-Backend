const express = require("express");
require("../db/conn.js");
const Video = require("../model/Video.js");
const router = express.Router();

router.post('/upload', async (req, res) => {
    const {userid,tittle,desc,imgUrl,videoUrl,category,visibility} = req.body;
    const data = new Video({
        userid:userid,
        tittle:tittle,
        desc:desc,
        imgUrl:imgUrl,
        videoUrl:videoUrl,
        category:category,
        visibility:visibility
    });
    try{
        const newVideo = await data.save();
        res.json(newVideo)
    }
    catch(e){
        res.json({status:"failed",result:e.message})
    }

});

module.exports = router;
