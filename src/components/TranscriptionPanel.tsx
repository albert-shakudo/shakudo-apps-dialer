"use client";

import { useState, useEffect, useRef } from 'react';
import { Contact } from './DialerDashboard';
import { AIAssistant } from '../components/AIAssistant';
import { 
  XMarkIcon, 
  PhoneIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon, 
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  MapPinIcon,
  EnvelopeIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface TranscriptionPanelProps {
  contact: Contact | null;
}

interface Message {
  id: string;
  speaker: 'rep' | 'prospect';
  text: string;
  timestamp: string;
  isComplete: boolean;
}

export function TranscriptionPanel({ contact }: TranscriptionPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wordIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample conversation script - in a real app, this would come from real-time transcription
  const conversationScript = [
    { 
      speaker: 'rep' as const, 
      text: "Hi, this is Alex from Shakudo. Am I speaking with Michael Johnson?",
      delay: 1000
    },
    { 
      speaker: 'prospect' as const, 
      text: "Yes, this is Michael. What can I do for you?",
      delay: 3000
    },
    { 
      speaker: 'rep' as const, 
      text: "Great to connect with you, Michael. I noticed you recently downloaded our whitepaper on AI infrastructure optimization. I was wondering if you've had a chance to review it and if you had any questions?",
      delay: 5000
    },
    { 
      speaker: 'prospect' as const, 
      text: "Actually, I did take a look. It was interesting, but I'm not sure if it's relevant to our current needs. We already have a solution in place that's working adequately.",
      delay: 8000, 
      isObjection: true
    }
  ];

  // Mock contact data that would help the rep during the call
  const contactData = {
    email: contact ? `${contact.name.toLowerCase().replace(' ', '.')}@${contact.company.toLowerCase().replace(' ', '')}.com` : '',
    location: 'San Francisco, CA',
    linkedInUrl: contact ? `https://linkedin.com/in/${contact.name.toLowerCase().replace(' ', '-')}` : '',
    lastContact: '3 weeks ago',
    notes: 'Downloaded AI Infrastructure whitepaper last week. Works primarily with AWS and Azure. Has expressed interest in ML optimization.',
    interests: ['Machine Learning', 'Cloud Infrastructure', 'Cost Optimization'],
    companyInfo: 'Mid-sized technology company specializing in data analytics.',
    revenueSize: '$50M-$100M',
    employeeCount: '250-500',
    industry: 'Technology / SaaS'
  };

  // Start call timer
  useEffect(() => {
    if (contact && isModalOpen) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [contact, isModalOpen]);

  // Format call duration
  const formatCallDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Initialize the conversation with first message
  useEffect(() => {
    if (!contact) return;
    
    // Open modal when contact is provided
    setIsModalOpen(true);
    
    // Start with the first message
    const timer = setTimeout(() => {
      addMessage(conversationScript[0].speaker, conversationScript[0].text);
    }, conversationScript[0].delay);
    
    return () => clearTimeout(timer);
  }, [contact]);

  // Clean up any timers when component unmounts
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Monitor messages and trigger the typewriter effect
  useEffect(() => {
    if (messages.length === 0) return;
    
    const currentMessage = messages[messages.length - 1];
    
    if (currentMessage.isComplete) {
      // Check if we should show the next message
      const nextMessageIndex = conversationScript.findIndex(
        (msg, idx) => idx > messages.length - 1
      );
      
      if (nextMessageIndex !== -1) {
        const nextMessage = conversationScript[nextMessageIndex];
        const timer = setTimeout(() => {
          addMessage(nextMessage.speaker, nextMessage.text);
          
          // If this is the objection message, show AI assistant
          if (nextMessage.isObjection) {
            setTimeout(() => {
              setShowAIAssistant(true);
            }, 1500);
          }
        }, nextMessage.delay - conversationScript[nextMessageIndex - 1].delay);
        
        return () => clearTimeout(timer);
      }
    } else {
      // Start word-by-word typing for the current message
      setIsTyping(true);
      
      // Reset for new message
      wordIndexRef.current = 0;
      setCurrentTypingMessage('');
      
      // Start typing the message word by word
      startWordByWordTyping(currentMessage.text);
    }
  }, [messages]);

  // Word-by-word typing effect using refs to avoid closure issues
  const startWordByWordTyping = (fullText: string) => {
    const words = fullText.split(' ');
    
    // Clear any existing timers
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    
    const typeWord = () => {
      // Safety check
      if (wordIndexRef.current >= words.length) {
        completeTyping();
        return;
      }
      
      // Add the next word
      setCurrentTypingMessage(prev => {
        const nextText = prev + (prev ? ' ' : '') + words[wordIndexRef.current];
        wordIndexRef.current++;
        return nextText;
      });
      
      // Continue typing if there are more words
      if (wordIndexRef.current < words.length) {
        // Calculate delay based on word length
        const nextWord = words[wordIndexRef.current];
        const delay = Math.max(100, Math.min(250, nextWord.length * 30));
        
        // Schedule next word
        typingTimerRef.current = setTimeout(typeWord, delay);
      } else {
        // Typing is complete
        completeTyping();
      }
    };
    
    // Mark message as complete when typing is done
    const completeTyping = () => {
      setIsTyping(false);
      setMessages(prev => 
        prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, isComplete: true } : msg
        )
      );
    };
    
    // Start the typing process
    typeWord();
  };

  // Scroll to bottom when new messages appear
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTypingMessage]);

  // Add a new message to the conversation
  const addMessage = (speaker: 'rep' | 'prospect', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      speaker,
      text,
      timestamp: getTimeString(),
      isComplete: false
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // Format current time for message timestamps
  const getTimeString = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Get color style for different speakers
  const getSpeakerStyle = (speaker: string) => {
    return speaker === 'rep' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    
    // Clean up any ongoing animations
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  if (!isModalOpen) {
    return (
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" 
        onClick={handleCloseModal}
      ></div>
      
      {/* Modal Panel - Animates from bottom */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full md:w-11/12 lg:w-10/12 h-[90vh] z-50 bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl transform transition-transform duration-300 ease-in-out animate-slide-up flex flex-col">
        {/* Header with call info and actions */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0 rounded-t-xl bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <PhoneIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium flex items-center">
                <span>Active Call with {contact?.name}</span>
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></span>
                  <span>Live</span>
                </span>
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <ClockIcon className="w-4 h-4" /> Call Duration: {formatCallDuration()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" aria-hidden="true" data-slot="icon" fill="none" className="w-5 h-5"> {/* Increased size from w-4 h-4 to w-5 h-5 */}
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18m-4.399-4.4A6 6 0 0 0 18 12.75v-1.5M9 9V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-.537 1.713M12 18.75a6 6 0 0 0 2.292-.455M12 18.75a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5m-4.02-6.762a3 3 0 0 1-2.718-2.718"></path>
            </svg>
              Mute
            </button>
            <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hold
            </button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              End Call
            </button>
            <button 
              onClick={handleCloseModal}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 ml-2"
              title="Minimize call window"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Main container with three-column layout */}
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left column: Contact information */}
          <div className="md:w-1/4 lg:w-1/5 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto">
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-3xl font-semibold text-blue-600">
                  {contact?.name.charAt(0)}
                </div>
                <h4 className="font-medium mt-2">{contact?.name}</h4>
                <p className="text-sm text-gray-500">{contact?.title}</p>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                  Contact Details
                </h5>
                
                <div className="flex items-start space-x-2 text-sm">
                  <BuildingOfficeIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Company</p>
                    <p className="text-gray-600 dark:text-gray-400">{contact?.company}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <BriefcaseIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Title</p>
                    <p className="text-gray-600 dark:text-gray-400">{contact?.title}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <PhoneIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">{contact?.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <EnvelopeIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">{contactData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{contactData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <LinkIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a href={contactData.linkedInUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm">
                  <ClockIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Last Contact</p>
                    <p className="text-gray-600 dark:text-gray-400">{contactData.lastContact}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                  Company Information
                </h5>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">{contactData.companyInfo}</p>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Revenue:</span>
                    <span>{contactData.revenueSize}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Employees:</span>
                    <span>{contactData.employeeCount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Industry:</span>
                    <span>{contactData.industry}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                  Notes
                </h5>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contactData.notes}
                </p>
                
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {contactData.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center justify-center">
                  <UserCircleIcon className="w-4 h-4 mr-1" />
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle column: Transcription content */}
          <div className={`flex-1 overflow-y-auto p-4 ${showAIAssistant ? 'md:w-7/12 lg:w-1/2' : 'md:w-9/12 lg:w-4/5'}`}>
            <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="font-medium">Call Transcription</h2>
            </div>
            
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={message.id} className={`flex flex-col max-w-[90%] mb-4 ${
                  message.speaker === 'prospect' ? 'self-start' : 'self-end'
                }`}>
                  <div className="flex items-center mb-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      message.speaker === 'rep' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.speaker === 'rep' ? 'You' : contact?.name || 'Prospect'}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                  </div>
                  
                  <div className={`p-3 rounded-lg border ${getSpeakerStyle(message.speaker)}`}>
                    {index === messages.length - 1 && !message.isComplete
                      ? currentTypingMessage
                      : message.text
                    }
                  </div>
                </div>
              ))}
              
              {/* Element to scroll to */}
              <div ref={transcriptEndRef} />
            </div>
          </div>
          
          {/* Right column: AI Assistant Panel - Visible when objection is detected */}
          {showAIAssistant && (
            <div className="md:w-1/4 lg:w-3/10 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
              <AIAssistant 
                objectionText="We already have a solution in place that's working adequately."
                onClose={() => setShowAIAssistant(false)}
              />
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-900/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Type a response..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Add sliding animation */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}