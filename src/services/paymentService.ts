import { 
  PaymentData, 
  PaymentStatus,
  PaymentFormData,
  GreenInvoiceResponse
} from '../types/payment';
import { Seminar } from '../types/seminar';
import { supabase } from '../lib/supabase';

class PaymentService {
  private async callBackendAPI(endpoint: string, data: any): Promise<any> {
    try {
      // Call our backend API through Supabase Edge Functions
      const { data: result, error } = await supabase.functions.invoke(endpoint, {
        body: data
      });

      if (error) {
        throw new Error(error.message);
      }

      return result;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  async createPayment(seminar: Seminar, paymentData: PaymentFormData): Promise<PaymentData> {
    console.log('🔄 PaymentService: Creating payment...', { seminar: seminar.city, participant: paymentData.participantName });
    
    try {
      // This calls our backend Edge Function which handles Green Invoice API
      const result = await this.callBackendAPI('create-payment', {
        seminar: {
          id: seminar.id,
          city: seminar.city,
          date: seminar.date,
          price: this.getCurrentPrice(seminar),
          special_notes: seminar.special_notes,
          payment_deadline: seminar.payment_deadline
        },
        paymentData
      });

      const payment: PaymentData = {
        ...result.payment,
        status: PaymentStatus.PENDING
      };

      console.log('✅ PaymentService: Payment created successfully', payment);
      return payment;
    } catch (error) {
      console.error('❌ PaymentService: Error creating payment:', error);
      throw error;
    }
  }

  async createInvoice(seminar: Seminar, paymentData: PaymentFormData): Promise<GreenInvoiceResponse> {
    console.log('🔄 PaymentService: Creating invoice...', { seminar: seminar.city, participant: paymentData.participantName });
    
    try {
      const result = await this.callBackendAPI('create-invoice', {
        seminar: {
          id: seminar.id,
          city: seminar.city,
          date: seminar.date,
          price: this.getCurrentPrice(seminar),
          special_notes: seminar.special_notes,
          payment_deadline: seminar.payment_deadline
        },
        paymentData
      });

      console.log('✅ PaymentService: Invoice created successfully', result.invoice);
      return result.invoice;
    } catch (error) {
      console.error('❌ PaymentService: Error creating invoice:', error);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<{ status: PaymentStatus; details?: any }> {
    console.log('🔄 PaymentService: Getting payment status...', paymentId);
    
    try {
      const result = await this.callBackendAPI('get-payment-status', { paymentId });
      
      return {
        status: this.mapPaymentStatus(result.status),
        details: result.details
      };
    } catch (error) {
      console.error('❌ PaymentService: Error getting payment status:', error);
      throw error;
    }
  }

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
      const result = await this.callBackendAPI('update-payment-status', {
        paymentId,
        status
      });
      
      console.log('✅ PaymentService: Payment status updated successfully');
      return result.success;
    } catch (error) {
      console.error('❌ PaymentService: Error updating payment status:', error);
      return false;
    }
  }

  async getPaymentData(paymentId: string): Promise<PaymentData | null> {
    try {
      const result = await this.callBackendAPI('get-payment-data', { paymentId });
      return result.payment || null;
    } catch (error) {
      console.error('❌ PaymentService: Error getting payment data:', error);
      return null;
    }
  }

  isConfigured(): boolean {
    return true; // Always true since we use backend
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