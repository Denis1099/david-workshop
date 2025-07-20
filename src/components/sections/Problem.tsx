import React from 'react';

const Problem: React.FC = () => {
  const problems = [
    {
      title: 'הטכניקה לא עקבית – ואין ביטחון',
      content: 'כל חזרה מרגישה אחרת. לפעמים המשקל עולה חלק, ולפעמים פתאום כבד כאילו הרמתי אותו בפעם הראשונה. אין יציבות, אין שליטה, ואין ביטחון במה שאני עושה.'
    },
    {
      title: 'שומע עצות – אבל לא מצליח ליישם',
      content: 'כל אחד מסביר משהו אחר. אני שומע, מבין – אבל בפועל לא יודע איך ליישם את זה. כל ניסיון להבין לבד רק מבלבל אותי יותר, ואין קו אחיד שאפשר ללכת איתו.'
    },
    {
      title: 'משקיע בלי לראות תוצאה',
      content: 'אני מתאמן קשה, נותן את כל כולי, ועדיין מרגיש תקוע. משהו לא מסתדר – ואני לא מבין איך זה הגיוני שכל ההשקעה לא באה לידי ביטוי בטכניקה או בהרגשה.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16" dir="rtl">
          <h2 className="typo-section-title mb-6 text-text-primary">
            היום אני מבין שהפתרון פשוט, אבל בתור מתאמן אני סבלתי בדיוק מהדברים האלה:
          </h2>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" dir="rtl">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="typo-body-large text-text-primary mb-4 text-center">
                {problem.title}
              </h3>
              <p className="typo-body-regular text-gray-300 leading-relaxed">
                {problem.content}
              </p>
            </div>
          ))}
        </div>

        {/* Separate Bottom Card */}
        <div className="max-w-4xl mx-auto mb-12" dir="rtl">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h3 className="typo-body-large text-text-primary mb-6 text-center">
              מחזק טעות במקום להתקדם
            </h3>
            <p className="typo-body-regular text-text-primary leading-relaxed text-center">
              אני מרגיש שמשהו לא עובד – אבל ממשיך לעשות אותו שוב ושוב, בלי לשים לב שכל חזרה רק מחזקת את הדפוס השגוי. מה שנראה כמו "עוד ניסיון" בעצם מקבע עמוק יותר את ההרגל הלא נכון. ככל שאני ממשיך – זה נטמע יותר בגוף, הופך לטבע שני, ועם הזמן יהיה הרבה יותר קשה לשנות. במקום להתקרב למטרה – אני מתרחק ממנה צעד אחר צעד.
            </p>
          </div>
        </div>

        {/* Solution Text */}
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <p className="typo-body-large text-text-primary leading-relaxed">
            בסדנה אני מלמד אותך איך מתאמנים ברמות הגבוהות חושבים, בונים ביטחון, ומשחיזים טכניקה בכל חזרה –
            לא בעזרת קסם, אלא דרך עקרונות שלא משתנים.
            אם אתה מרגיש תקוע כבר חודשים הסדנה הזאת תעשה לך סדר.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;