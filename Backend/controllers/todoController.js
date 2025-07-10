const Todo = require('../models/todoModel');

// Create a new todo
exports.createTodo = async (req, res) => {

    const { title, description, dueDate } = req.body;
    
    if (!req.user) {
        console.log('ERROR: req.user is undefined');
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    if (!title) {
        console.log('ERROR: title is missing');
        return res.status(400).json({ message: "Title is required" });
    }
    
    try {
        console.log('Creating todo with userId:', req.user._id);
        const todo = await Todo.create({
            title,
            description,
            dueDate,
            userId: req.user._id
        });
        
        console.log('Todo created successfully:', todo._id);
        res.status(201).json({
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        console.log('Create todo error:', error.message);
        console.log('Full error:', error);
        res.status(500).json({
            message: "Error creating todo",
            error: error.message
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
            if(!todo){
                return res.status(404).json({
                    message:"Todo not found"
                });
            }
            // ADD THIS RESPONSE
            res.status(200).json({
                message: "Todo deleted successfully",
                todo
            });
        }catch (error) {
        return res.status(500).json({
            message:"Error deleting todo",
            error:error.message
        });
    }
}
//undo soft delete todo
exports.undoDeleteTodo=async(req,res)=>{
    const {id}=req.params;
    try{
        const todo=await Todo.findByIdAndUpdate(id,{
            deleted:false
        },{ 
            new:true
        });
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            });
        }
        res.status(200).json({  
            message:"Todo restored successfully",
            todo
        });
    }catch (error) {
        return res.status(500).json({
            message:"Error restoring todo",
            error:error.message
        });
    }
}

//peramanently delete todo
exports.permanentlyDeleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }
        
        // ADD THIS RESPONSE
        res.status(200).json({
            message: "Todo permanently deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error permanently deleting todo",
            error: error.message
        });
    }
}