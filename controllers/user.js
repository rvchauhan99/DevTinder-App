
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { validateSignup } = require("../utils/validations");
require("dotenv").config();

async function signUp(req, res) {
    try {

        // validation Of Data
        validateSignup(req)

        let checkUser = await User.findOne({ emailID: req.body.emailID });
        if (checkUser) {
            return res.send("User Found");
        }
        // Encryption Of Password
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        // User Ceation
        const user = new User(req.body);
        await user.save();
        res.send("User Created Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Something Went Wrong " + error.message);
    }
}
async function login(req, res) {

    try {
        if (!req.body.emailID || !req.body.password) {
            res.status(400).send("Email And Password Required");
        }

        let checkUser = await User.findOne({ emailID: req.body.emailID });
        if (!checkUser) {
            return res.status(404).send("User Not Found");
        }
        let isMatch = await checkUser.verifyPassword(req.body.password);
        if (!isMatch) {
            return res.status(401).send("Incorrect Password");
        } else {
            let token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.send("User Sign Successfully");
        }

    } catch (error) {
        res.status(400)
    }

}
async function getMyProfile(req, res) {

    try {
        
        res.send(req.user);
 
    } catch (error) {

        res.status(400).send("Error  " + error.message);
    }
}
async function logout(req, res) {
    res.clearCookie("token");
    res.send("Logout Successfully");
}
module.exports = {
    signUp,
    login,
    getMyProfile,
    logout
}