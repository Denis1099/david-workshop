// Browser-based email testing utility
// Use in browser console or call from components

import emailService from '../services/emailService';

export const testEmailService = {
  async testContactForm() {
    console.log('Testing contact form emails...');
    
    try {
      // Test admin notification
      await emailService.sendContactFormNotification({
        name: 'בדיקה',
        email: 'test@example.com',
        phone: '050-1234567',
        message: 'זו בדיקה של מערכת האימייל'
      });
      
      console.log('✅ Contact form notification sent');
      
      // Test auto-reply
      await emailService.sendContactFormAutoReply('test@example.com', 'בדיקה');
      console.log('✅ Auto-reply sent');
      
    } catch (error) {
      console.error('❌ Error testing contact form:', error);
    }
  },

  async testPaymentEmails() {
    console.log('Testing payment emails...');
    
    try {
      // Test payment confirmation
      await emailService.sendPaymentConfirmation('test@example.com', {
        participantName: 'בדיקה',
        seminarTitle: 'סמינר בדיקה',
        seminarDate: '2024-01-15',
        amount: 299
      });
      
      console.log('✅ Payment confirmation sent');
      
      // Test payment failure
      await emailService.sendPaymentFailureNotification('test@example.com', {
        amount: 299,
        reason: 'Test failure'
      });
      
      console.log('✅ Payment failure notification sent');
      
    } catch (error) {
      console.error('❌ Error testing payment emails:', error);
    }
  }
};

// Make available globally for browser console
(window as any).testEmailService = testEmailService;