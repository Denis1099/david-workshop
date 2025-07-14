import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Seminar } from '../types/seminar';
import { SeminarsService } from '../services/seminarsService';
import { generateSeminarPageTitle, generateSeminarPageDescription } from '../utils/seminarUtils';

const SeminarSalesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      if (!slug) {
        setError('פרמטר URL לא תקין');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const seminarData = await SeminarsService.getSeminarBySlug(slug);
        
        if (!seminarData) {
          setError('הסדנה לא נמצאה');
        } else {
          setSeminar(seminarData);
          // Update page title and meta description
          document.title = generateSeminarPageTitle(seminarData);
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', generateSeminarPageDescription(seminarData));
          }
        }
      } catch (err) {
        console.error('Error fetching seminar:', err);
        setError('שגיאה בטעינת פרטי הסדנה');
      } finally {
        setLoading(false);
      }
    };

    fetchSeminar();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeStart: string, timeEnd: string) => {
    const cleanTime = (time: string) => time.split(':').slice(0, 2).join(':');
    return `${cleanTime(timeStart)}-${cleanTime(timeEnd)}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `שלום דוד! אני מעוניין להירשם לסדנת הרמת המשקולות האולימפית ב${seminar?.city} בתאריך ${formatDate(seminar?.date || '')}`
    );
    window.open(`https://wa.me/972501234567?text=${message}`, '_blank');
  };

  const getAvailabilityInfo = () => {
    if (!seminar) return null;
    return SeminarsService.getAvailabilityInfo(seminar);
  };

  const availabilityInfo = getAvailabilityInfo();
  const isAvailable = seminar && SeminarsService.isAvailableForRegistration(seminar);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta mx-auto mb-4"></div>
          <p className="typo-body-medium text-text-primary">טוען פרטי סדנה...</p>
        </div>
      </div>
    );
  }

  if (error || !seminar) {
    return <Navigate to="/seminars" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="typo-page-title text-text-primary mb-8">
              סדנת הרמת משקולות אולימפית
            </h1>
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-text-primary">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="typo-body-large font-medium">{seminar.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="typo-body-large font-medium">{formatDate(seminar.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="typo-body-large font-medium">{formatTime(seminar.time_start, seminar.time_end)}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <span className="typo-body-large font-medium text-text-primary">{seminar.venue_name}</span>
              </div>
              {seminar.venue_address && (
                <p className="typo-body-medium text-text-primary/70">{seminar.venue_address}</p>
              )}
            </div>

            {/* Availability Status */}
            {availabilityInfo && (
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-8 ${
                availabilityInfo.status === 'available' ? 'bg-green-100 text-green-800' :
                availabilityInfo.status === 'almost_full' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                <span className="typo-body-medium font-medium">{availabilityInfo.message}</span>
              </div>
            )}

            {/* Price */}
            <div className="text-center mb-8">
              <div className="typo-section-title text-cta">₪{seminar.price}</div>
              <p className="typo-body-medium text-text-primary/70 mt-2">למשתתף</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAvailable ? (
                <>
                  <button
                    onClick={handleWhatsAppClick}
                    className="typo-button-large bg-cta hover:bg-cta/90 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    הרשמה מהירה - WhatsApp
                  </button>
                  <button className="typo-button-large border-2 border-cta text-cta hover:bg-cta hover:text-white px-8 py-4 rounded-lg transition-colors duration-200 font-medium">
                    הרשמה באתר
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="typo-button-large bg-gray-400 text-white px-8 py-4 rounded-lg cursor-not-allowed font-medium"
                >
                  הסדנה לא זמינה להרשמה
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="typo-section-title text-gray-900 text-center mb-12">
              מה תלמד בסדנה?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">טכניקת סנאץ' מושלמת</h3>
                    <p className="typo-body-medium text-gray-600">פירוק התנועה לשלבים, זיהוי שגיאות נפוצות ותיקונן</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">טכניקת קלין אנד ג'רק</h3>
                    <p className="typo-body-medium text-gray-600">למידת התנועה המורכבת בצורה מובנית ובטוחה</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">תכנות אימונים</h3>
                    <p className="typo-body-medium text-gray-600">איך לבנות תוכנית אימונים יעילה להרמת משקולות</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">מניעת פציעות</h3>
                    <p className="typo-body-medium text-gray-600">עקרונות בטיחות ומיםוב לביצוע בטוח של ההרמות</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">הדרכה אישית</h3>
                    <p className="typo-body-medium text-gray-600">קבלת פידבק אישי והתאמת הטכניקה לגוף שלך</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="typo-body-large font-bold text-gray-900 mb-2">התקדמות מתמשכת</h3>
                    <p className="typo-body-medium text-gray-600">כלים להמשך השיפור לאחר הסדנה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About David Section */}
      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="typo-section-title text-text-primary text-center mb-12">
              מי מדריך אותך?
            </h2>
            <div className="text-center mb-8">
              <h3 className="typo-body-large font-bold text-cta mb-4">דוד ליטבינוב</h3>
              <p className="typo-body-large text-text-primary mb-6">
                מאמן הרמת משקולות אולימפית עם ניסיון של למעלה מ-10 שנים
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-text-primary">
                <div className="space-y-2">
                  <p className="typo-body-medium">✓ מאמן מוסמך USAW</p>
                  <p className="typo-body-medium">✓ יוצא נבחרת ישראל בהרמת משקולות</p>
                  <p className="typo-body-medium">✓ מאמן של ספורטאים ברמה הגבוהה ביותר</p>
                </div>
                <div className="space-y-2">
                  <p className="typo-body-medium">✓ למעלה מ-500 ספורטאים הוכשרו</p>
                  <p className="typo-body-medium">✓ התמחות בטכניקת הרמה מושלמת</p>
                  <p className="typo-body-medium">✓ גישה מותאמת אישית לכל ספורטאי</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Notes */}
      {seminar.special_notes && (
        <section className="py-12 bg-yellow-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg border-r-4 border-yellow-400">
                <h3 className="typo-body-large font-bold text-gray-900 mb-2">הערות חשובות</h3>
                <p className="typo-body-medium text-gray-600">{seminar.special_notes}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typo-section-title text-white mb-6">
              מוכן לשפר את הטכניקה שלך?
            </h2>
            <p className="typo-body-large text-white/90 mb-8">
              הצטרף לסדנה ב{seminar.city} וקח את הביצועים שלך לרמה הבאה
            </p>
            {isAvailable ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppClick}
                  className="typo-button-large bg-white hover:bg-gray-100 text-cta px-8 py-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  הרשמה מהירה - WhatsApp
                </button>
                <button className="typo-button-large border-2 border-white text-white hover:bg-white hover:text-cta px-8 py-4 rounded-lg transition-colors duration-200 font-medium">
                  הרשמה באתר
                </button>
              </div>
            ) : (
              <p className="typo-body-large text-white/80">
                {availabilityInfo?.message}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeminarSalesPage;