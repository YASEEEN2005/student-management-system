const { config } = require("dotenv");
const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Server Running");
    
})

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
     
})