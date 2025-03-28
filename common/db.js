const Mongoose = require("mongoose");;
require("dotenv").config();
connectDb = async function () {

    try {

        console.log("Connecting  DB")
        await Mongoose.connect(process.env.MONGO_URI);
        console.log("Databae Connected Successfully");


    } catch (error) {

        console.log("Failed To Connect DB", error.message);

    }
}

module.exports = {
    connectDb
}

