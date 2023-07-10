const express=require('express');
const { connection } = require('./db');
const { UserRoute } = require('./Routes/user.route');
const { ResturantRoute } = require('./Routes/resturant.route');
const {OrderRoute}=require("./Routes/order.route");
const { authentication } = require('./Middleware/authentication.middleware');
require('dotenv').config()

const app=express();
app.use(express.json());

app.use("/api",UserRoute)
app.use(authentication)
app.use("/api",ResturantRoute)
app.use("/api",OrderRoute)




app.listen(process.env.port,async()=>{
    try {
         await connection
         console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})
