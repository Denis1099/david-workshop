import React from 'react';
import { Seminar, StatusBadgeProps, AvailabilityStatus } from '../../types/seminar';

const StatusBadge: React.FC<StatusBadgeProps> = ({ seminar, className = '' }) => {
  const getAvailabilityStatus = (seminar: Seminar): AvailabilityStatus => {
    if (seminar.status === 'cancelled') return 'cancelled';
    if (seminar.status === 'sold_out' || seminar.current_participants >= seminar.max_participants) {
      return 'sold_out';
    }
    
    const spotsLeft = seminar.max_participants - seminar.current_participants;
    if (spotsLeft <= 3) return 'almost_full';
    
    return 'available';
  };

  const getStatusConfig = (status: AvailabilityStatus) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: `נותרו ${seminar.max_participants - seminar.current_participants} מקומות`,
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'almost_full':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          label: `נותרו ${seminar.max_participants - seminar.current_participants} מקומות בלבד!`,
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'sold_out':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'אזל המלאי',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'cancelled':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'בוטל',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };

  const availabilityStatus = getAvailabilityStatus(seminar);
  const config = getStatusConfig(availabilityStatus);

  return (
    <div className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 ${className}`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};

export default StatusBadge;