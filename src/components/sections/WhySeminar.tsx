import React from 'react';

const WhySeminar: React.FC = () => {
  const cards = [
    {
      image: '/images/whyseminar/david-instructing.webp',
      title: 'תרגול מעמיק וממוקד',
      content: 'אנחנו לא רק מתרגלים - אנחנו מפרקים כל תנועה לחלקים הכי קטנים. תבינו את המדע מאחורי הטכניקה ולמה כל שלב בתנועה קריטי. תלמדו לזהות טעויות נפוצות ולהבין מה גורם להן. יוצאים עם ידע עמוק שיאפשר לכם להתאמן חכם ויעיל.'
    },
    {
      image: '/images/whyseminar/david-sitting.webp',
      title: 'הרצאה מספורטאי אולימפי',
      content: 'בסדנה אני חולק את מה שעברתי בדרך לאולימפיאדה - הכישלונות והפחדים. תשמעו איך מתמודדים עם לחץ ואיך בונים ביטחון עצמי מתוך כישלונות. המיינדסט שלמדתי מהמאמנים הטובים בעולם - איך לחשוב כמו מקצוענים, הלקחים האלה עובדים לא רק בווייטליפטינג אלא בכל תחום בחיים.'
    },
    {
      image: '/images/whyseminar/workshop-crowd.webp',
      title: 'הדרכה אישית בקבוצה קטנה',
      content: '15 משתתפים מקסימום - לא 50 כמו בקורסים אחרים. זמן הדרכה אישית לכל אחד במקום לצפות מהצד. שאלות ותשובות ללא הגבלה - לא מפחדים לשאול כי אין זמן. סביבה תומכת שבה כולם מתקדמים יחד בקצב שלהם.'
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24 
                       relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            למה דווקא הסדנה שלי?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                        gap-8 justify-items-center">
          {cards.map((card, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden 
                                       flex flex-col transform hover:scale-105 
                                       transition-all duration-300">
              {/* Card Image */}
              <div className="w-full overflow-hidden">
                <picture>
                  <source srcSet={card.image} type="image/webp" />
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto object-cover"
                  />
                </picture>
              </div>
              
              {/* Card Content */}
              <div className="p-6 bg-white flex-1 flex flex-col 
                              min-h-[250px]">
                <h3 className="text-xl font-bold text-gray-900 mb-4 
                               text-center">
                  {card.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-right 
                              text-sm line-height-normal flex-1">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-cta hover:bg-yellow-600 text-bg-primary 
                            typo-button-cta px-8 py-4 rounded-lg 
                            transition-all duration-300 transform hover:scale-105">
            לבחירת סדנה
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhySeminar; 