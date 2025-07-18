import { Resend } from 'resend';

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

interface PaymentConfirmationData {
  participantName: string;
  seminarTitle: string;
  seminarDate: string;
  amount: number;
  invoiceUrl?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

class EmailService {
  private resend: Resend | null = null;

  private getResend(): Resend {
    if (!this.resend) {
      const apiKey = process.env.REACT_APP_RESEND_API_KEY;
      console.log('Email service - API key check:', apiKey ? `${apiKey.substring(0, 10)}...` : 'not found');
      
      if (!apiKey || apiKey === 'your_resend_api_key_here') {
        throw new Error('REACT_APP_RESEND_API_KEY is not set or using placeholder value');
      }
      this.resend = new Resend(apiKey);
      console.log('Email service - Resend initialized successfully');
    }
    return this.resend;
  }

  async sendPaymentConfirmation(email: string, data: PaymentConfirmationData): Promise<void> {
    try {
      const template = this.createPaymentConfirmationTemplate(data);
      
      await this.getResend().emails.send({
        from: 'onboarding@resend.dev', // Resend's verified domain for testing
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log(`Payment confirmation email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send payment confirmation email:', error);
      throw error;
    }
  }

  async sendPaymentFailureNotification(email: string, data: any): Promise<void> {
    try {
      const template = this.createPaymentFailureTemplate(data);
      
      await this.getResend().emails.send({
        from: 'onboarding@resend.dev', // Resend's verified domain for testing
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log(`Payment failure notification sent to ${email}`);
    } catch (error) {
      console.error('Failed to send payment failure notification:', error);
      throw error;
    }
  }

  async sendContactFormNotification(data: ContactFormData): Promise<void> {
    try {
      const template = this.createContactFormTemplate(data);
      
      await this.getResend().emails.send({
        from: 'onboarding@resend.dev', // Resend's verified domain for testing
        to: 'liftvinov.media@gmail.com',
        subject: template.subject,
        html: template.html,
      });

      console.log(`Contact form notification sent to admin`);
    } catch (error) {
      console.error('Failed to send contact form notification:', error);
      throw error;
    }
  }

  async sendContactFormAutoReply(email: string, name: string): Promise<void> {
    try {
      const template = this.createContactFormAutoReplyTemplate(name);
      
      await this.getResend().emails.send({
        from: 'onboarding@resend.dev', // Resend's verified domain for testing
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log(`Auto-reply sent to ${email}`);
    } catch (error) {
      console.error('Failed to send auto-reply:', error);
      throw error;
    }
  }

  private createPaymentConfirmationTemplate(data: PaymentConfirmationData): EmailTemplate {
    return {
      to: '',
      subject: `אישור תשלום - ${data.seminarTitle}`,
      html: `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #0C2C48; color: #FBFBFA; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">אישור תשלום</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0C2C48; margin-top: 0;">שלום ${data.participantName},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              תודה על הרכישה! תשלומך עבור הסמינר "${data.seminarTitle}" התקבל בהצלחה.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0C2C48; margin-top: 0;">פרטי הסמינר:</h3>
              <p><strong>שם הסמינר:</strong> ${data.seminarTitle}</p>
              <p><strong>תאריך:</strong> ${data.seminarDate}</p>
              <p><strong>סכום ששולם:</strong> ₪${data.amount}</p>
              ${data.invoiceUrl ? `<p><strong>חשבונית:</strong> <a href="${data.invoiceUrl}" style="color: #DA9B28;">לחץ כאן להורדה</a></p>` : ''}
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              פרטים נוספים על הסמינר יישלחו אליך בהמשך.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.link/mfzmps" style="background-color: #DA9B28; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                צור קשר בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      `
    };
  }

  private createPaymentFailureTemplate(_data: any): EmailTemplate {
    return {
      to: '',
      subject: 'בעיה בתשלום - נסה שוב',
      html: `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #dc3545; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">בעיה בתשלום</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              שלום,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              מצטערים, אך התשלום עבור הסמינר לא הושלם בהצלחה.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #DA9B28; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                נסה לשלם שוב
              </a>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              לעזרה נוספת, אנא צור קשר בוואטסאפ.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.link/mfzmps" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                צור קשר בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      `
    };
  }

  private createContactFormTemplate(data: ContactFormData): EmailTemplate {
    return {
      to: '',
      subject: 'הודעה חדשה מטופס יצירת קשר',
      html: `
        <div style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0C2C48;">הודעה חדשה מטופס יצירת קשר</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>שם:</strong> ${data.name}</p>
            <p><strong>אימייל:</strong> ${data.email}</p>
            <p><strong>טלפון:</strong> ${data.phone}</p>
            ${data.message ? `<p><strong>הודעה:</strong><br>${data.message}</p>` : ''}
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            נשלח מאתר David Workshop
          </p>
        </div>
      `
    };
  }

  private createContactFormAutoReplyTemplate(name: string): EmailTemplate {
    return {
      to: '',
      subject: 'תודה על פנייתך - David Workshop',
      html: `
        <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #0C2C48; color: #FBFBFA; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">תודה על פנייתך</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0C2C48; margin-top: 0;">שלום ${name},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              תודה על פנייתך! הודעתך התקבלה בהצלחה ואנו נחזור אליך בהקדם האפשרי.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              בינתיים, אתה מוזמן לפנות אלינו בוואטסאפ לכל שאלה דחופה.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.link/mfzmps" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                צור קשר בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      `
    };
  }
}

export default new EmailService();