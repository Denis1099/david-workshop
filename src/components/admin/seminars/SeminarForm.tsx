import React, { useState } from 'react';
import { Seminar, SeminarStatus } from '../../../types/seminar';

interface SeminarFormProps {
  seminar?: Seminar;
  onSubmit: (seminar: Omit<Seminar, 'id' | 'created_at'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const SeminarForm: React.FC<SeminarFormProps> = ({
  seminar,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<Omit<Seminar, 'id' | 'created_at'>>({
    title: seminar?.title || '',
    city: seminar?.city || '',
    date: seminar?.date || '',
    time_start: seminar?.time_start || '10:00',
    time_end: seminar?.time_end || '14:00',
    venue_name: seminar?.venue_name || '',
    venue_address: seminar?.venue_address || '',
    max_participants: seminar?.max_participants || 15,
    current_participants: seminar?.current_participants || 0,
    price: seminar?.price || 480,
    status: seminar?.status || 'active',
    special_notes: seminar?.special_notes || '',
    payment_link: seminar?.payment_link || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.city.trim()) {
      newErrors.city = 'שם העיר נדרש';
    }

    if (!formData.date) {
      newErrors.date = 'תאריך הסדנה נדרש';
    }

    if (!formData.time_start) {
      newErrors.time_start = 'שעת התחלה נדרשת';
    }

    if (!formData.time_end) {
      newErrors.time_end = 'שעת סיום נדרשת';
    }

    if (!formData.venue_name.trim()) {
      newErrors.venue_name = 'שם המקום נדרש';
    }

    if (formData.max_participants <= 0) {
      newErrors.max_participants = 'מספר משתתפים מקסימלי חייב להיות גדול מ-0';
    }

    if (formData.current_participants < 0) {
      newErrors.current_participants = 'מספר משתתפים נוכחי לא יכול להיות שלילי';
    }

    if (formData.current_participants > formData.max_participants) {
      newErrors.current_participants = 'מספר משתתפים נוכחי לא יכול להיות גדול מהמקסימום';
    }

    if (formData.price <= 0) {
      newErrors.price = 'מחיר חייב להיות גדול מ-0';
    }

    if (formData.payment_link && formData.payment_link.trim()) {
      try {
        new URL(formData.payment_link);
      } catch {
        newErrors.payment_link = 'כתובת URL לא תקינה';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const statusOptions: { value: SeminarStatus; label: string }[] = [
    { value: 'draft', label: 'טיוטה' },
    { value: 'active', label: 'פעיל' },
    { value: 'sold_out', label: 'אזל המלאי' },
    { value: 'cancelled', label: 'בוטל' },
    { value: 'completed', label: 'הושלם' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            כותרת הסדנה (אופציונלי)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta"
            placeholder="כותרת מותאמת אישית"
          />
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            עיר *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="תל אביב"
          />
          {errors.city && (
            <p className="mt-1 typo-body-small text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            תאריך *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="mt-1 typo-body-small text-red-600">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            סטטוס
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as SeminarStatus)}
            className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta select-rtl"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            שעת התחלה *
          </label>
          <input
            type="time"
            value={formData.time_start}
            onChange={(e) => handleChange('time_start', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.time_start ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.time_start && (
            <p className="mt-1 typo-body-small text-red-600">{errors.time_start}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            שעת סיום *
          </label>
          <input
            type="time"
            value={formData.time_end}
            onChange={(e) => handleChange('time_end', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.time_end ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.time_end && (
            <p className="mt-1 typo-body-small text-red-600">{errors.time_end}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            שם המקום *
          </label>
          <input
            type="text"
            value={formData.venue_name}
            onChange={(e) => handleChange('venue_name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.venue_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="שם החדר/אולם"
          />
          {errors.venue_name && (
            <p className="mt-1 typo-body-small text-red-600">{errors.venue_name}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            כתובת המקום
          </label>
          <input
            type="text"
            value={formData.venue_address}
            onChange={(e) => handleChange('venue_address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta"
            placeholder="כתובת מלאה"
          />
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            מספר משתתפים מקסימלי *
          </label>
          <input
            type="number"
            min="1"
            value={formData.max_participants}
            onChange={(e) => handleChange('max_participants', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.max_participants ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.max_participants && (
            <p className="mt-1 typo-body-small text-red-600">{errors.max_participants}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            מספר משתתפים נוכחי *
          </label>
          <input
            type="number"
            min="0"
            value={formData.current_participants}
            onChange={(e) => handleChange('current_participants', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.current_participants ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.current_participants && (
            <p className="mt-1 typo-body-small text-red-600">{errors.current_participants}</p>
          )}
        </div>

        <div>
          <label className="block typo-body-regular text-gray-700 mb-2">
            מחיר (₪) *
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={formData.price}
            onChange={(e) => handleChange('price', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && (
            <p className="mt-1 typo-body-small text-red-600">{errors.price}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block typo-body-regular text-gray-700 mb-2">
          הערות מיוחדות
        </label>
        <textarea
          value={formData.special_notes}
          onChange={(e) => handleChange('special_notes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta resize-none"
          placeholder="הערות נוספות על הסדנה..."
        />
      </div>

      <div>
        <label className="block typo-body-regular text-gray-700 mb-2">
          קישור לתשלום חיצוני
        </label>
        <input
          type="url"
          value={formData.payment_link}
          onChange={(e) => handleChange('payment_link', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-cta focus:border-cta ${
            errors.payment_link ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="https://pages.greeninvoice.co.il/payments/links/..."
        />
        {errors.payment_link && (
          <p className="mt-1 typo-body-small text-red-600">{errors.payment_link}</p>
        )}
        <p className="mt-1 typo-body-small text-gray-500">
          קישור לדף תשלום חיצוני (Green Invoice או מעבד תשלומים אחר)
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-cta text-white typo-button-cta rounded-md hover:bg-cta/90 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'שומר...' : (seminar ? 'עדכן סדנה' : 'צור סדנה')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white typo-button-regular rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          ביטול
        </button>
      </div>
    </form>
  );
};

export default SeminarForm;