const express = require('express');
const router = express.Router();
const { registerNewUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/auth');

// Route to register a new user
router.post('/register', registerNewUser);
// Route to login a user
router.post('/login', loginUser);

module.exports= router;