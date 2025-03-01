"use client";

import { useState } from 'react';
import {
  PhoneIcon,
  PauseIcon,
  PlusIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  BriefcaseIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export function DialerDashboard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialerActive, setIsDialerActive] = useState(false);

  // Sample queue data
  const queueData = [
    {
      id: '7281935',
      name: 'Michael Johnson',
      company: 'TechCorp Inc.',
      title: 'CTO',
      phone: '+1 (415) 555-7890',
      linkedIn: true
    },
    {
      id: '5629841',
      name: 'Sarah Williams',
      company: 'Data Systems',
      title: 'VP of Engineering',
      phone: '+1 (312) 555-3421',
      linkedIn: true
    },
    {
      id: '3915627',
      name: 'David Chen',
      company: 'Innovate Solutions',
      title: 'Head of IT',
      phone: '+1 (628) 555-9014',
      linkedIn: false
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Main container - starts below the top bar and to the right of sidebar */}
      <div className="flex">
        {/* Call center status panel */}
        <div className="w-64 p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Call Center Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${isDialerActive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}>
                    {isDialerActive ? "Active" : "Idle"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Device:</span>
                  <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Call ID:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-mono">{isDialerActive ? "CL-38291" : "None"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Dial Manually</h3>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter phone number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 pl-10 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
                />
                <button className="absolute right-0 top-0 bottom-0 px-4 bg-black text-white rounded-r-md hover:bg-gray-800 font-medium">
                  Dial
                </button>
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={() => setIsDialerActive(!isDialerActive)}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center space-x-2 ${isDialerActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isDialerActive ? (
                    <>
                      <PauseIcon className="h-4 w-4" />
                      <span>Pause Dialer</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="h-4 w-4" />
                      <span>Start Dialer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Daily Targets</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-1 text-gray-500" /> Calls
                  </span>
                  <span className="text-sm font-medium">
                    <span className="text-gray-900 dark:text-gray-400">3</span>/12
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1 text-gray-500" /> Emails
                  </span>
                  <span className="text-sm font-medium">
                    <span className="text-gray-900 dark:text-gray-400">1</span>/4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <UserIcon className="h-4 w-4 mr-1 text-gray-500" /> LinkedIn
                  </span>
                  <span className="text-sm font-medium">
                    <span className="text-gray-900 dark:text-gray-400">2</span>/4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <BriefcaseIcon className="h-4 w-4 mr-1 text-gray-500" /> Meetings
                  </span>
                  <span className="text-sm font-medium">
                    <span className="text-gray-900 dark:text-gray-400">0</span>/1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Dialer Queue Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-semibold">Dialer Queue ({queueData.length})</h2>
              <div className="text-sm bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                Today's Dials: 14
              </div>
            </div>

            {/* Queue Table */}
            <div className="overflow-auto flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LinkedIn</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queueData.map((contact, index) => (
                    <tr key={contact.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-300">{contact.id}</td>
                      <td className="px-4 py-3">
                        {contact.linkedIn ? (
                          <div className="bg-black w-6 h-6 flex items-center justify-center rounded text-white text-xs">in</div>
                        ) : (
                          <div className="bg-gray-400 w-6 h-6 flex items-center justify-center rounded text-white text-xs">-</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{contact.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{contact.company}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{contact.title}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-300">{contact.phone}</td>
                      <td className="px-4 py-3 text-sm">
                        <button className="mr-2 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                          <PhoneIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Toolbars */}
            <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Queue Management */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Queue Management</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-1" /> Dial Queue
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add Selected
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-1" /> Add from HubSpot
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <ArrowPathIcon className="w-4 h-4 mr-1" /> Reset Queue
                  </button>
                </div>
              </div>
              
              {/* Call Controls */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Call Controls</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 flex items-center">
                    Hang Up
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Barge-In
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Whisper
                  </button>
                  <div className="flex items-center ml-2">
                    <span className="text-sm mr-2">Caller ID:</span>
                    <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-700">
                      <option>+1 (415) 555-2671</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar and Filters */}
            <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search leads by name, company, or title..."
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-3 py-2 text-sm dark:bg-gray-700 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap">
                  Save Filter
                </button>
                <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap">
                  Clear Filters
                </button>
                <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800/60 rounded-full text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                  Matches: 320
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="mt-4 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-3 py-3 text-left">
                      <input type="checkbox" className="rounded text-gray-600 focus:ring-gray-500" />
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Seniority</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-3 py-3"><input type="checkbox" className="rounded text-gray-600 focus:ring-gray-500" /></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 bg-black w-6 h-6 flex items-center justify-center rounded text-white text-xs">in</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Alice Johnson</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">General Motors</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">AVP, Corporate Development</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">L2 - Director/VP</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">alice.johnson@gm.com</td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full font-medium">Target Met</span>
                    </td>
                    <td className="px-3 py-3">
                      <button className="mr-1 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-3 py-3"><input type="checkbox" className="rounded text-gray-600 focus:ring-gray-500" /></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 bg-black w-6 h-6 flex items-center justify-center rounded text-white text-xs">in</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Bob Smith</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">Boeing</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">Chief Information Officer</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">L1 - C-Suite</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">bob.smith@boeing.com</td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full font-medium">Target Met</span>
                    </td>
                    <td className="px-3 py-3">
                      <button className="mr-1 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-3 py-3"><input type="checkbox" className="rounded text-gray-600 focus:ring-gray-500" /></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center">
                        <div className="mr-2 bg-black w-6 h-6 flex items-center justify-center rounded text-white text-xs">in</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Charlie Brown</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">Tesla</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">SVP, Head Of Cloud</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">L2 - Director/VP</td>
                    <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">charlie.brown@tesla.com</td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full font-medium">In Progress</span>
                    </td>
                    <td className="px-3 py-3">
                      <button className="mr-1 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 