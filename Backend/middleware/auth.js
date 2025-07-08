const jwt=require('jsonwebtoken');
const User = require('../models/userModel');
const { token } = require('morgan');
// const asyncHandler = require('express-async-handler');

// Middleware to authenticate user
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.autharization&&req.headers.autharization.startsWith('Bearer'))
        try {
            token=req.headers.autharization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=User.findById(decoded.id).select('-password');
            next();
        }catch (error) {
            res.status(401).json({
                message:"Access Denied, Not Authorized",
                error:error.message
            });
        }   
}

if(!token) {
    res.status(401).json({
        message:"Access Denied, No Token Provided"
    });
}

// Middleware to check if user is admin
// const isAdmin=(req,res,next)=>{
//     if(req.user&&req.user.isAdmin) {
//         next();
//     } else {
//         res.status(403).json({
//             message:"Access Denied, Not Authorized as Admin"
//         });
//     }
// }

module.exports=protect;