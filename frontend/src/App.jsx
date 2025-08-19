import { useState, useEffect } from 'react'
import Homepage from './components/homepage'
import TodoPage from './components/TodoPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import OTPVerification from './components/OTPVerification'
import EmailVerification from './components/EmailVerification'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import authAPI from './services/authAPI'
import './App.css'
import Navbar from './components/navbar';

function App() {
   const [darkMode, setDarkMode] = useState(true);
   const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup', 'todo', 'otp-verification', 'email-verification', 'forgot-password', 'reset-password'
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);
   const [pendingVerification, setPendingVerification] = useState(null); // Stores email and verification type
   const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // Store email for password reset flow

    // Check authentication status on app load
    useEffect(() => {
        const authData = authAPI.getCurrentUser();
        if (authData.isAuthenticated) {
            setIsAuthenticated(true);
            setCurrentUser(authData.user);
            // If user is authenticated, redirect to todo page
            setCurrentPage('todo');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogin = (result) => {
        if (result.success) {
            if (result.requiresOTP) {
                // User needs to verify OTP
                setPendingVerification({
                    email: result.email,
                    type: 'login_verification'
                });
                setCurrentPage('otp-verification');
            } else if (result.user) {
                // Login complete
                setIsAuthenticated(true);
                setCurrentUser(result.user);
                setCurrentPage('todo');
                setPendingVerification(null);
            }
        } else if (result.needsEmailVerification) {
            // User needs to verify email first
            setPendingVerification({
                email: result.email || '',
                type: 'email_verification'
            });
            setCurrentPage('email-verification');
        }
    };

    const handleSignup = (result) => {
        console.log('handleSignup called with:', result);
        if (result.success) {
            if (result.needsEmailVerification) {
                console.log('Navigating to email verification for:', result.email);
                // User needs to verify email after registration
                setPendingVerification({
                    email: result.email, // Use email directly from result
                    type: 'email_verification',
                    fromSignup: true // Mark that this came from signup
                });
                setCurrentPage('email-verification');
            } else if (result.user) {
                console.log('Signup complete, navigating to todo page');
                // Signup complete (legacy flow)
                setIsAuthenticated(true);
                setCurrentUser(result.user);
                setCurrentPage('todo');
                setPendingVerification(null);
            }
        }
    };

    const handleOTPVerificationSuccess = (result) => {
        setIsAuthenticated(true);
        setCurrentUser(result.user);
        setCurrentPage('todo');
        setPendingVerification(null);
    };

    const handleEmailVerificationSuccess = (result) => {
        if (result.isNewUser && result.user) {
            // New user registration completed - log them in directly
            console.log('New user registration completed, logging in:', result.user.email);
            setIsAuthenticated(true);
            setCurrentUser(result.user);
            setCurrentPage('todo');
            setPendingVerification(null);
        } else {
            // Existing user email verification - redirect to login
            console.log('Existing user email verification completed');
            setPendingVerification(null);
            setCurrentPage('login');
        }
    };

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setPendingVerification(null);
        setCurrentPage('home'); // Redirect to home after logout
    };

    const navigateToTodo = () => {
        if (isAuthenticated) {
            setCurrentPage('todo');
        } else {
            setCurrentPage('login'); // Redirect to login if not authenticated
        }
    };

    const navigateToHome = () => {
        setCurrentPage('home');
    };

    const navigateToLogin = () => {
        setCurrentPage('login');
    };

    const navigateToSignup = () => {
        setCurrentPage('signup');
    };

    const handleForgotPassword = (email) => {
        setForgotPasswordEmail(email);
        setCurrentPage('reset-password');
    };

    const handleResetPasswordSuccess = () => {
        setForgotPasswordEmail('');
        setCurrentPage('login');
    };

    const handleBackToLogin = () => {
        setForgotPasswordEmail('');
        setCurrentPage('login');
    };

  return (
    <>
      {/* Always show Navbar */}
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onLogin={navigateToLogin}
        onSignup={navigateToSignup}
        onBackToHome={navigateToHome}
        onNavigateToTodo={navigateToTodo}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      
      {/* Render current page content */}
      {currentPage === 'home' && (
        <Homepage darkMode={darkMode} onGetStarted={navigateToTodo} />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          darkMode={darkMode} 
          setDarkMode={toggleDarkMode} 
          onBackToHome={navigateToHome}
          onNavigateToSignup={navigateToSignup}
          onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
          onLoginSuccess={handleLogin}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onBackToHome={navigateToHome}
          onNavigateToLogin={navigateToLogin}
          onSignupSuccess={handleSignup}
        />
      )}
      {currentPage === 'otp-verification' && pendingVerification && (
        <OTPVerification
          darkMode={darkMode}
          email={pendingVerification.email}
          purpose={pendingVerification.type}
          onVerifySuccess={handleOTPVerificationSuccess}
          onBackToLogin={navigateToLogin}
        />
      )}
      {currentPage === 'email-verification' && pendingVerification && (
        <EmailVerification
          darkMode={darkMode}
          email={pendingVerification.email}
          onVerificationSuccess={handleEmailVerificationSuccess}
          onBackToLogin={navigateToLogin}
          otpAlreadySent={pendingVerification.fromSignup || false}
        />
      )}
      {currentPage === 'todo' && (
        <TodoPage 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onBackToHome={navigateToHome} 
          currentUser={currentUser}
        />
      )}
      {currentPage === 'forgot-password' && (
        <ForgotPassword
          darkMode={darkMode}
          onForgotPassword={handleForgotPassword}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {currentPage === 'reset-password' && (
        <ResetPassword
          darkMode={darkMode}
          email={forgotPasswordEmail}
          onResetPasswordSuccess={handleResetPasswordSuccess}
          onBackToLogin={handleBackToLogin}
        />
      )}
    </>
  )
}

export default App
