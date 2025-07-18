import { supabase } from '../lib/supabase';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

interface PaymentConfirmationData {
  participantName: string;
  seminarTitle: string;
  seminarDate: string;
  amount: number;
  invoiceUrl?: string;
}

class SupabaseEmailService {
  async sendContactFormNotification(data: ContactFormData): Promise<void> {
    try {
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'contact_form',
          to: 'liftvinov.media@gmail.com',
          data: data
        }
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to send admin notification');
      }

      console.log('✅ Admin notification sent successfully');
    } catch (error) {
      console.error('❌ Failed to send admin notification:', error);
      throw error;
    }
  }

  async sendContactFormAutoReply(email: string, name: string): Promise<void> {
    try {
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'contact_form',
          to: email,
          data: {
            name: name,
            email: email,
            phone: '',
            message: `תודה על פנייתך ${name}! הודעתך התקבלה בהצלחה ואנו נחזור אליך בהקדם האפשרי.`
          }
        }
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to send auto-reply');
      }

      console.log('✅ Auto-reply sent successfully');
    } catch (error) {
      console.error('❌ Failed to send auto-reply:', error);
      throw error;
    }
  }

  async sendPaymentConfirmation(email: string, data: PaymentConfirmationData): Promise<void> {
    try {
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'payment_confirmation',
          to: email,
          data: data
        }
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to send payment confirmation');
      }

      console.log('✅ Payment confirmation sent successfully');
    } catch (error) {
      console.error('❌ Failed to send payment confirmation:', error);
      throw error;
    }
  }

  async sendPaymentFailureNotification(email: string, data: any): Promise<void> {
    try {
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'payment_failure',
          to: email,
          data: data
        }
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to send payment failure notification');
      }

      console.log('✅ Payment failure notification sent successfully');
    } catch (error) {
      console.error('❌ Failed to send payment failure notification:', error);
      throw error;
    }
  }
}

const supabaseEmailService = new SupabaseEmailService();
export default supabaseEmailService;