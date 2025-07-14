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

### Future Integration Plans
The README indicates planned integrations with:
- Supabase for database and authentication
- Green Invoice API for payment processing
- WhatsApp contact system
- Admin panel for content management

When working on this codebase, prioritize RTL compatibility, maintain the established design system, and ensure all new components follow the sections-based architecture pattern.