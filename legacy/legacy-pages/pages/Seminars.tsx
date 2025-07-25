import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seminar } from '../types/seminar';
import { SeminarsService } from '../services/seminarsService';
import SeminarGrid from '../components/seminars/SeminarGrid';
import { generateSeminarSlug } from '../utils/seminarUtils';

const Seminars: React.FC = () => {
  const navigate = useNavigate();
  const [upcomingSeminars, setUpcomingSeminars] = useState<Seminar[]>([]);
  const [pastSeminars, setPastSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      setError(null);

      const [upcoming, past] = await Promise.all([
        SeminarsService.fetchUpcomingSeminars(),
        SeminarsService.fetchPastSeminars(3)
      ]);

      setUpcomingSeminars(upcoming);
      setPastSeminars(past);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הסדנאות');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (seminar: Seminar) => {
    const slug = generateSeminarSlug(seminar);
    navigate(`/seminars/${slug}`);
  };

  const handleRegisterClick = (seminar: Seminar) => {
    // For now, redirect to WhatsApp
    // Later this can be replaced with a registration modal or form
    const message = `היי דוד, אני רוצה לקבל פרטים על הסדנה ${seminar.city} בתאריך ${new Date(seminar.date).toLocaleDateString('he-IL')}`;
    const whatsappUrl = `https://wa.me/972544901057?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" dir="rtl">

      {/* Upcoming Seminars */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="typo-section-title mb-6 text-content">
              סדנאות קרובות
            </h2>
          </div>

          <SeminarGrid
            seminars={upcomingSeminars}
            loading={loading}
            error={error}
            onDetailsClick={handleDetailsClick}
            onRegisterClick={handleRegisterClick}
          />

          {/* Refresh Button (if error) */}
          {error && (
            <div className="text-center mt-8">
              <button
                onClick={fetchSeminars}
                className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-regular px-6 py-3 rounded-lg transition-colors"
              >
                נסה שוב
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past Seminars (if any) */}
      {pastSeminars.length > 0 && (
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto px-4 max-w-[1200px]">
            <div className="text-center mb-16">
              <h2 className="typo-section-title mb-6 text-content">
                סדנאות שהסתיימו
              </h2>
              <p className="typo-body-large text-gray-300 max-w-3xl mx-auto">
                סדנאות שכבר התקיימו - תוכלו לראות את המגוון והיקף הפעילות
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pastSeminars.map((seminar) => (
                <div key={seminar.id} className="bg-gray-800 rounded-2xl p-6 opacity-75">
                  <div className="text-center">
                    <h3 className="typo-body-large font-bold text-text-primary mb-2">
                      {seminar.venue_name}
                    </h3>
                    <p className="typo-body-regular text-gray-300 mb-4">
                      {seminar.city}
                    </p>
                    <p className="typo-body-regular text-gray-400 mb-4">
                      {new Date(seminar.date).toLocaleDateString('he-IL')}
                    </p>
                    <div className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      הסתיים בהצלחה
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Banner */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="typo-section-title mb-6 text-content">
              מה שונה בסדנאות האלה?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-cta rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="typo-body-large font-bold text-text-primary">
                  ספורטאי אולימפי
                </h3>
                <p className="typo-body-regular text-gray-300">
                  נציג ישראל באולימפיאדת טוקיו ומדליסט ארד בגביע העולם
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-cta rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="typo-body-large font-bold text-text-primary">
                  350+ מתאמנים
                </h3>
                <p className="typo-body-regular text-gray-300">
                  הדרכתי ולימדתי מאות מתאמנים ברחבי הארץ
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 bg-cta rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-bg-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="typo-body-large font-bold text-text-primary">
                  שיטה מוכחת
                </h3>
                <p className="typo-body-regular text-gray-300">
                  השיטה היחידה בארץ המותאמת לכל רמות מרימי המשקולות
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="typo-section-title mb-6 text-content">
              לא בטוחים שאתם מוכנים עדיין?
            </h2>
            <p className="typo-body-regular text-gray-300 mb-8">
              מוזמנים לשלוח לי הודעה לוואצאפ, אני עונה לכל אחד באופן אישי.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open('https://wa.link/mfzmps', '_blank')}
                className="bg-cta hover:bg-yellow-600 text-bg-primary 
                          typo-button-cta px-8 py-4 rounded-lg 
                          transition-all duration-300 transform hover:scale-105
                          w-full sm:w-auto"
              >
                צרו קשר בוואטסאפ
              </button>
              
              <button 
                onClick={() => navigate('/about-david')}
                className="w-full sm:w-auto bg-transparent border-2 border-white 
                          text-white hover:bg-white 
                          hover:text-bg-primary typo-button-regular px-6 sm:px-8 
                          py-3 sm:py-4 rounded-lg transition-all duration-300 
                          flex items-center justify-center gap-3 transform hover:scale-105"
              >
                עוד על דוד
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Seminars;