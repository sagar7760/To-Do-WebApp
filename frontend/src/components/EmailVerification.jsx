import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

const EmailVerification = ({ 
  darkMode, 
  email, 
  onVerificationSuccess, 
  onBackToLogin,
  otpAlreadySent = false // New prop to indicate if OTP was already sent during signup
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(otpAlreadySent); // Initialize with the prop value

  // Send verification email
  const sendVerificationOTP = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Send verification error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification success
  const handleVerificationSuccess = (data) => {
    onVerificationSuccess(data);
  };

  if (otpSent) {
    return (
      <OTPVerification
        darkMode={darkMode}
        email={email}
        purpose="email_verification"
        onVerifySuccess={handleVerificationSuccess}
        onBackToLogin={onBackToLogin}
        onResendOTP={() => {}}
      />
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Email Verification Required
            </h2>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please verify your email address to continue
            </p>
          </div>

          {/* Form */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-8 px-6 shadow-lg rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            
            {/* Email Display */}
            <div className="mb-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                We need to verify your email address:
              </p>
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} bg-gray-100 ${darkMode ? 'bg-gray-700' : ''} py-2 px-4 rounded-lg`}>
                {email}
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Send Verification Button */}
            <button
              type="button"
              onClick={sendVerificationOTP}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'
              } text-white mb-4`}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>

            {/* Info Text */}
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center mb-4`}>
              <p>We'll send a 6-digit verification code to your email address.</p>
            </div>

            {/* Back to Login */}
            <div className="text-center">
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

export default EmailVerification;
