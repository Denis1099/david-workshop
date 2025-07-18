-- Create payments table
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
    
    -- Add constraint
    CONSTRAINT payments_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_seminar_id ON payments(seminar_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(participant_email);
CREATE INDEX IF NOT EXISTS idx_payments_green_invoice_id ON payments(green_invoice_id);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Anyone can insert payments') THEN
        CREATE POLICY "Anyone can insert payments" ON payments FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Anyone can read payments') THEN
        CREATE POLICY "Anyone can read payments" ON payments FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Anyone can update payments') THEN
        CREATE POLICY "Anyone can update payments" ON payments FOR UPDATE USING (true);
    END IF;
END $$;