import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { Seminar, SeminarFilters } from '../types/seminar';
import { mockUpcomingSeminars, mockPastSeminars, simulateApiDelay } from '../data/mockSeminars';

export class SeminarsService {
  /**
   * Fetch upcoming seminars (active status, future dates)
   * Sorted by date (earliest first)
   */
  static async fetchUpcomingSeminars(filters?: SeminarFilters): Promise<Seminar[]> {
    // Use mock data if Supabase is not configured
    if (!hasSupabaseConfig) {
      await simulateApiDelay(800);
      let seminars = mockUpcomingSeminars.filter(seminar => 
        seminar.status === 'active' || seminar.status === 'sold_out'
      );

      // Apply filters if provided
      if (filters?.city) {
        seminars = seminars.filter(seminar => seminar.city === filters.city);
      }

      if (filters?.dateFrom) {
        seminars = seminars.filter(seminar => seminar.date >= filters.dateFrom!);
      }

      if (filters?.dateTo) {
        seminars = seminars.filter(seminar => seminar.date <= filters.dateTo!);
      }

      return seminars.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    try {
      let query = supabase
        .from('seminars')
        .select('*')
        .eq('status', 'active')
        .gte('date', new Date().toISOString().split('T')[0]) // Future dates only
        .order('date', { ascending: true })
        .order('time_start', { ascending: true });

      // Apply filters if provided
      if (filters?.city) {
        query = query.eq('city', filters.city);
      }

      if (filters?.dateFrom) {
        query = query.gte('date', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('date', filters.dateTo);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching upcoming seminars:', error);
        throw new Error('שגיאה בטעינת הסדנאות הקרובות');
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching upcoming seminars:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת הסדנאות');
    }
  }

  /**
   * Fetch past seminars (completed status)
   * Limited number, sorted by date (newest first)
   */
  static async fetchPastSeminars(limit: number = 3): Promise<Seminar[]> {
    // Use mock data if Supabase is not configured
    if (!hasSupabaseConfig) {
      await simulateApiDelay(500);
      return mockPastSeminars
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .eq('status', 'completed')
        .order('date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching past seminars:', error);
        throw new Error('שגיאה בטעינת הסדנאות שהסתיימו');
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching past seminars:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת הסדנאות');
    }
  }

  /**
   * Get a single seminar by ID
   */
  static async getSeminarById(id: number): Promise<Seminar | null> {
    // Use mock data if Supabase is not configured
    if (!hasSupabaseConfig) {
      await simulateApiDelay(300);
      const allSeminars = [...mockUpcomingSeminars, ...mockPastSeminars];
      return allSeminars.find(seminar => seminar.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Error fetching seminar by ID:', error);
        throw new Error('שגיאה בטעינת פרטי הסדנה');
      }

      return data;
    } catch (error) {
      console.error('Service error fetching seminar by ID:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת פרטי הסדנה');
    }
  }

  /**
   * Get seminars for homepage display
   * Returns the next few upcoming seminars
   */
  static async getHomepageSeminars(limit: number = 3): Promise<Seminar[]> {
    // Use mock data if Supabase is not configured
    if (!hasSupabaseConfig) {
      console.log('📦 SeminarsService: Using mock data for homepage seminars (Supabase not configured)');
      await simulateApiDelay(400);
      const result = mockUpcomingSeminars
        .filter(seminar => seminar.status === 'active')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, limit);
      console.log(`📦 SeminarsService: Returning ${result.length} mock seminars for homepage`);
      return result;
    }

    try {
      console.log('🔗 SeminarsService: Fetching homepage seminars from Supabase');
      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .eq('status', 'active')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .order('time_start', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('❌ SeminarsService: Error fetching homepage seminars from Supabase:', error);
        throw new Error('שגיאה בטעינת הסדנאות');
      }

      console.log(`✅ SeminarsService: Successfully fetched ${data?.length || 0} seminars from Supabase`);
      return data || [];
    } catch (error) {
      console.error('❌ SeminarsService: Service error fetching homepage seminars:', error);
      // Return empty array for homepage to fail gracefully
      return [];
    }
  }

  /**
   * Get all cities with upcoming seminars
   * Useful for filter dropdowns
   */
  static async getAvailableCities(): Promise<string[]> {
    // Use mock data if Supabase is not configured
    if (!hasSupabaseConfig) {
      await simulateApiDelay(200);
      const cities = mockUpcomingSeminars
        .filter(seminar => seminar.status === 'active')
        .map(seminar => seminar.city);
      const uniqueCities = Array.from(new Set(cities));
      return uniqueCities.sort();
    }

    try {
      const { data, error } = await supabase
        .from('seminars')
        .select('city')
        .eq('status', 'active')
        .gte('date', new Date().toISOString().split('T')[0]);

      if (error) {
        console.error('Error fetching available cities:', error);
        return [];
      }

      // Get unique cities
      const cities = data?.map(item => item.city) || [];
      const uniqueCities = Array.from(new Set(cities));
      return uniqueCities.sort();
    } catch (error) {
      console.error('Service error fetching available cities:', error);
      return [];
    }
  }

  /**
   * Update seminar participant count
   * Used when someone registers
   */
  static async updateParticipantCount(id: number, newCount: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('seminars')
        .update({ 
          current_participants: newCount,
          // Auto-update status if full
          status: newCount >= 15 ? 'sold_out' : 'active'
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating participant count:', error);
        throw new Error('שגיאה בעדכון מספר המשתתפים');
      }

      return true;
    } catch (error) {
      console.error('Service error updating participant count:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון הרשמה');
    }
  }

  /**
   * Check if seminar is still available for registration
   */
  static isAvailableForRegistration(seminar: Seminar): boolean {
    if (seminar.status !== 'active') return false;
    if (seminar.current_participants >= seminar.max_participants) return false;
    
    // Check if date hasn't passed
    const seminarDate = new Date(seminar.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return seminarDate >= today;
  }

  /**
   * Get availability status for UI display
   */
  static getAvailabilityInfo(seminar: Seminar) {
    const spotsLeft = seminar.max_participants - seminar.current_participants;
    
    if (seminar.status === 'cancelled') {
      return { status: 'cancelled', spotsLeft: 0, message: 'בוטל' };
    }
    
    if (seminar.status === 'sold_out' || spotsLeft <= 0) {
      return { status: 'sold_out', spotsLeft: 0, message: 'אזל המלאי' };
    }
    
    if (spotsLeft <= 3) {
      return { 
        status: 'almost_full', 
        spotsLeft, 
        message: `נותרו ${spotsLeft} מקומות בלבד!` 
      };
    }
    
    return { 
      status: 'available', 
      spotsLeft, 
      message: `נותרו ${spotsLeft} מקומות` 
    };
  }

  // Admin CRUD Operations
  
  /**
   * Fetch all seminars for admin (all statuses)
   */
  static async fetchAllSeminars(filters?: SeminarFilters): Promise<Seminar[]> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(700);
      let seminars = [...mockUpcomingSeminars, ...mockPastSeminars];

      if (filters?.status?.length) {
        seminars = seminars.filter(s => filters.status!.includes(s.status));
      }

      if (filters?.city) {
        seminars = seminars.filter(s => s.city === filters.city);
      }

      if (filters?.dateFrom) {
        seminars = seminars.filter(s => s.date >= filters.dateFrom!);
      }

      if (filters?.dateTo) {
        seminars = seminars.filter(s => s.date <= filters.dateTo!);
      }

      return seminars.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    try {
      let query = supabase
        .from('seminars')
        .select('*')
        .order('date', { ascending: false });

      if (filters?.status?.length) {
        query = query.in('status', filters.status);
      }

      if (filters?.city) {
        query = query.eq('city', filters.city);
      }

      if (filters?.dateFrom) {
        query = query.gte('date', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('date', filters.dateTo);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching all seminars:', error);
        throw new Error('שגיאה בטעינת הסדנאות');
      }

      return data || [];
    } catch (error) {
      console.error('Service error fetching all seminars:', error);
      throw error instanceof Error ? error : new Error('שגיאה בטעינת הסדנאות');
    }
  }

  /**
   * Create a new seminar
   */
  static async createSeminar(seminar: Omit<Seminar, 'id' | 'created_at'>): Promise<Seminar> {
    if (!hasSupabaseConfig) {
      console.log('📦 SeminarsService: Creating seminar with mock data (Supabase not configured)');
      console.log('📦 Note: This seminar will not persist and will not appear on public pages');
      await simulateApiDelay(600);
      const newSeminar: Seminar = {
        id: Math.max(...mockUpcomingSeminars.map(s => s.id)) + 1,
        ...seminar,
        created_at: new Date().toISOString()
      };
      console.log(`📦 SeminarsService: Created mock seminar with ID ${newSeminar.id} (status: ${newSeminar.status})`);
      return newSeminar;
    }

    try {
      console.log('🔗 SeminarsService: Creating seminar in Supabase');
      console.log(`🔗 Seminar details: ${seminar.city}, ${seminar.date}, status: ${seminar.status}`);
      const { data, error } = await supabase
        .from('seminars')
        .insert({
          ...seminar,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('❌ SeminarsService: Error creating seminar in Supabase:', error);
        throw new Error('שגיאה ביצירת סדנה');
      }

      console.log(`✅ SeminarsService: Successfully created seminar with ID ${data.id} (status: ${data.status})`);
      if (data.status === 'active') {
        console.log('✅ This seminar will appear on public pages immediately');
      } else {
        console.log(`⚠️ This seminar has status '${data.status}' and will not appear on public pages`);
      }
      return data;
    } catch (error) {
      console.error('❌ SeminarsService: Service error creating seminar:', error);
      throw error instanceof Error ? error : new Error('שגיאה ביצירת סדנה');
    }
  }

  /**
   * Update a seminar
   */
  static async updateSeminar(id: number, updates: Partial<Seminar>): Promise<Seminar> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(500);
      const allSeminars = [...mockUpcomingSeminars, ...mockPastSeminars];
      const seminar = allSeminars.find(s => s.id === id);
      if (!seminar) {
        throw new Error('סדנה לא נמצאה');
      }
      return { ...seminar, ...updates };
    }

    try {
      const { data, error } = await supabase
        .from('seminars')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating seminar:', error);
        throw new Error('שגיאה בעדכון סדנה');
      }

      return data;
    } catch (error) {
      console.error('Service error updating seminar:', error);
      throw error instanceof Error ? error : new Error('שגיאה בעדכון סדנה');
    }
  }

  /**
   * Delete a seminar
   */
  static async deleteSeminar(id: number): Promise<boolean> {
    if (!hasSupabaseConfig) {
      await simulateApiDelay(400);
      return true;
    }

    try {
      const { error } = await supabase
        .from('seminars')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting seminar:', error);
        throw new Error('שגיאה במחיקת סדנה');
      }

      return true;
    } catch (error) {
      console.error('Service error deleting seminar:', error);
      throw error instanceof Error ? error : new Error('שגיאה במחיקת סדנה');
    }
  }

  /**
   * Duplicate a seminar
   */
  static async duplicateSeminar(id: number): Promise<Seminar> {
    const seminar = await this.getSeminarById(id);
    if (!seminar) {
      throw new Error('סדנה לא נמצאה');
    }

    const duplicatedSeminar = {
      ...seminar,
      title: seminar.title ? `${seminar.title} (עותק)` : undefined,
      status: 'draft' as const,
      current_participants: 0
    };

    delete (duplicatedSeminar as any).id;
    delete (duplicatedSeminar as any).created_at;

    return this.createSeminar(duplicatedSeminar);
  }

  /**
   * Get status label in Hebrew
   */
  static getStatusLabel(status: string): string {
    const labels = {
      'active': 'פעיל',
      'draft': 'טיוטה',
      'sold_out': 'אזל המלאי',
      'cancelled': 'בוטל',
      'completed': 'הושלם'
    };
    return labels[status as keyof typeof labels] || status;
  }

  /**
   * Get status color class
   */
  static getStatusColor(status: string): string {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'sold_out': 'bg-red-100 text-red-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }
}

export default SeminarsService;