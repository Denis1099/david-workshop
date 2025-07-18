const nodemailer = require('nodemailer');
const axios = require('axios');

// Email transporter configuration
let emailTransporter = null;

// Initialize email transporter if configured
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  emailTransporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

/**
 * Send payment notification
 * @param {string} type - Notification type
 * @param {Object} data - Notification data
 */
async function sendPaymentNotification(type, data) {
  try {
    switch (type) {
      case 'payment_confirmed':
        await sendPaymentConfirmationEmail(data);
        await sendPaymentConfirmationSMS(data);
        break;
      case 'payment_failed':
        await sendPaymentFailureEmail(data);
        break;
      case 'payment_refunded':
        await sendRefundNotificationEmail(data);
        break;
      default:
        console.warn(`Unknown notification type: ${type}`);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    // Don't throw error - notification failure shouldn't break webhook processing
  }
}

/**
 * Send payment confirmation email
 */
async function sendPaymentConfirmationEmail(data) {
  if (!emailTransporter) {
    console.log('Email not configured, skipping payment confirmation email');
    return;
  }

  try {
    const { email, participantName, amount, currency, seminarId } = data;

    const emailContent = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'אישור תשלום - סמינר אימון כח עם דוד',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0C2C48; color: white; padding: 20px; text-align: center;">
            <h1>אישור תשלום</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <p>שלום ${participantName},</p>
            
            <p>תשלומך לסמינר אימון כח עם דוד אושר בהצלחה!</p>
            
            <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
              <h3>פרטי התשלום:</h3>
              <p><strong>סכום:</strong> ${amount} ${currency}</p>
              <p><strong>סטטוס:</strong> שולם בהצלחה</p>
              <p><strong>תאריך:</strong> ${new Date().toLocaleDateString('he-IL')}</p>
            </div>
            
            <div style="background: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h3>מה הלאה?</h3>
              <p>• תקבל פרטים נוספים על הסמינר במייל נפרד</p>
              <p>• יום לפני הסמינר תקבל תזכורת עם פרטי המיקום</p>
              <p>• לשאלות נוספות, צור קשר בווטסאפ: ${process.env.WHATSAPP_PHONE}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">תודה שבחרת ללמוד איתנו!</p>
              <p style="color: #666;">דוד ליטבינוב - מאמן הרמת משקולות אולימפית</p>
            </div>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(emailContent);
    console.log(`Payment confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
  }
}

/**
 * Send payment failure email
 */
async function sendPaymentFailureEmail(data) {
  if (!emailTransporter) {
    console.log('Email not configured, skipping payment failure email');
    return;
  }

  try {
    const { email, participantName, amount, currency, failureReason } = data;

    const emailContent = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'בעיה בתשלום - סמינר אימון כח עם דוד',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
            <h1>בעיה בתשלום</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <p>שלום ${participantName},</p>
            
            <p>מצטערים, אירעה בעיה בעיבוד התשלום שלך לסמינר אימון כח.</p>
            
            <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
              <h3>פרטי התשלום שנכשל:</h3>
              <p><strong>סכום:</strong> ${amount} ${currency}</p>
              <p><strong>סיבה:</strong> ${failureReason || 'לא ידוע'}</p>
              <p><strong>תאריך:</strong> ${new Date().toLocaleDateString('he-IL')}</p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h3>מה לעשות?</h3>
              <p>• אנא נסה שוב את התשלום באתר</p>
              <p>• וודא שפרטי כרטיס האשראי נכונים</p>
              <p>• בדוק עם הבנק שלך אם יש חסימה על הכרטיס</p>
              <p>• לעזרה נוספת, צור קשר בווטסאפ: ${process.env.WHATSAPP_PHONE}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">נשמח לעזור לך להשלים את ההרשמה!</p>
              <p style="color: #666;">דוד ליטבינוב - מאמן הרמת משקולות אולימפית</p>
            </div>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(emailContent);
    console.log(`Payment failure email sent to ${email}`);
  } catch (error) {
    console.error('Error sending payment failure email:', error);
  }
}

/**
 * Send refund notification email
 */
async function sendRefundNotificationEmail(data) {
  if (!emailTransporter) {
    console.log('Email not configured, skipping refund notification email');
    return;
  }

  try {
    const { email, participantName, amount, currency } = data;

    const emailContent = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'אישור החזר - סמינר אימון כח עם דוד',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0C2C48; color: white; padding: 20px; text-align: center;">
            <h1>אישור החזר</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <p>שלום ${participantName},</p>
            
            <p>ההחזר שלך עובד בהצלחה.</p>
            
            <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
              <h3>פרטי ההחזר:</h3>
              <p><strong>סכום:</strong> ${amount} ${currency}</p>
              <p><strong>תאריך:</strong> ${new Date().toLocaleDateString('he-IL')}</p>
              <p><strong>זמן עיבוד:</strong> 3-5 ימי עסקים</p>
            </div>
            
            <div style="background: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <p>הכסף יחזור לכרטיס האשראי שממנו בוצע התשלום המקורי.</p>
              <p>לשאלות נוספות, צור קשר בווטסאפ: ${process.env.WHATSAPP_PHONE}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">תודה שבחרת ללמוד איתנו!</p>
              <p style="color: #666;">דוד ליטבינוב - מאמן הרמת משקולות אולימפית</p>
            </div>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(emailContent);
    console.log(`Refund notification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending refund notification email:', error);
  }
}

/**
 * Send payment confirmation SMS via WhatsApp
 */
async function sendPaymentConfirmationSMS(data) {
  try {
    const { participantName, amount, currency } = data;
    
    const message = `שלום ${participantName}! תשלומך לסמינר אימון כח (${amount} ${currency}) אושר בהצלחה. פרטים נוספים יישלחו במייל. תודה! - דוד`;
    
    // This would integrate with your WhatsApp Business API
    // For now, just log the action
    console.log('WhatsApp confirmation message:', message);
    
    // Example integration with WhatsApp Business API:
    // await axios.post('https://api.whatsapp.com/send', {
    //   phone: data.participantPhone,
    //   message: message
    // });
    
  } catch (error) {
    console.error('Error sending WhatsApp confirmation:', error);
  }
}

module.exports = {
  sendPaymentNotification,
  sendPaymentConfirmationEmail,
  sendPaymentFailureEmail,
  sendRefundNotificationEmail,
  sendPaymentConfirmationSMS
};