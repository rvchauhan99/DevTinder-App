const express = require("express");
const users = require("./user");
const auth = require("./auth");

const router = express.Router()

router.use("/", users);
router.use("/", auth);

module.exports = router 


