import React from 'react';
import { Link } from 'react-router-dom';
import { SeminarCardProps } from '../../types/seminar';
import StatusBadge from './StatusBadge';
import { generateSeminarSlug } from '../../utils/seminarUtils';

const SeminarCard: React.FC<SeminarCardProps> = ({ 
  seminar, 
  onDetailsClick, 
  onRegisterClick 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeStart: string, timeEnd: string) => {
    const cleanTime = (time: string) => time.split(':').slice(0, 2).join(':');
    return `${cleanTime(timeStart)}-${cleanTime(timeEnd)}`;
  };

  const formatPrice = (price: number) => {
    return `₪${price}`;
  };

  const isDisabled = seminar.status === 'cancelled' || 
                   seminar.status === 'sold_out' || 
                   seminar.current_participants >= seminar.max_participants;

  const seminarSlug = generateSeminarSlug(seminar);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300" dir="rtl">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-br from-bg-primary to-blue-800 p-6 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="typo-body-large font-bold text-white mb-2">
          {seminar.venue_name}
        </h3>
        <p className="typo-body-regular text-white font-medium">
          {seminar.city}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6 text-center">
        {/* Date */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">תאריך</span>
          </div>
          <p className="typo-body-large text-gray-800 font-bold">
            {formatDate(seminar.date)}
          </p>
        </div>

        {/* Time */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">שעה</span>
          </div>
          <p className="typo-body-large text-gray-800 font-bold">
            {formatTime(seminar.time_start, seminar.time_end)}
          </p>
        </div>

        {/* Status Badge */}
        <div className="mb-6 flex justify-center">
          <StatusBadge seminar={seminar} />
        </div>

        {/* Address (if available) */}
        {seminar.venue_address && (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">כתובת</span>
            </div>
            <p className="text-sm text-gray-600">
              {seminar.venue_address}
            </p>
          </div>
        )}

        {/* Special Notes */}
        {seminar.special_notes && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              {seminar.special_notes}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="text-2xl md:text-3xl font-rubik font-bold text-bg-primary">
            {formatPrice(seminar.price)}
          </div>
          <p className="typo-body-small text-gray-500">למשתתף</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary CTA - Register */}
          <button
            onClick={() => onRegisterClick(seminar)}
            disabled={isDisabled}
            className={`w-full py-3 rounded-lg typo-button-cta transition-all duration-300 transform hover:scale-105 ${
              isDisabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-cta hover:bg-yellow-600 text-bg-primary'
            }`}
          >
            {isDisabled ? 'לא זמין' : 'הרשמה מהירה'}
          </button>

          {/* Secondary CTA - Details */}
          <Link
            to={`/seminars/${seminarSlug}`}
            className="w-full bg-transparent border-2 border-gray-300 text-gray-700 hover:border-bg-primary hover:text-bg-primary typo-button-regular py-3 rounded-lg transition-all duration-300 block text-center"
          >
            פרטים מלאים
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;