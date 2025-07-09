import React from 'react';
import { Link } from 'react-router-dom';

const ContactFAQ: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="container-mobile text-center">
        {/* Title */}
        <div className="text-center">
          <h2 className="typo-section-title mb-6 text-content">
            יש לכם שאלות? בואו נדבר
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="text-center">
          <p className="typo-body-large-wrapped text-gray-300 mb-12 max-w-3xl 
                        mx-auto">
            אני עונה אישית בווטסאפ על כל שאלה
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center 
                        items-center max-w-md mx-auto">
          {/* Secondary CTA - FAQ Page */}
          <Link 
            to="/faq" 
            className="w-full xs:w-auto bg-transparent border-2 border-text-primary 
                      text-text-primary hover:bg-text-primary 
                      hover:text-bg-primary typo-button-regular btn-mobile-optimized 
                      transition-all duration-300 transform hover:scale-105"
          >
           שאלות נפוצות
          </Link>

          {/* Primary CTA - WhatsApp */}
          <button 
            onClick={handleWhatsAppClick}
            className="w-full xs:w-auto bg-cta hover:bg-yellow-600 text-bg-primary 
                      typo-button-cta btn-mobile-optimized
                      transition-all duration-300 flex items-center justify-center gap-3 
                      transform hover:scale-105 shadow-lg"
          >
            ליצירת קשר
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ; 