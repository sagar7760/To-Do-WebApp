const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user by ID from token
            req.user = await User.findById(decoded.id).select('-password');
            
            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: "User not found" 
                });
            }
            
            next(); // Continue to the next middleware/controller
            
        } catch (error) {
            // Different error messages for different JWT errors
            let message = "Access Denied, Invalid Token";
            
            if (error.name === 'TokenExpiredError') {
                message = "Access Denied, Token Expired";
            } else if (error.name === 'JsonWebTokenError') {
                message = "Access Denied, Invalid Token";
            }
            
            return res.status(401).json({ 
                success: false,
                message: message
            });
        }
    } else {
        return res.status(401).json({ 
            success: false,
            message: "Access Denied, No Token Provided" 
        });
    }
};

module.exports = protect;