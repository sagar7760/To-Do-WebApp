import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import todoAPI from '../services/api';

const TodoPage = ({ darkMode, setDarkMode, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load tasks on component mount only
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Always load all tasks to have complete data for counting
      const response = await todoAPI.getAllTodos();
      
      // Transform backend data to frontend format
      const transformedTasks = response.todos.map(todo => ({
        id: todo._id,
        title: todo.title,
        dueDate: todo.dueDate,
        completed: todo.completed,
        deleted: todo.deleted,
        createdAt: todo.createdAt
      }));
      
      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task.completed) {
        await todoAPI.uncompleteTodo(id);
      } else {
        await todoAPI.completeTodo(id);
      }
      
      // Reload tasks to get updated data
      loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  const restoreTask = async (id) => {
    try {
      await todoAPI.restoreTodo(id);
      loadTasks();
    } catch (error) {
      console.error('Error restoring task:', error);
      setError('Failed to restore task. Please try again.');
    }
  };

  const permanentlyDeleteTask = async (id) => {
      try {
        await todoAPI.permanentDeleteTodo(id);
        loadTasks();
      } catch (error) {
        console.error('Error permanently deleting task:', error);
        setError('Failed to permanently delete task. Please try again.');
      }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await todoAPI.createTodo({
        title: newTaskTitle.trim(),
        dueDate: null
      });
      
      setNewTaskTitle('');
      setShowAddInput(false);
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleAddInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setNewTaskTitle('');
      setShowAddInput(false);
    }
  };

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'completed':
        return tasks.filter(task => task.completed && !task.deleted);
      case 'bin':
        return tasks.filter(task => task.deleted);
      default:
        return tasks.filter(task => !task.completed&&!task.deleted);
    }
  };

  const getTaskCount = (type) => {
    switch (type) {
      case 'all':
        return tasks.filter(task => !task.deleted && !task.completed).length;
      case 'completed':
        return tasks.filter(task => task.completed && !task.deleted).length;
      case 'bin':
        return tasks.filter(task => task.deleted).length;
      default:
        return 0;
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} onBackToHome={onBackToHome} />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
        
        {/* Error Message */}
        {error && (
          <div className="fixed top-20 left-4 right-4 z-30 flex justify-center md:justify-end animate-slide-in">
            <div className={`${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-gray-100 border-gray-300 text-black'
            } border rounded-lg shadow-sm backdrop-blur-sm p-3 md:p-4 flex items-center space-x-4 w-full max-w-sm md:max-w-md`}>

              {/* Error Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Something went wrong</p>
                <p className={`text-xs md:text-sm mt-1 opacity-90 ${darkMode ? 'text-gray-300' : 'text-gray-600'} truncate`}>{error}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex-shrink-0 flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setError(null);
                    loadTasks();
                  }}
                  className={`text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-md transition-colors duration-200 ${
                    darkMode 
                      ? 'bg-gray-600 hover:bg-purple-300 text-white' 
                      : 'bg-gray-200 hover:bg-purple-300 text-black'
                  }`}
                >
                  Retry
                </button>
                <button 
                  onClick={() => setError(null)}
                  className={`p-1 rounded-md transition-colors duration-200 ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Dismiss"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50 
          w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${darkMode ? 'bg-gray-800' : 'bg-white'} 
          shadow-lg lg:shadow-none
        `}>
          <div className="flex flex-col h-full">
            {/* Mobile close button */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Task Manager
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-3 py-6 overflow-y-auto">
              <h2 className={`hidden lg:block text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Task Manager
              </h2>
              
              <nav className="space-y-1">
                {/* All Tasks */}
                <button
                  onClick={() => {
                    setActiveTab('all');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'all'
                      ? darkMode ? 'bg-gray-700 text-white border-l-4 border-blue-500' : 'bg-gray-200 text-gray-900 border-l-4 border-blue-500'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Tasks
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeTab === 'all'
                      ? darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {getTaskCount('all')}
                  </span>
                </button>

                {/* Completed */}
                <button
                  onClick={() => {
                    setActiveTab('completed');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'completed'
                      ? darkMode ? 'bg-gray-700 text-white border-l-4 border-blue-500' : 'bg-gray-200 text-gray-900 border-l-4 border-blue-500'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completed
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeTab === 'completed'
                      ? darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {getTaskCount('completed')}
                  </span>
                </button>

                {/* Bin */}
                <button
                  onClick={() => {
                    setActiveTab('bin');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'bin'
                      ? darkMode ? 'bg-gray-700 text-white border-l-4 border-blue-500' : 'bg-gray-200 text-gray-900 border-l-4 border-blue-500'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Bin
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeTab === 'bin'
                      ? darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {getTaskCount('bin')}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 lg:ml-0">
          {/* Mobile header */}
          <div className={`lg:hidden flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeTab === 'all' && 'My Tasks'}
              {activeTab === 'completed' && 'Completed'}
              {activeTab === 'bin' && 'Bin'}
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className={`hidden lg:block text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
                {activeTab === 'all' && 'My Tasks'}
                {activeTab === 'completed' && 'Completed Tasks'}
                {activeTab === 'bin' && 'Deleted Tasks'}
              </h1>

            {/* Show loading state only in main content */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading tasks...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Tasks List */}
                <div className="space-y-2 pb-20">
              {getFilteredTasks().map(task => (
                <div
                  key={task.id}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-3 shadow-sm hover:shadow-lg transform hover:scale-101 transition-all duration-300 ease-in-out cursor-pointer h-16 flex items-center`}
                >
                  {/* Tasks div */}
                   {/* task cards */}
                  <div className="flex items-center justify-between w-full">
                   
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {/* Checkbox */}
                      {!task.deleted && (
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-3xl border-2 flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                            task.completed
                              ? 'bg-white border-purple-500 text-purple-500'
                              : darkMode ? 'border-gray-500 hover:border-purple-400' : 'border-gray-300 hover:border-purple-400'
                          }`}
                        >
                          {task.completed && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      )}
                      
                      {/* Task Content */}
                      <div className="flex-1 min-w-0 pl-2 text-left">
                        <div className="flex flex-col justify-start h-full py-2">
                          <h3 className={`text-lg font-semibold leading-tight text-left ${
                            task.completed 
                              ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                              : darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          {task.dueDate && (
                            <div className={`text-xs mt-1 text-left ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {task.deleted ? (
                        <>
                          <button
                            onClick={() => restoreTask(task.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'
                            }`}
                            title="Restore"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          <button
                            onClick={() => permanentlyDeleteTask(task.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'
                            }`}
                            title="Permanent Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            darkMode ? 'text-gray-400 hover:text-red-400 ' : 'text-gray-500 hover:text-red-600'
                          }`}
                          title="Delete"
                        >
                          <svg className="w-5 h-5 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {getFilteredTasks().length === 0 && (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {activeTab === 'all' && 'No tasks yet'}
                    {activeTab === 'completed' && 'No completed tasks'}
                    {activeTab === 'bin' && 'Bin is empty'}
                  </h3>
                  <p>
                    {activeTab === 'all' && 'Add your first task to get started!'}
                    {activeTab === 'completed' && 'Complete some tasks to see them here'}
                    {activeTab === 'bin' && 'Deleted tasks will appear here'}
                  </p>
                </div>
              )}
                </div>
              </>
            )}
            </div>
          </div>
        </div>
        
        {/* Fixed Add Task Input (only show for 'all' tab) */}
        {activeTab === 'all' && (
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-40">
            <div className={`${darkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} p-4`}>
              <div className="max-w-4xl mx-auto">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-3 shadow-sm transition-all duration-300`}>
                  {showAddInput ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={handleAddInputKeyPress}
                        onBlur={() => {
                          if (!newTaskTitle.trim()) {
                            setShowAddInput(false);
                          }
                        }}
                        placeholder="Task title"
                        autoFocus
                        className={`flex-1 bg-transparent outline-none text-base lg:text-lg ${
                          darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={addTask}
                          disabled={!newTaskTitle.trim()}
                          className="text-sm text-purple-600 hover:text-purple-700 disabled:text-gray-400 font-medium"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setNewTaskTitle('');
                            setShowAddInput(false);
                          }}
                          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex items-center space-x-3 cursor-pointer group"
                      onClick={() => setShowAddInput(true)}
                    >
                      <svg className="w-5 h-5 text-purple-500 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className={`text-base lg:text-lg ${
                        darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
                      }`}>
                        Add a task
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default TodoPage;
