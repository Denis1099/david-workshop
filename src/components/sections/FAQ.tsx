import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "מה כולל הסמינר?",
      answer: "הסמינר כולל 4 שעות של לימוד מעמיק על טכניקות הרמה אולימפיות, תיקון שגיאות נפוצות, אימון מעשי והדרכה אישית."
    },
    {
      question: "מה רמת הניסיון הנדרשת?",
      answer: "הסמינר מתאים למתאמנים עם ניסיון בסיסי בהרמות אולימפיות. לא נדרש ניסיון מתקדם."
    },
    {
      question: "כמה משתתפים בסמינר?",
      answer: "אנחנו מגבילים כל סמינר ל-15 משתתפים כדי להבטיח הדרכה אישית ואיכותית."
    },
    {
      question: "איך מגיעים למקום?",
      answer: "כל מקום מתאמן שנבחר כולל חניה נוחה והסעות ציבוריות. פרטים מדויקים יישלחו לנרשמים."
    },
    {
      question: "מה לקחת איתי?",
      answer: "בגדי אימון נוחים, נעלי אימון מתאימות, בקבוק מים וחשק ללמוד!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-2 sm:px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            שאלות נפוצות
          </h2>
          <p className="typo-body-large text-gray-300 max-w-3xl mx-auto">
            כל מה שרציתם לדעת על הסדנאות שלי - במקום אחד
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
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
                  <h3 className="typo-body-large font-bold 
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
                      <p className="typo-body-regular text-gray-300 
                                   leading-relaxed text-right">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;