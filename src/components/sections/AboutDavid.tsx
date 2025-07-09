import React from 'react';

const AboutDavid: React.FC = () => {
  return (
    <section id="about" 
             className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col lg:hidden gap-8" dir="rtl">
          {/* Title */}
          <h2 className="typo-section-title text-center text-content">
            מי אני ולמה אלפי מתאמנים
            <br />
            סומכים עליי?
          </h2>

          {/* Description */}
          <div className="typo-body-regular-wrapped text-gray-300 text-center space-y-4">
            <p>
              שלום, אני דוד ליטבינוב - לא עוד מאמן רגיל. אני ספורטאי אולימפי 
              שייצג את ישראל בטוקיו, שיאן ישראל ב-50+ קטגוריות, ומדליסט ארד 
              בגביע העולם.
            </p>
            <p>
              אבל הכי חשוב? אני מבין בדיוק איך זה להרגיש לא בטוח עם המוט. 
              בניגוד למאמנים רבים, אני מתמחה בלהנגיש ווייטליפטינג לקהל הרחב.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center">
            <div className="retina-image-container transform hover:scale-105 transition-all duration-300">
              <picture>
                <source srcSet="/images/david-whiteboard.webp" type="image/webp" />
                <img 
                  src="/images/david-whiteboard.webp"
                  alt="דוד ליטבינוב מלמד על לוח לבן"
                  className="retina-image"
                />
              </picture>
            </div>
          </div>

          {/* Credentials with checkmarks */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="typo-body-regular-wrapped text-text-primary">
                350+ מתאמנים שהדרכתי ולימדתי עד היום
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="typo-body-regular-wrapped text-text-primary">
                15+ שנות ניסיון בהוראה ואימון
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="typo-body-regular-wrapped text-text-primary">
                השיטה היחידה בארץ שמותאמת לכל רמות מרימי המשקולות
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-regular px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              לסיפור המלא שלי
            </button>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex lg:flex-row gap-12 lg:gap-16 items-center" dir="ltr">
          {/* Image Side - Left */}
          <div className="flex-1 flex justify-center items-center">
            <div className="retina-image-container transform hover:scale-105 transition-all duration-300">
              <picture>
                <source srcSet="/images/david-whiteboard.webp" type="image/webp" />
                <img 
                  src="/images/david-whiteboard.webp"
                  alt="דוד ליטבינוב מלמד על לוח לבן"
                  className="retina-image"
                />
              </picture>
            </div>
          </div>

          {/* Content Side - Right */}
          <div className="flex-1 text-center lg:text-right" dir="rtl">
            {/* Title */}
            <h2 className="typo-section-title mb-8 text-content">
              מי אני ולמה אלפי מתאמנים
              <br />
              סומכים עליי?
            </h2>

            {/* Description */}
            <div className="typo-body-regular-wrapped text-gray-300 mb-8 space-y-4">
              <p>
                שלום, אני דוד ליטבינוב - לא עוד מאמן רגיל. אני ספורטאי אולימפי 
                שייצג את ישראל בטוקיו, שיאן ישראל ב-50+ קטגוריות, ומדליסט ארד 
                בגביע העולם.
              </p>
              <p>
                אבל הכי חשוב? אני מבין בדיוק איך זה להרגיש לא בטוח עם המוט. 
                בניגוד למאמנים רבים, אני מתמחה בלהנגיש ווייטליפטינג לקהל הרחב.
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
                <span className="typo-body-regular-wrapped text-text-primary">
                  350+ מתאמנים שהדרכתי ולימדתי עד היום
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="typo-body-regular-wrapped text-text-primary">
                  15+ שנות ניסיון בהוראה ואימון
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="typo-body-regular-wrapped text-text-primary">
                  השיטה היחידה בארץ שמותאמת לכל רמות מרימי המשקולות
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-regular px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              לסיפור המלא שלי
            </button>
          </div>
        </div>

        {/* Trust Factor Banner - Media Logos */}
        <div className="mt-16 lg:mt-14 pt-12">
          <div className="text-center" dir="rtl">
            {/* Featured In Text */}
            <h3 className="typo-body-regular text-gray-400 mb-8">
              כפי שסוקר ב:
            </h3>
            
            {/* Logos Row */}
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 opacity-85">
              <div className="h-8 lg:h-10 flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/israelhayom-logo.webp"
                  alt="ישראל היום"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-10 flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/ynet-logo.webp"
                  alt="ynet"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-10 flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/sport5-logo.webp"
                  alt="Sport 5"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-10 flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/sport1-logo.webp"
                  alt="Sport 1"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDavid; 