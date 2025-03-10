
const User = require("../model/user");

const bcrypt = require("bcrypt");

async function signUp(req, res) {
    try {

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const user = new User(req.body);
        await user.save();
        res.send("User Created Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Something Went Wrong");
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
    deleteUserById
}