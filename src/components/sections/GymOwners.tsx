import React from 'react';

const GymOwners: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };
  
  return (
    <section id="gym-owners" 
             className="bg-bg-primary text-text-primary py-16 lg:py-24 
                       relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 
                        items-center" dir="ltr">
          {/* Image Side - Left */}
          <div className="flex-1 order-2 lg:order-1 flex justify-center items-center">
            <div className="w-full max-w-[540px] h-[360px] 
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
                    width: '540px', 
                    height: '360px',
                    imageRendering: 'auto'
                  }}
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
            <div className="mb-8">
 
              <p className="typo-body-large-wrapped text-gray-300 mb-8">
                בוא נארח את הסדנה הבאה אצלכם!
              </p>
            </div>

            {/* Benefits List */}
            <div className="mb-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" 
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
                
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" 
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
                
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 
                                 rounded-full flex items-center 
                                 justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" 
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
            <button 
              onClick={handleWhatsAppClick}
              className="bg-cta hover:bg-yellow-600 text-bg-primary 
                              typo-button-cta px-8 py-4 rounded-lg 
                              transition-all duration-300 transform hover:scale-105">
              למידע נוסף
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymOwners; 