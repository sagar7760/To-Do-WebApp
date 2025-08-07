const mongoose = require('mongoose');

const todoSchema= new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    deleted:{
        type:Boolean,
        default:false,  
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
})

module.exports=mongoose.model("Todo",todoSchema);
