
const user = require("../model/user");
async function getUsers(req,res) {
    
    try {
        // console.log(req.);
        
        console.log("Get User Called");
        const users = await user.find();
        console.log(users);
        
        res.send(users);    

    } catch (error) {

        res.send(error);
    }

}

module.exports = {
    getUsers
}