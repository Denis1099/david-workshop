-- Create payments table
CREATE TABLE payments (
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
    
    -- Add indexes
    CONSTRAINT payments_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'))
);

-- Create indexes for better performance
CREATE INDEX idx_payments_seminar_id ON payments(seminar_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
CREATE INDEX idx_payments_email ON payments(participant_email);
CREATE INDEX idx_payments_green_invoice_id ON payments(green_invoice_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert payments" ON payments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read payments" ON payments
    FOR SELECT USING (true);

CREATE POLICY "Anyone can update payments" ON payments
    FOR UPDATE USING (true);

-- Grant permissions
GRANT ALL ON payments TO authenticated;
GRANT ALL ON payments TO anon;