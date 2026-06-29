const mongoose = require('mongoose');

const config = require('config');

const dbgr = require('debug')("development:mongoose");

mongoose.connect(`${config.get("MongoDB_URI")}/scatch`)
.then(function(){
   dbgr("Database Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;