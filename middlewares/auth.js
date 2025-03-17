const  jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async function (req, res, next) {
    try {
        if (req.cookies.token) {
            let tokenData = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            if (tokenData) {
                let user = await User.findById(tokenData._id)
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(400).send("User Not Found");
                }
            } else {
                res.status(400).send("Invalid Token");
            }
        } else {
            res.status(400).send("Token Not Found");
        }
    }
    catch (error) {
        res.status(400).send("Error " + error.message);
    }
}
module.exports = { userAuth }   