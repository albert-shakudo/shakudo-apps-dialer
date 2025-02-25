import React from 'react';
import {
  ChartBarIcon,
  PhoneIcon,
  CalendarIcon,
  UserGroupIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  EllipsisHorizontalIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

// Sample data for BDR performance
const bdrData = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: '/avatars/alex.jpg',
    calls: 78,
    meetings: 12,
    emails: 145,
    conversion: 15.4,
    quota: 85,
    progress: 92,
    status: 'Exceeding',
    statusColor: 'green',
    recentActivity: '15m ago'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    avatar: '/avatars/maria.jpg',
    calls: 65,
    meetings: 8,
    emails: 120,
    conversion: 12.3,
    quota: 80,
    progress: 81,
    status: 'On Track',
    statusColor: 'blue',
    recentActivity: '32m ago'
  },
  {
    id: 3,
    name: 'David Kim',
    avatar: '/avatars/david.jpg',
    calls: 42,
    meetings: 5,
    emails: 87,
    conversion: 11.9,
    quota: 75,
    progress: 56,
    status: 'At Risk',
    statusColor: 'yellow',
    recentActivity: '1h ago'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    avatar: '/avatars/sarah.jpg',
    calls: 31,
    meetings: 3,
    emails: 65,
    conversion: 9.7,
    quota: 70,
    progress: 44,
    status: 'Behind',
    statusColor: 'red',
    recentActivity: '2h ago'
  },
  {
    id: 5,
    name: 'James Taylor',
    avatar: '/avatars/james.jpg',
    calls: 58,
    meetings: 9,
    emails: 112,
    conversion: 15.5,
    quota: 80,
    progress: 73,
    status: 'On Track',
    statusColor: 'blue',
    recentActivity: '45m ago'
  }
];

// Team summary metrics
const teamMetrics = {
  totalCalls: 274,
  avgCallsPerBDR: 54.8,
  totalMeetings: 37,
  conversionRate: 13.5,
  quotaAttainment: 69.2,
  activeBDRs: 5,
  totalProspects: 1250,
  callsToday: 42
};

export function BDRPerformanceDashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Main container - starts below the top bar and to the right of sidebar */}
      <div className="flex h-[calc(100vh-3.5rem)] overflow-y-auto">
        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full space-y-6">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BDR Performance Dashboard</h1>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm dark:bg-gray-700">
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                  <option>Custom Range</option>
                </select>
                <button className="px-3 py-1.5 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 flex items-center">
                  <ChartBarIcon className="w-4 h-4 mr-1" /> Generate Report
                </button>
              </div>
            </div>

            {/* Team Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{teamMetrics.totalCalls}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg: {teamMetrics.avgCallsPerBDR}/BDR</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Booked</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{teamMetrics.totalMeetings}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Conversion: {teamMetrics.conversionRate}%</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quota Attainment</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{teamMetrics.quotaAttainment}%</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Team Average</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    <TrophyIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active BDRs</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{teamMetrics.activeBDRs}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Today: {teamMetrics.callsToday} calls</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* BDR Performance Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">BDR Performance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">BDR</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Calls</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meetings</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Emails</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Conversion Rate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quota Progress</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Activity</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {bdrData.map((bdr) => (
                      <tr key={bdr.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {bdr.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{bdr.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {bdr.calls}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {bdr.meetings}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {bdr.emails}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {bdr.conversion}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                bdr.progress >= 90 ? 'bg-green-500' : 
                                bdr.progress >= 70 ? 'bg-blue-500' : 
                                bdr.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${bdr.progress}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {bdr.progress}% of {bdr.quota}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium 
                            ${bdr.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                            bdr.statusColor === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                            bdr.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                            {bdr.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {bdr.recentActivity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button className="text-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                            <EllipsisHorizontalIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Top Performers</h3>
                <div className="space-y-4">
                  {bdrData.slice(0, 3).map((bdr, index) => (
                    <div key={bdr.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{bdr.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{bdr.meetings} meetings</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">{bdr.conversion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Needs Attention</h3>
                <div className="space-y-4">
                  {bdrData.slice(-2).map((bdr) => (
                    <div key={bdr.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {bdr.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{bdr.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Only {bdr.calls} calls</p>
                        </div>
                      </div>
                      <div>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700">
                          Coach
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 