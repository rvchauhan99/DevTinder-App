

const User = require("../model/user");
const ConnectionRequest = require("../model/connectionRequest");
async function sendInterestRequest(req, res) {

    try {
        // console.log("req.params", req.params);
        const allowedStatus = ["pending", "accepted", "rejected", "ignored"]

        if (!req.params.status) {

            throw new Error("Status Is Required");

        } else if (!allowedStatus.includes(req.params.status)) {
            throw new Error("Invalid Status " + req.params.status);

        } else if (!req.params.id) {

            throw new Error("User Id Is Required");

        } else if (req.params.id == req.user._id) {

            throw new Error("You Can't Send Interest To Yourself");

        } else {
            let user = await User.findById(req.params.id);
            if (!user) {
                throw new Error("User Not Found");
            } else {

                let request = await ConnectionRequest.findOne({ fromUser: req.user._id, toUser: req.params.id });
                if (request) {
                    if (request.status == "pending") {
                        throw new Error("Connection Request Already Sent");
                    } else if (request.status == "accepted") {
                        throw new Error("You Are Already Connected");
                    } else if (request.status == "rejected") {
                        throw new Error("Connection Request Already Rejected");
                    } else if (request.status == "ignored") {
                        throw new Error("Connection Request Already Ignored");
                    }
                } else {
                    const addRequest = new ConnectionRequest({ fromUser: req.user._id, toUser: req.params.id, status: req.params.status });
                    await addRequest.save();
                }
            }
        }
        res.send("Connection Request Sended Successfully")

    } catch (error) {
        res.status(400).send("Error " + error.message);
    }
}
module.exports = { sendInterestRequest }
