const express = require("express");
const app = express();
const { connectDb } = require("./common/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const routes = require('./routes'); // Import all routes
const ip = require("ip");

(async function () {
    console.log("Index File Called ");
    try {

    
    await connectDb();
    cors = require("cors");
    // const path = require("path");
    dotenv.config();

    app.use(cors());
    app.use(express.json());
    app.use(routes);


    app.listen(process.env.PORT, function () {
        console.log(`Server is running on ${ip.address()}:${process.env.PORT}`);
    })
            
} catch (error) {

    console.log("Error While Start Server ", error.message);
    
        
}

})()





