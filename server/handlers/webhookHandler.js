const { validateWebhookPayload } = require('../utils/security');
const { logWebhookEvent, logError, logPaymentEvent } = require('../utils/logger');
const { updatePaymentStatus, updateSeminarParticipants } = require('../services/databaseService');
const { sendPaymentNotification } = require('../services/notificationService');

/**
 * Process webhook event from Green Invoice
 * @param {Object} webhookData - Webhook payload
 * @returns {Object} - Processing result
 */
async function processWebhook(webhookData) {
  try {
    // Validate payload structure
    if (!validateWebhookPayload(webhookData)) {
      return {
        success: false,
        error: 'Invalid webhook payload structure'
      };
    }

    const { event, data } = webhookData;

    logWebhookEvent('PROCESSING_WEBHOOK_EVENT', {
      event,
      invoiceId: data.invoiceId,
      paymentId: data.id
    });

    // Route to appropriate handler based on event type
    switch (event) {
      case 'payment.completed':
        return await handlePaymentCompleted(data);
      
      case 'payment.failed':
        return await handlePaymentFailed(data);
      
      case 'payment.cancelled':
        return await handlePaymentCancelled(data);
      
      case 'payment.refunded':
        return await handlePaymentRefunded(data);
      
      case 'invoice.created':
        return await handleInvoiceCreated(data);
      
      case 'invoice.sent':
        return await handleInvoiceSent(data);
      
      case 'invoice.paid':
        return await handleInvoicePaid(data);
      
      case 'invoice.cancelled':
        return await handleInvoiceCancelled(data);
      
      default:
        logWebhookEvent('UNKNOWN_WEBHOOK_EVENT', { event, data });
        return {
          success: true,
          message: `Unknown event type: ${event}`,
          action: 'ignored'
        };
    }
  } catch (error) {
    logError('WEBHOOK_PROCESSING_ERROR', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Handle payment completed event
 */
async function handlePaymentCompleted(data) {
  try {
    logPaymentEvent('COMPLETED', data);

    // Update payment status in database
    await updatePaymentStatus(data.id, 'completed', {
      paidAt: new Date().toISOString(),
      amount: data.amount,
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      greenInvoiceId: data.invoiceId
    });

    // Update seminar participant count
    if (data.metadata?.seminarId) {
      await updateSeminarParticipants(data.metadata.seminarId, 1);
    }

    // Send confirmation notification
    if (data.metadata?.participantEmail) {
      await sendPaymentNotification('payment_confirmed', {
        email: data.metadata.participantEmail,
        participantName: data.metadata.participantName,
        amount: data.amount,
        currency: data.currency,
        seminarId: data.metadata.seminarId
      });
    }

    return {
      success: true,
      message: 'Payment completed successfully',
      action: 'payment_completed',
      paymentId: data.id
    };
  } catch (error) {
    logError('PAYMENT_COMPLETED_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle payment failed event
 */
async function handlePaymentFailed(data) {
  try {
    logPaymentEvent('FAILED', data);

    // Update payment status in database
    await updatePaymentStatus(data.id, 'failed', {
      failedAt: new Date().toISOString(),
      failureReason: data.failureReason || 'Payment processing failed'
    });

    // Send failure notification
    if (data.metadata?.participantEmail) {
      await sendPaymentNotification('payment_failed', {
        email: data.metadata.participantEmail,
        participantName: data.metadata.participantName,
        amount: data.amount,
        currency: data.currency,
        failureReason: data.failureReason
      });
    }

    return {
      success: true,
      message: 'Payment failure processed',
      action: 'payment_failed',
      paymentId: data.id
    };
  } catch (error) {
    logError('PAYMENT_FAILED_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle payment cancelled event
 */
async function handlePaymentCancelled(data) {
  try {
    logPaymentEvent('CANCELLED', data);

    await updatePaymentStatus(data.id, 'cancelled', {
      cancelledAt: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Payment cancellation processed',
      action: 'payment_cancelled',
      paymentId: data.id
    };
  } catch (error) {
    logError('PAYMENT_CANCELLED_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle payment refunded event
 */
async function handlePaymentRefunded(data) {
  try {
    logPaymentEvent('REFUNDED', data);

    await updatePaymentStatus(data.id, 'refunded', {
      refundedAt: new Date().toISOString(),
      refundAmount: data.amount
    });

    // Decrease seminar participant count
    if (data.metadata?.seminarId) {
      await updateSeminarParticipants(data.metadata.seminarId, -1);
    }

    // Send refund notification
    if (data.metadata?.participantEmail) {
      await sendPaymentNotification('payment_refunded', {
        email: data.metadata.participantEmail,
        participantName: data.metadata.participantName,
        amount: data.amount,
        currency: data.currency
      });
    }

    return {
      success: true,
      message: 'Payment refund processed',
      action: 'payment_refunded',
      paymentId: data.id
    };
  } catch (error) {
    logError('PAYMENT_REFUNDED_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle invoice created event
 */
async function handleInvoiceCreated(data) {
  try {
    logWebhookEvent('INVOICE_CREATED', data);

    // Update payment record with invoice details
    if (data.paymentId) {
      await updatePaymentStatus(data.paymentId, 'processing', {
        invoiceId: data.invoiceId,
        invoiceNumber: data.invoiceNumber,
        invoiceUrl: data.invoiceUrl
      });
    }

    return {
      success: true,
      message: 'Invoice creation processed',
      action: 'invoice_created',
      invoiceId: data.invoiceId
    };
  } catch (error) {
    logError('INVOICE_CREATED_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle invoice sent event
 */
async function handleInvoiceSent(data) {
  try {
    logWebhookEvent('INVOICE_SENT', data);

    return {
      success: true,
      message: 'Invoice sent notification processed',
      action: 'invoice_sent',
      invoiceId: data.invoiceId
    };
  } catch (error) {
    logError('INVOICE_SENT_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle invoice paid event
 */
async function handleInvoicePaid(data) {
  try {
    logWebhookEvent('INVOICE_PAID', data);

    // This might be duplicate of payment.completed, but handle it
    if (data.paymentId) {
      await updatePaymentStatus(data.paymentId, 'completed', {
        paidAt: new Date().toISOString(),
        invoiceId: data.invoiceId
      });
    }

    return {
      success: true,
      message: 'Invoice payment processed',
      action: 'invoice_paid',
      invoiceId: data.invoiceId
    };
  } catch (error) {
    logError('INVOICE_PAID_HANDLER_ERROR', error);
    throw error;
  }
}

/**
 * Handle invoice cancelled event
 */
async function handleInvoiceCancelled(data) {
  try {
    logWebhookEvent('INVOICE_CANCELLED', data);

    if (data.paymentId) {
      await updatePaymentStatus(data.paymentId, 'cancelled', {
        cancelledAt: new Date().toISOString(),
        invoiceId: data.invoiceId
      });
    }

    return {
      success: true,
      message: 'Invoice cancellation processed',
      action: 'invoice_cancelled',
      invoiceId: data.invoiceId
    };
  } catch (error) {
    logError('INVOICE_CANCELLED_HANDLER_ERROR', error);
    throw error;
  }
}

module.exports = {
  processWebhook,
  handlePaymentCompleted,
  handlePaymentFailed,
  handlePaymentCancelled,
  handlePaymentRefunded,
  handleInvoiceCreated,
  handleInvoiceSent,
  handleInvoicePaid,
  handleInvoiceCancelled
};