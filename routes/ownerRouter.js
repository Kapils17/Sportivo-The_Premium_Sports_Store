const express = require("express");
const ownerModel = require("../models/owner-model");

const router = express.Router();

if (process.env.NODE_ENV === "development") {



    router.post("/create", async (req, res) => {

        let owners = await ownerModel.find();

        if (owners.length > 0) {
            return res.status(503).send("You are not permitted");
        }

     const createdOwner = ownerModel.create({
         fullname : "Kapil Kumar Sharma",
         email : "kapilsharma200517@gmail.com",
         password : "kapil@200517",
        })

        res.send(createdOwner);

       
    });

}

router.get("/", (req, res) => {
    res.send("Hey everything is working");
});

module.exports = router;