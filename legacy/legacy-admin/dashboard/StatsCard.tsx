import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'stable';
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, change }) => {
  const getChangeColor = () => {
    if (!change) return '';
    switch (change.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    if (!change) return '';
    switch (change.trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="typo-body-small text-gray-600 mb-2">{title}</p>
          <p className="typo-section-title text-gray-900">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-2 typo-body-small ${getChangeColor()}`}>
              <span className="ml-1">{getChangeIcon()}</span>
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;