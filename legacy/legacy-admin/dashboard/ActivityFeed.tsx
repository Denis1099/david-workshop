import React from 'react';
import { ActivityItem } from '../../../types/admin';

interface ActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, loading }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return '👥';
      case 'payment':
        return '💳';
      case 'seminar':
        return '📅';
      case 'newsletter':
        return '📧';
      default:
        return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'registration':
        return 'bg-blue-100 text-blue-600';
      case 'payment':
        return 'bg-green-100 text-green-600';
      case 'seminar':
        return 'bg-purple-100 text-purple-600';
      case 'newsletter':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `לפני ${days} ימים`;
    } else if (hours > 0) {
      return `לפני ${hours} שעות`;
    } else {
      return 'לפני זמן קצר';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="typo-body-large font-medium text-gray-900 mb-4">
          פעילות אחרונה
        </h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="typo-body-large font-medium text-gray-900 mb-4">
        פעילות אחרונה
      </h3>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="typo-body-regular text-gray-500 text-center py-8">
            אין פעילות אחרונה
          </p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <span className="text-sm">{getActivityIcon(activity.type)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="typo-body-regular text-gray-900 mb-1">
                  {activity.message}
                </p>
                <p className="typo-body-small text-gray-500">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="typo-body-small text-cta hover:text-cta/80">
            הצג עוד פעילות
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;