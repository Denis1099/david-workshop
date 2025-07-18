export interface PaymentData {
  id: string;
  seminarId: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  greenInvoiceId?: string;
  invoiceNumber?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  failedAt?: string;
  failureReason?: string;
  invoice?: {
    id: string;
    url: {
      he?: string;
      origin?: string;
    };
  };
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface PaymentFormData {
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  businessName?: string;
  businessTaxId?: string;
  isBusinessPayment: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface GreenInvoiceCreateRequest {
  type: number; // 320 for invoice
  lang: string; // 'he' for Hebrew
  currency: string; // 'ILS'
  vatType: number; // 0 = include VAT, 1 = exclude VAT
  client: {
    name: string;
    email: string;
    phone: string;
    taxId?: string;
  };
  income: Array<{
    description: string;
    quantity: number;
    price: number;
    currency: string;
    vatType: number;
  }>;
  remarks?: string;
  footer?: string;
  paymentRequest?: {
    sum: number;
    currency: string;
    dueDate: string;
  };
}

export interface GreenInvoiceResponse {
  id: string;
  number: string;
  url: string;
  urlDirect: string;
  sum: number;
  currency: string;
  date: string;
  dueDate: string;
  status: string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  paymentRequest?: {
    id: string;
    sum: number;
    currency: string;
    status: string;
    paymentUrl: string;
  };
}

export interface WebhookPayload {
  event: string; // 'payment.completed', 'payment.failed', etc.
  data: {
    id: string;
    invoiceId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    timestamp: string;
    metadata?: {
      seminarId: string;
      participantEmail: string;
    };
  };
  signature: string;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  seminarId: string;
  seminarTitle: string;
  seminarPrice: number;
  seminarDate: string;
  onPaymentSuccess: (paymentData: PaymentData) => void;
  onPaymentError: (error: PaymentError) => void;
}

export interface PaymentButtonProps {
  seminarId: string;
  seminarTitle: string;
  seminarPrice: number;
  isAvailable: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export interface PaymentStatusProps {
  status: PaymentStatus;
  message?: string;
  invoiceUrl?: string;
  onRetry?: () => void;
  onClose?: () => void;
}