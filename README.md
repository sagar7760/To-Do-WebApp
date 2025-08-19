# Taskly- A Todo Web Application

A comprehensive task management web application built with the MERN stack, featuring secure authentication, email verification, and modern responsive design.

## 🚀 Features

### Core Functionality
- ✅ **Task Management**: Create, edit, delete, and organize daily tasks
- 📅 **Due Dates**: Add due dates to tasks for better time management
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Authentication & Security
- 🔐 **User Registration**: Secure account creation with validation
- 📧 **Email Verification**: Two-step registration with OTP verification
- 🔑 **Login System**: Secure login with JWT token authentication
- 🔄 **Password Reset**: Forgot password functionality with email OTP
- 🛡️ **Session Management**: Persistent login with secure token storage

### Email Services
- 📬 **OTP Verification**: Email-based one-time password system
- 🔔 **Multiple OTP Purposes**: Support for registration, login, and password reset
- ⏰ **OTP Expiration**: Secure 10-minute expiration for all OTP codes
- 🔄 **Resend Functionality**: Ability to resend OTP codes when needed

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling library

### Authentication & Security
- **JWT (JSON Web Tokens)**: Stateless authentication
- **bcrypt**: Password hashing and security
- **Nodemailer**: Email service for OTP delivery
- **Gmail SMTP**: Email provider integration

## 📁 Project Structure

```
To-Do/
├── Backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── todoController.js     # Task management logic
│   │   └── userController.js     # Authentication & user management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Error handling middleware
│   ├── models/
│   │   ├── todoModel.js         # Task data model
│   │   ├── userModel.js         # User data model
│   │   ├── pendingUserModel.js  # Temporary registration model
│   │   └── otpModel.js          # OTP verification model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── todos.js             # Task management routes
│   ├── services/
│   │   └── otpService.js        # OTP generation and validation
│   ├── package.json
│   └── server.js                # Main server file
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── homepage.jsx      # Landing page
    │   │   ├── navbar.jsx        # Navigation component
    │   │   ├── LoginPage.jsx     # Login interface
    │   │   ├── SignupPage.jsx    # Registration interface
    │   │   ├── TodoPage.jsx      # Task management interface
    │   │   ├── OTPVerification.jsx    # OTP input component
    │   │   ├── EmailVerification.jsx  # Email verification flow
    │   │   ├── ForgotPassword.jsx     # Password reset request
    │   │   └── ResetPassword.jsx      # Password reset form
    │   ├── services/
    │   │   └── authAPI.js        # API communication service
    │   ├── App.jsx               # Main application component
    │   ├── main.jsx             # Application entry point
    │   └── index.css            # Global styles
    ├── package.json
    └── vite.config.js           # Vite configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Gmail account (for email services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sagar7760/To-Do-WebApp.git
   cd To-Do-WebApp
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the Backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/todoapp
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/todoapp

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in EMAIL_APP_PASSWORD

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification with OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-login-otp` - Login OTP verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `POST /api/auth/logout` - User logout

### Task Management Routes
- `GET /api/todos` - Get all tasks for authenticated user
- `POST /api/todos` - Create a new task
- `PUT /api/todos/:id` - Update a task
- `DELETE /api/todos/:id` - Delete a task

## 🔐 Authentication Flow

### Registration Process
1. User fills registration form
2. System creates pending user record
3. OTP sent to email for verification
4. User enters OTP to complete registration
5. Account activated and user logged in automatically

### Login Process
1. User enters email and password
2. System validates credentials
3. For verified users: direct login with JWT token
4. For unverified users: redirect to email verification

### Password Reset Process
1. User clicks "Forgot Password" on login page
2. User enters email address
3. OTP sent to email for verification
4. User enters OTP and new password
5. Password updated and user redirected to login

## 🎨 Features in Detail

### Task Management
- **Create Tasks**: Add new tasks with titles, descriptions, and due dates
- **Edit Tasks**: Modify existing tasks inline
- **Delete Tasks**: Remove completed or unwanted tasks
- **Due Dates**: Set and track task deadlines
- **Responsive Grid**: Tasks display in a responsive grid layout

### User Experience
- **Dark/Light Mode**: System remembers user preference
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during API operations
- **Responsive Design**: Seamless experience across all devices
- **Persistent Sessions**: Stay logged in across browser sessions

### Security Features
- **Password Hashing**: bcrypt encryption for all passwords
- **JWT Authentication**: Stateless token-based authentication
- **OTP Security**: Time-limited verification codes
- **Input Validation**: Server-side validation for all inputs
- **Session Management**: Secure token storage and refresh

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern MERN stack technologies
- Inspired by modern task management applications
- Email services powered by Gmail SMTP
- UI components styled with Tailwind CSS

---

**Author**: [Sagar](https://github.com/sagar7760)  
**Repository**: [To-Do-WebApp](https://github.com/sagar7760/To-Do-WebApp)