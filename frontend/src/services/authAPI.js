// Auth API service for login and signup
const API_BASE_URL = 'http://localhost:5000/api/auth';

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
        message: 'Account created successfully!'
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
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
  }
};

export default authAPI;
