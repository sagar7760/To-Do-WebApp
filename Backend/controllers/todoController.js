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

// Get active todos for user
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
        res.status(500).json({
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

// mark todo as completed
exports.completeTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndUpdate(id, {
            completed: true
        }, {
            new: true
        });
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        res.status(200).json({
            message: "Todo marked as completed",
            todo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error completing todo",
            error: error.message
        });
    }
}
//mark todo as uncompleted
exports.uncompleteTodo=async(req,res)=>{
    const {id}=req.params;      
try{
    const todo=await Todo.findByIdAndUpdate(id,{
        completed:false
    },{ 
        new:true 
    });
    if(!todo){
        return res.status(404).json({
            message:"Todo not found"
        });
    }
    res.status(200).json({
        message:"Todo marked as uncompleted",
        todo
    });
    }catch (error) {
        return res.status(500).json({
            message:"Error marking todo as uncompleted",
            error:error.message
            });
    }   
}
// Update a todo
exports.updateTodo=async(req,res)=>{
    const {id}=req.params;
    const {title,description,dueDate}=req.body;
    try{
        const todo=await Todo.findByIdAndUpdate(id,{
            title,
            description,
            dueDate
        },{
            new:true
        });
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            });
        }
        res.status(200).json({
            message:"Todo updated successfully",
            todo
        });
    }catch (error) {
        res.status(500).json({
            message:"Error updating todo",  
            error:error.message
        });
    }
}

//soft delete todo
exports.deleteTodo=async(req,res)=>{
    const {id}=req.params;
    try{
        const todo=await Todo.findByIdAndUpdate(id,{
            deleted:true},
            {
                new:true
            })
        }catch (error) {
        return res.status(500).json({
            message:"Error deleting todo",
            error:error.message
        });
    }
}


//peramanently delete todo
exports.peramanentlyDeleteTodo=async(req,res)=>{
    const {id}=req.params;
    try{
        const todo=await Todo.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            });
        }
    }catch (error) {
        return res.status(500).json({
            message:"Error permanently deleting todo",
            error:error.message
        });
    }
}