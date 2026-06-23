const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello ! All good working");
})

app.listen(3000,()=>{
    console.log("Server is running on the port no 3000");
})