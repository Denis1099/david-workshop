'use client';

import React from 'react';
import AdminLayout from '../../../src/components/admin/layout/AdminLayout';
import AdminRoute from '../../../src/components/admin/AdminRoute';

export default function AdminRegistrations() {
  return (
    <AdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ניהול הרשמות</h1>
            <p className="text-gray-600">צפייה וניהול כל ההרשמות לסדנאות</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ניהול הרשמות</h3>
              <p className="text-gray-600">כאן תוכל לראות את כל ההרשמות לסדנאות ולנהל אותן</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}