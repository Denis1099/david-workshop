import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature, x-green-invoice-signature',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

interface CreateInvoiceRequest {
  seminar: {
    id: number;
    city: string;
    date: string;
    price: number;
    special_notes?: string;
    payment_deadline?: string;
  };
  paymentData: {
    participantName: string;
    participantEmail: string;
    participantPhone: string;
    businessName?: string;
    businessTaxId?: string;
    isBusinessPayment: boolean;
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Handle GET requests for health check
    if (req.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'ok',
        message: 'Green Invoice API Edge Function is running',
        timestamp: new Date().toISOString()
      }), { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Only allow POST requests for actual API calls
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed',
        method: req.method,
        allowedMethods: ['POST', 'OPTIONS', 'GET']
      }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get Green Invoice API credentials from environment
    const apiKey = Deno.env.get('GREEN_INVOICE_API_KEY')
    const secret = Deno.env.get('GREEN_INVOICE_SECRET')
    const apiUrl = Deno.env.get('GREEN_INVOICE_API_URL') || 'https://api.greeninvoice.co.il/api/v1'

    if (!apiKey || !secret) {
      console.error('Missing API credentials:', { apiKey: !!apiKey, secret: !!secret })
      return new Response(JSON.stringify({
        error: 'Missing API credentials',
        details: 'GREEN_INVOICE_API_KEY or GREEN_INVOICE_SECRET not configured'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Parse request body
    let requestData: CreateInvoiceRequest
    try {
      requestData = await req.json()
    } catch (error) {
      console.error('Failed to parse request body:', error)
      return new Response(JSON.stringify({
        error: 'Invalid request body',
        details: 'Request body must be valid JSON'
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const { seminar, paymentData } = requestData

    // Calculate current price (simplified - add early bird logic later)
    const currentPrice = seminar.price

    // Create invoice data for Green Invoice API
    const invoiceData = {
      type: 320, // Invoice type
      lang: 'he', // Hebrew
      currency: 'ILS',
      vatType: 0, // Include VAT
      client: {
        name: paymentData.participantName,
        email: paymentData.participantEmail,
        phone: paymentData.participantPhone,
        ...(paymentData.isBusinessPayment && paymentData.businessTaxId ? {
          taxId: paymentData.businessTaxId
        } : {})
      },
      income: [
        {
          description: `סמינר אימון כח - ${seminar.city} (${new Date(seminar.date).toLocaleDateString('he-IL')})`,
          quantity: 1,
          price: currentPrice,
          currency: 'ILS',
          vatType: 0
        }
      ],
      remarks: seminar.special_notes || '',
      footer: 'תודה על הרכישה! נצור קשר לכל שאלה.',
      paymentRequest: {
        sum: currentPrice,
        currency: 'ILS',
        dueDate: seminar.payment_deadline || seminar.date
      }
    }

    // Create signature (simplified)
    const timestamp = Date.now().toString()
    const signature = createSignature(timestamp, invoiceData, secret)

    // Make API call to Green Invoice
    console.log('Making API call to Green Invoice:', { 
      url: `${apiUrl}/documents`,
      headers: { 'X-API-KEY': apiKey.substring(0, 10) + '...', 'X-TIMESTAMP': timestamp }
    })
    
    const response = await fetch(`${apiUrl}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-TIMESTAMP': timestamp,
        'X-SIGNATURE': signature,
      },
      body: JSON.stringify(invoiceData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Green Invoice API Error:', errorData)
      return new Response(JSON.stringify({
        error: 'Failed to create invoice',
        details: errorData,
        status: response.status
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const invoiceResult = await response.json()
    
    // Create payment record
    const paymentData = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      seminarId: seminar.id.toString(),
      participantName: paymentData.participantName,
      participantEmail: paymentData.participantEmail,
      participantPhone: paymentData.participantPhone,
      amount: currentPrice,
      currency: 'ILS',
      status: 'pending',
      greenInvoiceId: invoiceResult.id,
      invoiceNumber: invoiceResult.number,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return new Response(JSON.stringify({
      success: true,
      invoice: invoiceResult,
      payment: paymentData
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function createSignature(timestamp: string, data: any, secret: string): string {
  try {
    const dataString = JSON.stringify(data)
    // Remove Hebrew characters and create a simple hash
    const cleanString = dataString.replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters
    const simpleHash = cleanString.substring(0, 20)
    return `${secret}_${timestamp}_${simpleHash}`.substring(0, 50)
  } catch (error) {
    console.error('Error creating signature:', error)
    return `${secret}_${timestamp}_fallback`.substring(0, 50)
  }
}