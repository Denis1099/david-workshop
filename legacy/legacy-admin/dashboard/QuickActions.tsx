import React from 'react';
import { Link } from 'react-router-dom';
import { AdminService } from '../../../services/adminService';

const QuickActions: React.FC = () => {
  const handleExportAllData = async () => {
    try {
      // Export all data as CSV
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Get all data from services (mock for now, will use actual services when available)
      const allData = {
        seminars: [],
        registrations: [],
        newsletter_leads: []
      };

      // Create CSV content with all data
      const csvContent = [
        '# סדנאות',
        'עיר,תאריך,שעה,מקום,משתתפים,מחיר,סטטוס',
        '',
        '# הרשמות',
        'שם,אימייל,טלפון,סדנה,סטטוס תשלום,תאריך רישום',
        '',
        '# רשימת תפוצה',
        'אימייל,שם,טלפון,מקור,סטטוס יצירת קשר,תאריך הצטרפות'
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `all_data_export_${timestamp}.csv`;
      link.click();
      
      alert('הנתונים יוצאו בהצלחה!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('שגיאה בייצוא הנתונים');
    }
  };

  const actions: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
    href?: string;
    onClick?: () => void;
  }> = [
    {
      title: 'הוסף סדנה חדשה',
      description: 'צור סדנה חדשה במערכת',
      icon: '➕',
      href: '/admin/seminars?new=true',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'ייצא נתונים',
      description: 'ייצא רשימת הרשמות לקובץ',
      icon: '📊',
      onClick: handleExportAllData,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'הגדרות מערכת',
      description: 'ערוך הגדרות כלליות',
      icon: '⚙️',
      href: '/admin/settings',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="typo-body-large font-medium text-gray-900 mb-4">
        פעולות מהירות
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const content = (
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white`}>
                <span className="text-lg">{action.icon}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="typo-body-regular font-medium text-gray-900">
                  {action.title}
                </h4>
                <p className="typo-body-small text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          );

          if (action.onClick) {
            return (
              <button
                key={action.title}
                onClick={action.onClick}
                className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 w-full text-left"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={action.title}
              to={action.href!}
              className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;