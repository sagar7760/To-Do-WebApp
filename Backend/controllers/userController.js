const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require('../models/userModel');
const PendingUser = require('../models/pendingUserModel');
const otpService = require('../services/otpService');

// Register a new user
exports.registerNewUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        // Check if user already exists
        const userExists=await User.findOne({email: email.toLowerCase()});
        if(userExists) return res.status(400).json({
            message:"User already exists"
        });

        // Check if there's already a pending registration for this email
        const pendingExists = await PendingUser.findOne({email: email.toLowerCase()});
        if(pendingExists) {
            // Delete the existing pending registration to allow new one
            await PendingUser.deleteOne({email: email.toLowerCase()});
        }

        // Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // Store user data temporarily (don't create actual user yet)
        const pendingUser = await PendingUser.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        if(!pendingUser) return res.status(400).json({
            message:"Error storing user data"
        });

        // Send email verification OTP
        try {
            await otpService.createAndSendOTP(email.toLowerCase(), 'email_verification');
            console.log('Email verification OTP sent to:', email);
        } catch (emailError) {
            console.log('Email sending failed during registration:', emailError.message);
            // If email fails, remove the pending user
            await PendingUser.deleteOne({email: email.toLowerCase()});
            return res.status(500).json({
                message: "Failed to send verification email. Please try again."
            });
        }

        res.status(201).json({
            email: email.toLowerCase(),
            needsEmailVerification: true,
            message: "Please check your email to verify your account."
        });
    } catch (error) {
        res.status(500).json({
            message:"Error registering user",
            error:error.message
        });
    }
}

// Login user
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        console.log('Login attempt for email:', email);
        
        // Check if user exists (case-insensitive email search)
        const user=await User.findOne({email: email.toLowerCase()});
        if(!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({
                message:"User not found"
            });
        }
        
        console.log('User found:', user.email, 'isEmailVerified:', user.isEmailVerified);
        
        // Check password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        // For backward compatibility, if isEmailVerified is undefined, set it to true
        if (user.isEmailVerified === undefined || user.isEmailVerified === null) {
            await User.findByIdAndUpdate(user._id, { 
                isEmailVerified: true, 
                emailVerifiedAt: new Date() 
            });
            console.log('Updated legacy user with email verification status');
        }

        // Check if email is verified
        if (user.isEmailVerified === false) {
            console.log('Email not verified for user:', email);
            return res.status(400).json({
                message: "Please verify your email address before logging in",
                needsEmailVerification: true,
                email: email
            });
        }

        // If email is verified, proceed with direct login (no OTP required)
        console.log('Email verified, proceeding with direct login for:', email);
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: "Login successful"
        });
    }catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message:"Error logging in user",
            error:error.message
        });
    }
}

// Verify OTP and complete login
exports.verifyLoginOTP = async (req, res) => {
    const { email, otp } = req.body;
    
    try {
        // Verify OTP
        const otpResult = await otpService.verifyOTP(email, otp, 'login_verification');
        
        if (!otpResult.success) {
            return res.status(400).json({
                message: otpResult.message
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error verifying OTP",
            error: error.message
        });
    }
};

// Send email verification OTP
exports.sendEmailVerificationOTP = async (req, res) => {
    const { email } = req.body;
    
    try {
        // Check if there's a pending user (for new registrations)
        const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() });
        
        if (pendingUser) {
            // This is for a new registration
            await otpService.createAndSendOTP(email, 'email_verification');
            
            res.status(200).json({
                message: "Verification code sent to your email"
            });
            return;
        }

        // Check if user exists (for existing users)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email is already verified"
            });
        }

        // Send OTP
        await otpService.createAndSendOTP(email, 'email_verification');

        res.status(200).json({
            message: "Verification code sent to your email"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error sending verification code",
            error: error.message
        });
    }
};

// Verify email with OTP
exports.verifyEmailOTP = async (req, res) => {
    const { email, otp } = req.body;
    
    try {
        // Verify OTP
        const otpResult = await otpService.verifyOTP(email, otp, 'email_verification');
        
        if (!otpResult.success) {
            return res.status(400).json({
                message: otpResult.message
            });
        }

        // Check if this is a new registration (pending user exists)
        const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() });
        
        if (pendingUser) {
            // This is a new registration - create the actual user account
            const newUser = await User.create({
                name: pendingUser.name,
                email: pendingUser.email,
                password: pendingUser.password,
                isEmailVerified: true,
                emailVerifiedAt: new Date()
            });

            if (!newUser) {
                return res.status(500).json({
                    message: "Error creating user account"
                });
            }

            // Remove the pending user data
            await PendingUser.deleteOne({ email: email.toLowerCase() });

            // Generate JWT token for immediate login
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE }
            );

            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token,
                message: "Email verified successfully! Your account has been created and you are now logged in."
            });
        } else {
            // This is for existing user email verification
            const user = await User.findOneAndUpdate(
                { email: email.toLowerCase() },
                { 
                    isEmailVerified: true,
                    emailVerifiedAt: new Date()
                },
                { new: true }
            );

            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "Email verified successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error verifying email",
            error: error.message
        });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    const { email, purpose = 'email_verification' } = req.body;
    
    try {
        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Send new OTP
        await otpService.createAndSendOTP(email, purpose);

        res.status(200).json({
            message: "New verification code sent to your email"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error sending verification code",
            error: error.message
        });
    }
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "No account found with this email address"
            });
        }

        // Check if user's email is verified
        if (!user.isEmailVerified) {
            return res.status(400).json({
                message: "Please verify your email address first"
            });
        }

        // Send password reset OTP
        await otpService.createAndSendOTP(email.toLowerCase(), 'password_reset');

        res.status(200).json({
            message: "Password reset code sent to your email"
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            message: "Error sending password reset code",
            error: error.message
        });
    }
};

// Reset Password - Verify OTP and update password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    
    try {
        // Verify OTP
        const otpResult = await otpService.verifyOTP(email.toLowerCase(), otp, 'password_reset');
        
        if (!otpResult.success) {
            return res.status(400).json({
                message: otpResult.message
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword
        });

        res.status(200).json({
            message: "Password reset successfully. You can now login with your new password."
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            message: "Error resetting password",
            error: error.message
        });
    }
};