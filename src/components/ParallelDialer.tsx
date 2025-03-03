"use client";

import { useState, useEffect } from 'react';
import { Contact } from '../components/DialerDashboard';
import { 
  PhoneIcon, 
  XMarkIcon,
  SpeakerWaveIcon,
  MicrophoneIcon,
  PauseIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface ParallelDialerProps {
  contacts: Contact[];
  activeContact: Contact | null;
  onEndCall: () => void;
}

export function ParallelDialer({ contacts, activeContact, onEndCall }: ParallelDialerProps) {
  const [dialingContacts, setDialingContacts] = useState<Contact[]>([]);
  const [isDialing, setIsDialing] = useState(false);
  
  // Initialize contacts with idle status when component mounts
  useEffect(() => {
    const contactsWithStatus = contacts.map(contact => ({
      ...contact,
      status: 'idle' as const
    }));
    setDialingContacts(contactsWithStatus);

    // Start the dialing simulation
    const timer = setTimeout(() => {
      startDialingSequence();
    }, 500);

    return () => clearTimeout(timer);
  }, [contacts]);

  // Simulate the dialing sequence with staggered animations
  const startDialingSequence = () => {
    setIsDialing(true);
    // Update contacts to ringing status one at a time
    setDialingContacts(prev => 
      prev.map((contact, index) => {
        // Stagger the status updates
        setTimeout(() => {
          updateContactStatus(contact.id, 'ringing');
          
          // After a random time between 500-800ms, update to the next status
          const nextStatusDelay = Math.floor(Math.random() * 300) + 500;
          setTimeout(() => {
            // Randomly choose between voicemail, busy, or connecting
            // Only allow one contact to connect at a time
            const hasConnected = dialingContacts.some(c => c.status === 'connected' || c.status === 'connecting');
            const nextStatus = hasConnected || Math.random() > 0.7 
              ? (Math.random() > 0.5 ? 'voicemail' : 'busy') 
              : 'connecting';
            
            updateContactStatus(contact.id, nextStatus);
            
            // If connecting, then move to connected after a delay
            if (nextStatus === 'connecting') {
              setTimeout(() => {
                updateContactStatus(contact.id, 'connected');
              }, 1000);
            }
          }, nextStatusDelay);
          
        }, index * 200); // Stagger by 200ms per contact
        
        return contact;
      })
    );
  };

  // Update a specific contact's status
  const updateContactStatus = (contactId: string, status: Contact['status']) => {
    setDialingContacts(prev => {
      // If trying to set a contact to "connecting" or "connected", make sure no other contacts are in that state
      if (status === 'connecting' || status === 'connected') {
        const hasConnectedContact = prev.some(c => c.status === 'connected' || c.status === 'connecting');
        if (hasConnectedContact) {
          // If there's already a connected contact, set this one to voicemail or busy
          status = Math.random() > 0.5 ? 'voicemail' : 'busy';
        }
      }
      
      return prev.map(contact => 
        contact.id === contactId ? { ...contact, status } : contact
      );
    });
  };

  // Manual call button handler
  const handleCallClick = (contactId: string) => {
    const hasConnectedContact = dialingContacts.some(c => 
      c.status === 'connected' || c.status === 'connecting'
    );
    
    if (!hasConnectedContact) {
      updateContactStatus(contactId, 'connecting');
      setTimeout(() => {
        updateContactStatus(contactId, 'connected');
      }, 1000);
    } else {
      // If there's already an active call, show an alert or toast
      alert("You can only have one active call at a time.");
    }
  };

  // Handle end call button
  const handleEndCall = (contactId: string) => {
    updateContactStatus(contactId, 'idle');
    if (activeContact?.id === contactId) {
      onEndCall();
    }
  };

  // Get the appropriate status badge color based on status
  const getStatusBadgeStyle = (status: Contact['status']) => {
    switch(status) {
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'ringing':
        return 'bg-yellow-100 text-yellow-800 animate-pulse';
      case 'voicemail':
        return 'bg-orange-100 text-orange-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      case 'connecting':
        return 'bg-blue-100 text-blue-800 animate-pulse';
      case 'connected':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get background color for the row based on status
  const getRowBgColor = (contact: Contact) => {
    if (contact.status === 'connected') return 'bg-green-50 dark:bg-green-900/20';
    if (contact.status === 'connecting') return 'bg-blue-50 dark:bg-blue-900/20';
    if (contact.status === 'ringing') return 'bg-yellow-50 dark:bg-yellow-900/20';
    return '';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Active call panel */}
      {activeContact && (
        <div className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Active Call
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Duration: 00:01:24</span>
              <button 
                onClick={onEndCall} 
                className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl font-semibold">{activeContact.name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-medium">{activeContact.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{activeContact.title} at {activeContact.company}</p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <MicrophoneIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <SpeakerWaveIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <PauseIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Contact Table */}
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">
                Contact
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">
                Company
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">
                Phone
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {dialingContacts.map((contact) => (
              <tr 
                key={contact.id}
                className={`
                  h-16 transition-colors duration-300
                  ${getRowBgColor(contact)}
                  ${activeContact?.id === contact.id ? 'border-l-4 border-green-500' : 'border-l-4 border-transparent'}
                `}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-600 dark:text-gray-300">{contact.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{contact.company}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {contact.phone}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="min-h-[24px]"> {/* Fixed height to prevent jumping */}
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(contact.status)}`}>
                      {contact.status || 'Idle'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="min-h-[28px] min-w-[80px]"> {/* Fixed height to prevent jumping */}
                    {contact.status === 'connected' ? (
                      <button 
                        onClick={() => handleEndCall(contact.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
                      >
                        Hang Up
                      </button>
                    ) : contact.status === 'idle' || contact.status === 'busy' || contact.status === 'voicemail' ? (
                      <button 
                        onClick={() => handleCallClick(contact.id)}
                        className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded"
                        disabled={isDialing && contact.status !== 'idle'}
                      >
                        Call
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">Dialing...</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}