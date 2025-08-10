import { useState } from 'react'
import Homepage from './components/homepage'
import TodoPage from './components/TodoPage'
import './App.css'
import Navbar from './components/navbar';

function App() {
   const [darkMode, setDarkMode] = useState(true);
   const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'todo'

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const navigateToTodo = () => {
        setCurrentPage('todo');
    };

    const navigateToHome = () => {
        setCurrentPage('home');
    };

  return (
    <>
      {currentPage === 'home' && (
        <>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Homepage darkMode={darkMode} onGetStarted={navigateToTodo} />
        </>
      )}
      {currentPage === 'todo' && (
        <TodoPage darkMode={darkMode} setDarkMode={setDarkMode} onBackToHome={navigateToHome} />
      )}
    </>
  )
}

export default App
