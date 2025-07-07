import React from 'react';

const Footer: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-12 lg:py-16">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center 
                         md:text-right">
          
          {/* About Section */}
          <div>
            <h3 className="typo-body-large-wrapped font-bold mb-4 text-cta">
              דוד ליטבינוב
            </h3>
            <p className="typo-body-small-wrapped text-gray-300 leading-relaxed">
              ספורטאי אולימפי, שיאן ישראל ומאמן ווייטליפטינג מוביל. 
              מלמד את הטכניקה הנכונה לכל הרמות.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="typo-body-large-wrapped font-bold mb-4">
              קישורים מהירים
            </h4>
            <div className="space-y-2">
              <a href="/#about" 
                 className="typo-body-small-wrapped text-gray-300 hover:text-cta 
                           transition-colors block">
                אודות דוד
              </a>
              <a href="/#upcoming" 
                 className="typo-body-small-wrapped text-gray-300 hover:text-cta 
                           transition-colors block">
                סדנאות קרובות
              </a>
              <a href="/faq" 
                 className="typo-body-small-wrapped text-gray-300 hover:text-cta 
                           transition-colors block">
                שאלות נפוצות
              </a>
              <a href="/#gym-owners" 
                 className="typo-body-small-wrapped text-gray-300 hover:text-cta 
                           transition-colors block">
                לבעלי סטודיו
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="typo-body-large-wrapped font-bold mb-4">יצירת קשר</h4>
            <div className="space-y-3">
              <button 
                onClick={handleWhatsAppClick}
                className="typo-body-small-wrapped text-gray-300 hover:text-cta 
                          transition-colors flex items-center gap-2 mx-auto 
                          md:mr-0"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 712.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                וואטסאפ
              </button>
              <p className="typo-body-small-wrapped text-gray-400">
                לשאלות ולהרשמה
              </p>
            </div>
          </div>

          {/* Seminars */}
          <div>
            <h4 className="typo-body-large-wrapped font-bold mb-4">הסדנאות</h4>
            <div className="space-y-2">
              <p className="typo-body-small-wrapped text-gray-300">
                ➤ טכניקה נכונה
              </p>
              <p className="typo-body-small-wrapped text-gray-300">
                ➤ בטיחות מלאה
              </p>
              <p className="typo-body-small-wrapped text-gray-300">
                ➤ תוכנית אישית
              </p>
              <p className="typo-body-small-wrapped text-gray-300">
                ➤ ליווי מתמשך
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between 
                          items-center gap-4">
            <p className="text-sm text-gray-400 text-content">
              © 2024 דוד ליטבינוב - סדנאות ווייטליפטינג. כל הזכויות שמורות.
            </p>
            <div className="text-sm text-gray-400 text-content">
              פותח עם ❤️ עבור הקהילה הישראלית
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 