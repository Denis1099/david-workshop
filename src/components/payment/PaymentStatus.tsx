import React from 'react';
import { PaymentStatusProps, PaymentStatus } from '../../types/payment';

const PaymentStatusComponent: React.FC<PaymentStatusProps> = ({
  status,
  message,
  invoiceUrl,
  onRetry,
  onClose
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return {
          icon: '✅',
          title: 'תשלום הושלם בהצלחה!',
          description: 'הכרטיס שלך נרכש בהצלחה. אישור יישלח אליך במייל.',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case PaymentStatus.PENDING:
        return {
          icon: '⏳',
          title: 'התשלום מתעבד...',
          description: 'אנא המתן, התשלום שלך מתעבד במערכת.',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      case PaymentStatus.PROCESSING:
        return {
          icon: '🔄',
          title: 'מעבד תשלום...',
          description: 'התשלום שלך מתעבד. אנא אל תסגור חלון זה.',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        };
      case PaymentStatus.FAILED:
        return {
          icon: '❌',
          title: 'התשלום נכשל',
          description: 'אירעה שגיאה בתהליך התשלום. אנא נסה שוב.',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      case PaymentStatus.CANCELLED:
        return {
          icon: '🚫',
          title: 'התשלום בוטל',
          description: 'בחרת לבטל את התשלום.',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
      case PaymentStatus.REFUNDED:
        return {
          icon: '💰',
          title: 'תשלום הוחזר',
          description: 'התשלום הוחזר בהצלחה לכרטיס האשראי.',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: '⚠️',
          title: 'סטטוס לא ידוע',
          description: 'אירעה שגיאה לא צפויה.',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-6`}>
          {/* Icon and Title */}
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{config.icon}</div>
            <h2 className={`text-xl font-bold ${config.textColor}`}>
              {config.title}
            </h2>
          </div>

          {/* Description */}
          <p className={`text-center mb-4 ${config.textColor}`}>
            {message || config.description}
          </p>

          {/* Processing Animation */}
          {(status === PaymentStatus.PENDING || status === PaymentStatus.PROCESSING) && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
            </div>
          )}

          {/* Invoice Link */}
          {status === PaymentStatus.COMPLETED && invoiceUrl && (
            <div className="text-center mb-4">
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cta hover:underline"
              >
                📄 הורד חשבונית
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {status === PaymentStatus.FAILED && onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-cta text-white rounded-md hover:bg-cta/90 transition-colors"
              >
                נסה שוב
              </button>
            )}
            
            {(status === PaymentStatus.COMPLETED || 
              status === PaymentStatus.FAILED || 
              status === PaymentStatus.CANCELLED) && onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                סגור
              </button>
            )}
          </div>

          {/* Additional Info */}
          {status === PaymentStatus.COMPLETED && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>פרטי הסמינר יישלחו אליך במייל בהקדם</p>
              <p>לשאלות נוספות: WhatsApp 050-123-4567</p>
            </div>
          )}

          {status === PaymentStatus.FAILED && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>לעזרה נוספת פנה אלינו:</p>
              <p>WhatsApp: 050-123-4567</p>
              <p>אימייל: info@davidworkshop.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusComponent;