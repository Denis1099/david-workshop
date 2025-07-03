import React from 'react';

const SeminarBreakdown: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "היכרות ואבחון (30 דקות)",
      description: "נפגשים, מכירים, ואני מבין מה המצב שלכם היום. לא שיפוטי, לא מלחיץ - רק אבחון אמיתי של נקודת המוצא שלכם."
    },
    {
      number: "2", 
      title: "ההרצאה שלי (45 דקות)",
      description: "התיאוריה שמאחורי הטכניקה. למה אני עושה כל תנועה, איך הגוף אמור להרגיש, ומה ההבדל בין \"לעשות נכון\" ל\"להרגיש נכון\"."
    },
    {
      number: "3",
      title: "תרגול מעשי איתי (2 שעות)", 
      description: "מתחילים עם הבסיס ומתקדמים צעד אחר צעד. כל אחד עובד בקצב שלו, אני עובר בין המשתתפים ומתקן בזמן אמת. כולל הפסקה קצרה לשאלות ולחידודים."
    },
    {
      number: "4",
      title: "סיכום ותוכנית המשך שלי (35 דקות)",
      description: "מחברים הכל יחד, רואים איך הידע שלי הופך לתחושה בגוף שלכם. מה לוקחים הביתה, איך ממשיכים לתרגל, ולמי פונים בשאלות - אליי כמובן!"
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
              <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            4 שעות שישנו לך את הגישה לווייטליפטינג
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Number Circle */}
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="font-rubik text-2xl font-bold text-bg-primary">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 text-right">
                <h3 className="font-rubik text-2xl md:text-3xl font-bold mb-4 text-text-primary">
                  {step.title}
                </h3>
                <p className="font-heebo text-lg md:text-xl text-gray-300 leading-relaxed">
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