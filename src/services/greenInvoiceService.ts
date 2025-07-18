import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  GreenInvoiceCreateRequest, 
  GreenInvoiceResponse, 
  PaymentData, 
  PaymentError, 
  PaymentStatus,
  PaymentFormData 
} from '../types/payment';
import { Seminar } from '../types/seminar';
import mockPaymentService from './mockPaymentService';

class GreenInvoiceService {
  private api: AxiosInstance;
  private apiKey: string;
  private secret: string;
  private environment: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_GREEN_INVOICE_API_KEY || '';
    this.secret = process.env.REACT_APP_GREEN_INVOICE_SECRET || '';
    this.environment = process.env.REACT_APP_GREEN_INVOICE_ENVIRONMENT || 'production';
    
    const baseURL = process.env.REACT_APP_GREEN_INVOICE_API_URL || 'https://api.greeninvoice.co.il/api/v1';
    
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use(
      (config) => {
        // Add timestamp and signature for authentication
        const timestamp = Date.now().toString();
        config.headers['X-TIMESTAMP'] = timestamp;
        
        // In a real implementation, you would create a proper signature
        // For now, we'll use the secret as-is (replace with proper HMAC signature)
        config.headers['X-SIGNATURE'] = this.createSignature(timestamp, config.data);
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const paymentError: PaymentError = {
          code: error.response?.status?.toString() || 'NETWORK_ERROR',
          message: error.response?.data?.message || error.message || 'Payment service communication error',
          details: error.response?.data || {}
        };
        return Promise.reject(paymentError);
      }
    );
  }

  private createSignature(timestamp: string, data: any): string {
    // Create a simple signature without Hebrew characters to avoid ISO-8859-1 issues
    // In a real implementation, create HMAC-SHA256 signature
    try {
      const dataString = data ? JSON.stringify(data) : '';
      // Remove Hebrew characters and create a simple hash
      const cleanString = dataString.replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters
      const simpleHash = cleanString.substring(0, 20);
      return `${this.secret}_${timestamp}_${simpleHash}`.substring(0, 50);
    } catch (error) {
      console.error('Error creating signature:', error);
      return `${this.secret}_${timestamp}_fallback`.substring(0, 50);
    }
  }

  async createInvoice(
    seminar: Seminar, 
    paymentData: PaymentFormData
  ): Promise<GreenInvoiceResponse> {
    try {
      // Try Edge Function first
      const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6c3p5d3J6eGZja2h4dXR4dXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDI1NDgsImV4cCI6MjA2ODA3ODU0OH0.0le9YFoIaw0kIkzP_yQyUfV2uyFHUo2MQHOeToulbFM';
      const response = await fetch('https://czszywrzxfckhxutxuqj.supabase.co/functions/v1/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          seminar: {
            id: seminar.id,
            city: seminar.city,
            date: seminar.date,
            price: this.getCurrentPrice(seminar),
            special_notes: seminar.special_notes,
            payment_deadline: seminar.payment_deadline
          },
          paymentData
        })
      });

      if (!response.ok) {
        throw new Error('Edge Function failed');
      }

      const result = await response.json();
      return result.invoice;
    } catch (error) {
      console.warn('🔄 Green Invoice API failed, falling back to mock service:', error);
      // Fallback to mock service
      return await mockPaymentService.createInvoice(seminar, paymentData);
    }
  }

  async getInvoiceStatus(invoiceId: string): Promise<GreenInvoiceResponse> {
    try {
      const response: AxiosResponse<GreenInvoiceResponse> = await this.api.get(`/documents/${invoiceId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting invoice status:', error);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<{ status: PaymentStatus; details?: any }> {
    try {
      const response = await this.api.get(`/payments/${paymentId}`);
      const paymentData = response.data;
      
      // Map Green Invoice payment statuses to our PaymentStatus enum
      const status = this.mapPaymentStatus(paymentData.status);
      
      return {
        status,
        details: paymentData
      };
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  private mapPaymentStatus(greenInvoiceStatus: string): PaymentStatus {
    switch (greenInvoiceStatus?.toLowerCase()) {
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

  async cancelInvoice(invoiceId: string): Promise<boolean> {
    try {
      await this.api.delete(`/documents/${invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error cancelling invoice:', error);
      return false;
    }
  }

  async createPayment(seminar: Seminar, paymentData: PaymentFormData): Promise<PaymentData> {
    try {
      // Try Edge Function first
      const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6c3p5d3J6eGZja2h4dXR4dXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDI1NDgsImV4cCI6MjA2ODA3ODU0OH0.0le9YFoIaw0kIkzP_yQyUfV2uyFHUo2MQHOeToulbFM';
      const response = await fetch('https://czszywrzxfckhxutxuqj.supabase.co/functions/v1/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          seminar: {
            id: seminar.id,
            city: seminar.city,
            date: seminar.date,
            price: this.getCurrentPrice(seminar),
            special_notes: seminar.special_notes,
            payment_deadline: seminar.payment_deadline
          },
          paymentData
        })
      });

      if (!response.ok) {
        throw new Error('Edge Function failed');
      }

      const result = await response.json();
      const payment: PaymentData = {
        ...result.payment,
        status: PaymentStatus.PENDING,
        invoice: result.invoice
      };

      this.storePaymentData(payment);
      return payment;
    } catch (error) {
      console.warn('🔄 Green Invoice API failed, falling back to mock service:', error);
      // Fallback to mock service
      return await mockPaymentService.createPayment(seminar, paymentData);
    }
  }

  storePaymentData(payment: PaymentData): void {
    try {
      // In a real implementation, store this in your database
      // For now, we'll store it in localStorage for demo purposes
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      
      // Create a clean serializable object to avoid React errors
      const serializablePayment = {
        id: payment.id,
        seminarId: payment.seminarId,
        participantName: payment.participantName,
        participantEmail: payment.participantEmail,
        participantPhone: payment.participantPhone,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        greenInvoiceId: payment.greenInvoiceId,
        invoiceNumber: payment.invoiceNumber,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt
      };
      
      existingPayments.push(serializablePayment);
      localStorage.setItem('payments', JSON.stringify(existingPayments));
    } catch (error) {
      console.error('Error storing payment data:', error);
    }
  }

  async getPaymentData(paymentId: string): Promise<PaymentData | null> {
    try {
      // In a real implementation, fetch from your database
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      return payments.find((p: PaymentData) => p.id === paymentId) || null;
    } catch (error) {
      console.error('Error getting payment data:', error);
      return null;
    }
  }

  async updatePaymentStatus(paymentId: string, status: PaymentStatus, details?: any): Promise<boolean> {
    try {
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      const paymentIndex = payments.findIndex((p: PaymentData) => p.id === paymentId);
      
      if (paymentIndex === -1) {
        return false;
      }

      payments[paymentIndex].status = status;
      payments[paymentIndex].updatedAt = new Date().toISOString();
      
      if (status === PaymentStatus.COMPLETED) {
        payments[paymentIndex].paidAt = new Date().toISOString();
      } else if (status === PaymentStatus.FAILED) {
        payments[paymentIndex].failedAt = new Date().toISOString();
        payments[paymentIndex].failureReason = details?.reason || 'Unknown error';
      }

      localStorage.setItem('payments', JSON.stringify(payments));
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.secret);
  }

  getEnvironment(): string {
    return this.environment;
  }
}

const greenInvoiceService = new GreenInvoiceService();
export default greenInvoiceService;