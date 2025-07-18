import { 
  PaymentData, 
  PaymentStatus,
  PaymentFormData,
  GreenInvoiceResponse
} from '../types/payment';
import { Seminar } from '../types/seminar';

class MockPaymentService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createInvoice(
    seminar: Seminar, 
    paymentData: PaymentFormData
  ): Promise<GreenInvoiceResponse> {
    console.log('🔄 MockPaymentService: Creating invoice...', { seminar: seminar.city, participant: paymentData.participantName });
    
    // Simulate API delay
    await this.delay(1000);
    
    const currentPrice = this.getCurrentPrice(seminar);
    
    // Simulate successful invoice creation
    const invoice: GreenInvoiceResponse = {
      id: `invoice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      number: `INV-${Date.now()}`,
      url: `https://mockpayment.example.com/invoice/${Date.now()}`,
      urlDirect: `https://mockpayment.example.com/pay/${Date.now()}`,
      sum: currentPrice,
      currency: 'ILS',
      date: new Date().toISOString(),
      dueDate: seminar.date,
      status: 'pending',
      client: {
        id: `client_${Date.now()}`,
        name: paymentData.participantName,
        email: paymentData.participantEmail,
        phone: paymentData.participantPhone
      },
      paymentRequest: {
        id: `payment_req_${Date.now()}`,
        sum: currentPrice,
        currency: 'ILS',
        status: 'pending',
        paymentUrl: `https://mockpayment.example.com/pay/${Date.now()}`
      }
    };
    
    console.log('✅ MockPaymentService: Invoice created successfully', invoice);
    return invoice;
  }

  async createPayment(seminar: Seminar, paymentData: PaymentFormData): Promise<PaymentData> {
    console.log('🔄 MockPaymentService: Creating payment...', { seminar: seminar.city, participant: paymentData.participantName });
    
    try {
      // Create invoice first
      const invoice = await this.createInvoice(seminar, paymentData);
      
      // Create payment record
      const payment: PaymentData = {
        id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        seminarId: seminar.id.toString(),
        participantName: paymentData.participantName,
        participantEmail: paymentData.participantEmail,
        participantPhone: paymentData.participantPhone,
        amount: this.getCurrentPrice(seminar),
        currency: 'ILS',
        status: PaymentStatus.PENDING,
        greenInvoiceId: invoice.id,
        invoiceNumber: invoice.number,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store payment data in localStorage for demo
      this.storePaymentData(payment);
      
      console.log('✅ MockPaymentService: Payment created successfully', payment);
      return payment;
    } catch (error) {
      console.error('❌ MockPaymentService: Error creating payment:', error);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string): Promise<{ status: PaymentStatus; details?: any }> {
    console.log('🔄 MockPaymentService: Getting payment status...', paymentId);
    
    await this.delay(500);
    
    // Simulate different payment statuses
    const statuses = [PaymentStatus.PENDING, PaymentStatus.COMPLETED, PaymentStatus.FAILED];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: randomStatus,
      details: {
        mockResponse: true,
        timestamp: new Date().toISOString(),
        paymentId
      }
    };
  }

  async updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<boolean> {
    console.log('🔄 MockPaymentService: Updating payment status...', { paymentId, status });
    
    await this.delay(300);
    
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
      }

      localStorage.setItem('payments', JSON.stringify(payments));
      console.log('✅ MockPaymentService: Payment status updated successfully');
      return true;
    } catch (error) {
      console.error('❌ MockPaymentService: Error updating payment status:', error);
      return false;
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

  private storePaymentData(payment: PaymentData): void {
    const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    existingPayments.push(payment);
    localStorage.setItem('payments', JSON.stringify(existingPayments));
  }

  async getPaymentData(paymentId: string): Promise<PaymentData | null> {
    try {
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      return payments.find((p: PaymentData) => p.id === paymentId) || null;
    } catch (error) {
      console.error('❌ MockPaymentService: Error getting payment data:', error);
      return null;
    }
  }

  isConfigured(): boolean {
    return true; // Mock service is always "configured"
  }

  getEnvironment(): string {
    return 'mock';
  }

  // Simulate webhook processing
  async simulateWebhookEvent(eventType: string, paymentId: string): Promise<boolean> {
    console.log('🔄 MockPaymentService: Simulating webhook event...', { eventType, paymentId });
    
    await this.delay(500);
    
    switch (eventType) {
      case 'payment/received':
        await this.updatePaymentStatus(paymentId, PaymentStatus.COMPLETED);
        break;
      case 'payment/failed':
        await this.updatePaymentStatus(paymentId, PaymentStatus.FAILED);
        break;
      case 'payment/cancelled':
        await this.updatePaymentStatus(paymentId, PaymentStatus.CANCELLED);
        break;
      default:
        console.warn('Unknown webhook event type:', eventType);
    }
    
    console.log('✅ MockPaymentService: Webhook event processed');
    return true;
  }
}

const mockPaymentService = new MockPaymentService();
export default mockPaymentService;