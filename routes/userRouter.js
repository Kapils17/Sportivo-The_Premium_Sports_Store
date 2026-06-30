const express = require('express');
const userModel = require('../models/user-model');
const {registerUser} = require('../controllers/authController');
const {loginUser} = require('../controllers/authController');
const {logout} = require('../controllers/authController');



const router = express.Router();

router.get("/", (req,res) =>{
    res.send("Hey everything is just working");
})

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;


