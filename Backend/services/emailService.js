const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verify transporter configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Email service configuration error:', error);
      } else {
        console.log('Email service ready to send emails');
      }
    });
  }

  async sendOTPEmail(email, otp, purpose = 'email_verification') {
    try {
      let subject, html;
      
      switch (purpose) {
        case 'email_verification':
          subject = 'Verify Your Email - Taskly';
          html = this.getEmailVerificationTemplate(otp);
          break;
        case 'login_verification':
          subject = 'Login Verification Code - Taskly';
          html = this.getLoginVerificationTemplate(otp);
          break;
        case 'password_reset':
          subject = 'Password Reset Code - Taskly';
          html = this.getPasswordResetTemplate(otp);
          break;
        default:
          subject = 'Verification Code - Taskly';
          html = this.getDefaultTemplate(otp);
      }

      const mailOptions = {
        from: `"Taskly App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  getEmailVerificationTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #f9fafb; }
          .otp-box { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0; }
          .footer { background-color: #374151; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Taskly!</h1>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for signing up with Taskly. To complete your registration, please verify your email address using the OTP below:</p>
            <div class="otp-box">${otp}</div>
            <p><strong>This OTP will expire in 10 minutes.</strong></p>
            <p>If you didn't create an account with Taskly, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 Taskly App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getLoginVerificationTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #f9fafb; }
          .otp-box { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0; }
          .footer { background-color: #374151; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Login Verification - Taskly</h1>
          </div>
          <div class="content">
            <h2>Verify Your Login</h2>
            <p>Someone is trying to sign in to your Taskly account. Please use the OTP below to verify this login attempt:</p>
            <div class="otp-box">${otp}</div>
            <p><strong>This OTP will expire in 10 minutes.</strong></p>
            <p>If this wasn't you, please secure your account immediately.</p>
          </div>
          <div class="footer">
            <p>© 2025 Taskly App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #f9fafb; }
          .otp-box { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0; }
          .footer { background-color: #374151; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset - Taskly</h1>
          </div>
          <div class="content">
            <h2>Reset Your Password</h2>
            <p>You've requested to reset your Taskly account password. Please use the OTP below to proceed:</p>
            <div class="otp-box">${otp}</div>
            <p><strong>This OTP will expire in 10 minutes.</strong></p>
            <p>If you didn't request this reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 Taskly App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getDefaultTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8b5cf6; color: white; padding: 20px; text-align: center;">
          <h1>Taskly Verification</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2>Your Verification Code</h2>
          <div style="background-color: #8b5cf6; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p><strong>This OTP will expire in 10 minutes.</strong></p>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
