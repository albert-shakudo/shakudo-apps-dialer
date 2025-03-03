"use client";

import { 
  MoonIcon, 
  SunIcon, 
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  BriefcaseIcon 
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkModePreference);

    // Add dark class to html element
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Sample progress data
  const progressData = [
    { name: 'Calls', icon: PhoneIcon, current: 3, target: 12 },
    { name: 'Emails', icon: EnvelopeIcon, current: 1, target: 4 },
    { name: 'LinkedIn', icon: 'linkedin', current: 2, target: 4 },
    { name: 'Meetings', icon: BriefcaseIcon, current: 0, target: 1 }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-14 flex items-center px-4 z-40 shrink-0">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-base font-semibold">Dialer</span>
          </div>
          
          <div className="ml-6 flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs">
              Start Session
            </button>
            <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs">
              Join Session
            </button>
            <input 
              type="text" 
              placeholder="Enter Session ID" 
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Daily Progress Section - Enhanced */}
        <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-3 whitespace-nowrap">Daily Progress</span>
          <div className="flex space-x-5">
            {progressData.map((item) => (
              <div key={item.name} className="flex items-center" title={`${item.current}/${item.target} ${item.name}`}>
                {item.icon === 'linkedin' ? (
                  <div className="h-4 w-4 flex items-center justify-center text-gray-600 dark:text-gray-400 mr-1.5 text-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </div>
                ) : (
                  <item.icon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" />
                )}
                <div className="flex items-center">
                  <div className="flex items-center mr-1">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{item.current}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">/{item.target}</span>
                  </div>
                  <div className="w-14 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-1.5 rounded-full bg-black"
                      style={{ width: `${(item.current / item.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-right">
              <div className="font-medium">Daniel Smith</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">daniel@shakudo.io</div>
            </div>
            <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  );
} 