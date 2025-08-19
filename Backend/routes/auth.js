const express = require('express');
const router = express.Router();
const { 
    registerNewUser, 
    loginUser, 
    verifyLoginOTP, 
    sendEmailVerificationOTP, 
    verifyEmailOTP, 
    resendOTP,
    forgotPassword,
    resetPassword
} = require('../controllers/userController');

// Route to register a new user
router.post('/register', registerNewUser);

// Route to login a user
router.post('/login', loginUser);

// Route to verify login OTP
router.post('/verify-login-otp', verifyLoginOTP);

// Route to send email verification OTP
router.post('/send-email-verification', sendEmailVerificationOTP);

// Route to verify email OTP
router.post('/verify-email-otp', verifyEmailOTP);

// Route to resend OTP
router.post('/resend-otp', resendOTP);

// Route to request password reset
router.post('/forgot-password', forgotPassword);

// Route to reset password with OTP
router.post('/reset-password', resetPassword);

module.exports= router;