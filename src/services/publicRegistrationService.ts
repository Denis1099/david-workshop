import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { AdminService } from './adminService';

export interface PublicRegistrationData {
  seminar_id: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export class PublicRegistrationService {
  /**
   * Submit a new registration from the public website
   */
  static async submitRegistration(data: PublicRegistrationData): Promise<{ success: boolean; message: string }> {
    try {
      if (!hasSupabaseConfig) {
        // Fallback for demo purposes
        console.log('Registration submitted (demo mode):', data);
        return {
          success: true,
          message: 'ההרשמה נשמרה בהצלחה! (מצב הדגמה)'
        };
      }

      // Check if seminar exists and has available spots
      const { data: seminar, error: seminarError } = await supabase
        .from('seminars')
        .select('*')
        .eq('id', data.seminar_id)
        .eq('status', 'active')
        .single();

      if (seminarError || !seminar) {
        return {
          success: false,
          message: 'הסדנה לא נמצאה או אינה פעילה'
        };
      }

      if (seminar.current_participants >= seminar.max_participants) {
        return {
          success: false,
          message: 'הסדנה מלאה - אין מקומות פנויים'
        };
      }

      // Check if email already registered for this seminar
      const { data: existingRegistration } = await supabase
        .from('registrations')
        .select('id')
        .eq('seminar_id', data.seminar_id)
        .eq('email', data.email)
        .single();

      if (existingRegistration) {
        return {
          success: false,
          message: 'כתובת האימייל כבר רשומה לסדנה זו'
        };
      }

      // Create registration
      const { data: registration, error: registrationError } = await supabase
        .from('registrations')
        .insert({
          seminar_id: data.seminar_id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
          payment_status: 'pending',
          amount: seminar.price
        })
        .select()
        .single();

      if (registrationError) {
        console.error('Registration error:', registrationError);
        return {
          success: false,
          message: 'שגיאה בשמירת ההרשמה. נסה שוב.'
        };
      }

      // Update seminar participant count
      const { error: updateError } = await supabase
        .from('seminars')
        .update({ 
          current_participants: seminar.current_participants + 1,
          // Auto-update status if full
          status: (seminar.current_participants + 1) >= seminar.max_participants ? 'sold_out' : 'active'
        })
        .eq('id', data.seminar_id);

      if (updateError) {
        console.error('Update seminar error:', updateError);
      }

      // Log activity
      await AdminService.logActivity(
        'registration',
        `רישום חדש: ${data.name} לסדנה ב${seminar.city}`,
        { registration_id: registration.id, seminar_id: data.seminar_id }
      );

      return {
        success: true,
        message: `ההרשמה נשמרה בהצלחה! מספר הרשמה: ${registration.id}. נציג יצור עמך קשר בקרוב.`
      };

    } catch (error) {
      console.error('Registration service error:', error);
      return {
        success: false,
        message: 'שגיאה בהרשמה. נסה שוב או צור קשר טלפונית.'
      };
    }
  }

  /**
   * Submit newsletter subscription
   */
  static async submitNewsletterSignup(email: string, name?: string, phone?: string, source: string = 'website'): Promise<{ success: boolean; message: string }> {
    try {
      if (!hasSupabaseConfig) {
        console.log('Newsletter signup (demo mode):', { email, name, phone, source });
        return {
          success: true,
          message: 'נרשמת בהצלחה לרשימת התפוצה! (מצב הדגמה)'
        };
      }

      // Check if email already exists
      const { data: existingLead } = await supabase
        .from('newsletter_leads')
        .select('id, contacted_status')
        .eq('email', email)
        .single();

      if (existingLead) {
        if (existingLead.contacted_status === 'unsubscribed') {
          // Resubscribe
          await supabase
            .from('newsletter_leads')
            .update({ 
              contacted_status: 'not_contacted',
              date_added: new Date().toISOString(),
              name: name || null,
              phone: phone || null,
              source
            })
            .eq('id', existingLead.id);

          return {
            success: true,
            message: 'נרשמת מחדש לרשימת התפוצה בהצלחה!'
          };
        } else {
          return {
            success: false,
            message: 'כתובת האימייל כבר רשומה ברשימת התפוצה'
          };
        }
      }

      // Create new newsletter lead
      const { data: lead, error } = await supabase
        .from('newsletter_leads')
        .insert({
          email,
          name: name || null,
          phone: phone || null,
          source,
          contacted_status: 'not_contacted'
        })
        .select()
        .single();

      if (error) {
        console.error('Newsletter signup error:', error);
        return {
          success: false,
          message: 'שגיאה בהרשמה לרשימת התפוצה. נסה שוב.'
        };
      }

      // Log activity
      await AdminService.logActivity(
        'newsletter',
        `מנוי חדש: ${email}`,
        { lead_id: lead.id }
      );

      return {
        success: true,
        message: 'נרשמת בהצלחה לרשימת התפוצה! תקבל עדכונים על סדנאות חדשות.'
      };

    } catch (error) {
      console.error('Newsletter service error:', error);
      return {
        success: false,
        message: 'שגיאה בהרשמה לרשימת התפוצה. נסה שוב.'
      };
    }
  }
}