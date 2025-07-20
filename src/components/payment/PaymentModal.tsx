import React, { useState } from 'react';
import { PaymentModalProps, PaymentFormData, PaymentStatus } from '../../types/payment';
// Green Invoice service removed - using external payment links instead

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  seminarId,
  seminarTitle,
  seminarPrice,
  seminarDate,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    businessName: '',
    businessTaxId: '',
    isBusinessPayment: false,
    acceptTerms: false,
    acceptPrivacy: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof PaymentFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.participantName.trim()) {
      newErrors.participantName = 'שם מלא הוא שדה חובה';
    }

    if (!formData.participantEmail.trim()) {
      newErrors.participantEmail = 'אימייל הוא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.participantEmail)) {
      newErrors.participantEmail = 'אימייל לא תקין';
    }

    if (!formData.participantPhone.trim()) {
      newErrors.participantPhone = 'טלפון הוא שדה חובה';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.participantPhone)) {
      newErrors.participantPhone = 'מספר טלפון לא תקין';
    }


    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'יש לאשר את התנאים';
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'יש לאשר את הסכמת הפרטיות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Find the seminar (in a real app, this would be passed or fetched)
      const seminar = {
        id: parseInt(seminarId),
        city: 'תל אביב', // This would come from the actual seminar data
        date: seminarDate,
        price: seminarPrice,
        special_notes: seminarTitle,
        payment_enabled: true,
        payment_deadline: seminarDate,
        venue_name: 'אולם אימונים',
        venue_address: 'כתובת האולם',
        max_participants: 20,
        current_participants: 5,
        status: 'active' as const,
        time_start: '10:00',
        time_end: '16:00'
      };

      // Payment processing now happens through external payment links
      // This modal is for legacy purposes only - direct users to external payment links
      
      alert(`הרשמה נקלטה! 
      
לתשלום, אנא השתמש בקישור התשלום החיצוני או צור קשר דרך WhatsApp.

סכום לתשלום: ${seminar.price} ש״ח`);
      
      // Close modal and redirect to payment options
      onClose();
    } catch (error: any) {
      // Display Hebrew error to user but handle technical errors differently
      let displayMessage = 'אירעה שגיאה בתהליך התשלום';
      
      // If it's the specific ISO-8859-1 error, show a more specific message
      if (error.message && error.message.includes('ISO-8859-1')) {
        displayMessage = 'שגיאה בתקשורת עם שרת התשלומים - יש לנסות שוב';
      } else if (error.message) {
        displayMessage = error.message;
      }
      
      onPaymentError({
        code: error.code || 'PAYMENT_ERROR',
        message: displayMessage,
        details: error.details
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              רכישת כרטיס לסמינר
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isLoading}
            >
              ✕
            </button>
          </div>

          {/* Seminar Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-2">{seminarTitle}</h3>
            <p className="text-gray-600 mb-2">
              תאריך: {new Date(seminarDate).toLocaleDateString('he-IL')}
            </p>
            <p className="text-2xl font-bold text-cta">
              מחיר: {seminarPrice} ש"ח
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">פרטים אישיים</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  שם מלא *
                </label>
                <input
                  type="text"
                  value={formData.participantName}
                  onChange={(e) => handleInputChange('participantName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta ${
                    errors.participantName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="הזן שם מלא"
                  disabled={isLoading}
                />
                {errors.participantName && (
                  <p className="text-red-500 text-sm mt-1">{errors.participantName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  אימייל *
                </label>
                <input
                  type="email"
                  value={formData.participantEmail}
                  onChange={(e) => handleInputChange('participantEmail', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta ${
                    errors.participantEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="הזן כתובת אימייל"
                  disabled={isLoading}
                />
                {errors.participantEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.participantEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  טלפון *
                </label>
                <input
                  type="tel"
                  value={formData.participantPhone}
                  onChange={(e) => handleInputChange('participantPhone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cta ${
                    errors.participantPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="הזן מספר טלפון"
                  disabled={isLoading}
                />
                {errors.participantPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.participantPhone}</p>
                )}
              </div>
            </div>


            {/* Terms and Privacy */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="h-4 w-4 text-cta focus:ring-cta border-gray-300 rounded mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="acceptTerms" className="mr-2 text-sm text-gray-700">
                  אני מאשר/ת את <a href="/terms" className="text-cta hover:underline">תנאי השימוש</a> *
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
                  className="h-4 w-4 text-cta focus:ring-cta border-gray-300 rounded mt-1"
                  disabled={isLoading}
                />
                <label htmlFor="acceptPrivacy" className="mr-2 text-sm text-gray-700">
                  אני מאשר/ת את <a href="/privacy" className="text-cta hover:underline">הסכמת הפרטיות</a> *
                </label>
              </div>
              {errors.acceptPrivacy && (
                <p className="text-red-500 text-sm">{errors.acceptPrivacy}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-cta text-white rounded-md hover:bg-cta/90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isLoading ? 'מעבד תשלום...' : 'המשך לתשלום'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;