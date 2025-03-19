

const User = require("../model/user");
const ConnectionRequest = require("../model/connectionRequest");
async function sendInterestRequest(req, res) {

    try {
        // console.log("req.params", req.params);
        const allowedStatus = ["pending", "ignored"]

        if (!req.params.status) {

            throw new Error("Status Is Required");

        } else if (!allowedStatus.includes(req.params.status)) {
            throw new Error("Invalid Status " + req.params.status);

        } else if (!req.params.id) {

            throw new Error("User Id Is Required");
        } else {
            const fromUser = req.user._id;
            const toUser = req.params.id;
            const targetedUser = await User.findById(req.params.id);
            if (!targetedUser) {
                throw new Error("User Not Found");
            }

            let user = await User.findById(req.params.id);
            if (!user) {
                throw new Error("User Not Found");
            } else {

                let request = await ConnectionRequest.findOne({

                    $or: [
                        { fromUser: fromUser, toUser: toUser },
                        { fromUser: toUser, toUser: fromUser }
                    ]

                });
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
async function reviewRequest(req, res) {

    try {
        const allowedStatus = ["accepted", "rejected"]

        if (!req.params.status) {

            throw new Error("Status Is Required");

        } else if (!allowedStatus.includes(req.params.status)) {
            throw new Error("Invalid Status " + req.params.status);

        } else if (!req.params.requstedUserId) {

            throw new Error("User Id Is Required");
        }else{

            findPendingRequest = await ConnectionRequest.findOne({
                $and: [
                    { _id : req.params.requestId, toUser: req.user._id },
                    { status: "pending" }
                ]
            });
            if (!findPendingRequest) {
                throw new Error("Connection Request Not Found");
            } else {
                findPendingRequest.status = req.params.status;
                await findPendingRequest.save();
            }
        }
        res.send("Connection Request Reviewed Successfully")

    } catch (error) {

        res.status(400).send("Error " + error.message);
    }
}
module.exports = { sendInterestRequest , reviewRequest}
