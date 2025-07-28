import React, { useState } from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    
    return (
        <nav className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-300 w-full`}>
            <div className="w-full px-2 lg:px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                 Smart To-Do
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a 
                                href="#" 
                                className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                            >
                                Home
                            </a>
                            <a 
                                href="#" 
                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                            >
                                Login
                            </a>
                            <a 
                                href="#" 
                                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium transition-colors duration-200`}
                            >
                                Signup
                            </a>
                        </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="flex items-center">
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

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-2">
                            <button
                                className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} p-2 rounded-md transition-colors duration-200`}
                                aria-label="Open menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a 
                            href="#" 
                            className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'} block px-3 py-2 text-base font-medium transition-colors duration-200`}
                        >
                            Home
                        </a>
                        <a 
                            href="#" 
                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200`}
                        >
                            Login
                        </a>
                        <a 
                            href="#" 
                            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} block px-3 py-2 text-base font-medium transition-colors duration-200`}
                        >
                            Signup
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;