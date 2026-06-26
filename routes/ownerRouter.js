const express = require('express');

const router = express.Router();

router.get("/owner", (req,res)=>{
    res.send("Hey everything is working");
})

module.exports = router;