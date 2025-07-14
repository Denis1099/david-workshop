import { Registration, NewsletterLead, AdminSettings, DashboardStats, ActivityItem } from '../types/admin';

export const mockRegistrations: Registration[] = [
  {
    id: 1,
    seminar_id: 1,
    name: "יוסי כהן",
    email: "yossi.cohen@gmail.com",
    phone: "050-123-4567",
    payment_status: "paid",
    registration_date: "2025-01-15T10:30:00",
    notes: "שילם דרך PayPal",
    seminar: {
      city: "תל אביב",
      date: "2025-02-15",
      time_start: "10:00"
    }
  },
  {
    id: 2,
    seminar_id: 1,
    name: "שרה לוי",
    email: "sarah.levi@example.com",
    phone: "052-987-6543",
    payment_status: "pending",
    registration_date: "2025-01-14T14:20:00",
    notes: "ממתינה לתשלום",
    seminar: {
      city: "תל אביב",
      date: "2025-02-15",
      time_start: "10:00"
    }
  },
  {
    id: 3,
    seminar_id: 2,
    name: "מיכל דוד",
    email: "michal.david@mail.com",
    phone: "054-555-1234",
    payment_status: "paid",
    registration_date: "2025-01-13T09:15:00",
    notes: "תשלום במזומן",
    seminar: {
      city: "חיפה",
      date: "2025-02-22",
      time_start: "10:00"
    }
  },
  {
    id: 4,
    seminar_id: 3,
    name: "דני רוזן",
    email: "danny.rosen@company.co.il",
    phone: "050-888-9999",
    payment_status: "cancelled",
    registration_date: "2025-01-12T16:45:00",
    notes: "ביטל בגלל עומס בעבודה",
    seminar: {
      city: "ירושלים",
      date: "2025-03-01",
      time_start: "10:00"
    }
  },
  {
    id: 5,
    seminar_id: 2,
    name: "אבי גולדברג",
    email: "avi.goldberg@sport.com",
    phone: "052-777-3333",
    payment_status: "paid",
    registration_date: "2025-01-11T11:00:00",
    notes: "מדריך כושר מקצועי",
    seminar: {
      city: "חיפה",
      date: "2025-02-22",
      time_start: "10:00"
    }
  }
];

export const mockNewsletterLeads: NewsletterLead[] = [
  {
    id: 1,
    email: "info@crossfit-tlv.com",
    name: "מנהל CrossFit תל אביב",
    phone: "03-123-4567",
    contacted_status: "contacted",
    date_added: "2025-01-10T08:30:00",
    notes: "מעוניין בסדנאות קבוצתיות",
    source: "contact_form"
  },
  {
    id: 2,
    email: "trainer@gym-haifa.co.il",
    name: "רונית מדריכה",
    phone: "04-987-6543",
    contacted_status: "responded",
    date_added: "2025-01-09T15:20:00",
    notes: "שלחה שאלות נוספות",
    source: "newsletter_signup"
  },
  {
    id: 3,
    email: "manager@fitness-center.com",
    name: "אלון מנהל",
    phone: "050-555-7777",
    contacted_status: "not_contacted",
    date_added: "2025-01-08T12:45:00",
    notes: "מנהל רשת מכוני כושר",
    source: "referral"
  },
  {
    id: 4,
    email: "sport@university.ac.il",
    name: "מחלקת ספורט",
    phone: "02-678-9012",
    contacted_status: "contacted",
    date_added: "2025-01-07T10:15:00",
    notes: "אוניברסיטה מעוניינת בהרצאה",
    source: "direct_inquiry"
  },
  {
    id: 5,
    email: "personal.trainer@gmail.com",
    name: "יעל מאמנת אישית",
    phone: "052-333-8888",
    contacted_status: "unsubscribed",
    date_added: "2025-01-06T14:30:00",
    notes: "ביקשה להסיר מהרשימה",
    source: "social_media"
  }
];

export const mockAdminSettings: AdminSettings = {
  contact_phone: "050-123-4567",
  contact_email: "david@weightlifting-seminars.co.il",
  whatsapp_link: "https://wa.me/972501234567",
  admin_password: "admin123"
};

export const mockDashboardStats: DashboardStats = {
  total_seminars: 9,
  active_seminars: 5,
  total_registrations: 47,
  pending_payments: 8,
  newsletter_leads: 23,
  revenue_this_month: 14400
};

export const mockActivityItems: ActivityItem[] = [
  {
    id: 1,
    type: 'registration',
    message: 'רישום חדש: יוסי כהן לסדנה בתל אביב',
    timestamp: '2025-01-15T10:30:00',
    details: { registration_id: 1, seminar_id: 1 }
  },
  {
    id: 2,
    type: 'payment',
    message: 'תשלום התקבל: שרה לוי - ₪480',
    timestamp: '2025-01-14T16:45:00',
    details: { registration_id: 2, amount: 480 }
  },
  {
    id: 3,
    type: 'seminar',
    message: 'סדנה חדשה נוספה: אשדוד - 22/03/2025',
    timestamp: '2025-01-14T09:20:00',
    details: { seminar_id: 6 }
  },
  {
    id: 4,
    type: 'newsletter',
    message: 'מנוי חדש: info@crossfit-tlv.com',
    timestamp: '2025-01-13T11:15:00',
    details: { lead_id: 1 }
  },
  {
    id: 5,
    type: 'registration',
    message: 'ביטול רישום: דני רוזן מסדנה בירושלים',
    timestamp: '2025-01-12T14:30:00',
    details: { registration_id: 4, seminar_id: 3 }
  },
  {
    id: 6,
    type: 'seminar',
    message: 'סדנה בנתניה בוטלה בגלל מספר נמוך של נרשמים',
    timestamp: '2025-01-11T13:00:00',
    details: { seminar_id: 5 }
  },
  {
    id: 7,
    type: 'payment',
    message: 'תשלום התקבל: מיכל דוד - ₪480',
    timestamp: '2025-01-10T17:20:00',
    details: { registration_id: 3, amount: 480 }
  },
  {
    id: 8,
    type: 'newsletter',
    message: 'פנייה חדשה: trainer@gym-haifa.co.il',
    timestamp: '2025-01-09T15:45:00',
    details: { lead_id: 2 }
  }
];

export const simulateApiDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};