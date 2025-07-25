'use client';

import React from 'react';
import AdminLayout from '../../../src/components/admin/layout/AdminLayout';
import AdminRoute from '../../../src/components/admin/AdminRoute';

export default function AdminNewsletter() {
  return (
    <AdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ניהול רשימת תפוצה</h1>
            <p className="text-gray-600">ניהול מנויים ושליחת ניוזלטרים</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">רשימת תפוצה</h3>
              <p className="text-gray-600">כאן תוכל לנהל את רשימת התפוצה ולשלוח ניוזלטרים</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}