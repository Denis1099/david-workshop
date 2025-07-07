import React from 'react';

const SeminarBreakdown: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "בדיקה אישית ואבחון טכניקה",
      description: "נתחיל בהערכה אישית של הטכניקה הנוכחית שלך. אזהה בדיוק " +
                  "מה מונע ממך להרים יותר ובביטחון."
    },
    {
      number: "2", 
      title: "לימוד עקרונות הבסיס",
      description: "נלמד את עקרונות הזהב של ווייטליפטינג - איך להחזיק במוט, " +
                  "איך לנשום, ואיך לשמור על יציבות."
    },
    {
      number: "3",
      title: "תרגול מעשי עם התיקונים",
      description: "נתרגל יחד את התנועות עם התיקונים שלי בזמן אמת. תרגיש " +
                  "איך הטכניקה הנכונה משנה הכל."
    },
    {
      number: "4",
      title: "בניית תוכנית אימונים אישית",
      description: "נסיים עם תוכנית מותאמת אישית שתאפשר לך להמשיך להתקדם " +
                  "גם אחרי הסדנה."
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            4 שעות שישנו לך את הגישה לווייטליפטינג
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Number Circle */}
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full 
                             flex items-center justify-center">
                <span className="typo-body-large font-bold text-bg-primary">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 text-right">
                <h3 className="typo-body-large-wrapped font-bold mb-4 
                              text-text-primary">
                  {step.title}
                </h3>
                <p className="typo-body-regular-wrapped text-gray-300 
                             leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeminarBreakdown; 