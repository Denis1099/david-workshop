# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm start` - Start development server on localhost:3000
- `npm run build` - Build production version
- `npm test` - Run test suite with Jest/React Testing Library
- `npm run eject` - Eject from Create React App (irreversible)

### Development Workflow
This is a React TypeScript project using Create React App. Run `npm start` for development and `npm run build` for production builds.

## Project Architecture

### Core Technology Stack
- **React 19** with TypeScript
- **React Router DOM** for navigation
- **Tailwind CSS** with custom utilities for styling
- **Axios** for API calls
- **React Testing Library** for testing

### RTL (Hebrew) Optimization
This is a Hebrew-language website optimized for RTL (right-to-left) text direction:
- Custom Tailwind utilities for Hebrew typography
- Font families: Rubik (headlines/buttons), Heebo (body text)
- RTL-optimized layouts and spacing
- Text wrapping utilities with character limits for Hebrew content

### Component Structure
```
src/
├── components/
│   ├── common/          # Shared components (Header, Footer, FloatingWhatsApp)
│   └── sections/        # Page section components (Hero, AboutDavid, etc.)
├── pages/               # Route-level page components
│   ├── Home.tsx         # Main landing page with all sections
│   └── FAQ.tsx          # Standalone FAQ page
└── App.tsx              # Main router and layout
```

### Design System
**Brand Colors:**
- `bg-primary`: #0C2C48 (dark blue background)
- `cta`: #DA9B28 (orange CTA buttons)
- `text-primary`: #FBFBFA (off-white text)
- `navbar-bg`: #FBFBFA (white navbar)
- `navbar-text`: #101010 (dark navbar text)

**Typography Classes:**
- `.typo-page-title` - Large page headlines
- `.typo-section-title` - Section headers
- `.typo-body-*` - Body text variants
- `.typo-button-*` - Button text styles
- `.text-wrap-*` - Character-limited text wrapping (30, 50, 60, 75 chars)

### Page Layout Pattern
The Home page follows a single-page application pattern with sections:
1. Hero - Main landing section
2. AboutSeminar - Seminar overview
3. WhySeminar - Benefits and value proposition
4. SeminarBreakdown - Course content details
5. AboutDavid - Instructor bio and credentials
6. Testimonials - Social proof
7. UpcomingSeminars - Event listings
8. VideoShowcase - Media content
9. FAQ - Common questions
10. ContactForm - Lead generation

### Business Context
This is a conversion-optimized website for David Litvinov's weightlifting seminars in Israel. The site targets CrossFit athletes and fitness enthusiasts seeking Olympic weightlifting instruction. Key business goals:
- Generate seminar ticket sales
- Capture WhatsApp leads
- Establish credibility through professional design
- Support Hebrew-speaking Israeli audience

## Payment System Architecture

### Current State (WhatsApp-Only Flow)
The payment system is temporarily configured for WhatsApp-only registration flow:
- **Primary CTA**: WhatsApp button with seminar-specific messages
- **Message Format**: `"היי דוד, אני רוצה לקבל פרטים על הסדנה {city} בתאריך {date}"`
- **WhatsApp Number**: `972544901057`
- **Manual Processing**: All registrations handled through WhatsApp conversation

### Payment Infrastructure (Ready for Restoration)
Payment components are temporarily disabled but preserved in codebase:

#### **Green Invoice Integration**
- **Purpose**: Business management & tax-compliant invoicing (NOT payment processing)
- **API Endpoints**: Creates invoices/receipts for Israeli tax compliance
- **Edge Functions**: 
  - `/functions/v1/create-payment` - Creates invoice + payment record
  - `/functions/v1/create-invoice` - Invoice generation only
  - `/functions/v1/green-invoice-webhook` - Payment status updates
- **Environment Variables**: `GREEN_INVOICE_API_KEY`, `GREEN_INVOICE_SECRET`
- **Status**: Functional but disabled for WhatsApp flow

#### **Payment Processor Requirements (Future)**
Green Invoice does NOT process credit cards. For payment processing, integrate:
- **Israeli Options**: Tranzila, Cardcom, Isracard (~2.5-3.5% per transaction)
- **International Options**: Stripe, PayPal (~2.9% per transaction, limited in Israel)

#### **Recommended Payment Flow (Future)**
```
User → Payment Form → Payment Processor → Payment Complete → 
Auto-Generate Green Invoice → Update Database → Confirmation Email
```

### Restoration Instructions
To re-enable payment system:
1. Uncomment payment imports in `SeminarSalesPage.tsx`
2. Uncomment payment state and handlers
3. Restore PaymentButton and PaymentModal components
4. Add payment processor integration (Tranzila/Stripe)
5. Configure automatic Green Invoice generation after payment success

### Payment Component Files (Preserved)
- `src/components/payment/PaymentModal.tsx`
- `src/components/payment/PaymentButton.tsx`  
- `src/components/payment/PaymentStatus.tsx`
- `src/services/greenInvoiceService.ts`
- `src/types/payment.ts`
- `supabase/functions/*/` - Edge Functions

### Integration Plans
Current integrations:
- ✅ Supabase for database and authentication
- ✅ Green Invoice API for invoicing (disabled)
- ✅ WhatsApp contact system
- ✅ Admin panel for content management

Planned integrations:
- 🔄 Payment processor (Tranzila/Cardcom/Stripe)
- 🔄 Automated invoice generation post-payment
- 🔄 Email confirmation system

When working on this codebase, prioritize RTL compatibility, maintain the established design system, and ensure all new components follow the sections-based architecture pattern.