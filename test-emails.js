// Test script to verify Resend email functionality
// Run with: node test-emails.js

const { Resend } = require('resend');

// Replace with your actual Resend API key
const resend = new Resend('re_your_actual_api_key_here');

async function testPaymentConfirmation() {
  console.log('Testing payment confirmation email...');
  
  try {
    const result = await resend.emails.send({
      from: 'noreply@davidworkshop.com', // You'll need to verify this domain in Resend
      to: 'your-test-email@gmail.com', // Replace with your test email
      subject: 'אישור תשלום - בדיקה',
      html: `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #0C2C48; color: #FBFBFA; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">אישור תשלום - בדיקה</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0C2C48; margin-top: 0;">שלום דוד,</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              זה בדיקה של מערכת האימייל. אם אתה מקבל את זה, המערכת עובדת!
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.link/mfzmps" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                צור קשר בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      `
    });
    
    console.log('✅ Payment confirmation email sent:', result.id);
  } catch (error) {
    console.error('❌ Error sending payment confirmation:', error);
  }
}

async function testContactFormNotification() {
  console.log('Testing contact form notification...');
  
  try {
    const result = await resend.emails.send({
      from: 'noreply@davidworkshop.com',
      to: 'liftvinov.media@gmail.com',
      subject: 'בדיקה - הודעה חדשה מטופס יצירת קשר',
      html: `
        <div style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0C2C48;">בדיקה - הודעה חדשה מטופס יצירת קשר</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>שם:</strong> בדיקה</p>
            <p><strong>אימייל:</strong> test@example.com</p>
            <p><strong>טלפון:</strong> 050-1234567</p>
            <p><strong>הודעה:</strong> זו בדיקה של מערכת האימייל</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            נשלח מאתר David Workshop - מערכת בדיקה
          </p>
        </div>
      `
    });
    
    console.log('✅ Contact form notification sent:', result.id);
  } catch (error) {
    console.error('❌ Error sending contact form notification:', error);
  }
}

async function runTests() {
  console.log('🚀 Starting email tests...\n');
  
  await testPaymentConfirmation();
  console.log('');
  await testContactFormNotification();
  
  console.log('\n✨ Tests completed! Check your email.');
}

runTests();