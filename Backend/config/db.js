const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not found in environment variables');
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        console.log("Connected to database");
    }
    catch(error){
        console.error("MongoDB connection failed:", error.message);
        console.error("Please check your MONGO_URI environment variable");
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;