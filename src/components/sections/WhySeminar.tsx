import React from 'react';

const WhySeminar: React.FC = () => {
  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24 relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            למה דווקא הסדנה שלי?
          </h2>
          <p className="font-heebo text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            כי ברוב המקומות מלמדים אותך מה לעשות, אבל לא איך להרגיש את זה.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Image - Rotated 14 degrees */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <picture>
                <source srcSet="/images/david-instructing.webp" type="image/webp" />
                <img 
                  src="/images/david-instructing.webp"
                  alt="דוד ליטבינוב מדריך ומסביר טכניקה"
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl transform rotate-[14deg]"
                />
              </picture>
            </div>
          </div>

          {/* Center Content */}
          <div className="order-1 lg:order-2 text-center">
            <div className="font-heebo text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              <p className="mb-8 text-2xl font-medium text-text-primary">
                הסדנה שלי שונה מכל מה שראיתם:
              </p>
              
              <ul className="space-y-4 text-right">
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span>לא סתם תירגול - הבנה מעמיקה של הטכניקה</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span>לא רק תיאוריה - תרגול מעשי עם התיקונים שלי בזמן אמת</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span>לא קבוצה גדולה - מקסימום 15 משתתפים להדרכה אישית</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta text-2xl leading-none">•</span>
                  <span>לא "עוד שיטה" - השיטה שלי עובדת על ספורטאים אולימפיים ומתחילים כאחד</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-heebo text-xl text-text-primary font-medium">
                התוצאה? תצא מהסדנה שלי עם ביטחון אמיתי וידע שישאר איתך לתמיד.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors">
              סדנאות קרובות
            </button>
          </div>

          {/* Right Image - Rotated -14 degrees */}
          <div className="order-3 lg:order-3 flex justify-center">
            <div className="relative">
              <picture>
                <source srcSet="/images/workshop.webp" type="image/webp" />
                <img 
                  src="/images/workshop.webp"
                  alt="סדנת הרמת משקולות בפעולה"
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl transform rotate-[-14deg]"
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