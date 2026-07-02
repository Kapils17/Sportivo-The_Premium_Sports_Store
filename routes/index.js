const express = require('express');
const { isloggedin } = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error , loggedin : false});
});

router.get("/shop", isloggedin, async (req, res) => {
    try {
        const products = await productModel.find();
        let success = req.flash("success");

        res.render("shop", { products , success });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/cart", isloggedin, async (req, res) => {
   let user = await userModel.findOne({email : req.user.email}).populate("cart");
   res.render("cart" , {user});
});


router.get("/addtocart/:productid", isloggedin, async (req, res) => {
    
    let user = await userModel.findOne({email : req.user.email});

    user.cart.push(req.params.productid);
    await user.save();
    
    req.flash("success", "Added to cart");
    res.redirect("/shop");


});


module.exports = router;