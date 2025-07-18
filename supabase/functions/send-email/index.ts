import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface EmailRequest {
  type: 'contact_form' | 'payment_confirmation' | 'payment_failure'
  to: string
  data: any
}

interface ContactFormData {
  name: string
  phone: string
  email: string
  message?: string
}

interface PaymentConfirmationData {
  participantName: string
  seminarTitle: string
  seminarDate: string
  amount: number
  invoiceUrl?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, to, data }: EmailRequest = await req.json()
    
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    let emailData: any = {}

    switch (type) {
      case 'contact_form':
        emailData = createContactFormEmail(data as ContactFormData)
        break
      case 'payment_confirmation':
        emailData = createPaymentConfirmationEmail(data as PaymentConfirmationData)
        break
      case 'payment_failure':
        emailData = createPaymentFailureEmail(data)
        break
      default:
        throw new Error(`Unknown email type: ${type}`)
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: to,
        subject: emailData.subject,
        html: emailData.html,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Resend API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    
    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

function createContactFormEmail(data: ContactFormData) {
  // Admin notification email
  return {
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
  }
}

function createPaymentConfirmationEmail(data: PaymentConfirmationData) {
  return {
    subject: `אישור תשלום - ${data.seminarTitle}`,
    html: `
      <div dir="rtl" style="font-family: 'Heebo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #0C2C48; color: #FBFBFA; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">אישור תשלום</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0C2C48; margin-top: 0;">שלום ${data.participantName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            תודה על הרכישה! תשלומך עבר הסמינר "${data.seminarTitle}" התקבל בהצלחה.
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
  }
}

function createPaymentFailureEmail(data: any) {
  return {
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
  }
}