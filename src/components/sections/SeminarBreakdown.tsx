import React from 'react';

const SeminarBreakdown: React.FC = () => {
  const steps = [
    {
      title: "היכרות ואבחון",
      duration: "(30 דקות)",
      description: "נפגשים, מכירים, ואני מבין מה המצב שלכם היום. לא שיפוטי, לא מלחיץ - רק אבחון אמיתי של נקודת המוצא שלכם.",
      image: "/images/seminarbreakdown/image1.webp"
    },
    {
      title: "ההרצאה שלי",
      duration: "(45 דקות)",
      description: "התיאוריה שמאחורי הטכניקה. למה אני עושה כל תנועה, איך הגוף אמור להרגיש, ומה ההבדל בין \"לעשות נכון\" ל\"להרגיש נכון\".",
      image: "/images/seminarbreakdown/image2.webp"
    },
    {
      title: "תרגול מעשי",
      duration: "(2 שעות)",
      description: "מתחילים עם הבסיס ומתקדמים צעד אחר צעד. כל אחד עובד בקצב שלו, אני עובר בין המשתתפים ומתקן בזמן אמת. כולל הפסקה קצרה לשאלות ולחידודים.",
      image: "/images/seminarbreakdown/image3.webp"
    },
    {
      title: "סיכום ותוכנית המשך",
      duration: "(35 דקות)",
      description: "מחברים הכל יחד, רואים איך הידע שלי הופך לתחושה בגוף שלכם. מה לוקחים הביתה, איך ממשיכים לתרגל, ולמי פונים בשאלות - אליי כמובן!",
      image: "/images/seminarbreakdown/image4.webp"
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="container-mobile">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            4 שעות שישנו לך את הגישה לווייטליפטינג
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {steps.map((step, index) => {
            const imageOnLeft = index % 2 === 0; // Steps 1,3 have image on left on desktop
            
            return (
              <div key={index} className="w-full">
                {/* Mobile Layout - Always stacked */}
                <div className="lg:hidden">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Image */}
                    <div className="w-full max-w-sm">
                      <div className="aspect-square flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                        <img 
                          src={step.image} 
                          alt={`${step.title} illustration`}
                          className="w-full h-full object-contain rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="typo-body-large font-bold mb-3 text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-cta font-semibold mb-4 typo-body-regular">
                        {step.duration}
                      </p>
                      <p className="typo-body-regular text-gray-300 leading-relaxed max-w-md mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Alternating */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="flex items-center gap-16 xl:gap-32 w-full max-w-5xl">
                    {imageOnLeft ? (
                      <>
                        {/* Image Section - Left */}
                        <div className="flex-1 flex justify-end">
                          <div className="w-80 h-80 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                            <img 
                              src={step.image} 
                              alt={`${step.title} illustration`}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        
                        {/* Text Section - Right */}
                        <div className="flex-1">
                          <div className="max-w-md text-right">
                            <h3 className="typo-body-large font-bold mb-3 text-text-primary">
                              {step.title}
                            </h3>
                            <p className="text-cta font-semibold mb-6 typo-body-regular">
                              {step.duration}
                            </p>
                            <p className="typo-body-regular text-gray-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Text Section - Left */}
                        <div className="flex-1 flex justify-end">
                          <div className="max-w-md text-right">
                            <h3 className="typo-body-large font-bold mb-3 text-text-primary">
                              {step.title}
                            </h3>
                            <p className="text-cta font-semibold mb-6 typo-body-regular">
                              {step.duration}
                            </p>
                            <p className="typo-body-regular text-gray-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Image Section - Right */}
                        <div className="flex-1 flex justify-start">
                          <div className="w-80 h-80 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                            <img 
                              src={step.image} 
                              alt={`${step.title} illustration`}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SeminarBreakdown;