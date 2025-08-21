# Taskly- A Todo Web Application

A comprehensive task management web application built with the MERN stack, featuring secure authentication, email verification, and modern responsive design.

## 🚀 Features

### Core Functionality
- ✅ **Task Management**: Create, e## 👨‍💻 Development Workflow

### Mo### Development Tips

1. **Start Development**: Use `npm run dev` from root directory
2. **Install Dependencies**: Use `npm run install:all` for fresh setup
3. **Individual Services**: Use specific commands when working on one part
4. **Environment Variables**: Configure `.env` files in respective directories

### 🗂️ File Navigation Guide

**Working on Authentication?**
```
Backend/controllers/userController.js  # Login/Register logic
Backend/routes/auth.js                 # Auth API routes
Backend/models/userModel.js            # User database schema
frontend/src/components/LoginPage.jsx  # Login UI component
frontend/src/services/authAPI.js       # Auth API calls
```

**Working on Todo Features?**
```
Backend/controllers/todoController.js  # Todo CRUD operations
Backend/routes/todos.js                # Todo API routes  
Backend/models/todoModel.js            # Todo database schema
frontend/src/components/TodoPage.jsx   # Todo UI component
frontend/src/services/api.js           # Todo API calls
```

**Working on Email/OTP?**
```
Backend/services/emailService.js       # Email sending logic
Backend/services/otpService.js         # OTP generation/validation
Backend/models/otpModel.js             # OTP database schema
frontend/src/components/OTPVerification.jsx  # OTP UI
```

**Working on Styling?**
```
frontend/src/App.css                   # Main app styles
frontend/src/index.css                 # Global styles
frontend/src/components/*.jsx          # Component-specific styles
```

## 🔧 API Endpointsrchitecture
This project uses a **monorepo structure** optimized for separate deployment:

```
📦 To-Do-WebApp (Monorepo)
├── 🚀 Backend/     → Deploy to Heroku    (Node.js API)
├── 🎨 frontend/    → Deploy to Vercel    (React App)  
└── 🛠️ package.json → Development Only    (Scripts & Tools)
```

**Benefits:**
- ✅ **Single Repository**: All code in one place
- ✅ **Independent Deployment**: Each service deploys separately
- ✅ **Shared Development**: Easy to work on both frontend and backend
- ✅ **Version Control**: Synchronized changes across full stack and organize daily tasks
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

## ⚡ Quick Start

Get up and running in 3 simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/sagar7760/To-Do-WebApp.git
cd To-Do-WebApp

# 2. Install all dependencies  
npm run install:all

# 3. Start development servers
npm run dev
```

Then configure your `.env` file in the Backend directory and you're ready to go! 🚀

## 📁 Project Structure

```
To-Do-WebApp/                    # Root directory
├── 📁 Backend/                  # 🚀 Backend API (Node.js + Express)
│   ├── 📁 config/              
│   │   └── 📄 db.js             # MongoDB connection setup
│   ├── 📁 controllers/         
│   │   ├── 📄 todoController.js # CRUD operations for tasks
│   │   └── 📄 userController.js # User auth & management logic
│   ├── 📁 middleware/          
│   │   ├── 📄 auth.js           # JWT token verification
│   │   └── 📄 errorHandler.js   # Global error handling
│   ├── 📁 models/              # MongoDB schemas
│   │   ├── 📄 todoModel.js      # Task data structure
│   │   ├── 📄 userModel.js      # User account schema
│   │   ├── 📄 pendingUserModel.js # Pre-verification users
│   │   └── 📄 otpModel.js       # OTP verification records
│   ├── 📁 routes/              # API endpoints
│   │   ├── 📄 auth.js           # /api/auth/* routes
│   │   └── 📄 todos.js          # /api/todos/* routes
│   ├── 📁 services/            # Business logic
│   │   ├── 📄 emailService.js   # Email sending (Nodemailer)
│   │   ├── 📄 otpService.js     # OTP generation & validation
│   │   └── 📄 cleanupService.js # Database cleanup tasks
│   ├── 📄 .env                 # Environment variables (create this)
│   ├── 📄 .env.example         # Environment template
│   ├── 📄 package.json         # Backend dependencies
│   ├── 📄 Procfile            # Heroku deployment config
│   └── 📄 server.js            # 🎯 Main entry point
│
├── 📁 frontend/                # 🎨 Frontend App (React + Vite)
│   ├── 📁 public/             
│   │   └── 📄 favicon.svg      # App icon
│   ├── 📁 src/                
│   │   ├── 📁 components/      # React components
│   │   │   ├── 📄 homepage.jsx      # Landing/welcome page
│   │   │   ├── 📄 navbar.jsx        # Navigation bar
│   │   │   ├── 📄 LoginPage.jsx     # User login form
│   │   │   ├── 📄 SignupPage.jsx    # User registration form
│   │   │   ├── 📄 TodoPage.jsx      # 📝 Main task management
│   │   │   ├── 📄 OTPVerification.jsx    # OTP input interface
│   │   │   ├── 📄 EmailVerification.jsx  # Email verification flow
│   │   │   ├── 📄 ForgotPassword.jsx     # Password reset request
│   │   │   └── 📄 ResetPassword.jsx      # New password setup
│   │   ├── 📁 services/        # API communication
│   │   │   ├── 📄 api.js             # Todo API calls
│   │   │   └── 📄 authAPI.js         # Authentication API calls
│   │   ├── 📁 assets/          # Static files (images, icons)
│   │   ├── 📄 App.jsx          # 🎯 Main app component
│   │   ├── 📄 App.css          # App-specific styles
│   │   ├── 📄 main.jsx         # React app entry point
│   │   └── 📄 index.css        # Global CSS styles
│   ├── 📄 .env                # Frontend environment vars (create this)
│   ├── 📄 .env.example        # Frontend env template
│   ├── 📄 index.html          # HTML template
│   ├── 📄 package.json        # Frontend dependencies
│   ├── 📄 vite.config.js      # Vite build configuration
│   ├── 📄 vercel.json         # Vercel deployment config
│   └── 📄 eslint.config.js    # Code linting rules
│
├── 📄 package.json            # 🛠️ Development scripts (root)
├── 📄 DEPLOYMENT.md           # 🚀 Production deployment guide
├── 📄 README.md               # 📖 This documentation
└── 📄 .gitignore              # Git ignore rules
```

### 🎯 Key Directories Explained

| Directory | Purpose | Technology | Deployment |
|-----------|---------|------------|------------|
| `Backend/` | REST API Server | Node.js + Express + MongoDB | 🔴 Heroku |
| `frontend/` | Web Application | React + Vite + Tailwind CSS | 🔵 Vercel |
| `Backend/controllers/` | Business Logic | Express.js | - |
| `Backend/models/` | Database Schemas | Mongoose ODM | - |
| `Backend/services/` | Utility Services | Node.js | - |
| `frontend/src/components/` | UI Components | React.jsx | - |
| `frontend/src/services/` | API Integration | Fetch API | - |

### 🔧 Configuration Files

| File | Purpose | Required |
|------|---------|----------|
| `Backend/.env` | Backend environment variables | ✅ Yes |
| `frontend/.env` | Frontend environment variables | ✅ Yes |
| `Backend/Procfile` | Heroku process definition | 🔴 Heroku only |
| `frontend/vercel.json` | Vercel routing config | 🔵 Vercel only |
| `package.json` (root) | Development workflow | 🛠️ Development |

### 🎯 Entry Points

| Service | File | URL (Development) |
|---------|------|-------------------|
| **Backend API** | `Backend/server.js` | http://localhost:5000 |
| **Frontend App** | `frontend/src/main.jsx` | http://localhost:5173 |
| **Development** | `package.json` | Both servers with `npm run dev` |

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Gmail account (for email services)

### Installation

#### Option 1: Quick Setup (Recommended)
Use the root package.json for streamlined development:

1. **Clone the repository**
   ```bash
   git clone https://github.com/sagar7760/To-Do-WebApp.git
   cd To-Do-WebApp
   ```

2. **Install all dependencies** (Backend + Frontend)
   ```bash
   npm run install:all
   ```

3. **Start development servers** (Both Backend and Frontend)
   ```bash
   npm run dev
   ```
   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend server on `http://localhost:5173`

#### Option 2: Manual Setup
Set up Backend and Frontend separately:

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

### Available Scripts

From the root directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend and frontend servers |
| `npm run install:all` | Install dependencies for both backend and frontend |
| `npm run backend:install` | Install only backend dependencies |
| `npm run frontend:install` | Install only frontend dependencies |
| `npm run backend:start` | Start only the backend server |
| `npm run frontend:start` | Start only the frontend server |
| `npm run build` | Build the frontend for production |

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

#### Quick Start (Using Root Scripts)
```bash
# From the root directory
npm run dev
```
This single command starts both servers:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

#### Manual Start (Individual Servers)

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

## �‍💻 Development Workflow

### Project Structure
This project uses a **monorepo structure** with separate deployment configurations:

```
To-Do-WebApp/
├── Backend/           # Node.js/Express API (Heroku deployment)
├── frontend/          # React/Vite app (Vercel deployment)  
├── package.json       # Development orchestrator (root)
└── README.md
```

### Development Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start both servers simultaneously | Development |
| `npm run install:all` | Install all dependencies | Initial setup |
| `npm run backend:install` | Install backend dependencies only | Backend updates |
| `npm run frontend:install` | Install frontend dependencies only | Frontend updates |
| `npm run build` | Build frontend for production | Testing production build |

### Development Tips

1. **Start Development**: Use `npm run dev` from root directory
2. **Install Dependencies**: Use `npm run install:all` for fresh setup
3. **Individual Services**: Use specific commands when working on one part
4. **Environment Variables**: Configure `.env` files in respective directories

## �🔧 API Endpoints

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

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   Error: Port 5000 is already in use
   ```
   **Solution**: Kill the process using the port or change the port in `.env`
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux  
   lsof -ti:5000 | xargs kill
   ```

2. **MongoDB Connection Failed**
   ```bash
   Error: MongoDB connection failed
   ```
   **Solution**: Check your `MONGODB_URI` in `.env` file and ensure MongoDB is running

3. **Email Service Not Working**
   ```bash
   Error: Invalid login: 535-5.7.8 Username and Password not accepted
   ```
   **Solution**: Enable 2FA on Gmail and use App Password instead of regular password

4. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify CORS settings in `Backend/server.js`
   - Clear browser cache and try again

5. **Dependencies Installation Issues**
   ```bash
   # Clear npm cache and reinstall
   npm run clean  # (if available)
   npm run install:all
   
   # Or manually
   rm -rf node_modules package-lock.json
   npm install
   ```

### Development Best Practices

- Always run `npm run dev` from the root directory
- Keep your `.env` files secure and never commit them
- Use `npm run install:all` when switching branches
- Check both server logs when debugging issues

## 🚀 Deployment

For production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

- **Backend**: Deploy to Heroku using `Backend/` as root directory
- **Frontend**: Deploy to Vercel using `frontend/` as root directory

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