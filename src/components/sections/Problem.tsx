import React from 'react';
import { 
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon, 
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

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

        {/* Three Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" dir="rtl">
          {/* Card 1: הטכניקה לא עקבית */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <ExclamationTriangleIcon className="w-12 h-12 text-cta mb-4 mx-auto" />
            <h3 className="typo-body-large text-text-primary mb-4 text-center font-bold" dangerouslySetInnerHTML={{ __html: problems[0].title }}>
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[0].content}
            </p>
          </div>

          {/* Card 2: שומע עצות */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-cta mb-4 mx-auto" />
            <h3 className="typo-body-large text-text-primary mb-4 text-center font-bold" dangerouslySetInnerHTML={{ __html: problems[1].title }}>
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[1].content}
            </p>
          </div>

          {/* Card 3: משקיע בלי לראות תוצאה */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <ClockIcon className="w-12 h-12 text-cta mb-4 mx-auto" />
            <h3 className="typo-body-large text-text-primary mb-4 text-center font-bold">
              {problems[2].title}
            </h3>
            <p className="typo-body-regular text-gray-300 leading-relaxed">
              {problems[2].content}
            </p>
          </div>
        </div>

        {/* Large Text Between Cards */}
        <div className="text-center mb-12" dir="rtl">
          <p className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed">
            וכל אלה הובילו אותי להבין שבמקום להתמקד בפתרון אני בעצם יוצר לעצמי לופ
          </p>
        </div>

        {/* Bottom Full Width Card */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12" dir="rtl">
          <ArrowPathIcon className="w-12 h-12 text-cta mb-4 mx-auto" />
          <h3 className="typo-body-large text-text-primary mb-6 text-center font-bold">
            מחזק טעות במקום להתקדם
          </h3>
          <p className="typo-body-regular text-text-primary leading-relaxed text-center">
            אני מרגיש שמשהו לא עובד – אבל ממשיך לעשות אותו שוב ושוב, בלי לשים לב שכל חזרה רק מחזקת את הדפוס השגוי. מה שנראה כמו "עוד ניסיון" בעצם מקבע עמוק יותר את ההרגל הלא נכון. ככל שאני ממשיך – זה נטמע יותר בגוף, הופך לטבע שני, ועם הזמן יהיה הרבה יותר קשה לשנות. במקום להתקרב למטרה – אני מתרחק ממנה צעד אחר צעד.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;