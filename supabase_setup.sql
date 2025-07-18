-- Create seminars table
CREATE TABLE public.seminars (
    id SERIAL PRIMARY KEY,
    title TEXT,
    city TEXT NOT NULL,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    max_participants INTEGER DEFAULT 15,
    current_participants INTEGER DEFAULT 0,
    price INTEGER NOT NULL,
    status TEXT CHECK (status IN ('active', 'draft', 'sold_out', 'cancelled', 'completed')) DEFAULT 'draft',
    special_notes TEXT,
    payment_link TEXT, -- External payment link (Green Invoice or other payment processor)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE public.registrations (
    id SERIAL PRIMARY KEY,
    seminar_id INTEGER REFERENCES public.seminars(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'cancelled', 'refunded')) DEFAULT 'pending',
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    amount INTEGER
);

-- Create newsletter_leads table
CREATE TABLE public.newsletter_leads (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    phone TEXT,
    contacted_status TEXT CHECK (contacted_status IN ('not_contacted', 'contacted', 'responded', 'unsubscribed')) DEFAULT 'not_contacted',
    date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT,
    notes TEXT
);

-- Create admin_settings table
CREATE TABLE public.admin_settings (
    id SERIAL PRIMARY KEY,
    contact_phone TEXT,
    contact_email TEXT,
    whatsapp_link TEXT,
    admin_password TEXT
);

-- Create activity_log table
CREATE TABLE public.activity_log (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB
);

-- Insert default admin settings
INSERT INTO public.admin_settings (
    contact_phone, 
    contact_email, 
    whatsapp_link, 
    admin_password
) VALUES (
    '050-123-4567', 
    'david@weightlifting-seminars.co.il', 
    'https://wa.me/972501234567', 
    'admin123'
);

-- Insert sample seminars data
INSERT INTO public.seminars (title, city, date, time_start, time_end, venue_name, venue_address, max_participants, current_participants, price, status, special_notes, payment_link) VALUES
('', 'תל אביב', '2025-02-15', '10:00', '14:00', 'פיט אנד פאן', 'רחוב הברזל 32, תל אביב', 15, 12, 480, 'active', NULL, 'https://pages.greeninvoice.co.il/payments/links/1af96424-6067-42f6-88c1-a6c902f042e0'),
('', 'חיפה', '2025-02-22', '10:00', '14:00', 'בולדר חיפה', 'רחוב הרצל 45, חיפה', 15, 8, 480, 'active', NULL, NULL),
('', 'ירושלים', '2025-03-01', '10:00', '14:00', 'ג''ים סנטר', 'רחוב יפו 120, ירושלים', 15, 5, 480, 'active', NULL, NULL),
('', 'באר שבע', '2025-03-08', '09:00', '13:00', 'פיטנס פלוס', 'שדרות רגר 8, באר שבע', 15, 15, 480, 'sold_out', NULL, NULL),
('', 'נתניה', '2025-03-15', '10:00', '14:00', 'אולמי כושר נתניה', 'רחוב הרצל 78, נתניה', 15, 0, 480, 'cancelled', 'הסדנה בוטלה בשל נסיבות בלתי צפויות', NULL),
('', 'אשדוד', '2025-03-22', '10:00', '14:00', 'מכון כושר אשדוד', 'רחוב הנשיא 15, אשדוד', 15, 3, 480, 'active', NULL, NULL),
('', 'רמת גן', '2025-01-15', '10:00', '14:00', 'גיבורי ספורט', 'רחוב ביאליק 25, רמת גן', 15, 15, 450, 'completed', 'סדנה מוצלחת עם משוב מעולה', NULL),
('', 'פתח תקווה', '2025-01-08', '09:00', '13:00', 'אולמי הספורט פתח תקווה', 'שדרות זאב ז''בוטינסקי 101, פתח תקווה', 15, 14, 450, 'completed', NULL, NULL),
('', 'רחובות', '2024-12-25', '10:00', '14:00', 'פיטנס אריס', 'רחוב הרצל 88, רחובות', 15, 13, 450, 'completed', NULL, NULL);

-- Insert sample registrations
INSERT INTO public.registrations (seminar_id, name, email, phone, payment_status, registration_date, notes, amount) VALUES
(1, 'יוסי כהן', 'yossi.cohen@gmail.com', '050-123-4567', 'paid', '2025-01-15 10:30:00', 'שילם דרך PayPal', 480),
(1, 'שרה לוי', 'sarah.levi@example.com', '052-987-6543', 'pending', '2025-01-14 14:20:00', 'ממתינה לתשלום', 480),
(2, 'מיכל דוד', 'michal.david@mail.com', '054-555-1234', 'paid', '2025-01-13 09:15:00', 'תשלום במזומן', 480),
(3, 'דני רוזן', 'danny.rosen@company.co.il', '050-888-9999', 'cancelled', '2025-01-12 16:45:00', 'ביטל בגלל עומס בעבודה', 480),
(2, 'אבי גולדברג', 'avi.goldberg@sport.com', '052-777-3333', 'paid', '2025-01-11 11:00:00', 'מדריך כושר מקצועי', 480);

-- Insert sample newsletter leads
INSERT INTO public.newsletter_leads (email, name, phone, contacted_status, date_added, notes, source) VALUES
('info@crossfit-tlv.com', 'מנהל CrossFit תל אביב', '03-123-4567', 'contacted', '2025-01-10 08:30:00', 'מעוניין בסדנאות קבוצתיות', 'contact_form'),
('trainer@gym-haifa.co.il', 'רונית מדריכה', '04-987-6543', 'responded', '2025-01-09 15:20:00', 'שלחה שאלות נוספות', 'newsletter_signup'),
('manager@fitness-center.com', 'אלון מנהל', '050-555-7777', 'not_contacted', '2025-01-08 12:45:00', 'מנהל רשת מכוני כושר', 'referral'),
('sport@university.ac.il', 'מחלקת ספורט', '02-678-9012', 'contacted', '2025-01-07 10:15:00', 'אוניברסיטה מעוניינת בהרצאה', 'direct_inquiry'),
('personal.trainer@gmail.com', 'יעל מאמנת אישית', '052-333-8888', 'unsubscribed', '2025-01-06 14:30:00', 'ביקשה להסיר מהרשימה', 'social_media');

-- Insert sample activity log
INSERT INTO public.activity_log (type, message, timestamp, details) VALUES
('registration', 'רישום חדש: יוסי כהן לסדנה בתל אביב', '2025-01-15 10:30:00', '{"registration_id": 1, "seminar_id": 1}'),
('payment', 'תשלום התקבל: שרה לוי - ₪480', '2025-01-14 16:45:00', '{"registration_id": 2, "amount": 480}'),
('seminar', 'סדנה חדשה נוספה: אשדוד - 22/03/2025', '2025-01-14 09:20:00', '{"seminar_id": 6}'),
('newsletter', 'מנוי חדש: info@crossfit-tlv.com', '2025-01-13 11:15:00', '{"lead_id": 1}'),
('registration', 'ביטול רישום: דני רוזן מסדנה בירושלים', '2025-01-12 14:30:00', '{"registration_id": 4, "seminar_id": 3}'),
('seminar', 'סדנה בנתניה בוטלה בגלל מספר נמוך של נרשמים', '2025-01-11 13:00:00', '{"seminar_id": 5}'),
('payment', 'תשלום התקבל: מיכל דוד - ₪480', '2025-01-10 17:20:00', '{"registration_id": 3, "amount": 480}'),
('newsletter', 'פנייה חדשה: trainer@gym-haifa.co.il', '2025-01-09 15:45:00', '{"lead_id": 2}');

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.seminars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can restrict these later)
CREATE POLICY "Allow all operations on seminars" ON public.seminars FOR ALL USING (true);
CREATE POLICY "Allow all operations on registrations" ON public.registrations FOR ALL USING (true);
CREATE POLICY "Allow all operations on newsletter_leads" ON public.newsletter_leads FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_settings" ON public.admin_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations on activity_log" ON public.activity_log FOR ALL USING (true);