"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

// Sample data - in a real app this would come from an API
const impressionsData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
  historical: Math.floor(Math.random() * 2000000) + 3000000,
  forecast: Math.floor(Math.random() * 2000000) + 3000000,
  MA: Math.floor(Math.random() * 2000000) + 3000000,
}));

const clicksData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
  historical: Math.floor(Math.random() * 50000) + 80000,
  forecast: Math.floor(Math.random() * 50000) + 80000,
  MA: Math.floor(Math.random() * 50000) + 80000,
}));

const spendData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
  historical: Math.floor(Math.random() * 200000) + 400000,
  forecast: Math.floor(Math.random() * 200000) + 400000,
  MA: Math.floor(Math.random() * 200000) + 400000,
}));

const mqMeetingsData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
  meetings: Math.floor(Math.random() * 150) + 200,
}));

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
const formatCurrency = (value: number) => `$${new Intl.NumberFormat().format(value)}`;
const formatMillions = (value: number) => `${(value / 1000000).toFixed(1)}M`;
const formatThousands = (value: number) => `${(value / 1000).toFixed(1)}K`;
const formatDollarsK = (value: number) => `$${(value / 1000).toFixed(0)}K`;

export function PerformanceCharts() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
      {/* Impressions Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex flex-col min-h-0">
        <h3 className="text-xs font-medium">Impressions Over Time</h3>
        <div className="flex-1 min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impressionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={formatMillions} tick={{ fontSize: 10 }} />
              <Tooltip formatter={formatNumber} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="historical" stroke="#8884d8" name="Historical" />
              <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="90-Day Forecast" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="MA" stroke="#ffc658" name="30-Day MA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clicks Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex flex-col min-h-0">
        <h3 className="text-xs font-medium">Clicks Over Time</h3>
        <div className="flex-1 min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clicksData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={formatThousands} tick={{ fontSize: 10 }} />
              <Tooltip formatter={formatNumber} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="historical" stroke="#82ca9d" name="Historical" />
              <Line type="monotone" dataKey="forecast" stroke="#8884d8" name="90-Day Forecast" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="MA" stroke="#ffc658" name="30-Day MA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spend Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex flex-col min-h-0">
        <h3 className="text-xs font-medium">Spend Over Time</h3>
        <div className="flex-1 min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={formatDollarsK} tick={{ fontSize: 10 }} />
              <Tooltip formatter={formatCurrency} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="historical" stroke="#ff7675" name="Historical" />
              <Line type="monotone" dataKey="forecast" stroke="#8884d8" name="90-Day Forecast" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="MA" stroke="#ffc658" name="30-Day MA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MQL Meetings Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex flex-col min-h-0">
        <h3 className="text-xs font-medium">MQL Meetings Created (Monthly)</h3>
        <div className="flex-1 min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mqMeetingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={formatNumber} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="meetings" fill="#8884d8" name="MQL Meetings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 