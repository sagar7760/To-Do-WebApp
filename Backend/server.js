const express = require('express');
const connectDB = require('./config/db');
const { startCleanupSchedule } = require('./services/cleanupService');
// const { db } = require('./models/userModel');
const cors=require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app and connect to MongoDB
// This is a Node.js server using Express and MongoDB for a To-Do application.
// It connects to the database and sets up the server to listen on a specified port.
const app = express();
require('dotenv').config();

// Log environment info for debugging
console.log('Starting Taskly Backend...');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 5000);

connectDB();

app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    process.env.FRONTEND_URL, // Your Vercel URL (will be set later)
    'https://taskly-7bc492659ba9.herokuapp.com' // Your actual Heroku backend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Taskly API is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
//user authentication routes
app.use('/api/auth', require('./routes/auth'));


app.use('/api/todos', require('./routes/todos'));
// app.use('/api/users',require('./routes/userRoutes'));

//custon error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Add error handling for server startup
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Server URL: http://localhost:${PORT}`);
    
    // Start the cleanup service for old deleted todos
    try {
        startCleanupSchedule();
        console.log('✅ Cleanup service started');
    } catch (error) {
        console.error('⚠️  Cleanup service failed to start:', error.message);
    }
});

// Handle server errors
server.on('error', (error) => {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    console.error(error.stack);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});