'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../src/components/admin/layout/AdminLayout';
import AdminRoute from '../../src/components/admin/AdminRoute';
import StatsCard from '../../src/components/admin/dashboard/StatsCard';
import ActivityFeed from '../../src/components/admin/dashboard/ActivityFeed';
import { AdminService } from '../../src/services/adminService';
import { DashboardStats, ActivityItem } from '../../src/types/admin';
import { hasSupabaseConfig } from '../../src/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activitiesData] = await Promise.all([
          AdminService.getDashboardStats(),
          AdminService.getRecentActivity()
        ]);
        
        setStats(statsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="typo-page-title text-bg-primary">
              דשבורד ראשי
            </h1>
            <div className="typo-body-regular text-gray-600">
              עדכון אחרון: {new Date().toLocaleTimeString('he-IL')}
            </div>
          </div>

          {/* Connection Status Banner */}
          <div className={`rounded-lg p-4 border ${
            hasSupabaseConfig 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-yellow-50 border-yellow-200 text-yellow-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                hasSupabaseConfig ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <div>
                <div className="font-medium">
                  {hasSupabaseConfig ? '🔗 מחובר לבסיס נתונים' : '📦 מצב נתונים מדמה'}
                </div>
                <div className="text-sm">
                  {hasSupabaseConfig 
                    ? 'המערכת מחוברת לבסיס הנתונים. כל הנתונים שמוצגים הם אמיתיים.'
                    : 'המערכת משתמשת בנתונים מדמים. סדנאות שנוצרות לא יישמרו ולא יוצגו לציבור.'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="סדנאות פעילות"
              value={loading ? '...' : stats?.active_seminars || 0}
              icon="📅"
              color="bg-blue-100"
              change={{ value: 12, trend: 'up' }}
            />
            
            <StatsCard
              title="הרשמות חדשות"
              value={loading ? '...' : stats?.total_registrations || 0}
              icon="👥"
              color="bg-green-100"
              change={{ value: 8, trend: 'up' }}
            />
            
            <StatsCard
              title="תשלומים ממתינים"
              value={loading ? '...' : stats?.pending_payments || 0}
              icon="💳"
              color="bg-yellow-100"
              change={{ value: 5, trend: 'down' }}
            />
            
            <StatsCard
              title="מנויי רשימת תפוצה"
              value={loading ? '...' : stats?.newsletter_leads || 0}
              icon="📧"
              color="bg-purple-100"
              change={{ value: 15, trend: 'up' }}
            />
            
            <StatsCard
              title="הכנסות החודש"
              value={loading ? '...' : formatCurrency(stats?.revenue_this_month || 0)}
              icon="💰"
              color="bg-green-100"
              change={{ value: 23, trend: 'up' }}
            />
            
            <StatsCard
              title="סך הכל סדנאות"
              value={loading ? '...' : stats?.total_seminars || 0}
              icon="📊"
              color="bg-indigo-100"
              change={{ value: 3, trend: 'up' }}
            />
          </div>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} loading={loading} />
        </div>
      </AdminLayout>
    </AdminRoute>
  );
}