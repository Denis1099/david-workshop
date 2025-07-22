import React from 'react';

const Problem: React.FC = () => {
  const problems = [
    {
      title: 'הטכניקה לא עקבית<br />ואין ביטחון',
      content: 'כל חזרה מרגישה אחרת. לפעמים המשקל עולה חלק, ולפעמים פתאום כבד כאילו הרמתי אותו בפעם הראשונה. אין יציבות, אין שליטה, ואין ביטחון במה שאני עושה.'
    },
    {
      title: 'שומע עצות<br />אבל לא מצליח ליישם',
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
            היום אני מבין שהפתרון פשוט,<br />
            אבל בתור מתאמן אני סבלתי בדיוק מהדברים האלה:
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 grid-rows-2" dir="rtl">
          {/* Card 1: הטכניקה לא עקבית */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <h3 className="typo-body-large text-text-primary mb-4 text-center" dangerouslySetInnerHTML={{ __html: problems[0].title }}>
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[0].content}
            </p>
          </div>

          {/* Card 2: שומע עצות */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <h3 className="typo-body-large text-text-primary mb-4 text-center" dangerouslySetInnerHTML={{ __html: problems[1].title }}>
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[1].content}
            </p>
          </div>

          {/* Card 3: משקיע בלי לראות תוצאה - Takes 2 rows but stays 1 column */}
          <div className="lg:row-span-2 bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col justify-center">
            <h3 className="typo-body-large text-text-primary mb-4 text-center">
              {problems[2].title}
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[2].content}
            </p>
          </div>

          {/* Bottom Large Card - Takes 2 columns and aligned to right */}
          <div className="lg:col-span-2 lg:col-start-1 bg-gray-800 p-8 rounded-lg shadow-xl">
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