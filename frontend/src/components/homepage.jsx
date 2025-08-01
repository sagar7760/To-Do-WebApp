import React from 'react';

const Homepage = ({ darkMode }) => {
  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-x-hidden`}>
      {/* Hero Section */}
      <section className="py-20 px-10 w-full">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row w-full">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 px-2 lg:px-4 flex flex-col justify-start items-start">
              <h1 className={`text-xl md:text-6xl lg:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6 text-left`}>
                Stay Organized.
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stay Productive.
                </span>
              </h1>
              <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed`}>
                Your personal task manager, now smarter.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Get Started
              </button>
            </div>

            {/* Task Illustration */}
            <div className="w-full lg:w-1/2 px-2 lg:px-4 mt-12 lg:mt-0">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} rounded-3xl p-8 shadow-2xl transition-colors duration-300`}>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-8 shadow-lg transition-colors duration-300`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>TASK</h3>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item, index) => (
                      <div key={item} className="flex items-center space-x-4">
                        <div className={`w-5 h-5 border-2 ${index === 0 ? 'bg-blue-500 border-blue-500' : darkMode ? 'border-gray-500' : 'border-gray-400'} rounded-sm flex items-center justify-center`}>
                          {index === 0 && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className={`h-3 ${index === 0 ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : (darkMode ? 'bg-gray-600' : 'bg-gray-300')} rounded-full flex-1 ${index === 0 ? 'opacity-50' : ''}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300 w-full`}>
        <div className="w-full px-8 lg:px-20 flex flex-col items-start">
          <div className="text-left mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Powerful Features
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to stay organized and productive
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            {/* Create Tasks */}
            <div className={`${darkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-50 hover:bg-white'} rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group w-full`}>
              <div className={`w-16 h-16 ${darkMode ? 'bg-blue-500' : 'bg-blue-100'} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Tasks</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Quickly add new tasks with detailed descriptions and due dates.
              </p>
            </div>

            {/* Mark as Complete */}
            <div className={`${darkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-50 hover:bg-white'} rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group w-full`}>
              <div className={`w-16 h-16 ${darkMode ? 'bg-green-500' : 'bg-green-100'} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mark Complete</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Check off completed tasks and track your progress effortlessly.
              </p>
            </div>

            {/* Smart Organize */}
            <div className={`${darkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-50 hover:bg-white'} rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group w-full`}>
              <div className={`w-16 h-16 ${darkMode ? 'bg-purple-500' : 'bg-purple-100'} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart Organize</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Categorize and prioritize tasks with intelligent sorting.
              </p>
            </div>

            {/* Cloud Sync */}
            <div className={`${darkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-50 hover:bg-white'} rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group w-full`}>
              <div className={`w-16 h-16 ${darkMode ? 'bg-orange-500' : 'bg-orange-100'} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cloud Sync</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Access your tasks anywhere with seamless cloud synchronization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t transition-colors duration-300 w-full`}>
        <div className="w-full px-2 lg:px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                 Taskly
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                The best way to manage your tasks and boost productivity. 
                Stay organized, stay focused, stay productive.
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.311-.623-.311-1.545c0-1.448.839-2.529 1.884-2.529.888 0 1.317.666 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.038.52 1.884 1.545 1.884 1.854 0 3.279-1.958 3.279-4.785 0-2.503-1.799-4.253-4.370-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .9.347 1.863.781 2.388.085.104.098.195.072.301-.079.329-.254 1.029-.289 1.174-.045.184-.148.223-.341.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>            
            {/* Links */}
            <div>
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2024 Taskly. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Privacy Policy
                </a>
                <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
