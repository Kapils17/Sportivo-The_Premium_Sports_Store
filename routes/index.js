const express = require('express');
const { isloggedin } = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');

const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isloggedin, async (req, res) => {
    try {
        const products = await productModel.find();

        res.render("shop", { products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;