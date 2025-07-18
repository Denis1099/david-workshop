const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for server-side operations
);

/**
 * Update payment status in database
 * @param {string} paymentId - Payment ID
 * @param {string} status - New payment status
 * @param {Object} additionalData - Additional data to update
 */
async function updatePaymentStatus(paymentId, status, additionalData = {}) {
  try {
    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      ...additionalData
    };

    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId)
      .select()
      .single();

    if (error) {
      throw new Error(`Database error updating payment: ${error.message}`);
    }

    console.log(`Payment ${paymentId} updated to status: ${status}`);
    return data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

/**
 * Update seminar participant count
 * @param {string} seminarId - Seminar ID
 * @param {number} delta - Change in participant count (+1 for payment, -1 for refund)
 */
async function updateSeminarParticipants(seminarId, delta) {
  try {
    // First, get current seminar data
    const { data: seminar, error: fetchError } = await supabase
      .from('seminars')
      .select('current_participants, max_participants, status')
      .eq('id', seminarId)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching seminar: ${fetchError.message}`);
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

    // Update seminar
    const { data, error } = await supabase
      .from('seminars')
      .update({
        current_participants: newParticipantCount,
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', seminarId)
      .select()
      .single();

    if (error) {
      throw new Error(`Database error updating seminar: ${error.message}`);
    }

    console.log(`Seminar ${seminarId} participants updated: ${seminar.current_participants} → ${newParticipantCount}`);
    if (newStatus !== seminar.status) {
      console.log(`Seminar ${seminarId} status updated: ${seminar.status} → ${newStatus}`);
    }

    return data;
  } catch (error) {
    console.error('Error updating seminar participants:', error);
    throw error;
  }
}

/**
 * Get payment by ID
 * @param {string} paymentId - Payment ID
 */
async function getPaymentById(paymentId) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) {
      throw new Error(`Database error fetching payment: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
}

/**
 * Get seminar by ID
 * @param {string} seminarId - Seminar ID
 */
async function getSeminarById(seminarId) {
  try {
    const { data, error } = await supabase
      .from('seminars')
      .select('*')
      .eq('id', seminarId)
      .single();

    if (error) {
      throw new Error(`Database error fetching seminar: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching seminar:', error);
    throw error;
  }
}

/**
 * Log webhook event to database
 * @param {Object} webhookData - Webhook event data
 */
async function logWebhookEvent(webhookData) {
  try {
    const { data, error } = await supabase
      .from('webhook_logs')
      .insert({
        event_type: webhookData.event,
        payload: webhookData,
        processed_at: new Date().toISOString(),
        source: 'green_invoice'
      })
      .select()
      .single();

    if (error) {
      // Don't throw error for logging - just log it
      console.error('Error logging webhook event to database:', error);
    }

    return data;
  } catch (error) {
    console.error('Error logging webhook event:', error);
    // Don't throw - logging should not break webhook processing
  }
}

/**
 * Create payment record
 * @param {Object} paymentData - Payment data
 */
async function createPayment(paymentData) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        id: paymentData.id,
        seminar_id: paymentData.seminarId,
        participant_name: paymentData.participantName,
        participant_email: paymentData.participantEmail,
        participant_phone: paymentData.participantPhone,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: paymentData.status,
        green_invoice_id: paymentData.greenInvoiceId,
        invoice_number: paymentData.invoiceNumber,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error creating payment: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

module.exports = {
  updatePaymentStatus,
  updateSeminarParticipants,
  getPaymentById,
  getSeminarById,
  logWebhookEvent,
  createPayment
};