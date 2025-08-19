const crypto = require('crypto');
const OTP = require('../models/otpModel');
const emailService = require('./emailService');

class OTPService {
  // Generate a 6-digit OTP
  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Create and send OTP
  async createAndSendOTP(email, purpose = 'email_verification') {
    try {
      console.log('Creating OTP for email:', email, 'purpose:', purpose);
      
      // Normalize email to lowercase
      const normalizedEmail = email.toLowerCase();
      
      // Delete any existing OTPs for this email and purpose
      await OTP.deleteMany({ email: normalizedEmail, purpose });

      // Generate new OTP
      const otp = this.generateOTP();
      console.log('Generated OTP:', otp);

      // Save OTP to database
      const otpDoc = await OTP.create({
        email: normalizedEmail,
        otp,
        purpose,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      console.log('OTP saved to database:', otpDoc._id);

      // Send email
      console.log('Attempting to send email...');
      const emailResult = await emailService.sendOTPEmail(email, otp, purpose);
      console.log('Email send result:', emailResult);

      if (!emailResult.success) {
        // If email failed, delete the OTP
        await OTP.findByIdAndDelete(otpDoc._id);
        throw new Error('Failed to send verification email');
      }

      return {
        success: true,
        message: 'OTP sent successfully',
        otpId: otpDoc._id
      };
    } catch (error) {
      console.error('Error creating and sending OTP:', error);
      throw error;
    }
  }

  // Verify OTP
  async verifyOTP(email, otp, purpose = 'email_verification') {
    try {
      // Normalize email to lowercase
      const normalizedEmail = email.toLowerCase();
      
      // Find the OTP
      const otpDoc = await OTP.findOne({
        email: normalizedEmail,
        purpose,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpDoc) {
        return {
          success: false,
          message: 'Invalid or expired OTP'
        };
      }

      // Check attempts
      if (otpDoc.attempts >= 5) {
        return {
          success: false,
          message: 'Maximum attempts exceeded. Please request a new OTP.'
        };
      }

      // Increment attempts
      otpDoc.attempts += 1;
      await otpDoc.save();

      // Verify OTP
      if (otpDoc.otp !== otp) {
        return {
          success: false,
          message: `Invalid OTP. ${5 - otpDoc.attempts} attempts remaining.`
        };
      }

      // Mark OTP as used
      otpDoc.isUsed = true;
      await otpDoc.save();

      return {
        success: true,
        message: 'OTP verified successfully'
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }

  // Clean up expired OTPs (optional, as MongoDB TTL index handles this)
  async cleanupExpiredOTPs() {
    try {
      const result = await OTP.deleteMany({
        expiresAt: { $lt: new Date() }
      });
      console.log(`Cleaned up ${result.deletedCount} expired OTPs`);
      return result.deletedCount;
    } catch (error) {
      console.error('Error cleaning up expired OTPs:', error);
      throw error;
    }
  }

  // Check if user has pending OTP
  async hasPendingOTP(email, purpose = 'email_verification') {
    try {
      const normalizedEmail = email.toLowerCase();
      const pendingOTP = await OTP.findOne({
        email: normalizedEmail,
        purpose,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      return !!pendingOTP;
    } catch (error) {
      console.error('Error checking pending OTP:', error);
      return false;
    }
  }

  // Get remaining time for OTP
  async getOTPRemainingTime(email, purpose = 'email_verification') {
    try {
      const normalizedEmail = email.toLowerCase();
      const otpDoc = await OTP.findOne({
        email: normalizedEmail,
        purpose,
        isUsed: false,
        expiresAt: { $gt: new Date() }
      });

      if (!otpDoc) {
        return 0;
      }

      const remainingMs = otpDoc.expiresAt.getTime() - Date.now();
      return Math.max(0, Math.ceil(remainingMs / 1000)); // Return remaining seconds
    } catch (error) {
      console.error('Error getting OTP remaining time:', error);
      return 0;
    }
  }
}

module.exports = new OTPService();
