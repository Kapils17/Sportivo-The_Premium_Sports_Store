const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const index = require('./routes/index');

const userRoute = require('./routes/userRouter');
const ownerRoute = require('./routes/ownerRouter');
const productRoute = require('./routes/productRouter');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine" , "ejs");

app.use("/user", userRoute);
app.use("/product" , productRoute);
app.use("/owner" , ownerRoute);
app.use("/", index);

app.listen(3000,()=>{
    console.log("Server is running on the port no 3000");
})