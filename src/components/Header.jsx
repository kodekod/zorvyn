import React from 'react';
import { useFinance } from '../context/FinanceContext';

export const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useFinance();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Finance Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track your financial activity
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Role Selector */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setRole('viewer')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  role === 'viewer'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  role === 'admin'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.323 2.677a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm2.828 2.828a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm2.828 2.829a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm-2.828 2.828a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zm2.828 2.829a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zM18 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-6 6a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm6 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-12 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm13.657-5.657a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zM5.757 5.757a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zm0 9.172a1 1 0 001.414 0l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 000 1.414zM10 18a8 8 0 100-16 8 8 0 000 16z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
