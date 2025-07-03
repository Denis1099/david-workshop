import React from 'react';

const AboutDavid: React.FC = () => {
  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center" dir="ltr">
          {/* Image Section - Left side */}
          <div className="flex-shrink-0">
            <div className="aspect-square lg:aspect-auto lg:h-[500px] lg:w-[400px] rounded-2xl overflow-hidden bg-gray-800">
              <picture>
                <source srcSet="/images/david-sitting.webp" type="image/webp" />
                <img 
                  src="/images/david-sitting.webp"
                  alt="דוד ליטבינוב מדריך סדנת הרמת משקולות"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

          {/* Content Section - Right side */}
          <div className="flex-1 text-center lg:text-right" dir="rtl">
            {/* Title */}
            <h2 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              מי אני ולמה אלפי מתאמנים
              <br />
              סומכים עליי?
            </h2>

            {/* Description */}
            <div className="font-heebo text-lg md:text-xl text-gray-300 mb-8 leading-relaxed space-y-4">
              <p>
                שלום, אני דוד ליטבינוב - לא עוד מאמן רגיל. אני ספורטאי אולימפי שייצג את ישראל בטוקיו, שיאן ישראל ב-50+ קטגוריות, ומדליסט ארד בגביע העולם.
              </p>
              <p>
                אבל הכי חשוב? אני מבין בדיוק איך זה להרגיש לא בטוח עם המוט. בניגוד למאמנים רבים, אני מתמחה בלהנגיש ווייטליפטינג לקהל הרחב.
              </p>
            </div>

            {/* Credentials with checkmarks */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-heebo text-lg text-text-primary">
                  350+ מתאמנים שהדרכתי ולימדתי עד היום
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-heebo text-lg text-text-primary">
                  15+ שנות ניסיון בהוראה ואימון
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-heebo text-lg text-text-primary">
                  השיטה היחידה בארץ שמותאמת לכל רמות מרימי המשקולות
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors">
              לסיפור המלא שלי
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDavid; 