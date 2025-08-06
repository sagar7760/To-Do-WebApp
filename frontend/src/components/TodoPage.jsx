import React, { useState } from 'react';
import Navbar from './navbar';

const TodoPage = ({ darkMode, setDarkMode, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Grocery shopping for the week',
      completed: false,
      deleted: false
    },
    {
      id: 2,
      title: 'Work on presentation',
      description: 'Prepare presentation for the team meeting',
      completed: false,
      deleted: false
    },
    {
      id: 3,
      title: 'Pay bills',
      description: 'Pay monthly bills',
      completed: false,
      deleted: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, deleted: true } : task
    ));
  };

  const restoreTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, deleted: false } : task
    ));
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        deleted: false
      }]);
      setNewTask({ title: '', description: '' });
      setShowAddModal(false);
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
        return tasks.filter(task => !task.deleted).length;
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
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-colors duration-300`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Task Manager
            </h2>
            
            <nav className="space-y-2">
              {/* All Tasks */}
              <button
                onClick={() => setActiveTab('all')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === 'all'
                    ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  All Tasks
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  activeTab === 'all'
                    ? darkMode ? 'bg-purple-700' : 'bg-purple-700'
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {getTaskCount('all')}
                </span>
              </button>

              {/* Completed */}
              <button
                onClick={() => setActiveTab('completed')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === 'completed'
                    ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
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
                    ? darkMode ? 'bg-purple-700' : 'bg-purple-700'
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {getTaskCount('completed')}
                </span>
              </button>

              {/* Bin */}
              <button
                onClick={() => setActiveTab('bin')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === 'bin'
                    ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
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
                    ? darkMode ? 'bg-purple-700' : 'bg-purple-700'
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {getTaskCount('bin')}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
              {activeTab === 'all' && 'My Tasks'}
              {activeTab === 'completed' && 'Completed Tasks'}
              {activeTab === 'bin' && 'Deleted Tasks'}
            </h1>

            {/* Tasks List */}
            <div className="space-y-2">
              {getFilteredTasks().map(task => (
                <div
                  key={task.id}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-3 shadow-sm hover:shadow-lg transform hover:scale-101 transition-all duration-300 ease-in-out cursor-pointer`}
                >
                  {/* Tasks div */}
                   {/* task cards */}
                  <div className="flex items-center justify-between">
                   
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Checkbox */}
                      {!task.deleted && (
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-3xl border-2 flex items-center justify-center transition-colors duration-200 ${
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
                      <div className="flex-1 justify-items-start pl-2">
                        <h3 className={`text-lg font-semibold ${
                          task.completed 
                            ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                            : darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          task.completed
                            ? darkMode ? 'text-gray-500' : 'text-gray-400'
                            : darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {task.deleted ? (
                        <button
                          onClick={() => restoreTask(task.id)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'
                          }`}
                          title="Restore"
                        >
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
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
          </div>
        </div>

        {/* Floating Add Button */}
        {activeTab !== 'bin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-white' : 'bg-gray-800'} rounded-lg p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-semibold ${darkMode ?'text-gray-900': 'text-white'  } mb-4`}>
              Add New Task
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-white border-gray-300 text-gray-900':'bg-gray-700 border-gray-600 text-white' 
                  }`}
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${darkMode ?  'text-gray-700':'text-gray-300'} mb-1`}>
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ?'bg-white border-gray-300 text-gray-900': 'bg-gray-700 border-gray-600 text-white' 
                  }`}
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default TodoPage;
