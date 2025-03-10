const express = require("express");
const user = require("./user");
const auth = require("./auth");
const fun = require("./fun");


const router = express.Router()


router.use("/user", user);
router.use("/auth", auth);




router.use("*", function (req,res) {
    res.send("Welcome To Dev Tinder ")

});

// router.use("*", function (req, res) {
//     res.send("404 Not Found");
// })

module.exports = router 


