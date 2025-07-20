import { 
  PaymentData, 
  PaymentStatus,
  PaymentFormData
} from '../types/payment';
import { Seminar } from '../types/seminar';
import { supabase } from '../lib/supabase';

class PaymentService {
  // Green Invoice API methods removed - using external payment links instead
  
  private mapPaymentStatus(status: string): PaymentStatus {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return PaymentStatus.COMPLETED;
      case 'pending':
        return PaymentStatus.PENDING;
      case 'processing':
        return PaymentStatus.PROCESSING;
      case 'failed':
        return PaymentStatus.FAILED;
      case 'cancelled':
        return PaymentStatus.CANCELLED;
      case 'refunded':
        return PaymentStatus.REFUNDED;
      default:
        return PaymentStatus.PENDING;
    }
  }

  getCurrentPrice(seminar: Seminar): number {
    const now = new Date();
    const earlyBirdDeadline = seminar.early_bird_deadline ? new Date(seminar.early_bird_deadline) : null;
    
    if (earlyBirdDeadline && now <= earlyBirdDeadline && seminar.early_bird_price) {
      return seminar.early_bird_price;
    }
    
    return seminar.price;
  }

  async updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<boolean> {
    console.log('🔄 PaymentService: Updating payment status...', { paymentId, status });
    
    try {
      const { error } = await supabase
        .from('payments')
        .update({
          status: status,
          updated_at: new Date().toISOString(),
          ...(status === PaymentStatus.COMPLETED && { paid_at: new Date().toISOString() }),
          ...(status === PaymentStatus.FAILED && { failed_at: new Date().toISOString() })
        })
        .eq('id', paymentId);
      
      if (error) {
        console.error('❌ PaymentService: Database error updating payment status:', error);
        return false;
      }
      
      console.log('✅ PaymentService: Payment status updated successfully');
      return true;
    } catch (error) {
      console.error('❌ PaymentService: Error updating payment status:', error);
      return false;
    }
  }

  async getPaymentData(paymentId: string): Promise<PaymentData | null> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (error) {
        console.error('❌ PaymentService: Error getting payment data:', error);
        return null;
      }

      return {
        id: data.id,
        seminarId: data.seminar_id,
        participantName: data.participant_name,
        participantEmail: data.participant_email,
        participantPhone: data.participant_phone,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        greenInvoiceId: data.green_invoice_id,
        invoiceNumber: data.invoice_number,
        paymentMethod: data.payment_method,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        paidAt: data.paid_at,
        failedAt: data.failed_at,
        failureReason: data.failure_reason
      };
    } catch (error) {
      console.error('❌ PaymentService: Error getting payment data:', error);
      return null;
    }
  }

  isConfigured(): boolean {
    return true; // External payment links are always available
  }

  getEnvironment(): string {
    return process.env.NODE_ENV || 'development';
  }

  // Store payment in Supabase database
  async storePayment(payment: PaymentData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('payments')
        .insert([{
          id: payment.id,
          seminar_id: payment.seminarId,
          participant_name: payment.participantName,
          participant_email: payment.participantEmail,
          participant_phone: payment.participantPhone,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          green_invoice_id: payment.greenInvoiceId,
          invoice_number: payment.invoiceNumber,
          payment_method: payment.paymentMethod,
          created_at: payment.createdAt,
          updated_at: payment.updatedAt,
          paid_at: payment.paidAt,
          failed_at: payment.failedAt,
          failure_reason: payment.failureReason
        }]);

      if (error) {
        console.error('Error storing payment:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error storing payment:', error);
      return false;
    }
  }

  // Get payments from Supabase database
  async getPayments(): Promise<PaymentData[]> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        return [];
      }

      return data.map(payment => ({
        id: payment.id,
        seminarId: payment.seminar_id,
        participantName: payment.participant_name,
        participantEmail: payment.participant_email,
        participantPhone: payment.participant_phone,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        greenInvoiceId: payment.green_invoice_id,
        invoiceNumber: payment.invoice_number,
        paymentMethod: payment.payment_method,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
        paidAt: payment.paid_at,
        failedAt: payment.failed_at,
        failureReason: payment.failure_reason
      }));
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;