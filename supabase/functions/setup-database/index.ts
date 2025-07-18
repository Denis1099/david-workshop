import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req: Request) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create payments table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS payments (
          id TEXT PRIMARY KEY,
          seminar_id TEXT NOT NULL,
          participant_name TEXT NOT NULL,
          participant_email TEXT NOT NULL,
          participant_phone TEXT NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          currency TEXT NOT NULL DEFAULT 'ILS',
          status TEXT NOT NULL DEFAULT 'pending',
          green_invoice_id TEXT,
          invoice_number TEXT,
          payment_method TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          paid_at TIMESTAMP WITH TIME ZONE,
          failed_at TIMESTAMP WITH TIME ZONE,
          failure_reason TEXT,
          
          CONSTRAINT payments_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'))
        );

        CREATE INDEX IF NOT EXISTS idx_payments_seminar_id ON payments(seminar_id);
        CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
        CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
        CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(participant_email);
        CREATE INDEX IF NOT EXISTS idx_payments_green_invoice_id ON payments(green_invoice_id);

        ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
      `
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Database setup completed successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Setup error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      details: 'Database setup failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})