export interface Seminar {
  id: number;
  title?: string;
  city: string;
  date: string; // ISO date string
  time_start: string; // HH:MM format
  time_end: string; // HH:MM format
  venue_name: string;
  venue_address?: string;
  max_participants: number;
  current_participants: number;
  price: number; // in Israeli Shekels
  status: SeminarStatus;
  special_notes?: string;
  created_at?: string;
}

export type SeminarStatus = 'active' | 'draft' | 'sold_out' | 'cancelled' | 'completed';

export interface SeminarCardProps {
  seminar: Seminar;
  onDetailsClick: (seminar: Seminar) => void;
  onRegisterClick: (seminar: Seminar) => void;
}

export interface SeminarGridProps {
  seminars: Seminar[];
  loading?: boolean;
  error?: string | null;
  onDetailsClick: (seminar: Seminar) => void;
  onRegisterClick: (seminar: Seminar) => void;
}

export interface StatusBadgeProps {
  seminar: Seminar;
  className?: string;
}

// Helper type for availability status
export type AvailabilityStatus = 'available' | 'almost_full' | 'sold_out' | 'cancelled';

// Utility function types
export interface SeminarFilters {
  status?: SeminarStatus[];
  city?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SeminarService {
  fetchUpcomingSeminars: (filters?: SeminarFilters) => Promise<Seminar[]>;
  fetchPastSeminars: (limit?: number) => Promise<Seminar[]>;
  getSeminarById: (id: number) => Promise<Seminar | null>;
  getHomepageSeminars: (limit?: number) => Promise<Seminar[]>;
}