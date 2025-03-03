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
  PhoneArrowUpRightIcon,
  XMarkIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import { ParallelDialer } from '../components/ParallelDialer';
import { TranscriptionPanel } from '../components/TranscriptionPanel';
import { AIAssistant } from '../components/AIAssistant';
import { DispositionScreen } from '../components/DispositionScreen';

// Define Contact type
export interface Contact {
  id: string;
  name: string;
  company: string;
  title: string;
  phone: string;
  linkedIn: boolean;
  status?: 'idle' | 'ringing' | 'voicemail' | 'busy' | 'connecting' | 'connected';
}

export function DialerDashboard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialerActive, setIsDialerActive] = useState(false);
  const [isParallelDialingActive, setIsParallelDialingActive] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [showTranscription, setShowTranscription] = useState(false);
  const [showDisposition, setShowDisposition] = useState(false);

  // Sample queue data
  const queueData: Contact[] = [
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

  // Sample contacts data (main contact list)
  const contactsData: Contact[] = [
    {
      id: '1237892',
      name: 'Emily Rodriguez',
      company: 'Cloud Solutions',
      title: 'CIO',
      phone: '+1 (415) 555-1234',
      linkedIn: true
    },
    {
      id: '2348901',
      name: 'James Wilson',
      company: 'Tech Innovations',
      title: 'Director of IT',
      phone: '+1 (628) 555-2345',
      linkedIn: true
    },
    {
      id: '3459012',
      name: 'Jessica Thompson',
      company: 'Alpha Software',
      title: 'VP Technology',
      phone: '+1 (312) 555-3456',
      linkedIn: false
    },
    {
      id: '4560123',
      name: 'Robert Martinez',
      company: 'Global Tech',
      title: 'CTO',
      phone: '+1 (415) 555-4567',
      linkedIn: true
    },
    {
      id: '5671234',
      name: 'Lisa Johnson',
      company: 'Enterprise Solutions',
      title: 'IT Director',
      phone: '+1 (628) 555-5678',
      linkedIn: true
    }
  ];

  // Handle parallel dialing activation
  const handleParallelDialing = () => {
    setIsParallelDialingActive(true);
    setIsDialerActive(true);
    
    // After some time, show the transcription panel (simulating successful connection)
    setTimeout(() => {
      setShowTranscription(true);
      // Select the first contact as active
      setActiveContact(queueData[0]);
    }, 2000);
  };

  // Handle ending a call
  const handleEndCall = () => {
    setShowTranscription(false);
    setShowDisposition(true);
  };

  // Handle disposition completion
  const handleCompleteDisposition = () => {
    setShowDisposition(false);
    setIsParallelDialingActive(false);
    setActiveContact(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main container - starts below the top bar and to the right of sidebar */}
      <div className="flex">
        {/* Further simplified left sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          {/* Dialer controls section */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex items-center">
                <div className={`mr-2 w-2 h-2 rounded-full ${isDialerActive ? "bg-green-500" : "bg-yellow-500"}`}></div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Dialer {isDialerActive ? "Active" : "Idle"}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{isDialerActive ? "CL-38291" : "—"}</span>
            </div>
            
            {/* Professional Caller ID Selection */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Outbound Caller ID</label>
              <div className="relative">
                <select className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm dark:text-white font-mono">
                  <option>+1 (415) 555-2671</option>
                  <option>+1 (628) 555-1980</option>
                  <option>+1 (312) 555-7432</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Enhanced AI Recommendation */}
              <div className="mt-2 p-2 bg-gradient-to-r from-purple-50 to-purple-50/70 dark:from-purple-900/20 dark:to-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-md flex items-center">
                <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Optimized</span>
                    <span className="ml-1.5 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-800/50 rounded text-xs font-semibold text-purple-700 dark:text-purple-300">76% Match</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    Best number for current queue's locations and time zones
                  </p>
                </div>
              </div>
            </div>
            
            {/* Manual Dialing */}
            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter phone number..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded border border-gray-300 dark:border-gray-600 pl-8 pr-16 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white font-mono"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              />
              <button className="absolute right-0 top-0 bottom-0 px-3 bg-black text-white rounded-r border-black hover:bg-gray-800 text-xs font-medium">
                Dial
              </button>
            </div>
            
            <button 
              onClick={() => setIsDialerActive(!isDialerActive)}
              className={`w-full py-1.5 px-3 rounded text-white text-sm font-medium flex items-center justify-center ${isDialerActive ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-green-700"}`}
            >
              {isDialerActive ? (
                <>
                  <PauseIcon className="h-3.5 w-3.5 mr-1.5" />
                  <span>Pause Dialer</span>
                </>
              ) : (
                <>
                  <PlayIcon className="h-3.5 w-3.5 mr-1.5" />
                  <span>Start Dialer</span>
                </>
              )}
            </button>
          </div>
          
          {/* Main Call Action Buttons */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 dark:bg-gray-800">
            <button className="p-2 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 flex flex-col items-center justify-center">
              <PhoneIcon className="w-4 h-4 mb-1" />
              <span>Dial Queue</span>
            </button>
            
            <button 
              onClick={handleParallelDialing}
              className="p-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 flex flex-col items-center justify-center"
            >
              <PhoneArrowUpRightIcon className="w-4 h-4 mb-1" />
              <span>Parallel Dialing</span>
            </button>
            
            <button 
              onClick={handleEndCall}
              className="p-2 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 flex flex-col items-center justify-center"
            >
              <XCircleIcon className="w-4 h-4 mb-1" />
              <span>Hang Up</span>
            </button>
            
            <button className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-600 flex flex-col items-center justify-center">
              <SpeakerWaveIcon className="w-4 h-4 mb-1" />
              <span>Barge-In</span>
            </button>
          </div>
          
          {/* Quick Actions Section */}
          <div className="p-3">
            <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-medium">Queue Management</div>
            <div className="space-y-1">
              <button className="w-full px-2 py-1.5 flex items-center justify-between text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <PlusIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  <span className="text-xs">Add Selected</span>
                </div>
                <span className="text-xxs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">Alt+A</span>
              </button>
              
              <button className="w-full px-2 py-1.5 flex items-center justify-between text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <UserGroupIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  <span className="text-xs">Add from HubSpot</span>
                </div>
                <span className="text-xxs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">Alt+H</span>
              </button>
              
              <button className="w-full px-2 py-1.5 flex items-center justify-between text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  <ArrowPathIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  <span className="text-xs">Reset Queue</span>
                </div>
                <span className="text-xxs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">Alt+R</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Dialer Queue Header with AI Insights */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">Dialer Queue ({queueData.length})</h2>
                <div className="ml-3 flex items-center px-2 py-1 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800/30">
                  <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-400">AI Insights</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                  Today's Dials: 14
                </div>
                <button 
                  onClick={handleParallelDialing}
                  className="px-3 py-1.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 flex items-center transition-all ease-in-out duration-200 hover:shadow-md"
                >
                  <PhoneArrowUpRightIcon className="w-4 h-4 mr-1" /> Parallel Dialing
                </button>
              </div>
            </div>

            {/* AI insights panel */}
            <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">AI-Powered Queue Analytics</h3>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Data from</span>
                  <div className="flex items-center ml-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">HubSpot</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Salesforce</span>
                    <span className="mx-1">•</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Call History</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-800/20 flex items-center justify-center mr-2 text-purple-600 dark:text-purple-400 font-bold">
                      85%
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Best Time to Call</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">10am - 11:30am local time</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-800/20 flex items-center justify-center mr-2 text-purple-600 dark:text-purple-400 font-bold">
                      3.2
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Avg. Attempts Needed</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">For this industry segment</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-800/20 flex items-center justify-center mr-2 text-purple-600 dark:text-purple-400 font-bold">
                      62%
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200">Connect Probability</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">For current queue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showDisposition ? (
              <DispositionScreen 
                contact={activeContact}
                onComplete={handleCompleteDisposition}
              />
            ) : isParallelDialingActive ? (
              <div className="flex h-full">
                <div className="flex-1">
                  <ParallelDialer 
                    contacts={queueData} 
                    activeContact={activeContact}
                    onEndCall={handleEndCall}
                  />
                </div>
              </div>
            ) : (
              // Regular Dialer Queue Table
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
            )}

            {/* Main Contacts List Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">Contacts ({contactsData.length})</h2>
                  <div className="flex items-center ml-3 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Synced with</span>
                    <span className="ml-1 font-bold">HubSpot CRM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-64 rounded-md border border-gray-300 dark:border-gray-600 pl-9 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
                    />
                    <div className="absolute right-0 inset-y-0 flex items-center pr-2">
                      <span className="px-1.5 py-0.5 text-xs bg-purple-100 dark:bg-purple-800/30 text-purple-700 dark:text-purple-300 rounded border border-purple-200 dark:border-purple-700/30 flex items-center">
                        <svg className="w-3 h-3 mr-0.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                        AI
                      </span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add New
                  </button>
                </div>
              </div>
              
              <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="font-medium">AI Contact Enrichment</span>
                    <div className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      Active
                    </div>
                  </div>
                  <button className="text-xs text-gray-600 dark:text-gray-400 underline">Configure</button>
                </div>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LinkedIn</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI Score (Time of Day)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsData.map((contact, index) => (
                      <tr key={contact.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
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
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium 
                              ${index === 0 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 
                                index === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 
                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                              {index === 0 ? '92%' : index === 1 ? '87%' : index === 2 ? '76%' : index === 3 ? '68%' : '54%'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="mr-2 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                            <PhoneIcon className="w-4 h-4" />
                          </button>
                          <button className="mr-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                            <XCircleIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                  <span>AI enriched 12 contacts from your database in the last 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transcription Panel - Conditionally render when showTranscription is true */}
      {showTranscription && activeContact && (
        <TranscriptionPanel 
          contact={activeContact}
        />
      )}
    </div>
  );
}