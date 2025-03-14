const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20

    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20

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
        
    },
    gender : {

        type: String,
        enum: ["male", "female", "other"]
        
    }

})

module.exports = mongoose.model("User", userSchema);