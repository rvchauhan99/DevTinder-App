const router = require("express").Router();
const { connectionRequest } = require("../controllers/request");
const { userAuth } = require("../middlewares/auth");
const controllers = require("../controllers/request");

router.post("/request/send/:status/:id", userAuth, controllers.sendInterestRequest);  

router.post("/request/review/:status/:requestId", userAuth, controllers.reviewRequest); 


module.exports = router 