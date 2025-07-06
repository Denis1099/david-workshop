import React from 'react';

const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/mfzmps', '_blank');
  };

  return (
    <section className="bg-bg-primary text-text-primary py-20 lg:py-32">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 items-center" dir="ltr">
          {/* Text Content - Left Side */}
          <div className="flex-1 lg:flex-[2.8] text-right lg:text-right" dir="rtl">
            {/* Main Headline */}
            <h1 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              הסדנה <span className="underline decoration-cta decoration-4 underline-offset-4">היחידה</span> בארץ שתלמד
              <br />
              אותך לשלוט בהרמת משקולות
              <br />
              בביטחון מלא ובטכניקה נכונה.
            </h1>

            {/* Subheadline */}
            <p className="font-heebo text-xl md:text-2xl text-gray-300 mb-20 leading-relaxed">
              שלום, אני דוד ליטבינוב - ספורטאי אולימפי ושיאן ישראל
              <br />
              אני מזמין אותך לסדנה שלי שתשנה לך את הטכניקה לתמיד.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-start items-start">
              {/* Primary CTA */}
              <button className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors">
                סדנאות קרובות
              </button>

              {/* Secondary CTA */}
              <button 
                onClick={handleWhatsAppClick}
                className="bg-transparent border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors"
              >
                ליצירת קשר בוואטסאפ
              </button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex-1 lg:flex-[2.2] relative">
            <div className="aspect-square lg:aspect-auto lg:h-[514px] lg:w-[364px] rounded-2xl overflow-hidden">
              <picture>
                <source srcSet="/images/david-hero.webp" type="image/webp" />
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