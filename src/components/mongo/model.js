const mongoose = require("mongoose") ; 

const Userschema = new mongoose.Schema(
    {
        accountaddress : String,
        username : String,
        password : String,
        role : String
    },
);

module.exports = mongoose.model("user",Userschema);

