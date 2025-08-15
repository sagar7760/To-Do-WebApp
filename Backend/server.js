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

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Routes
//user authentication routes
app.use('/api/auth', require('./routes/auth'));


app.use('/api/todos', require('./routes/todos'));
// app.use('/api/users',require('./routes/userRoutes'));

//custon error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Start the cleanup service for old deleted todos
    startCleanupSchedule();
});