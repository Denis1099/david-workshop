import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { NewsletterLead, ContactedStatus, FilterOptions } from '../types/admin';
import { mockNewsletterLeads, simulateApiDelay } from '../data/mockAdmin';

export class NewsletterService {
  static async fetchNewsletterLeads(filters?: FilterOptions): Promise<NewsletterLead[]> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(700);
      let leads = [...mockNewsletterLeads];

      if (filters?.status?.length) {
        leads = leads.filter(l => 
          filters.status!.includes(l.contacted_status)
        );
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        leads = leads.filter(l => 
          l.email.toLowerCase().includes(searchTerm) ||
          (l.name && l.name.toLowerCase().includes(searchTerm)) ||
          (l.phone && l.phone.includes(searchTerm))
        );
      }

      if (filters?.dateRange) {
        leads = leads.filter(l => {
          const date = l.date_added.split('T')[0];
          return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
        });
      }

      return leads.sort((a, b) => 
        new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
      );
    }

    try {
      let query = supabase
        .from('newsletter_leads')
        .select('*')
        .order('date_added', { ascending: false });

      if (filters?.status?.length) {
        query = query.in('contacted_status', filters.status);
      }

      if (filters?.search) {
        query = query.or(`email.ilike.%${filters.search}%,name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
      }

      if (filters?.dateRange) {
        query = query
          .gte('date_added', filters.dateRange.from)
          .lte('date_added', filters.dateRange.to);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching newsletter leads:', error);
        throw new Error('שגיאה בטעינת רשימת התפוצה');
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching newsletter leads:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת רשימת התפוצה');
    }
  }

  static async updateContactedStatus(id: number, status: ContactedStatus): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return true;
    }

    try {
      const { error } = await supabase
        .from('newsletter_leads')
        .update({ contacted_status: status })
        .eq('id', id);

      if (error) {
        console.error('Error updating contacted status:', error);
        throw new Error('שגיאה בעדכון סטטוס יצירת קשר');
      }

      return true;
    } catch (error) {
      console.error('Service error updating contacted status:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון סטטוס יצירת קשר');
    }
  }

  static async createNewsletterLead(lead: Omit<NewsletterLead, 'id'>): Promise<NewsletterLead> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(600);
      const newLead: NewsletterLead = {
        id: Math.max(...mockNewsletterLeads.map(l => l.id)) + 1,
        ...lead
      };
      return newLead;
    }

    try {
      const { data, error } = await supabase
        .from('newsletter_leads')
        .insert(lead)
        .select()
        .single();

      if (error) {
        console.error('Error creating newsletter lead:', error);
        throw new Error('שגיאה ביצירת מנוי');
      }

      return data;
    } catch (error) {
      console.error('Service error creating newsletter lead:', error);
      throw error instanceof Error ? error : new Error('שגיאה ביצירת מנוי');
    }
  }

  static async deleteNewsletterLead(id: number): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return true;
    }

    try {
      const { error } = await supabase
        .from('newsletter_leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting newsletter lead:', error);
        throw new Error('שגיאה במחיקת מנוי');
      }

      return true;
    } catch (error) {
      console.error('Service error deleting newsletter lead:', error);
      throw error instanceof Error ? error : new Error('שגיאה במחיקת מנוי');
    }
  }

  static async bulkUpdateContactedStatus(ids: number[], status: ContactedStatus): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(800);
      return true;
    }

    try {
      const { error } = await supabase
        .from('newsletter_leads')
        .update({ contacted_status: status })
        .in('id', ids);

      if (error) {
        console.error('Error bulk updating contacted status:', error);
        throw new Error('שגיאה בעדכון סטטוס יצירת קשר');
      }

      return true;
    } catch (error) {
      console.error('Service error bulk updating contacted status:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון סטטוס יצירת קשר');
    }
  }

  static async getNewsletterLeadById(id: number): Promise<NewsletterLead | null> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(300);
      return mockNewsletterLeads.find(l => l.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('newsletter_leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching newsletter lead:', error);
        throw new Error('שגיאה בטעינת פרטי מנוי');
      }

      return data;
    } catch (error) {
      console.error('Service error fetching newsletter lead:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת פרטי מנוי');
    }
  }

  static getContactedStatusLabel(status: ContactedStatus): string {
    const labels = {
      not_contacted: 'לא נוצר קשר',
      contacted: 'נוצר קשר',
      responded: 'הגיב',
      unsubscribed: 'ביטל מנוי'
    };
    return labels[status] || status;
  }

  static getContactedStatusColor(status: ContactedStatus): string {
    const colors = {
      not_contacted: 'bg-gray-100 text-gray-800',
      contacted: 'bg-blue-100 text-blue-800',
      responded: 'bg-green-100 text-green-800',
      unsubscribed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }
}