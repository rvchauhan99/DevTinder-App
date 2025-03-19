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

connectionRequestSchema.pre("save", function (next) {
        
    if ( this.fromUser.equals(this.toUser) ) {
        throw new Error("You Can't Send Interest To Yourself");
    }
    next();
})
connectionRequestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);

