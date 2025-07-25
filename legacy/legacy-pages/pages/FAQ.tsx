import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "האם הסדנה מתאימה למתחילים?",
      answer: "בהחלט! הסדנה שלי מותאמת לכל הרמות - ממתחילים מוחלטים " +
              "ועד ספורטאים מנוסים. אני מתחיל מהבסיס ומתקדם בהדרגה."
    },
    {
      question: "איך ההרשמה לסדנה?",
      answer: "ההרשמה פשוטה - פשוט לחצו על כפתור ההרשמה ותועברו " +
              "לווטסאפ שלי. שם נתאם את כל הפרטים."
    },
    {
      question: "מה כדאי להביא לסדנה?",
      answer: "חשוב להביא נעלי ספורט יציבות (לא נעלי ריצה), בגדי " +
              "אימון נוחים, ובקבוק מים. כל שאר הציוד אני מספק."
    },
    {
      question: "האם יש הגבלות גיל?",
      answer: "הסדנה מיועדת למבוגרים מגיל 16 ומעלה. עבור צעירים " +
              "מתחת לגיל 18 נדרש אישור הורה."
    },
    {
      question: "מה קורה אם לא יכול להגיע?",
      answer: "ניתן לבטל עד 48 שעות לפני הסדנה וקרדיט מלא לסדנה " +
              "הבאה. ביטולים מתחת ל-48 שעות - 50% מהסכום."
    },
    {
      question: "האם הסדנה כוללת תוכנית אימונים?",
      answer: "כן! בסוף הסדנה כל משתתף מקבל תוכנית אימונים מותאמת " +
              "אישית לרמתו ולמטרות שלו."
    },
    {
      question: "האם אתה מלמד גם נשים?",
      answer: "כמובן! הסדנה מיועדת לגברים ונשים כאחד. הטכניקה " +
              "שאני מלמד מתאימה לכולם."
    },
    {
      question: "מה ההבדל בין הסדנה שלך לקורסים אחרים?",
      answer: "הסדנה שלי מתמקדת בהבנה מעמיקה של הטכניקה, לא רק " +
              "תיאוריה. מקסימום 15 משתתפים, הדרכה אישית, ותרגול " +
              "מעשי עם תיקונים בזמן אמת."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto px-4 text-center max-w-[1200px]">
          <h1 className="typo-page-title mb-6 text-content">
            שאלות נפוצות
          </h1>
          <p className="typo-body-large-wrapped text-gray-300 max-w-3xl 
                        mx-auto">
            כל מה שרציתם לדעת על הסדנאות שלי - במקום אחד
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                          transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-right flex items-center 
                            flex-row-reverse justify-between hover:bg-gray-700 
                            transition-colors"
                >
                  <h3 className="typo-body-large-wrapped font-bold 
                                 text-text-primary text-right flex-1">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-6 h-6 text-cta transition-transform 
                                duration-300 mr-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" 
                          strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-600">
                      <p className="typo-body-regular-wrapped text-gray-300 
                                   leading-relaxed text-right">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 pt-16 border-t border-gray-600">
            <h2 className="typo-section-title mb-6 text-content">
              לא מצאתם את התשובה?
            </h2>
            <p className="typo-body-large-wrapped text-gray-300 mb-8">
              אני כאן לענות על כל שאלה - בואו נדבר בווטסאפ
            </p>
            <button 
              onClick={() => window.open('https://wa.link/mfzmps', '_blank')}
              className="bg-cta hover:bg-yellow-600 text-bg-primary 
                        typo-button-cta px-8 py-4 rounded-lg 
                        transition-colors inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              צ'אט בוואטסאפ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
