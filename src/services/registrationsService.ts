import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { Registration, PaymentStatus, FilterOptions } from '../types/admin';
import { mockRegistrations, simulateApiDelay } from '../data/mockAdmin';

export class RegistrationsService {
  static async fetchRegistrations(filters?: FilterOptions): Promise<Registration[]> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(800);
      let registrations = [...mockRegistrations];

      if (filters?.status?.length) {
        registrations = registrations.filter(r => 
          filters.status!.includes(r.payment_status)
        );
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        registrations = registrations.filter(r => 
          r.name.toLowerCase().includes(searchTerm) ||
          r.email.toLowerCase().includes(searchTerm) ||
          r.phone.includes(searchTerm)
        );
      }

      if (filters?.dateRange) {
        registrations = registrations.filter(r => {
          const date = r.registration_date.split('T')[0];
          return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
        });
      }

      return registrations.sort((a, b) => 
        new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime()
      );
    }

    try {
      let query = supabase
        .from('registrations')
        .select(`
          *,
          seminar:seminars(title, city, date, time_start)
        `)
        .order('registration_date', { ascending: false });

      if (filters?.status?.length) {
        query = query.in('payment_status', filters.status);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
      }

      if (filters?.dateRange) {
        query = query
          .gte('registration_date', filters.dateRange.from)
          .lte('registration_date', filters.dateRange.to);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching registrations:', error);
        throw new Error('שגיאה בטעינת ההרשמות');
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching registrations:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת ההרשמות');
    }
  }

  static async updatePaymentStatus(id: number, status: PaymentStatus): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return true;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .update({ payment_status: status })
        .eq('id', id);

      if (error) {
        console.error('Error updating payment status:', error);
        throw new Error('שגיאה בעדכון סטטוס תשלום');
      }

      return true;
    } catch (error) {
      console.error('Service error updating payment status:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון סטטוס תשלום');
    }
  }

  static async createRegistration(registration: Omit<Registration, 'id'>): Promise<Registration> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(600);
      const newRegistration: Registration = {
        id: Math.max(...mockRegistrations.map(r => r.id)) + 1,
        ...registration
      };
      return newRegistration;
    }

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert(registration)
        .select()
        .single();

      if (error) {
        console.error('Error creating registration:', error);
        throw new Error('שגיאה ביצירת הרשמה');
      }

      return data;
    } catch (error) {
      console.error('Service error creating registration:', error);
      throw error instanceof Error ? error : new Error('שגיאה ביצירת הרשמה');
    }
  }

  static async deleteRegistration(id: number): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return true;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting registration:', error);
        throw new Error('שגיאה במחיקת הרשמה');
      }

      return true;
    } catch (error) {
      console.error('Service error deleting registration:', error);
      throw error instanceof Error ? error : new Error('שגיאה במחיקת הרשמה');
    }
  }

  static async bulkUpdatePaymentStatus(ids: number[], status: PaymentStatus): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(800);
      return true;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .update({ payment_status: status })
        .in('id', ids);

      if (error) {
        console.error('Error bulk updating payment status:', error);
        throw new Error('שגיאה בעדכון סטטוס תשלום');
      }

      return true;
    } catch (error) {
      console.error('Service error bulk updating payment status:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון סטטוס תשלום');
    }
  }

  static async getRegistrationById(id: number): Promise<Registration | null> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(300);
      return mockRegistrations.find(r => r.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          seminar:seminars(title, city, date, time_start)
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching registration:', error);
        throw new Error('שגיאה בטעינת פרטי הרשמה');
      }

      return data;
    } catch (error) {
      console.error('Service error fetching registration:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת פרטי הרשמה');
    }
  }

  static getPaymentStatusLabel(status: PaymentStatus): string {
    const labels = {
      pending: 'ממתין לתשלום',
      paid: 'שולם',
      cancelled: 'בוטל',
      refunded: 'הוחזר'
    };
    return labels[status] || status;
  }

  static getPaymentStatusColor(status: PaymentStatus): string {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }
}