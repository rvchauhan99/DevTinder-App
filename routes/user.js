
const express = require("express");
const controllers = require("../controllers/user");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/signUp", controllers.signUp);
router.post("/login", controllers.login);
router.get("/profile", userAuth, controllers.getMyProfile);
router.post("/logout", controllers.logout);
router.get("/pendingRequests", userAuth, controllers.getPendingConnections);

// router.get("/logout", controllers.logout);

router.patch("/profile", userAuth , controllers.editProfile);




module.exports = router;
