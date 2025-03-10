
// const user = require("../model/user");

const express = require("express");

const userControllers = require("../controllers/user");

const router = express.Router();

router.post("/signUp" ,userControllers.signUp);
router.get("/userByEmail" ,userControllers.getUserByEmail);
router.get("/" ,userControllers.getUsers);
router.get("/feed" ,userControllers.getUsers);
router.get("/:id" ,userControllers.getUserById);
router.delete("/:id" ,userControllers.deleteUserById);
module.exports = router;
