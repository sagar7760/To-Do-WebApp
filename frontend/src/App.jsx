import { useState } from 'react'
import Homepage from './components/homepage'
import './App.css'
import Navbar from './components/navbar';

function App() {
   const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Homepage darkMode={darkMode} />
    </>
  )
}

export default App
