const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { error: "" });  // ya null / []
});

module.exports = router;