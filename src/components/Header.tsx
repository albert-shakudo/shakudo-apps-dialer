"use client";

import { MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isParallelDialerEnabled, setIsParallelDialerEnabled] = useState(false);

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

  const toggleParallelDialer = () => {
    setIsParallelDialerEnabled(!isParallelDialerEnabled);
    // Here we would dispatch an event or use context to notify other components
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toggleParallelDialer', { 
        detail: { enabled: !isParallelDialerEnabled } 
      });
      window.dispatchEvent(event);
    }
  };

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
        
        <div className="flex items-center gap-3">
          {/* Parallel Dialer Toggle */}
          <div className="flex items-center mr-3">
            <span className="mr-2 text-sm font-medium">Parallel Dialer</span>
            <button 
              onClick={toggleParallelDialer}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${isParallelDialerEnabled ? 'bg-black' : 'bg-gray-200 dark:bg-gray-700'}`}
              role="switch"
              aria-checked={isParallelDialerEnabled}
            >
              <span 
                className={`${isParallelDialerEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
          
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