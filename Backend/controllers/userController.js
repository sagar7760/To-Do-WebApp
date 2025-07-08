const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.registerNewUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        // Check if user already exists
        const userExists=await User.find({email});
        if(userExists) return res.status(400).json({
            message:"User already exists"
        });

        // Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // Create new user
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        if(!user) return res.status(400).json({
            message:"Error creating user"
        });

        // Generate JWT token
        // The token is signed with the user's ID and a secret key, and it expires after a specified time.
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,process.env.JWT_EXPIRE);

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        });
    } catch (error) {
        res.status(500).json({
            message:"Error registering user",
            error:error.message
        });
    }
}

// Login user
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        // Check if user exists
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({
            message:"User not found"
        });
        // Check password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({
            message:"Invalid credentials"
        });

        // Generate JWT token
        const token=jwt.sign({id:user._id}.pprocess.en.JWT_SECRET,process.env.JWT_EXPIRE);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        });
    }catch (error) {
        res.status(500).json({
            message:"Error logging in user",
            error:error.message
        });
    }
}