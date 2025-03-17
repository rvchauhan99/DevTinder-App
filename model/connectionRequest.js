const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({

    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "ignored"],
        default: "pending",
        message : "{VALUE} Invalid Status",
        required: true

    }

}, {timestamps : true})
connectionRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

// connectionRequestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);

