const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        requred:true,
    },
    email:{
        type:String,
        requrired:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    ceatedAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model("User", userSchema);