-- Migration to add payment_link column to seminars table
-- Run this in your Supabase SQL editor or through psql

-- Add payment_link column to seminars table
ALTER TABLE public.seminars 
ADD COLUMN payment_link TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.seminars.payment_link IS 'External payment link (Green Invoice or other payment processor)';

-- Update the existing Tel Aviv seminar with the example payment link
UPDATE public.seminars 
SET payment_link = 'https://pages.greeninvoice.co.il/payments/links/1af96424-6067-42f6-88c1-a6c902f042e0'
WHERE city = 'תל אביב' AND date = '2025-02-15';

-- Verify the migration
SELECT id, city, date, payment_link FROM public.seminars WHERE city = 'תל אביב';