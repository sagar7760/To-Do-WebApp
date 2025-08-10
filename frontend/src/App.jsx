import { useState } from 'react'
import Homepage from './components/homepage'
import TodoPage from './components/TodoPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import './App.css'
import Navbar from './components/navbar';

function App() {
   const [darkMode, setDarkMode] = useState(true);
   const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup', or 'todo'

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const navigateToTodo = () => {
        setCurrentPage('todo');
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
      {currentPage === 'home' && (
        <>
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode}
            onLogin={navigateToLogin}
            onSignup={navigateToSignup}
          />
          <Homepage darkMode={darkMode} onGetStarted={navigateToTodo} />
        </>
      )}
      {currentPage === 'login' && (
        <LoginPage 
          darkMode={darkMode} 
          setDarkMode={toggleDarkMode} 
          onBackToHome={navigateToHome}
          onNavigateToSignup={navigateToSignup}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage 
          darkMode={darkMode} 
          setDarkMode={toggleDarkMode} 
          onBackToHome={navigateToHome}
          onNavigateToLogin={navigateToLogin}
        />
      )}
      {currentPage === 'todo' && (
        <TodoPage darkMode={darkMode} setDarkMode={setDarkMode} onBackToHome={navigateToHome} />
      )}
    </>
  )
}

export default App
