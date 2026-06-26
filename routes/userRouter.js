const express = require('express');

const router = express.Router();

router.get("/user", (req,res) =>{
    res.send("Hey everything is just working");
})

module.exports = router;
