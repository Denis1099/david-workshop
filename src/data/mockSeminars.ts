import { Seminar } from '../types/seminar';

export const mockUpcomingSeminars: Seminar[] = [
  {
    id: 1,
    city: "תל אביב",
    date: "2025-02-15",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "פיט אנד פאן",
    venue_address: "רחוב הברזל 32, תל אביב",
    max_participants: 15,
    current_participants: 12,
    price: 480,
    status: "active",
    special_notes: undefined
  },
  {
    id: 2,
    city: "חיפה",
    date: "2025-02-22",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "בולדר חיפה",
    venue_address: "רחוב הרצל 45, חיפה",
    max_participants: 15,
    current_participants: 8,
    price: 480,
    status: "active",
    special_notes: undefined
  },
  {
    id: 3,
    city: "ירושלים",
    date: "2025-03-01",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "ג'ים סנטר",
    venue_address: "רחוב יפו 120, ירושלים",
    max_participants: 15,
    current_participants: 5,
    price: 480,
    status: "active",
    special_notes: undefined
  },
  {
    id: 4,
    city: "באר שבע",
    date: "2025-03-08",
    time_start: "09:00",
    time_end: "13:00",
    venue_name: "פיטנס פלוס",
    venue_address: "שדרות רגר 8, באר שבע",
    max_participants: 15,
    current_participants: 15,
    price: 480,
    status: "sold_out",
    special_notes: undefined
  },
  {
    id: 5,
    city: "נתניה",
    date: "2025-03-15",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "אולמי כושר נתניה",
    venue_address: "רחוב הרצל 78, נתניה",
    max_participants: 15,
    current_participants: 0,
    price: 480,
    status: "cancelled",
    special_notes: "הסדנה בוטלה בשל נסיבות בלתי צפויות"
  },
  {
    id: 6,
    city: "אשדוד",
    date: "2025-03-22",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "מכון כושר אשדוד",
    venue_address: "רחוב הנשיא 15, אשדוד",
    max_participants: 15,
    current_participants: 3,
    price: 480,
    status: "active",
    special_notes: undefined
  }
];

export const mockPastSeminars: Seminar[] = [
  {
    id: 101,
    city: "רמת גן",
    date: "2025-01-15",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "גיבורי ספורט",
    venue_address: "רחוב ביאליק 25, רמת גן",
    max_participants: 15,
    current_participants: 15,
    price: 450,
    status: "completed",
    special_notes: "סדנה מוצלחת עם משוב מעולה"
  },
  {
    id: 102,
    city: "פתח תקווה",
    date: "2025-01-08",
    time_start: "09:00",
    time_end: "13:00",
    venue_name: "אולמי הספורט פתח תקווה",
    venue_address: "שדרות זאב ז'בוטינסקי 101, פתח תקווה",
    max_participants: 15,
    current_participants: 14,
    price: 450,
    status: "completed",
    special_notes: undefined
  },
  {
    id: 103,
    city: "רחובות",
    date: "2024-12-25",
    time_start: "10:00",
    time_end: "14:00",
    venue_name: "פיטנס אריס",
    venue_address: "רחוב הרצל 88, רחובות",
    max_participants: 15,
    current_participants: 13,
    price: 450,
    status: "completed",
    special_notes: undefined
  }
];

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};