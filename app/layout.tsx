import type { Metadata } from 'next';
import { Rubik, Heebo } from 'next/font/google';
import './globals.css';

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'סדנאות האלתרה של דוד ליטבינוב - למד הרמת משקולות נכון',
    template: '%s | דוד ליטבינוב'
  },
  description: 'למד הרמת משקולות אולימפית מדוד ליטבינוב, אלוף ישראל לשעבר וספורטאי אולימפי. סדנאות מקצועיות לקרוספיטרים ומתעמלים בכל רחבי הארץ.',
  keywords: ['הרמת משקולות', 'קרוספיט', 'דוד ליטבינוב', 'סדנאות', 'אולימפיאדה', 'ישראל'],
  authors: [{ name: 'דוד ליטבינוב' }],
  creator: 'דוד ליטבינוב',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://davidlitvinov.com',
    title: 'סדנאות האלתרה של דוד ליטבינוב',
    description: 'למד הרמת משקולות אולימפית מדוד ליטבינוב, אלוף ישראל לשעבר וספורטאי אולימפי.',
    siteName: 'דוד ליטבינוב - סדנאות הרמת משקולות',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'סדנאות האלתרה של דוד ליטבינוב',
    description: 'למד הרמת משקולות אולימפית מדוד ליטבינוב, אלוף ישראל לשעבר וספורטאי אולימפי.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${heebo.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-bg-primary font-heebo">
        {children}
      </body>
    </html>
  );
}