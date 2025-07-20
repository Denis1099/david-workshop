import React from 'react';

const SeminarBreakdown: React.FC = () => {
  const steps = [
    {
      title: "היכרות ויישור קו",
      duration: "(30 דקות)",
      description: "נכיר אחד את השני, נשמע מה עוצר אותך ואיפה אתה מרגיש תקוע. נראה מה משותף לצרכים של כולנו ואיך זה מתחבר למה שאנחנו הולכים לעבוד עליו באותו יום. המטרה כאן היא לא רק להרגיש בנוח, אלא למקד את הראש לקראת מה שבא.",
      image: "/images/seminarbreakdown/image1.webp"
    },
    {
      title: "הכנה לאימון",
      duration: "(45 דקות)",
      description: "נדבר על פציעות ישנות, חוסר בטווח תנועה, חסמים מנטליים וכל מה שמגביל אותנו באימון. נכין את הגוף וננע אותו מתוך הקשבה ולא בכוח, ונדבר על איך להתייחס למגבלות ולא לפחד מהן. זה לא חימום – זה שינוי גישה. גם הראש, גם הגוף – מתכוננים לעבודה עם המוט ממקום חדש.",
      image: "/images/seminarbreakdown/image2.webp"
    },
    {
      title: "הרצאה עיונית",
      duration: "(2 שעות)",
      description: "לפני שנצלול לפרקטיקה, נעצור להבין למה בכלל אנחנו צריכים להרים בצורה הזו. נבין מה עומד מאחורי ההחלטות הטכניות שאנחנו עושים ואיך בוחרים על מה להתמקד בכל הרמה. נלמד איך לשפר טכניקה תוך כדי אימון, ואיך להוציא את המיטב מכל הרמה, בלי ללכת לאיבוד. זה לא על \"לעשות את זה נכון\" — אלא להבין איך לגשת לתהליך.",
      image: "/images/seminarbreakdown/image3.webp"
    },
    {
      title: "תרגול מעשי",
      duration: "(35 דקות)",
      description: "מתרגלים, מרימים משקל, ומרגישים את הגוף. אני מתאים לכל אחד את ההנחיות לפי מבנה הגוף שלו, כדי שתוכל לחוות את הטכניקה על אמת – ולא רק לשמוע עליה. לומדים לזהות תחושות חדשות בתוך הגוף, להבין מה קורה בזמן אמת, ואיך כל תנועה קטנה שלך משפיעה על איך שהמוט מגיב. אתה תבין איך לקבל פידבק מהמוט עצמו, לא רק מהמאמן – ולהגיב בהתאם.",
      image: "/images/seminarbreakdown/image4.webp"
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            4 שעות שישנו לך את הגישה לווייטליפטינג
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const imageOnLeft = index % 2 === 0; // Steps 1,3 have image on left
            // const isLastStep = index === steps.length - 1;
            
            return (
              <React.Fragment key={index}>
                <div className="flex items-center justify-center">
                  {/* Mobile Layout - Always Stacked */}
                  <div className="lg:hidden w-full max-w-md mx-auto">
                    <div className="text-center mb-6">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                        <img 
                          src={step.image} 
                          alt={`${step.title} illustration`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                      <h3 className="typo-body-large-wrapped font-bold mb-3 text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-cta font-semibold mb-4">
                        {step.duration}
                      </p>
                      <p className="typo-body-regular text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout - Alternating */}
                  <div className="hidden lg:flex items-center gap-16 xl:gap-28 w-full mb-12">
                    {imageOnLeft ? (
                      <>
                        {/* Image Section */}
                        <div className="flex-1 flex justify-end">
                          <div className="w-64 h-64 xl:w-80 xl:h-80 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                            <img 
                              src={step.image} 
                              alt={`${step.title} illustration`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                        
                        {/* Text Section */}
                        <div className="flex-1">
                          <div className="max-w-md text-right">
                            <h3 className="typo-body-large-wrapped font-bold mb-3 text-text-primary">
                              {step.title}
                            </h3>
                            <p className="text-cta font-semibold mb-6">
                              {step.duration}
                            </p>
                            <p className="typo-body-regular text-wrap-30 text-gray-300">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Text Section */}
                        <div className="flex-1 flex justify-end">
                          <div className="max-w-md text-right">
                            <h3 className="typo-body-large-wrapped font-bold mb-3 text-text-primary">
                              {step.title}
                            </h3>
                            <p className="text-cta font-semibold mb-6">
                              {step.duration}
                            </p>
                            <p className="typo-body-regular text-wrap-30 text-gray-300">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        
                                               {/* Image Section */}
                          <div className="flex-1 flex justify-start">
                          <div className="w-64 h-64 xl:w-80 xl:h-80 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                            <img 
                              src={step.image} 
                              alt={`${step.title} illustration`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Summary Section */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="max-w-3xl mx-auto">
            <h3 className="typo-body-large-wrapped font-bold mb-6 text-text-primary">
              סיכום ומענה לשאלות
            </h3>
            <p className="typo-body-regular text-gray-300">
              בסוף הסדנה נעשה סדר – מה לקחת איתך, על מה להתמקד באימונים הבאים, ואיך להמשיך להתקדם. כדי שתוכל להגיע לכל אימון עם ביטחון, מיקוד וחיוך – ולהרגיש שאתה סוף־סוף מבין מה אתה עושה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarBreakdown;