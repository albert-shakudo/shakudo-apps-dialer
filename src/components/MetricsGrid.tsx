import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  hasInfo?: boolean;
}

function MetricCard({ title, value, subtitle, hasInfo = true }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600 dark:text-gray-400">{title}</span>
        {hasInfo && (
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <div className="text-lg font-bold">{value}</div>
      {subtitle && (
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-7 gap-3">
      <MetricCard
        title="Total MQL Meetings"
        value="2,847"
        subtitle="Cost per Meeting: $5,842.31"
      />
      <MetricCard
        title="Total Impressions"
        value="128,456,789"
      />
      <MetricCard
        title="Total Clicks"
        value="3,245,614"
      />
      <MetricCard
        title="Average CTR"
        value="2.53%"
      />
      <MetricCard
        title="Average CPC"
        value="$4.92"
      />
      <MetricCard
        title="Total Spend"
        value="$16,428,421.53"
      />
      <MetricCard
        title="Total HubSpot Contacts"
        value="84,521"
      />
    </div>
  );
} 