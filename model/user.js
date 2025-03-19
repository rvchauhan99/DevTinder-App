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
        unique: true,
        // select : false
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    age : {
        type : Number,
        
    },
    gender : {

        type: String,
        enum: ["male", "female", "other"],
    
        
    },
    about : {
        type : String,
        trim : true,
        default : `my name is ${this.firstName} ${this.lastName}`
    },
    profilePic : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    

}, { timestamps: true })

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}   

module.exports = mongoose.model("User", userSchema);