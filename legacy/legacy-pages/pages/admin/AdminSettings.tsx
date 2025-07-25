import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { AdminSettings } from '../../types/admin';
import { AdminService } from '../../services/adminService';

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'שגיאה בטעינת ההגדרות' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      await AdminService.updateSettings(settings);
      setMessage({ type: 'success', text: 'ההגדרות נשמרו בהצלחה' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'שגיאה בשמירת ההגדרות' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof AdminSettings, value: any) => {
    if (!settings) return;
    setSettings(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="typo-body-regular text-gray-600">
            שגיאה בטעינת ההגדרות. נסה לרענן את הדף.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="typo-section-title text-bg-primary">
            הגדרות מערכת
          </h1>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="typo-body-regular">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="typo-body-large font-medium text-gray-900 mb-6">
              הגדרות אבטחה
            </h2>
            
            <div className="max-w-md">
              <label className="block typo-body-regular text-gray-700 mb-2">
                סיסמת מנהל
              </label>
              <input
                type="password"
                value={settings.admin_password}
                onChange={(e) => handleChange('admin_password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta"
              />
              <p className="mt-1 typo-body-small text-gray-500">
                השאר ריק כדי לא לשנות את הסיסמה הנוכחית
              </p>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="typo-body-large font-medium text-gray-900 mb-6">
              מידע מערכת
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="typo-body-regular font-medium text-gray-700 mb-2">
                  גרסת מערכת
                </h3>
                <p className="typo-body-regular text-gray-600">
                  v1.0.0
                </p>
              </div>
              
              <div>
                <h3 className="typo-body-regular font-medium text-gray-700 mb-2">
                  עדכון אחרון
                </h3>
                <p className="typo-body-regular text-gray-600">
                  {new Date().toLocaleDateString('he-IL')}
                </p>
              </div>
              
              <div>
                <h3 className="typo-body-regular font-medium text-gray-700 mb-2">
                  סטטוס בסיס נתונים
                </h3>
                <p className="typo-body-regular text-green-600">
                  מחובר
                </p>
              </div>
              
              <div>
                <h3 className="typo-body-regular font-medium text-gray-700 mb-2">
                  מצב גיבוי
                </h3>
                <p className="typo-body-regular text-green-600">
                  פעיל
                </p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="typo-body-large font-medium text-gray-900 mb-6">
              ניהול נתונים
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="typo-body-regular font-medium text-gray-900">
                    ייצא את כל הנתונים
                  </h3>
                  <p className="typo-body-small text-gray-600">
                    יצא קובץ CSV עם כל הנתונים במערכת
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white typo-button-regular rounded-md hover:bg-blue-700"
                  onClick={() => {
                    // TODO: Implement full data export
                    alert('פונקציונליות זו תמומש בקרוב');
                  }}
                >
                  ייצא נתונים
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <h3 className="typo-body-regular font-medium text-red-900">
                    מחק את כל הנתונים
                  </h3>
                  <p className="typo-body-small text-red-600">
                    פעולה זו תמחק את כל הנתונים במערכת ללא אפשרות שחזור
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white typo-button-regular rounded-md hover:bg-red-700"
                  onClick={() => {
                    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים? פעולה זו בלתי הפיכה!')) {
                      // TODO: Implement data deletion
                      alert('פונקציונליות זו תמומש בקרוב');
                    }
                  }}
                >
                  מחק הכל
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-cta text-white typo-button-cta rounded-md hover:bg-cta/90 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 disabled:opacity-50"
            >
              {saving ? 'שומר...' : 'שמור הגדרות'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;