const express = require('express');

const router = express.Router();

router.get("/product", (req,res) =>{
    res.send("Hey everything is just working");
})

module.exports = router;
