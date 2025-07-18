import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature, x-green-invoice-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface WebhookPayload {
  event: string;
  data: {
    id: string;
    invoiceId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod?: string;
    timestamp: string;
    metadata?: {
      seminarId: string;
      participantEmail: string;
      participantName: string;
    };
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      })
    }

    // Get webhook secret from environment (optional for Green Invoice)
    const webhookSecret = Deno.env.get('GREEN_INVOICE_WEBHOOK_SECRET')
    const signature = req.headers.get('x-signature') || req.headers.get('x-green-invoice-signature')
    
    // Read payload
    const payload = await req.text()
    
    // Verify signature only if both secret and signature are provided
    if (webhookSecret && signature) {
      const isValid = await verifySignature(payload, signature, webhookSecret)
      if (!isValid) {
        console.error('Invalid webhook signature')
        return new Response('Unauthorized: Invalid signature', { 
          status: 401, 
          headers: corsHeaders 
        })
      }
      console.log('Webhook signature verified successfully')
    } else {
      console.log('Processing webhook without signature verification (Green Invoice does not provide webhook secrets)')
    }

    // Parse webhook data
    let webhookData: WebhookPayload
    try {
      webhookData = JSON.parse(payload)
    } catch (error) {
      console.error('Invalid JSON payload:', error)
      return new Response('Invalid JSON payload', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Process webhook event
    const result = await processWebhookEvent(supabase, webhookData)

    if (result.success) {
      return new Response(JSON.stringify({ 
        message: 'Webhook processed successfully', 
        data: result 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({ 
        error: 'Webhook processing failed', 
        details: result.error 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    })
  }
})

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    const providedSignature = signature.replace('sha256=', '')
    
    return expectedHex === providedSignature
  } catch (error) {
    console.error('Error verifying signature:', error)
    return false
  }
}

async function processWebhookEvent(supabase: any, webhookData: WebhookPayload) {
  try {
    const { event, data } = webhookData

    console.log(`Processing webhook event: ${event}`, { paymentId: data.id })

    switch (event) {
      case 'payment/received':
        return await handlePaymentReceived(supabase, data)
      
      case 'document/created':
        return await handleDocumentCreated(supabase, data)
      
      case 'client/created':
        return await handleClientCreated(supabase, data)
      
      default:
        console.warn(`Unknown webhook event: ${event}`)
        return {
          success: true,
          message: `Unknown event type: ${event}`,
          action: 'ignored'
        }
    }
  } catch (error) {
    console.error('Error processing webhook event:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

async function handlePaymentReceived(supabase: any, data: any) {
  try {
    console.log('Processing payment completed:', data.id)

    // Update payment status in database
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: 'completed',
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        payment_method: data.paymentMethod,
        green_invoice_id: data.invoiceId
      })
      .eq('id', data.id)

    if (updateError) {
      throw new Error(`Failed to update payment: ${updateError.message}`)
    }

    // Update seminar participant count
    if (data.metadata?.seminarId) {
      await updateSeminarParticipants(supabase, data.metadata.seminarId, 1)
    }

    // Send payment confirmation email
    if (data.metadata?.participantEmail) {
      await sendPaymentConfirmation(supabase, data.metadata.participantEmail, {
        participantName: data.metadata.participantName,
        amount: data.amount,
        currency: data.currency,
        seminarId: data.metadata.seminarId
      })
    }

    return {
      success: true,
      message: 'Payment completed successfully',
      action: 'payment_completed',
      paymentId: data.id
    }
  } catch (error) {
    console.error('Error handling payment completed:', error)
    throw error
  }
}

async function handleDocumentCreated(supabase: any, data: any) {
  try {
    console.log('Processing document created:', data.id)

    // Update payment record with document/invoice details
    if (data.type === 'invoice' || data.type === 'tax_invoice') {
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: 'processing',
          green_invoice_id: data.id,
          invoice_number: data.number,
          updated_at: new Date().toISOString()
        })
        .eq('green_invoice_id', data.id)

      if (updateError) {
        console.error('Failed to update payment with document info:', updateError.message)
      }
    }

    return {
      success: true,
      message: 'Document creation processed',
      action: 'document_created',
      documentId: data.id
    }
  } catch (error) {
    console.error('Error handling document created:', error)
    throw error
  }
}

async function handleClientCreated(supabase: any, data: any) {
  try {
    console.log('Processing client created:', data.id)

    // Store client information if needed for future reference
    // This event is mainly informational for Green Invoice
    return {
      success: true,
      message: 'Client creation processed',
      action: 'client_created',
      clientId: data.id
    }
  } catch (error) {
    console.error('Error handling client created:', error)
    throw error
  }
}

async function updateSeminarParticipants(supabase: any, seminarId: string, delta: number) {
  try {
    // Get current seminar data
    const { data: seminar, error: fetchError } = await supabase
      .from('seminars')
      .select('current_participants, max_participants, status')
      .eq('id', seminarId)
      .single()

    if (fetchError) {
      throw new Error(`Error fetching seminar: ${fetchError.message}`)
    }

    // Calculate new participant count
    const newParticipantCount = Math.max(0, seminar.current_participants + delta)
    
    // Determine new status
    let newStatus = seminar.status
    if (newParticipantCount >= seminar.max_participants && seminar.status === 'active') {
      newStatus = 'sold_out'
    } else if (newParticipantCount < seminar.max_participants && seminar.status === 'sold_out') {
      newStatus = 'active'
    }

    // Update seminar
    const { error: updateError } = await supabase
      .from('seminars')
      .update({
        current_participants: newParticipantCount,
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', seminarId)

    if (updateError) {
      throw new Error(`Error updating seminar: ${updateError.message}`)
    }

    console.log(`Seminar ${seminarId} participants updated: ${seminar.current_participants} → ${newParticipantCount}`)
  } catch (error) {
    console.error('Error updating seminar participants:', error)
    throw error
  }
}

async function sendPaymentConfirmation(supabase: any, email: string, data: any) {
  try {
    // Use Supabase's built-in email function or your email service
    const { error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'payment_confirmation',
        to: email,
        data: data
      }
    })

    if (error) {
      console.error('Error sending payment confirmation:', error)
    } else {
      console.log(`Payment confirmation sent to ${email}`)
    }
  } catch (error) {
    console.error('Error sending payment confirmation:', error)
  }
}

