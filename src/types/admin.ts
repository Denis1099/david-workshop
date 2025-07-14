import React from 'react';

export interface Registration {
  id: number;
  seminar_id: number;
  name: string;
  email: string;
  phone: string;
  payment_status: PaymentStatus;
  registration_date: string;
  notes?: string;
  seminar?: {
    title?: string;
    city: string;
    date: string;
    time_start: string;
  };
}

export type PaymentStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';

export interface NewsletterLead {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  contacted_status: ContactedStatus;
  date_added: string;
  notes?: string;
  source?: string;
}

export type ContactedStatus = 'not_contacted' | 'contacted' | 'responded' | 'unsubscribed';

export interface AdminSettings {
  contact_phone: string;
  contact_email: string;
  whatsapp_link: string;
  admin_password: string;
}

export interface DashboardStats {
  total_seminars: number;
  active_seminars: number;
  total_registrations: number;
  pending_payments: number;
  newsletter_leads: number;
  revenue_this_month: number;
}

export interface ActivityItem {
  id: number;
  type: 'registration' | 'payment' | 'seminar' | 'newsletter';
  message: string;
  timestamp: string;
  details?: any;
}

export interface AdminUser {
  id: number;
  username: string;
  isAuthenticated: boolean;
  lastLogin: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  searchTerm?: string;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: any) => void;
  selectedRows?: number[];
  onSelectRow?: (id: number) => void;
  onSelectAll?: (selected: boolean) => void;
}

export interface FilterOptions {
  status?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  city?: string;
  search?: string;
}

export interface ExportOptions {
  format: 'csv' | 'xlsx';
  selectedOnly?: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
}