const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose-connection');
const index = require('./routes/index');


require('dotenv').config();

const userRoute = require('./routes/userRouter');
const ownerRoute = require('./routes/ownerRouter');
const productRoute = require('./routes/productRouter');



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);

app.use(flash());

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine" , "ejs");

app.use("/user", userRoute);
app.use("/product" , productRoute);
app.use("/owners" , ownerRoute);
app.use("/", index);

app.listen(3000,()=>{
    console.log("Server is running on the port no 3000");
})