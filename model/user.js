const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {

        type: String,
        enum: ["male", "female", "other"]
        
    }

})

module.exports = mongoose.model("User", userSchema);