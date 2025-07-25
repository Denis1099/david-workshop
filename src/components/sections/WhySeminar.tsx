import React from 'react';

const WhySeminar: React.FC = () => {
  const cards = [
    {
      image: '/images/whyseminar/workshop-crowd.webp',
      title: 'שיטות שונות\nאמת אחת',
      content: 'כל מאמן מסביר אחרת. כל שיטה נשמעת שונה. אבל יש עקרונות טכניים שאף אחד לא יכול להתווכח איתם – והם בדיוק מה שתלמד כאן. אני לא בא לבטל את מה שלמדת עד היום. אני בא לחבר לך את הנקודות – כדי שתוכל להבין לבד מה נכון בשבילך. ברגע שתבין את העקרונות מאחורי התנועה, תוכל לקבל פידבק מכל מאמן ולהפוך אותו לפידבק שמקדם אותך – במקום תלות - לבנות עצמאות.'
    },
    {
      image: '/images/whyseminar/david-sitting.webp',
      title: 'ידע מזוקק ממי שחי את זה\nלא רק לימד',
      content: 'זה לא עוד אימון. אני חולק איתך את מה שלמדתי על הבמה הכי גבוהה שיש – האולימפיאדה. עבדתי עם המאמנים הכי טובים בעולם, התאמנתי עם אלופי עולם ושיאנים אולימפיים, וראיתי עשרות שיטות שונות שמובילות לאותו המקום. במשך שנים ניסיתי להבין מה משותף לכולם – עכשיו כל הידע הזה זמין לך, פשוט וברור, כדי שגם אתה תוכל להרים נכון. אתה לא צריך לעבור את כל מה שאני עברתי. אתה לא צריך להיות גמיש, מהיר או מתוחכם – רק לרצות להבין.'
    },
    {
      image: '/images/whyseminar/david-instructing.webp',
      title: 'תרגול ממוקד\nשמפיל אסימונים',
      content: 'אנחנו מפרקים כל תנועה לחלקים הכי קטנים, לומדים את המדע שמאחורי הטכניקה, ומבינים למה כל שלב חשוב ואיך הוא משפיע על מה שאתה מרגיש. בסדנה תבין סוף־סוף למה התנועה לא הרגישה נוחה עד עכשיו, ותקבל את הכלים לשלוט בתנועה – לא רק לשחזר אותה. נלמד איך לזהות טעויות, מה גורם להן, ואיך להתמקד רק במה שחשוב – כדי לא לבזבז זמן. כשאתה באמת מבין – הגוף לומד מחדש, ופתאום אתה מרגיש שהמוט זז איתך ולא נגדך. זה הרגע שבו נופל לך האסימון והכל מתחבר.'
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24 
                       relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
          זאת לא עוד סדנת יסודות
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
                               text-center whitespace-pre-line">
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