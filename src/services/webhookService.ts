import { WebhookPayload, PaymentStatus } from '../types/payment';
import { supabase } from '../lib/supabase';
import supabaseEmailService from './supabaseEmailService';

class WebhookService {
  private webhookSecret: string;

  constructor() {
    this.webhookSecret = process.env.REACT_APP_WEBHOOK_SECRET || '';
  }

  async handleWebhook(payload: WebhookPayload): Promise<boolean> {
    try {
      // Verify webhook signature
      if (!this.verifySignature(payload)) {
        console.error('Invalid webhook signature');
        return false;
      }

      // Process different webhook events
      switch (payload.event) {
        case 'payment.completed':
          return await this.handlePaymentCompleted(payload);
        case 'payment.failed':
          return await this.handlePaymentFailed(payload);
        case 'payment.cancelled':
          return await this.handlePaymentCancelled(payload);
        case 'payment.refunded':
          return await this.handlePaymentRefunded(payload);
        case 'invoice.created':
          return await this.handleInvoiceCreated(payload);
        case 'invoice.sent':
          return await this.handleInvoiceSent(payload);
        default:
          console.warn(`Unhandled webhook event: ${payload.event}`);
          return true; // Return true to acknowledge receipt
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      return false;
    }
  }

  private verifySignature(payload: WebhookPayload): boolean {
    if (!this.webhookSecret) {
      console.warn('Webhook secret not configured');
      return false;
    }

    // In a real implementation, verify HMAC signature
    // For now, we'll do a simple check
    const expectedSignature = this.createSignature(payload.data);
    return payload.signature === expectedSignature;
  }

  private createSignature(data: any): string {
    // In a real implementation, create HMAC-SHA256 signature
    // For now, return a placeholder
    return `${this.webhookSecret}_${JSON.stringify(data)}`;
  }

  private async handlePaymentCompleted(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      
      // Update payment status in our system
      await this.updatePaymentStatusInDatabase(
        data.id,
        PaymentStatus.COMPLETED,
        {
          amount: data.amount,
          currency: data.currency,
          paymentMethod: data.paymentMethod,
          timestamp: data.timestamp
        }
      );

      // Update seminar participant count
      if (data.metadata?.seminarId) {
        await this.updateSeminarParticipantCount(data.metadata.seminarId);
      }

      // Send confirmation email/SMS
      if (data.metadata?.participantEmail) {
        await this.sendPaymentConfirmation(data.metadata.participantEmail, data);
      }

      console.log(`Payment completed for invoice ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling payment completed:', error);
      return false;
    }
  }

  private async handlePaymentFailed(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      
      // Update payment status
      await this.updatePaymentStatusInDatabase(
        data.id,
        PaymentStatus.FAILED,
        {
          reason: data.status,
          timestamp: data.timestamp
        }
      );

      // Send failure notification
      if (data.metadata?.participantEmail) {
        await this.sendPaymentFailureNotification(data.metadata.participantEmail, data);
      }

      console.log(`Payment failed for invoice ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling payment failed:', error);
      return false;
    }
  }

  private async handlePaymentCancelled(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      
      // Update payment status
      await this.updatePaymentStatusInDatabase(
        data.id,
        PaymentStatus.CANCELLED,
        {
          timestamp: data.timestamp
        }
      );

      console.log(`Payment cancelled for invoice ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling payment cancelled:', error);
      return false;
    }
  }

  private async handlePaymentRefunded(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      
      // Update payment status
      await this.updatePaymentStatusInDatabase(
        data.id,
        PaymentStatus.REFUNDED,
        {
          amount: data.amount,
          timestamp: data.timestamp
        }
      );

      // Update seminar participant count (decrease)
      if (data.metadata?.seminarId) {
        await this.updateSeminarParticipantCount(data.metadata.seminarId, -1);
      }

      console.log(`Payment refunded for invoice ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling payment refunded:', error);
      return false;
    }
  }

  private async handleInvoiceCreated(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      console.log(`Invoice created: ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling invoice created:', error);
      return false;
    }
  }

  private async handleInvoiceSent(payload: WebhookPayload): Promise<boolean> {
    try {
      const { data } = payload;
      console.log(`Invoice sent: ${data.invoiceId}`);
      return true;
    } catch (error) {
      console.error('Error handling invoice sent:', error);
      return false;
    }
  }

  private async updatePaymentStatusInDatabase(paymentId: string, status: PaymentStatus, details?: any): Promise<void> {
    try {
      const updateData: any = {
        status: status,
        updated_at: new Date().toISOString()
      };

      if (status === PaymentStatus.COMPLETED) {
        updateData.paid_at = new Date().toISOString();
        if (details?.paymentMethod) {
          updateData.payment_method = details.paymentMethod;
        }
      } else if (status === PaymentStatus.FAILED) {
        updateData.failed_at = new Date().toISOString();
        if (details?.reason) {
          updateData.failure_reason = details.reason;
        }
      }

      const { error } = await supabase
        .from('payments')
        .update(updateData)
        .eq('id', paymentId);

      if (error) {
        console.error('Error updating payment status in database:', error);
        throw error;
      }

      console.log(`Payment ${paymentId} status updated to ${status}`);
    } catch (error) {
      console.error('Error updating payment status in database:', error);
      throw error;
    }
  }

  private async updateSeminarParticipantCount(seminarId: string, delta: number = 1): Promise<void> {
    try {
      // Get current seminar data
      const { data: seminar, error: fetchError } = await supabase
        .from('seminars')
        .select('current_participants, max_participants, status')
        .eq('id', seminarId)
        .single();

      if (fetchError) {
        console.error('Error fetching seminar for participant update:', fetchError);
        return;
      }

      // Calculate new participant count
      const newParticipantCount = Math.max(0, seminar.current_participants + delta);
      
      // Determine new status
      let newStatus = seminar.status;
      if (newParticipantCount >= seminar.max_participants && seminar.status === 'active') {
        newStatus = 'sold_out';
      } else if (newParticipantCount < seminar.max_participants && seminar.status === 'sold_out') {
        newStatus = 'active';
      }

      // Update seminar in database
      const { error: updateError } = await supabase
        .from('seminars')
        .update({
          current_participants: newParticipantCount,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', seminarId);

      if (updateError) {
        console.error('Error updating seminar participant count:', updateError);
        return;
      }

      console.log(`Seminar ${seminarId} participants updated: ${seminar.current_participants} → ${newParticipantCount}`);
    } catch (error) {
      console.error('Error updating seminar participant count:', error);
    }
  }

  private async sendPaymentConfirmation(email: string, paymentData: any): Promise<void> {
    try {
      // Extract seminar details from payment metadata
      const seminarTitle = paymentData.metadata?.seminarTitle || 'סמינר אימון כח';
      const seminarDate = paymentData.metadata?.seminarDate || 'תאריך יקבע';
      const participantName = paymentData.metadata?.participantName || 'משתתף יקר';
      
      // Send email via Supabase
      await supabaseEmailService.sendPaymentConfirmation(email, {
        participantName,
        seminarTitle,
        seminarDate,
        amount: paymentData.amount,
        invoiceUrl: paymentData.invoiceUrl
      });
      
      // Keep localStorage logging for demo purposes
      const confirmationData = {
        email,
        subject: 'אישור תשלום - סמינר אימון כח',
        message: `תשלום בסך ${paymentData.amount} ₪ התקבל בהצלחה`,
        timestamp: new Date().toISOString()
      };
      
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push(confirmationData);
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error sending payment confirmation:', error);
    }
  }

  private async sendPaymentFailureNotification(email: string, paymentData: any): Promise<void> {
    try {
      // Send email via Supabase
      await supabaseEmailService.sendPaymentFailureNotification(email, paymentData);
      
      // Keep localStorage logging for demo purposes
      const notificationData = {
        email,
        subject: 'בעיה בתשלום - סמינר אימון כח',
        message: `תשלום בסך ${paymentData.amount} ₪ נכשל. אנא נסה שוב`,
        timestamp: new Date().toISOString()
      };
      
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push(notificationData);
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error sending payment failure notification:', error);
    }
  }

  isConfigured(): boolean {
    return !!this.webhookSecret;
  }

  // Method to simulate webhook events for testing
  async simulateWebhookEvent(event: string, data: any): Promise<boolean> {
    const payload: WebhookPayload = {
      event,
      data,
      signature: this.createSignature(data)
    };

    return await this.handleWebhook(payload);
  }
}

export default new WebhookService();