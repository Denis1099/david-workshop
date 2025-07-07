import React from 'react';

const WhySeminar: React.FC = () => {
  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24 
                       relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            למה דווקא הסדנה שלי?
          </h2>
          <p className="typo-body-large-wrapped text-gray-300 max-w-3xl 
                        mx-auto">
            כי ברוב המקומות מלמדים אותך מה לעשות, אבל לא איך להרגיש את זה.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 
                        items-center">
          {/* Left Image - Rotated 14 degrees */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <picture>
                <source srcSet="/images/david-instructing.webp" 
                        type="image/webp" />
                <img 
                  src="/images/david-instructing.webp"
                  alt="דוד ליטבינוב מדריך ומסביר טכניקה"
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl 
                            transform rotate-[14deg]"
                />
              </picture>
            </div>
          </div>

          {/* Center Content */}
          <div className="order-1 lg:order-2 text-center">
            <div className="typo-body-regular-wrapped text-gray-300 mb-8 
                           leading-relaxed">
              <p className="mb-8 typo-body-large-wrapped font-medium 
                           text-text-primary">
                הסדנה שלי שונה מכל מה שראיתם:
              </p>
              
              <ul className="space-y-4 text-right">
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span className="text-content">
                    לא סתם תירגול - הבנה מעמיקה של הטכניקה
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span className="text-content">
                    לא רק תיאוריה - תרגול מעשי עם התיקונים שלי בזמן אמת
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span className="text-content">
                    לא קבוצה גדולה - מקסימום 15 משתתפים להדרכה אישית
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span className="text-content">
                    לא "עוד שיטה" - השיטה שלי עובדת על ספורטאים אולימפיים 
                    ומתחילים כאחד
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="typo-body-large-wrapped text-text-primary 
                           font-medium">
                התוצאה? תצא מהסדנה שלי עם ביטחון אמיתי וידע שישאר 
                איתך לתמיד.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary 
                              typo-button-cta px-8 py-4 rounded-lg 
                              transition-colors">
              לקראת הסדנה הבאה
            </button>
          </div>

          {/* Right Image - Rotated -14 degrees */}
          <div className="order-3 lg:order-3 flex justify-center">
            <div className="relative">
              <picture>
                <source srcSet="/images/workshop.webp" type="image/webp" />
                <img 
                  src="/images/workshop.webp"
                  alt="חלל האימון עם ציוד מקצועי לווייטליפטינג"
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl 
                            transform rotate-[-14deg]"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySeminar; 