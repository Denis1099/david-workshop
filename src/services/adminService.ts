import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { AdminSettings, DashboardStats, ActivityItem, AdminUser } from '../types/admin';
import { mockAdminSettings, mockDashboardStats, mockActivityItems, simulateApiDelay } from '../data/mockAdmin';

export class AdminService {
  private static readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  static async login(username: string, password: string): Promise<AdminUser | null> {
    await simulateApiDelay(500);
    
    if (username === this.ADMIN_CREDENTIALS.username && password === this.ADMIN_CREDENTIALS.password) {
      const adminUser: AdminUser = {
        id: 1,
        username: username,
        isAuthenticated: true,
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return adminUser;
    }
    
    return null;
  }

  static logout(): void {
    localStorage.removeItem('adminUser');
  }

  static getCurrentUser(): AdminUser | null {
    const stored = localStorage.getItem('adminUser');
    if (!stored) return null;
    
    try {
      const user = JSON.parse(stored);
      return user.isAuthenticated ? user : null;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static async getDashboardStats(): Promise<DashboardStats> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(800);
      return mockDashboardStats;
    }

    try {
      const [seminarsData, registrationsData, newsletterData] = await Promise.all([
        supabase.from('seminars').select('*'),
        supabase.from('registrations').select('*'),
        supabase.from('newsletter_leads').select('*')
      ]);

      const seminars = seminarsData.data || [];
      const registrations = registrationsData.data || [];
      const newsletter = newsletterData.data || [];

      const activeSeminars = seminars.filter(s => s.status === 'active').length;
      const pendingPayments = registrations.filter(r => r.payment_status === 'pending').length;
      
      const thisMonth = new Date().toISOString().slice(0, 7);
      const monthlyRevenue = registrations
        .filter(r => r.payment_status === 'paid' && r.registration_date.startsWith(thisMonth))
        .reduce((sum, r) => sum + (r.amount || 480), 0);

      return {
        total_seminars: seminars.length,
        active_seminars: activeSeminars,
        total_registrations: registrations.length,
        pending_payments: pendingPayments,
        newsletter_leads: newsletter.length,
        revenue_this_month: monthlyRevenue
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return mockDashboardStats;
    }
  }

  static async getRecentActivity(limit: number = 8): Promise<ActivityItem[]> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(600);
      return mockActivityItems.slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching activity:', error);
        return mockActivityItems.slice(0, limit);
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching activity:', error);
      return mockActivityItems.slice(0, limit);
    }
  }

  static async getSettings(): Promise<AdminSettings> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return mockAdminSettings;
    }

    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        return mockAdminSettings;
      }

      return data || mockAdminSettings;
    } catch (error) {
      console.error('Service error fetching settings:', error);
      return mockAdminSettings;
    }
  }

  static async updateSettings(settings: Partial<AdminSettings>): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(600);
      return true;
    }

    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert(settings);

      if (error) {
        console.error('Error updating settings:', error);
        throw new Error('שגיאה בשמירת ההגדרות');
      }

      return true;
    } catch (error) {
      console.error('Service error updating settings:', error);
      throw error instanceof Error ? error : new Error('שגיאה בשמירת ההגדרות');
    }
  }

  static async logActivity(type: string, message: string, details?: any): Promise<void> {
    if (!hasSupabaseConfig) {
      return;
    }

    try {
      await supabase
        .from('activity_log')
        .insert({
          type,
          message,
          timestamp: new Date().toISOString(),
          details
        });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
}