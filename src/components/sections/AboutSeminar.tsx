import React from 'react';

const AboutSeminar: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="typo-section-title text-text-primary mb-12 lg:mb-16">
              מה זו הסדנה?
            </h2>
            <div className="mx-auto text-text-primary space-y-8 lg:space-y-12">
              <p className="typo-body-large">
                בסדנה הזו אתה לא רק תלמד טכניקה – אתה תרגיש מה זה סוף־סוף להבין את הגוף שלך עם המוט.
              </p>
              <p className="typo-body-large">
                נפרק את הסנאץ' והקלין לגורמים, נזהה איפה בדיוק אתה נתקע, ונבנה איתך מחדש את התחושה שאתה שולט בהרמה – לא מקווה שהיא תצליח.
              </p>
              <p className="typo-body-large">
                במקום לחזק טעויות שלא הבנת שהן שם – תצא מהסדנה עם ביטחון, בהירות, ותנועה שעובדת בשבילך, לא נגדך.
              </p>
              <p className="typo-body-large">
                זו לא עוד הרצאה טכנית – זו חוויה שתגרום לך להסתכל אחרת על כל הרמה.
              </p>
              <p className="typo-body-large font-medium text-cta">
                כי כשמרגישים מה נכון ויודעים על מה להתמקד בכל חזרה ובכל הרמה – אי אפשר לחזור אחורה.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSeminar;