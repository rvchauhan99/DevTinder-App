
// const user = require("../model/user");

const express = require("express");

const userControllers = require("../controllers/user");

const router = express.Router();

router.get("/", function (req, res) {
    res.send("auth Routes Called ");
});
// console.log(user);

module.exports = router;
