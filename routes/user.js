
// const user = require("../model/user");

const express = require("express");

const userControllers = require("../controllers/user");

const router = express.Router();

router.get("/", userControllers.getUsers);
// console.log(user);

module.exports = router;
