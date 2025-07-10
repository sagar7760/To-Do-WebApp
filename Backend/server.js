const express = require('express');
const connectDB = require('./config/db');
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
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Routes
app.use(cors());
//user authentication routes
app.use('/api/auth', require('./routes/auth'));


app.use('/api/todos', require('./routes/todos'));
// app.use('/api/users',require('./routes/userRoutes'));

//custon error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});