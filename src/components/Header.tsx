"use client";

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
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

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-14 flex items-center px-4 z-40 shrink-0">
      <div className="flex-1 flex items-center gap-4">
        <span className="text-base font-semibold">Campaign Manager</span>
        
        <div className="h-6 border-l border-gray-200 dark:border-gray-700 mx-2" />
        
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-600 dark:text-gray-400">Active Filters</span>
          <span>Dec 31, 2023 - Feb 24, 2025</span>
          <button className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">Today</button>
          <span>Budget: $25,000,000</span>
          <span>154 of 842 Campaigns</span>
          <span>2,847 MQLs</span>
          <span>84,521 Meetings</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1 rounded bg-black text-white text-xs">
            Load All Data
          </button>
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
        </div>
      </div>
    </header>
  );
} 