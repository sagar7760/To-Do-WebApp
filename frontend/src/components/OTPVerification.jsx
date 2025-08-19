import React, { useState, useEffect, useRef } from 'react';
import authAPI from '../services/authAPI';

const OTPVerification = ({ 
  darkMode, 
  email, 
  purpose = 'login_verification',
  onVerifySuccess, 
  onBackToLogin,
  onResendOTP 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const otpArray = value.slice(0, 6).split('');
      const newOtp = [...otp];
      otpArray.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus on the last filled input or next empty input
      const nextIndex = Math.min(index + otpArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if digit entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let result;
      
      if (purpose === 'login_verification') {
        result = await authAPI.verifyLoginOTP(email, otpString);
      } else if (purpose === 'email_verification') {
        result = await authAPI.verifyEmailOTP(email, otpString);
      }

      if (result.success) {
        setShowSuccess(true);
        setSuccessMessage(result.message || 'Verification successful!');
        
        // Show success message for 2 seconds before calling onVerifySuccess
        setTimeout(() => {
          onVerifySuccess(result);
        }, 2000);
      } else {
        setError(result.message || 'Verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await authAPI.resendOTP(email, purpose);

      if (result.success) {
        setTimeLeft(600); // Reset timer
        setCanResend(false);
        setOtp(['', '', '', '', '', '']); // Clear OTP
        inputRefs.current[0]?.focus(); // Focus first input
        if (onResendOTP) {
          onResendOTP();
        }
      } else {
        setError(result.message || 'Failed to resend code');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (purpose) {
      case 'login_verification':
        return 'Verify Login';
      case 'email_verification':
        return 'Verify Email';
      default:
        return 'Verify Code';
    }
  };

  const getDescription = () => {
    switch (purpose) {
      case 'login_verification':
        return `We've sent a 6-digit verification code to ${email}. Please enter it below to complete your login.`;
      case 'email_verification':
        return `We've sent a 6-digit verification code to ${email}. Please enter it below to verify your email address.`;
      default:
        return `We've sent a 6-digit verification code to ${email}. Please enter it below.`;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getTitle()}
            </h2>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {getDescription()}
            </p>
          </div>

          {/* Form */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-6 shadow-lg rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            
            {/* OTP Input */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    }`}
                    disabled={isLoading || showSuccess}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-4">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {timeLeft > 0 ? (
                  <>Code expires in: <span className="font-semibold text-purple-600">{formatTime(timeLeft)}</span></>
                ) : (
                  <span className="text-red-500">Code has expired</span>
                )}
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Display */}
            {showSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {successMessage}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.join('').length !== 6 || showSuccess}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                isLoading || otp.join('').length !== 6 || showSuccess
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'
              } text-white`}
            >
              {showSuccess ? 'Verified! Redirecting...' : isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            {/* Resend Button */}
            <div className="mt-4 text-center">
              {canResend || timeLeft === 0 ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className={`text-purple-600 hover:text-purple-800 text-sm font-medium ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Resend Code'}
                </button>
              ) : (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Didn't receive the code? You can resend in {formatTime(timeLeft)}
                </p>
              )}
            </div>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
