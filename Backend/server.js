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
connectDB();

app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    process.env.FRONTEND_URL, // Your Vercel URL
    'https://your-app-name.vercel.app' // Replace with your actual Vercel URL
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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Start the cleanup service for old deleted todos
    startCleanupSchedule();
});