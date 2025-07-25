import React from 'react';

const AboutSeminar: React.FC = () => {
  return (
    <section id="aboutSeminar" className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="typo-section-title text-text-primary">
              מה זו הסדנה?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video on the left */}
            <div className="order-2 lg:order-2">
              <div className="relative transform hover:scale-105 transition-all duration-300">
                <iframe
                  title="איך זה נראה?"
                  src="https://player.vimeo.com/video/1100994718?title=0&byline=0&portrait=0"
                  className="w-full h-[500px] sm:h-[520px] md:h-[400px] lg:h-[500px] xl:h-[520px] rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Text content on the right */}
            <div className="order-1 lg:order-1 text-right">
              <div className="text-text-primary space-y-6 lg:space-y-8">
                <p className="typo-body-regular">
                  בסדנה הזו אנחנו לא ״לומדים טכניקה״
                </p>
                <p className="typo-body-regular">
                  אנחנו לומדים מה זה להרגיש את הגוף כדי להבין איך הוא צריך להזיז את המוט
                </p>
                <p className="typo-body-regular">
                  אנחנו נפרק את התנועות לגורמים כדי שנוכל לדעת בדיוק מה מוביל למה, ולמה בעיות טכניות נוצרות מלכתחילה, המטרה שלנו היא לזהות בדיוק איפה החוליה החלשה שלנו ואיך אנחנו פותרים אותה לא רק בשביל להיות טכניים יותר
                </p>
                <p className="typo-body-regular">
                  אלא בשביל לשלוט על התנועה שלנו ולדעת איך להוציא יותר מכל הנפה ומכל אימון.
                </p>
                <p className="typo-body-regular">
                  נתמקד ונתרגל פתרונות שאפשר ליישם באופן מיידי כדי להרגיש בנוח עם משקל מעל הראש.
                </p>
                <p className="typo-body-regular font-bold">
                  בסדנה הזאת אני מראה לך איך ספורטאים ברמות הכי גבוהות חושבים, בונים ביטחון, ומשחיזים טכניקה בכל חזרה - לא בעזרת קסם, אלא דרך עקרונות מפתח שכל ספורטאי ברמה עולמית יודע ליישם, וכל מתאמן יכול.
                </p>
                <p className="typo-body-regular">
                  אם אתה מרגיש תקוע כבר חודשים או רוצה לבנות לעצמך הרגלים טובים יותר באימונים- הסדנה הזאת תעשה לך סדר.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSeminar;