import { useState, useEffect } from 'react'
import Homepage from './components/homepage'
import TodoPage from './components/TodoPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import authAPI from './services/authAPI'
import './App.css'
import Navbar from './components/navbar';

function App() {
   const [darkMode, setDarkMode] = useState(true);
   const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup', or 'todo'
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);

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

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        setCurrentPage('todo'); // Redirect to todo page after login
    };

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
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
          onLoginSuccess={handleLogin}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onBackToHome={navigateToHome}
          onNavigateToLogin={navigateToLogin}
          onSignupSuccess={handleLogin}
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
    </>
  )
}

export default App
