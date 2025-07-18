// Simple Node.js test for production payment system
// Node.js 18+ has native fetch support

const testData = {
  seminar: {
    id: 1,
    city: 'תל אביב',
    date: '2025-08-15',
    price: 300,
    special_notes: 'סמינר טסט',
    payment_enabled: true,
    payment_deadline: '2025-08-15',
    venue_name: 'אולם טסט',
    venue_address: 'כתובת טסט',
    max_participants: 20,
    current_participants: 5,
    status: 'active',
    time_start: '10:00',
    time_end: '16:00'
  },
  paymentData: {
    participantName: 'טסט משתתף',
    participantEmail: 'test@example.com',
    participantPhone: '050-1234567',
    businessName: '',
    businessTaxId: '',
    isBusinessPayment: false,
    acceptTerms: true,
    acceptPrivacy: true
  }
};

async function testProductionPayment() {
  console.log('Testing production payment system...');
  
  try {
    const response = await fetch('https://czszywrzxfckhxutxuqj.supabase.co/functions/v1/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6c3p5d3J6eGZja2h4dXR4dXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMjU4NjIsImV4cCI6MjA1MTkwMTg2Mn0.bJQmhQMPOHjkC6fwYbqSWXJSOwT7MjZ3mXBKQ8JWaZc'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Production payment system working!');
    } else {
      console.log('❌ Production payment system failed');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testProductionPayment();