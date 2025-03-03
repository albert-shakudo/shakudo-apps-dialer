"use client";

import { useState, useEffect } from 'react';
import { Contact } from '../components/DialerDashboard';
import { 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  CalendarIcon,
  ArrowPathIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

interface DispositionScreenProps {
  contact: Contact | null;
  onComplete: () => void;
}

export function DispositionScreen({ contact, onComplete }: DispositionScreenProps) {
  const [callSummary, setCallSummary] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [syncProgress, setSyncProgress] = useState(0);
  const [outcomeConfidence, setOutcomeConfidence] = useState<Record<string, number>>({
    'Not Interested': 0.12,
    'Follow Up': 0.75,
    'Meeting Scheduled': 0.05,
    'Needs More Info': 0.08
  });
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>('Follow Up');
  
  // Sample call summary text
  const summaryText = `Call with ${contact?.name || 'prospect'} from ${contact?.company || 'unknown company'} lasted 2 minutes and 14 seconds. The prospect was initially hesitant, mentioning they already have a solution in place that's working adequately. However, they showed interest when you mentioned the 40% performance improvement and 25% lower TCO. They asked for more specific information on how our solution integrates with their existing systems and requested a follow-up email with case studies and integration documentation. Recommend scheduling a technical demo within the next 2 weeks.`;
  
  // Initialize the typing effect for the call summary
  useEffect(() => {
    if (callSummary === '') {
      const timer = setTimeout(() => {
        setCallSummary(summaryText);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    // Type out the summary one character at a time
    if (typedText.length < callSummary.length) {
      const timer = setTimeout(() => {
        setTypedText(callSummary.substring(0, typedText.length + 1));
      }, 20);
      return () => clearTimeout(timer);
    } else if (!typingComplete) {
      setTypingComplete(true);
      
      // Start the sync animation
      const syncTimer = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(syncTimer);
            return 100;
          }
          return prev + 20;
        });
      }, 500);
      
      return () => clearInterval(syncTimer);
    }
  }, [callSummary, typedText, typingComplete]);
  
  // Get confidence indicator style
  const getConfidenceStyle = (confidence: number) => {
    if (confidence > 0.7) return 'bg-green-100 text-green-800';
    if (confidence > 0.3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // Format confidence as percentage
  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <DocumentTextIcon className="w-5 h-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-medium">Call Disposition</h2>
        </div>
        <div>
          <span className="text-sm text-gray-500">Call ID: CL-38291</span>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Contact Information</h3>
            {contact ? (
              <div className="flex items-start">
                <div className="bg-gray-200 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xl font-semibold">{contact.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
                  <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mt-1">{contact.phone}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No contact information available</p>
            )}
          </div>
          
          {/* AI-Generated Call Summary */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
                <DocumentCheckIcon className="w-4 h-4 mr-2" />
                AI-Generated Call Summary
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-line min-h-[100px]">
                {typedText}
              </p>
            </div>
          </div>
          
          {/* Call Outcome */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Call Outcome
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(outcomeConfidence).map(([outcome, confidence]) => (
                  <div 
                    key={outcome}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedOutcome === outcome 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/30'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{outcome}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getConfidenceStyle(confidence)}`}>
                        {formatConfidence(confidence)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${confidence * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* CRM Sync Status */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <BriefcaseIcon className="w-4 h-4 mr-2" />
                CRM Sync Status
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <CloudArrowUpIcon className="w-5 h-5 text-blue-500 mr-2" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Syncing to Salesforce</span>
                    <span className="text-sm text-gray-500">{syncProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${syncProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Sync Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Contact Record:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${syncProgress >= 40 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {syncProgress >= 40 ? 'Updated' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Call Log:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${syncProgress >= 60 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {syncProgress >= 60 ? 'Created' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Follow-up Task:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${syncProgress >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {syncProgress >= 80 ? 'Created' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Opportunity:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${syncProgress >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {syncProgress >= 100 ? 'Updated' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call Quality Metrics */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                Call Quality Metrics
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Talk Ratio</div>
                  <div className="flex items-end">
                    <span className="text-xl font-medium">38%</span>
                    <span className="text-xs text-gray-500 ml-1">You</span>
                    <span className="mx-1 text-gray-400">/</span>
                    <span className="text-xl font-medium">62%</span>
                    <span className="text-xs text-gray-500 ml-1">Prospect</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Talk Speed</div>
                  <div className="flex items-end">
                    <span className="text-xl font-medium">148</span>
                    <span className="text-xs text-gray-500 ml-1">words/min</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-green-600 ml-2">Good</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Comparison to Team Average</div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Questions Asked</div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium mr-1">8</span>
                      <span className="text-xs text-green-600">+2</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Objections Handled</div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium mr-1">3</span>
                      <span className="text-xs text-green-600">+1</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Next Steps Set</div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium mr-1">Yes</span>
                      <span className="text-xs text-green-600">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Follow-up Recommendations */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                Follow-up Recommendations
              </h3>
            </div>
            <div className="p-4">
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800/50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <CalendarIcon className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Schedule Technical Demo</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Prospect expressed interest in seeing integrations.</p>
                  <div className="mt-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                      Within 2 weeks
                    </span>
                  </div>
                </div>
                <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <DocumentTextIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Send Case Studies</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">Focus on similar companies in tech sector.</p>
                  <div className="mt-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded">
                      Within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm flex items-center">
            <ArrowPathIcon className="w-4 h-4 mr-1" /> Regenerate Summary
          </button>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            Save Draft
          </button>
          <button 
            onClick={onComplete}
            className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 flex items-center"
          >
            <CheckCircleIcon className="w-4 h-4 mr-1" /> Submit & Continue
          </button>
        </div>
      </div>
    </div>
  );
}