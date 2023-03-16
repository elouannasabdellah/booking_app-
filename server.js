
const express = require('express');

const app= express();

const mongoose= require('mongoose');

const dotenv= require('dotenv');
dotenv.config();

const userRoute= require('./routes/users');
const hotelsRoute= require('./routes/hotels');
const roomsRoute= require('./routes/rooms');
const authRoute= require('./routes/auth');

const cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(express.json())

var cors = require('cors')

app.use(cors()) 

const connect= async ()=>{

    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to mongodb ");
    }
     catch(error){
        console.log(error);
    }
    


}
// connect to Mogodb 
connect();

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err,req,res,next)=>{
    
    const errorStatus= err.status || 500;
    const errorMessage = err.message || "semething went wrong";

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack,
    })

})



app.listen(8080, ()=>{
    console.log("server connected in port 8080");
})