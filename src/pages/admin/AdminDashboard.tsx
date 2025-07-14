import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import StatsCard from '../../components/admin/dashboard/StatsCard';
import ActivityFeed from '../../components/admin/dashboard/ActivityFeed';
import { AdminService } from '../../services/adminService';
import { DashboardStats, ActivityItem } from '../../types/admin';

const AdminDashboard: React.FC = () => {
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
  );
};

export default AdminDashboard;