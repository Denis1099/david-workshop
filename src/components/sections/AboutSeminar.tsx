import React from 'react';

const AboutSeminar: React.FC = () => {
  return (
    <section id="aboutSeminar" className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="typo-section-title text-text-primary">
              מה זו הסדנה?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video on the left */}
            <div className="order-2 lg:order-2">
              <div className="relative transform hover:scale-105 transition-all duration-300">
                <iframe
                  title="איך זה נראה?"
                  src="https://player.vimeo.com/video/1100994718?title=0&byline=0&portrait=0"
                  className="w-full h-[500px] sm:h-[520px] md:h-[400px] lg:h-[500px] xl:h-[520px] rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Text content on the right */}
            <div className="order-1 lg:order-1 text-right">
              <div className="text-text-primary space-y-6 lg:space-y-8">
                <p className="typo-body-large">
                  בסדנה הזו אתה לא רק תלמד טכניקה – אתה תרגיש מה זה סוף־סוף להבין את הגוף שלך עם המוט.
                </p>
                <p className="typo-body-large">
                  נפרק את הסנאץ' והקלין לגורמים, נזהה איפה בדיוק אתה נתקע, ונבנה איתך מחדש את התחושה שאתה שולט בהרמה – לא מקווה שהיא תצליח.
                </p>
                <p className="typo-body-large">
                  במקום לחזק טעויות שלא הבנת שהן שם – תצא מהסדנה עם ביטחון, בהירות, ותנועה שעובדת בשבילך, לא נגדך.
                </p>
                <p className="typo-body-large">
                  זו לא עוד הרצאה טכנית – זו חוויה שתגרום לך להסתכל אחרת על כל הרמה.
                </p>
                <p className="typo-body-large font-medium text-cta">
                  כי כשמרגישים מה נכון ויודעים על מה להתמקד בכל חזרה ובכל הרמה – אי אפשר לחזור אחורה.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSeminar;