const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
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

// Security: Hide X-Powered-By header
app.disable('x-powered-by');

// Log environment info for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Starting Taskly Backend...');
  console.log('Node Environment:', process.env.NODE_ENV);
  console.log('Port:', process.env.PORT || 5000);
}

connectDB();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiting (more strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  skipSuccessfulRequests: true,
});

app.use(limiter);

// Body parsing middleware with size limits
app.use(express.json({ limit: '10mb' }));

// Data sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    'https://to-do-web-app-hazel.vercel.app', // Your Vercel frontend URL
    process.env.FRONTEND_URL, // Additional frontend URL if needed
    'https://taskly-7bc492659ba9.herokuapp.com' // Your actual Heroku backend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Secure logging (don't log in production)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    
    // Debug CORS requests (development only)
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
      next();
    });
} else {
    app.use(morgan('combined'));
}

// Health check endpoint (minimal info)
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'Taskly API',
    timestamp: new Date().toISOString()
  });
});

// Apply auth rate limiting to authentication routes
app.use('/api/auth', authLimiter);

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
    if (process.env.NODE_ENV === 'development') {
        console.log(` Server is running on port ${PORT}`);
        console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Server URL: http://localhost:${PORT}`);
    }
    
    // Start the cleanup service for old deleted todos
    try {
        startCleanupSchedule();
        if (process.env.NODE_ENV === 'development') {
            console.log(' Cleanup service started');
        }
    } catch (error) {
        console.error(' Cleanup service failed to start');
        if (process.env.NODE_ENV === 'development') {
            console.error(error.message);
        }
    }
});

// Handle server errors
server.on('error', (error) => {
    console.error(' Server failed to start');
    if (process.env.NODE_ENV === 'development') {
        console.error(error.message);
    }
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error(' Uncaught Exception');
    if (process.env.NODE_ENV === 'development') {
        console.error(error.message);
        console.error(error.stack);
    }
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error(' Unhandled Rejection');
    if (process.env.NODE_ENV === 'development') {
        console.error('at:', promise, 'reason:', reason);
    }
    process.exit(1);
});