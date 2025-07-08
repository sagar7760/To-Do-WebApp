const Todo = require('../models/todoModel');

// Create a new todo
exports.createTodo=async(req,res)=>{
    const {title,description,dueDate}=req.body;
    try{
        const todo=await Todo.create({
            title,
            description,
            dueDate,
            userId:req.user._id
        })
        res.status(201).json({
            message:"Todo created successfully",
            todo
        });
    }catch (error) {
        res.status(500).json({
            message:"Error creating todo",
            error:error.message
        });
    }
}

// Get acti///////////////ve todo for user
exports.getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find({
            userId:req.user._id,
            deleted:false,
            completed:false
        }).sort({createdAt:-1});
        res.status(200).json({
            todos
        })
    }catch (error) {
        res.stasus(500).json({
            message:"Error fetching todos",
            error:error.message
        });
    }
}

//get completed todos for user
exports.getCompletedTodos=async(req,res)=>{
    try{
        const todos=await Todo.find({
            userId:req.user._id,
            deleted:false,
            completed:true
        }).sort({createdAt:-1});
        res.status(200).json({
            todos
        })
    }catch (error) {
        res.status(500).json({
            message:"Error fetching completed todos",
            error:error.message
        });
    }
}

//mark todo as completed
// exports.completeTodo=async(req,res)=>{
//     const{id}=req.params;
//     try
// }
