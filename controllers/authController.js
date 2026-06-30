const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    return res.redirect("/");
                }

                const newUser = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });

                const token = generateToken(newUser);
                res.cookie("token", token);

                return res.redirect("/shop");
            });
        });
    } catch (err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            req.flash("error", "Email or Password is incorrect.");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }

            if (!result) {
                req.flash("error", "Email or Password is incorrect.");
                return res.redirect("/");
            }

            const token = generateToken(user);
            res.cookie("token", token);

            return res.redirect("/shop");
        });

    } catch (err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
    }
};

module.exports.logout = async(req , res) =>{
    res.cookie("token", " ");
    res.redirect("/");
};