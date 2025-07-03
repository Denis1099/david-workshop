import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  const faqItems: FAQItem[] = [
    {
      question: "מה רמת הניסיון הנדרשת?",
      answer: "הסמינר מתאים למתאמנים עם ניסיון בסיסי בהרמות אולימפיות. לא נדרש ניסיון מתקדם."
    },
    {
      question: "כמה משתתפים בסמינר?",
      answer: "אנחנו מגבילים כל סמינר ל-15 משתתפים כדי להבטיח הדרכה אישית ואיכותית."
    },
    {
      question: "מה המחיר?",
      answer: "פרטי המחיר יישלחו בהודעה אישית. צרו קשר לקבלת מידע מלא."
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

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-bg-primary py-20 lg:py-32">
        <div className="mx-auto px-4 text-center max-w-[1200px]">
          <h1 className="font-rubik text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            שאלות נפוצות
          </h1>
          <p className="font-heebo text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            מצאו תשובות לשאלות הנפוצות ביותר על הסמינרים של דוד ליטבינוב
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="max-w-4xl mx-auto">
            {/* FAQ Items */}
            <div className="space-y-4 mb-16">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-gray-600"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-right flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-cta focus:ring-inset"
                    aria-expanded={openItems.includes(index)}
                  >
                    <span className="font-rubik text-lg md:text-xl font-medium text-text-primary">
                      {item.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-cta transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="font-heebo text-lg text-gray-300 text-right leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="text-center border-t border-gray-700 pt-16">
              <h3 className="font-rubik text-3xl md:text-4xl font-bold mb-6">
                יש לכם שאלות נוספות?
              </h3>
              
              <p className="font-heebo text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                אני עונה אישית בוואטסאפ על כל שאלה
              </p>

              <div className="flex justify-center">
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.506"/>
                  </svg>
                  להודעה בוואטסאפ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
