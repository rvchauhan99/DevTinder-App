
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { validateSignup } = require("../utils/validations");
require("dotenv").config();

async function signUp(req, res) {
    try {

        // validation Of Data
        validateSignup(req)

        let checkUser = await User.findOne({ emailID: req.body.emailID });
        if (checkUser) {
            return res.send("User Found");
        }
        // Encryption Of Password
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        // User Ceation
        const user = new User(req.body);
        await user.save();
        res.send("User Created Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Something Went Wrong " + error.message);
    }
}
async function login(req, res) {

    try {
        if (!req.body.emailID || !req.body.password) {
            res.status(400).send("Email And Password Required");
        }

        let checkUser = await User.findOne({ emailID: req.body.emailID });
        if (!checkUser) {
            return res.status(404).send("User Not Found");
        }
        let isMatch = await bcrypt.compare(req.body.password, checkUser.password);
        if (!isMatch) {
            return res.status(401).send("Incorrect Password");
        } else {
            let token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET);
            console.log("token", token);

            res.cookie("token", token);

            res.send("User Sign Successfully");
        }

    } catch (error) {
        res.status(400)
    }

}
async function getMyProfile(req, res) {

    try {

        console.log("req.cookie",req.headers.cookie);
        // fs.createReadStream("./public/index.html").pipe(res);
        // fs.writeFileSync("./headers.json",JSON.stringify(req.headers)) ;
        let tokenData =  jwt.verify(req.headers.cookie.split("=")[1], process.env.JWT_SECRET);
        // console.log("tokenData", tokenData);   
        let user = await User.findById(tokenData._id)
        // console.log("User" , user);
         
        
        res.send(user);



    } catch (error) {

    }
}
async function getUserByEmail(req, res) {
    try {
        const user = await User.finOne({
            email: req.body.email
        });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
}
async function getUsers(req, res) {

    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.send(error);
    }

}
getUserById = async function (req, res) {
    try {
        const id = req.params.id;
        const data = await User.findOne({
            _id: id
        });
        res.send(data);
    } catch (error) {
        console.log("erorr", error);

        res.send(error);
    }
}
deleteUserById = async function (req, res) {

    try {
        const id = req.params.id;
        const data = await User.deleteOne({
            _id: id
        });
        if (data.deletedCount == 1) {
            res.send({ statsus: 200, message: "User Deleted Successfully" });
        }
        res.send({ statsus: 400, message: "User Not Found" });

    } catch (error) {
        res.status(400).send("Something Went Wrong");
    }
}
updateUserById = async function (req, res) {
    let userId = req.body.userId;
    try {
        let updateUser = await User.findOneAndUpdate({
            _id: userId
        }, req.body, { returnDocument: "before" });
        res.send("User Updated Successfully", updateUser);

    } catch (error) {
        res.status(400).send("Something Went Wrong");
    }
}
module.exports = {
    getUsers,
    getUserById,
    signUp,
    getUserByEmail,
    deleteUserById,
    login,
    getMyProfile
}