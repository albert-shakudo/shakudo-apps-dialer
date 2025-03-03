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
                <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-800/40 flex items-center justify-center mr-2 flex-shrink-0 inline-block">
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
            {/* Dialer Queue Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-semibold">Dialer Queue ({queueData.length})</h2>
              <div className="flex items-center gap-3">
                <div className="text-sm bg-gray-100 dark:bg-gray-800/60 px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                  Today's Dials: 14
                </div>
                <button 
                  onClick={handleParallelDialing}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center transition-all ease-in-out duration-200 hover:shadow-md"
                >
                  <PhoneArrowUpRightIcon className="w-4 h-4 mr-1" /> Parallel Dialing
                </button>
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
                <h2 className="text-xl font-semibold">Contacts ({contactsData.length})</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="w-64 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add New
                  </button>
                </div>
              </div>
              
              <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
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
                        <td className="px-4 py-3 text-sm">
                          <button className="mr-2 text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                            <PhoneIcon className="w-4 h-4" />
                          </button>
                          <button className="mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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