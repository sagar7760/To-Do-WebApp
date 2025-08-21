// Auth API service for login and signup
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://taskly-7bc492659ba9.herokuapp.com/api/auth'  // Your Heroku backend URL
  : 'http://localhost:5000/api/auth';

console.log('Auth API Base URL:', API_BASE_URL);
console.log('Environment PROD:', import.meta.env.PROD);
console.log('Environment VITE_AUTH_API_URL:', import.meta.env.VITE_AUTH_API_URL);

const authAPI = {
  // Register new user
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Handle email verification requirement
      if (data.needsEmailVerification) {
        return {
          success: true,
          email: data.email, // Use email from response instead of user object
          needsEmailVerification: true,
          message: data.message || 'Please verify your email to complete registration'
        };
      }

      // Store token in localStorage (for legacy users or if verification is skipped)
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email
        }));
      }

      return {
        success: true,
        user: {
          id: data._id,
          name: data.name,
          email: data.email
        },
        token: data.token,
        message: data.message || 'Account created successfully!'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    }
  },

  // Login user
  login: async (userData) => {
    try {
      console.log('Attempting login for:', userData.email);
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed',
          needsEmailVerification: data.needsEmailVerification,
          requiresOTP: data.requiresOTP,
          email: data.email
        };
      }

      // Handle OTP requirement
      if (data.requiresOTP) {
        return {
          success: true,
          requiresOTP: true,
          email: data.email,
          message: data.message
        };
      }

      // Store token in localStorage if login is complete
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email
        }));
      }

      return {
        success: true,
        user: {
          id: data._id,
          name: data.name,
          email: data.email
        },
        token: data.token,
        message: 'Login successful!'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    }
  },

  // Verify login OTP
  verifyLoginOTP: async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-login-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email
        }));
      }

      return {
        success: true,
        user: {
          id: data._id,
          name: data.name,
          email: data.email
        },
        token: data.token,
        message: data.message || 'Login successful!'
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: error.message || 'OTP verification failed. Please try again.'
      };
    }
  },

  // Send email verification OTP
  sendEmailVerificationOTP: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/send-email-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('Send email verification error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send verification code. Please try again.'
      };
    }
  },

  // Verify email OTP
  verifyEmailOTP: async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-email-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }

      // Check if this is a new user registration (includes user data and token)
      if (data.token && data._id) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email
        }));

        return {
          success: true,
          user: {
            id: data._id,
            name: data.name,
            email: data.email
          },
          token: data.token,
          message: data.message,
          isNewUser: true // Flag to indicate this was a new user registration
        };
      }

      // Existing user email verification
      return {
        success: true,
        message: data.message,
        isNewUser: false
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        message: error.message || 'Email verification failed. Please try again.'
      };
    }
  },

  // Resend OTP
  resendOTP: async (email, purpose = 'email_verification') => {
    try {
      const response = await fetch(`${API_BASE_URL}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, purpose }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code');
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('Resend OTP error:', error);
      return {
        success: false,
        message: error.message || 'Failed to resend code. Please try again.'
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true, message: 'Logged out successfully!' };
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (user && token) {
        return {
          user: JSON.parse(user),
          token: token,
          isAuthenticated: true
        };
      }
      return {
        user: null,
        token: null,
        isAuthenticated: false
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return {
        user: null,
        token: null,
        isAuthenticated: false
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Forgot Password - Send OTP
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset code');
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send password reset code. Please try again.'
      };
    }
  },

  // Reset Password - Verify OTP and set new password
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: error.message || 'Password reset failed. Please try again.'
      };
    }
  }
};

export default authAPI;
