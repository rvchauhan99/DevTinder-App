
const express = require("express");
require("dotenv").config(); 
const app = express();

const mongoose = require("mongoose");

(async function () {
    
    await  mongoose.connect(process.env.MONGO_LOCAL_URI, { useNewUrlParser: true });
    console.log("DB CONNECTED ");

    const userSchema =new mongoose.Schema({
        name: String,
        email: String, 
        age: Number,
    })

    const user = mongoose.model("User", userSchema);

    app.get("/", async function (req, res) {

        try {
            

            let data = await user.find({});
            res.send(data);
        } catch (error) {
            res.send(error);
        }
        // res.send(await user.find());
    })
    
    app.post("/", function (req, res) {
    
    })
    app.listen(3000, function () {
        console.log("Server is running on port 3000");
    })

    

})();

