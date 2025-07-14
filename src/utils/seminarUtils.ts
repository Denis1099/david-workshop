import { Seminar } from '../types/seminar';

/**
 * Hebrew city name normalization for URLs
 * Maps Hebrew city names to URL-friendly slugs
 */
const CITY_SLUG_MAP: Record<string, string> = {
  'תל אביב': 'tel-aviv',
  'ירושלים': 'jerusalem',
  'חיפה': 'haifa',
  'באר שבע': 'beer-sheva',
  'אשדוד': 'ashdod',
  'נתניה': 'netanya',
  'פתח תקווה': 'petah-tikva',
  'ראשון לציון': 'rishon-lezion',
  'רחובות': 'rehovot',
  'אשקלון': 'ashkelon',
  'חולון': 'holon',
  'רמת גן': 'ramat-gan',
  'בת ים': 'bat-yam',
  'כפר סבא': 'kfar-saba',
  'הרצליה': 'herzliya',
  'רמת השרון': 'ramat-hasharon',
  'רעננה': 'raanana',
  'גבעתיים': 'givatayim',
  'ראש העין': 'rosh-haayin',
  'קריית גת': 'kiryat-gat'
};

/**
 * Reverse mapping from slug to Hebrew city name
 */
const SLUG_CITY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CITY_SLUG_MAP).map(([hebrew, slug]) => [slug, hebrew])
);

/**
 * Generate a URL-friendly slug for a seminar
 * Format: {city-slug}-{date-YYYY-MM-DD}
 * Example: "tel-aviv-2025-08-15"
 */
export function generateSeminarSlug(seminar: Seminar): string {
  const citySlug = CITY_SLUG_MAP[seminar.city] || 
    seminar.city.toLowerCase()
      .replace(/[^\u0590-\u05FF\w\s-]/g, '') // Remove non-Hebrew, non-alphanumeric chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single
      .trim();

  const dateSlug = seminar.date; // Already in YYYY-MM-DD format
  
  return `${citySlug}-${dateSlug}`;
}

/**
 * Parse a seminar slug to extract city and date
 * Returns null if slug format is invalid
 */
export function parseSeminarSlug(slug: string): { city: string; date: string } | null {
  try {
    // Slug format: {city-slug}-{YYYY-MM-DD}
    // We need to find the date part (last 10 characters should be YYYY-MM-DD)
    if (slug.length < 12) return null; // Minimum length for a valid slug
    
    const datePart = slug.slice(-10); // Last 10 characters
    const cityPart = slug.slice(0, -(10 + 1)); // Everything except date and the hyphen
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(datePart)) return null;
    
    // Validate that it's a real date
    const date = new Date(datePart);
    if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== datePart) {
      return null;
    }
    
    // Convert city slug back to Hebrew if possible
    const hebrewCity = SLUG_CITY_MAP[cityPart] || cityPart;
    
    return {
      city: hebrewCity,
      date: datePart
    };
  } catch (error) {
    return null;
  }
}

/**
 * Validate if a slug matches the expected format
 */
export function isValidSeminarSlug(slug: string): boolean {
  return parseSeminarSlug(slug) !== null;
}

/**
 * Get the display URL for a seminar
 * Used in sharing and SEO
 */
export function getSeminarUrl(seminar: Seminar, baseUrl: string = ''): string {
  const slug = generateSeminarSlug(seminar);
  return `${baseUrl}/seminars/${slug}`;
}

/**
 * Create SEO-friendly title for a seminar page
 */
export function generateSeminarPageTitle(seminar: Seminar): string {
  const formattedDate = new Date(seminar.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return `סדנת הרמת משקולות אולימפית - ${seminar.city} ${formattedDate} | דוד ליטבינוב`;
}

/**
 * Create SEO-friendly description for a seminar page
 */
export function generateSeminarPageDescription(seminar: Seminar): string {
  const formattedDate = new Date(seminar.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long'
  });
  
  return `הצטרפו לסדנת הרמת המשקולות האולימפית של דוד ליטבינוב ב${seminar.city} ב-${formattedDate}. למדו טכניקות מתקדמות, קבלו הדרכה אישית ושפרו את הביצועים שלכם. ${seminar.max_participants - seminar.current_participants} מקומות נותרו!`;
}