import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ darkMode, toggleDarkMode, onBackToHome, onLogin, onSignup, onNavigateToTodo, isAuthenticated, currentUser, onLogout, currentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLoginClick = () => {
        if (onLogin) {
            onLogin();
        }
        setIsMenuOpen(false);
    };

    const handleSignupClick = () => {
        if (onSignup) {
            onSignup();
        }
        setIsMenuOpen(false);
    };

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
        setIsMenuOpen(false);
    };
    
    return (
        <nav className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-300 w-full relative`}>
            <div className="w-full px-2 lg:px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex flex-row items-center">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="check">
                                <path fill="#9333ea" d="M1 5.125C1 2.84709 2.84709 1 5.125 1H26.875C29.1529 1 31 2.84709 31 5.125V26.875C31 29.1529 29.1529 31 26.875 31H5.125C2.84709 31 1 29.1529 1 26.875V5.125ZM12.183 22.5692C12.4757 22.8566 12.8588 23 13.242 23C13.6252 23 14.009 22.8566 14.301 22.5692L25.5614 11.5107C26.1462 10.9365 26.1462 10.0049 25.5614 9.43069C24.9767 8.85644 24.0281 8.85644 23.4434 9.43069L13.242 19.4491L8.55659 14.8477C7.97186 14.2735 7.02329 14.2735 6.43855 14.8477C5.85382 15.422 5.85382 16.3535 6.43855 16.9278L12.183 22.5692Z"></path>
                            </svg>
                        </div>
                        <div className="flex flex-row items-center">
                            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Taskly
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {(currentPage === 'login' || currentPage === 'signup') ? (
                                <button 
                                    onClick={onBackToHome}
                                    className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                >
                                    ← Back to Home
                                </button>
                            ) : currentPage === 'todo' ? (
                                <button 
                                    onClick={onBackToHome}
                                    className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                >
                                    Home
                                </button>
                            ) : (
                                <>
                                    {isAuthenticated ? (
                                        <>
                                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} px-3 py-2 text-sm font-medium`}>
                                                Welcome, {currentUser?.name}!
                                            </span>
                                            <button 
                                                onClick={onNavigateToTodo}
                                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                            >
                                                My Tasks
                                            </button>
                                            <button 
                                                onClick={handleLogoutClick}
                                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={onLogin}
                                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                            >
                                                Login
                                            </button>
                                            <button 
                                                onClick={onSignup}
                                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                                            >
                                                Signup
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Dark Mode Toggle and Profile */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                // Sun icon for light mode
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                // Moon icon for dark mode
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Profile Dropdown - Only show when authenticated and on TodoPage */}
                        {isAuthenticated && currentPage === 'todo' && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 flex items-center space-x-2`}
                                    aria-label="Profile menu"
                                >
                                    {/* Profile Icon */}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {/* Dropdown Arrow */}
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                    }`}>
                                        <div className="py-1">
                                            <div className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-300 border-b border-gray-700' : 'text-gray-700 border-b border-gray-200'}`}>
                                                <div className="font-medium">{currentUser?.name}</div>
                                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser?.email}</div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    handleLogoutClick();
                                                    setIsProfileDropdownOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                    darkMode 
                                                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                } transition-colors duration-200`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>Logout</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-2">
                            <button
                                onClick={toggleMenu}
                                className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} p-2 rounded-md transition-colors duration-200`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    // X icon when menu is open
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    // Hamburger icon when menu is closed
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {(currentPage === 'login' || currentPage === 'signup') ? (
                            <button 
                                onClick={() => {
                                    onBackToHome();
                                    toggleMenu();
                                }}
                                className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                            >
                                ← Back to Home
                            </button>
                        ) : currentPage === 'todo' ? (
                            <>
                                <button 
                                    onClick={() => {
                                        onBackToHome();
                                        toggleMenu();
                                    }}
                                    className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                >
                                    Home
                                </button>
                                {isAuthenticated && (
                                    <>
                                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} block px-3 py-2 text-base font-medium`}>
                                            Welcome, {currentUser?.name}!
                                        </span>
                                        <button 
                                            onClick={handleLogoutClick}
                                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {isAuthenticated ? (
                                    <>
                                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} block px-3 py-2 text-base font-medium`}>
                                            Welcome, {currentUser?.name}!
                                        </span>
                                        <button 
                                            onClick={() => {
                                                onNavigateToTodo();
                                                toggleMenu();
                                            }}
                                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                        >
                                            My Tasks
                                        </button>
                                        <button 
                                            onClick={handleLogoutClick}
                                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={handleLoginClick}
                                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                        >
                                            Login
                                        </button>
                                        <button 
                                            onClick={handleSignupClick}
                                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left`}
                                        >
                                            Signup
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;