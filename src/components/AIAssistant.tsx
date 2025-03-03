"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface AIAssistantProps {
  objectionText: string;
  onClose: () => void;
}

interface TalkingPoint {
  id: string;
  text: string;
  source: 'Slack' | 'Docs' | 'CRM';
  confidence: number;
  context?: string;
  author?: string;
  date?: string;
}

export function AIAssistant({ objectionText, onClose }: AIAssistantProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  
  // Sample talking points - in a real app, these would be generated by AI based on the objection
  const talkingPoints: TalkingPoint[] = [
    {
      id: '1',
      text: "I understand you have an existing solution. Many of our current customers were in the same position. What they found was that our platform offered 40% better performance with 25% lower TCO.",
      source: 'Docs',
      confidence: 0.92,
      context: "When prospects mention 'adequate solutions,' highlight our distinctive differentiation: AI-powered optimization, seamless integrations, and 24/7 dedicated support. Focus on future-proofing and ROI metrics.",
      author: "Sales Playbook",
      date: "Section: Handling Common Objections"
    },
    {
      id: '2',
      text: "What specific aspects of your current solution are working well for you? This helps me understand if there are areas where we might complement rather than replace your existing setup.",
      source: 'Slack',
      confidence: 0.88,
      context: "When clients say their current solution is 'adequate', I've had success asking them about their growth plans. Most solutions that are 'adequate' today break under future scale.",
      author: "@sarah.m",
      date: "Posted 3 days ago in #sales-objection-handling"
    },
    {
      id: '3',
      text: "Would it be valuable to see a side-by-side comparison of your current solution vs. ours? We've found this helps teams make more informed decisions about whether an upgrade makes sense.",
      source: 'CRM',
      confidence: 0.76,
      context: "Customer initially said their existing solution was 'adequate' but changed their mind after seeing our ROI calculator showing 3x performance improvement and 40% cost reduction potential.",
      author: "CompanyX Deal Notes",
      date: "Added by Alex Chen on 04/15/2023"
    }
  ];
  
  // Get the appropriate badge color for the source
  const getSourceBadgeColor = (source: string) => {
    switch(source) {
      case 'Slack':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Docs':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CRM':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get icon for the source
  const getSourceIcon = (source: string) => {
    switch(source) {
      case 'Slack':
        return <ChatBubbleLeftRightIcon className="w-4 h-4 text-purple-500 mr-2" />;
      case 'Docs':
        return <BookOpenIcon className="w-4 h-4 text-blue-500 mr-2" />;
      case 'CRM':
        return <BookOpenIcon className="w-4 h-4 text-green-500 mr-2" />;
      default:
        return null;
    }
  };
  
  // Format confidence as percentage
  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`;
  };

  // Handle selecting a response
  const handleSelectResponse = (responseText: string) => {
    setSelectedResponse(responseText);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800/50 flex justify-between items-center">
        <div className="flex items-center">
          <SparklesIcon className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-medium text-blue-800 dark:text-blue-200">AI Objection Assistant</h3>
          <div className="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 rounded-full">
            Objection Detected
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="overflow-y-auto p-4 flex-1 custom-scrollbar">
        {/* Objection */}
        <div className="mb-5">
          <div className="text-xs font-medium text-gray-500 mb-2">Detected Objection:</div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-800/50 flex items-start shadow-sm">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Prospect said:</p>
              <p>"{objectionText}"</p>
            </div>
          </div>
        </div>
        
        {/* Direct Responses */}
        <div className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <SparklesIcon className="w-4 h-4 mr-1 text-blue-500" />
          Recommended Responses (with source context)
        </div>
        
        {talkingPoints.map((point) => (
          <div 
            key={point.id}
            className={`mb-5 rounded-lg shadow transition-all ${
              selectedResponse === point.text 
                ? 'ring-2 ring-blue-500' 
                : 'hover:shadow-md'
            }`}
          >
            {/* Response Card */}
            <div 
              className={`p-4 border-b rounded-t-lg cursor-pointer transition-colors ${
                selectedResponse === point.text 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleSelectResponse(point.text)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className={`text-xs px-2 py-0.5 rounded-full border ${getSourceBadgeColor(point.source)}`}>
                  {point.source} • {formatConfidence(point.confidence)} match
                </div>
                
                {selectedResponse === point.text && (
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <CheckIcon className="w-3 h-3" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{point.text}</p>
              
              {selectedResponse === point.text && (
                <button 
                  className="mt-3 text-xs bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
                  onClick={() => {
                    // In a real app, this would copy to clipboard or insert into conversation
                    alert("Response copied and ready to use!");
                  }}
                >
                  <CheckIcon className="w-4 h-4 mr-1" />
                  Use This Response
                </button>
              )}
            </div>
            
            {/* Source Context */}
            <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg border-x border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-xs font-medium text-gray-500 mb-1">
                {getSourceIcon(point.source)}
                <span className="text-gray-600 dark:text-gray-400">
                  Source: {point.source === 'Slack' ? 'Sales Team (Slack)' : point.source === 'Docs' ? 'Documentation' : 'CRM Records'}
                </span>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-600 pl-3 py-1 italic">
                {point.context}
              </div>
              
              <div className="mt-1 text-xs text-gray-500 flex justify-between">
                <span>{point.author}</span>
                <span>{point.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}