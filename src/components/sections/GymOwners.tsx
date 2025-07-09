import React from 'react';

const GymOwners: React.FC = () => {
  return (
    <section id="gym-owners" 
             className="bg-bg-primary text-text-primary py-16 lg:py-24 
                       relative overflow-hidden">
      <div className="container-mobile">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 
                        items-center" dir="ltr">
          {/* Image Side - Left */}
          <div className="flex-1 order-2 lg:order-1 flex justify-center items-center">
            <div className="w-full max-w-[540px] h-[300px] sm:h-[360px] 
                           rounded-xl overflow-hidden
                           transform hover:scale-105 transition-all duration-300">
              <picture>
                <source srcSet="/images/david-teaching.webp" 
                        type="image/webp" />
                <img 
                  src="/images/david-teaching.webp"
                  alt="דוד ליטבינוב מלמד ומדריך באימון קבוצתי"
                  className="w-full h-full object-cover"
                  style={{ 
                    imageRendering: 'auto'
                  }}
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

          {/* Content Side - Right */}
          <div className="flex-1 text-center lg:text-right order-1 lg:order-2" dir="rtl">
            {/* Title */}
            <h2 className="typo-section-title mb-6 text-content">
              יש לכם חדר כושר או סטודיו?
            </h2>

            {/* Value Proposition */}
            <div className="mb-6 sm:mb-8">
              <p className="typo-body-large-wrapped text-gray-300">
                בוא נארח את הסדנה הבאה אצלכם!
              </p>
            </div>

            {/* Benefits List */}
            <div className="mb-6 sm:mb-8">
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" 
                         viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                               01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                               12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="typo-body-regular-wrapped text-text-primary">
                    המתאמנים שלכם מקבלים סדנה מקצועית
                  </span>
                </li>
                
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" 
                         viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                               01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                               12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="typo-body-regular-wrapped text-text-primary">
                    אתם מקבלים עמלה מכל כרטיס שאני מוכר
                  </span>
                </li>
                
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" 
                         viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                               01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                               12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="typo-body-regular-wrapped text-text-primary">
                    חשיפה לקהל חדש - משתתפים מגיעים מכל הארץ לסדנה שלי
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-cta hover:bg-yellow-600 text-bg-primary 
                                typo-button-cta btn-mobile-optimized
                                transition-all duration-300 transform hover:scale-105 shadow-lg">
                למידע נוסף
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymOwners; 