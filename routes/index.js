const express = require("express");
const user = require("./user");
const request = require("./request");



const router = express.Router()


router.use("/user", user);
router.use("/", request);





router.use("*", function (req,res) {
    res.send("Welcome To Dev Tinder ")

});

// router.use("*", function (req, res) {
//     res.send("404 Not Found");
// })

module.exports = router 


