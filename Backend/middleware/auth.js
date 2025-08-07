const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    // TEMPORARY: For testing without authentication
    // Comment out this block when you implement proper auth
    // You'll need to replace this with a real user ID from your database
    try {
        // Create a test user in your database or use an existing one
        req.user = await User.findOne().select('-password'); // Gets first user
        if (!req.user) {
            return res.status(401).json({ message: "No test user found. Please create a user first." });
        }
        console.log('Using test user:', req.user._id);
        return next();
    } catch (error) {
        console.log('Error finding test user:', error.message);
        return res.status(401).json({ message: "Error finding test user" });
    }
    
    // ORIGINAL AUTH CODE - Uncomment when ready for real auth
    /*
   let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];
            console.log('Extracted token:', token);
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user by ID from token
            req.user = await User.findById(decoded.id).select('-password');
            
            // Check if user exists
            if (!req.user) {
                console.log('User not found in database');
                return res.status(401).json({ message: "User not found" });
            }
            
            console.log('User successfully set:', req.user._id);
            next(); // Continue to the next middleware/controller
            
        } catch (error) {
            console.log('JWT verification error:', error.message);
            return res.status(401).json({ 
                message: "Access Denied, Not Authorized", 
                error: error.message 
            });
        }
    } else {
        console.log('No Bearer token found in headers');
        return res.status(401).json({ 
            message: "Access Denied, No Token Provided" 
        });
    }
    */
};

module.exports = protect;