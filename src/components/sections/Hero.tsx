import React from 'react';

const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  return (
    <section className="bg-bg-primary text-text-primary py-20 lg:py-32">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 items-center" 
             dir="ltr">
          {/* Text Content - Left Side */}
          <div className="flex-1 lg:flex-[2.8] text-right lg:text-right" 
               dir="rtl">
            {/* Main Headline */}
            <h1 className="typo-page-title leading-tight mb-8 text-content">
              הסדנה <span className="underline decoration-cta decoration-4 
                                    underline-offset-4">היחידה</span> בארץ 
              שתלמד
              <br />
              אותך לשלוט בהרמת משקולות
              <br />
              בביטחון מלא ובטכניקה נכונה.
            </h1>

            {/* Subheadline */}
            <p className="typo-body-large-wrapped text-gray-300 mb-20 
                          leading-relaxed">
              שלום, אני דוד ליטבינוב - ספורטאי אולימפי ושיאן ישראל
              <br />
              אני מזמין אותך לסדנה שלי שתשנה לך את הטכניקה לתמיד.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-start 
                            items-start mb-12">
              {/* Primary CTA */}
              <button className="bg-cta hover:bg-yellow-600 text-bg-primary 
                                typo-button-cta px-8 py-4 rounded-lg 
                                transition-colors">
                סדנאות קרובות
              </button>

              {/* Secondary CTA */}
              <button 
                onClick={handleWhatsAppClick}
                className="bg-transparent border-2 border-text-primary 
                          text-text-primary hover:bg-text-primary 
                          hover:text-bg-primary typo-button-regular px-8 
                          py-4 rounded-lg transition-colors flex items-center 
                          gap-3"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.4M12.043 21.785h-.004c-1.774 0-3.513-.477-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m5.413-7.402c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                ליצירת קשר בוואטסאפ
              </button>
            </div>

            {/* Social Proof - Individual Avatars */}
            <div className="flex items-center gap-8 justify-start">
              {/* Individual Avatar Images Stacked 
                  Using individual margins for full control
                  Change the 'ml-*' values to adjust spacing:
                  ml-0 = no overlap, ml-[-8px] = slight overlap, 
                  ml-[-12px] = medium overlap, ml-[-16px] = tight overlap
              */}
              <div className="flex items-center">
                <img 
                  src="/images/avatars/avatar1.webp"
                  alt="משתתף בסדנה 1"
                  className="w-12 h-12 rounded-full border-2 
                            border-white shadow-md relative z-30  ml-[-24px]"
                  loading="lazy"
                />
                <img 
                  src="/images/avatars/avatar2.webp"
                  alt="משתתף בסדנה 2"
                  className="w-12 h-12 rounded-full border-2 
                            border-white shadow-md relative z-20 ml-[-24px]"
                  loading="lazy"
                />
                <img 
                  src="/images/avatars/avatar3.webp"
                  alt="משתתף בסדנה 3"
                  className="w-12 h-12 rounded-full border-2 
                            border-white shadow-md relative z-10 ml-[-24px]"
                  loading="lazy"
                />
                <img 
                  src="/images/avatars/avatar4.webp"
                  alt="משתתף בסדנה 4"
                  className="w-12 h-12 rounded-full border-2 
                            border-white shadow-md relative z-0 ml-[-24px]"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="text-right">
                <p className="typo-body-regular-wrapped text-gray-300 
                              font-medium">
                  +350 מתאמנים שהודרכו ממליצים
                </p>
             
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex-1 lg:flex-[2.2] relative">
            <div className="aspect-square lg:aspect-auto lg:h-[514px] 
                           lg:w-[364px] rounded-2xl overflow-hidden">
              <picture>
                <source srcSet="/images/david-hero.webp" 
                        type="image/webp" />
                <img 
                  src="/images/david-hero.webp"
                  alt="דוד ליטבינוב מסביר טכניקה על הלוח"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 