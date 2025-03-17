const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
        enum: ["male", "female", "other"],
        message : "{VALUE} Invalid Gender"
        
    }
    

}, { timestamps: true })

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}   

module.exports = mongoose.model("User", userSchema);