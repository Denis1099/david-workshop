import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  console.log('=== FUNCTION START ===')
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== PARSING REQUEST BODY ===')
    const { seminar, paymentData } = await req.json()
    console.log('Request body received:', JSON.stringify({ seminar: seminar.id, paymentData: paymentData.participantName }, null, 2))
    
    console.log('=== CHECKING ENVIRONMENT ===')
    // Get Green Invoice API credentials
    const apiKey = Deno.env.get('GREEN_INVOICE_API_KEY')
    const secret = Deno.env.get('GREEN_INVOICE_SECRET')
    const apiUrl = Deno.env.get('GREEN_INVOICE_API_URL') || 'https://api.greeninvoice.co.il/api/v1'

    console.log('API Key exists:', !!apiKey)
    console.log('API Key preview:', apiKey?.substring(0, 8) + '...')
    console.log('API Secret exists:', !!secret)
    console.log('API URL:', apiUrl)

    if (!apiKey || !secret) {
      throw new Error('Green Invoice API credentials not configured')
    }

    console.log('=== INITIALIZING SUPABASE ===')
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create invoice data for Green Invoice API
    const invoiceData = {
      type: 300, // Regular Invoice type (instead of 320)
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
          description: `Seminar - ${seminar.city} (${new Date(seminar.date).toLocaleDateString('he-IL')})`,
          quantity: 1,
          price: seminar.price,
          currency: 'ILS',
          vatType: 0
        }
      ],
      remarks: seminar.special_notes || '',
      footer: 'Thank you for your purchase! Contact us for any questions.',
      paymentRequest: {
        sum: seminar.price,
        currency: 'ILS',
        dueDate: seminar.payment_deadline || seminar.date
      }
    }

    console.log('=== GETTING JWT TOKEN ===')
    // Get JWT token from Green Invoice API
    const tokenResponse = await fetch(`${apiUrl}/account/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: apiKey,
        secret: secret
      })
    })

    console.log('Token response status:', tokenResponse.status)
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token request failed:', errorText)
      throw new Error(`Green Invoice token request failed: ${tokenResponse.status} - ${errorText}`)
    }

    const tokenData = await tokenResponse.json()
    console.log('Token obtained successfully')
    const authToken = tokenData.token

    console.log('=== CALLING GREEN INVOICE API ===')
    // Call Green Invoice API with JWT token
    const response = await fetch(`${apiUrl}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(invoiceData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Green Invoice API error: ${response.status} - ${errorText}`)
    }

    console.log('Green Invoice API response status:', response.status)
    const invoiceResult = await response.json()
    console.log('Invoice created successfully, ID:', invoiceResult.id)
    
    console.log('=== CREATING PAYMENT RECORD ===')
    // Create payment record
    const paymentRecord = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      seminar_id: seminar.id.toString(),
      participant_name: paymentData.participantName,
      participant_email: paymentData.participantEmail,
      participant_phone: paymentData.participantPhone,
      amount: seminar.price,
      currency: 'ILS',
      status: 'pending',
      green_invoice_id: invoiceResult.id,
      invoice_number: invoiceResult.number,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Store payment in database
    const { data: dbData, error: dbError } = await supabase
      .from('payments')
      .insert([paymentRecord])

    if (dbError) {
      console.error('Database error:', dbError)
      console.error('Failed to insert payment record:', JSON.stringify(paymentRecord, null, 2))
      
      // Return success with invoice but note database issue
      return new Response(JSON.stringify({
        success: true,
        invoice: invoiceResult,
        payment: paymentRecord,
        warning: 'Payment record not stored in database',
        dbError: dbError.message
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Payment record stored successfully')
    return new Response(JSON.stringify({
      success: true,
      invoice: invoiceResult,
      payment: paymentRecord
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      details: 'Payment creation failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})