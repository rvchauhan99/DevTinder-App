const validator = require("validator");
function validateSignup(req) {

    const { emailID, password, firstName, lastName, gender } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First Name And Last Name Is Required");

    } else if (!emailID || !password) {
        throw new Error("Email And Password Is Required");
    } else if (!gender) {
        throw new Error("Gender Is Required");
    }

    if (firstName.length < 3 || firstName.length > 20) {
        throw new Error("First Name Must Be 3 To 20 Character");
    } else if (lastName.length < 3 || lastName.length > 20) {
        throw new Error("Last Name Must Be 3 To 20 Character");
    } else if (!validator.isEmail(emailID)) {
        throw new Error("Invalid Email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password Must Be Strong");
    }
    else if (!validator.isAlpha(firstName)) {
        throw new Error("First Name Must Be Alphabetic");
    }
    else if (!validator.isAlpha(lastName)) {
        throw new Error("Last Name Must Be Alphabetic");
    }
    else if (!validator.isIn(gender, ["male", "female"])) {
        throw new Error("Gender Must Be Male Or Female");
    }

}
function validateEditProfile(req) {
    console.log(req.body);
    
try {
    

    const allowedFields = ["firstName","lastName" ,"emailID" ,"age", "gender", "about", "profilePic"];

    if(Object.keys(req.body).length == 0){
        throw new Error("Minumum One Fields Is Required For Update");
    }
    if(Object.keys(req.body).every(key => !allowedFields.includes(key))){
        throw new Error("Invalid Field");
    }
} catch (error) {
    console.log(error.message);
    
    throw new Error("Something Went Wrong " + error.message);
}
}
module.exports = { validateSignup , validateEditProfile }