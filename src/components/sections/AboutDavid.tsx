'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutDavid: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: "/images/david-whiteboard.webp",
      alt: "דוד ליטבינוב מלמד על לוח לבן"
    },
    {
      src: "/images/david-lifting-cropped.webp", 
      alt: "דוד ליטבינוב מרים משקולות"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" 
             className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col lg:hidden gap-8" dir="rtl">
          {/* Title */}
          <h2 className="typo-section-title text-center text-content">
          מי אני ולמה זה כל כך חשוב לי?
          </h2>

          {/* Description */}
          <div className="typo-body-regular-wrapped text-gray-300 text-center space-y-4">
            <p>
              קוראים לי דוד ליטבינוב – ספורטאי אולימפי ומאמן ווייטליפטינג.
              התחלתי להרים משקולות כמעט במקרה, בלי כישרון מיוחד ובלי חלום גדול – אבל עם סקרנות והתמדה.
            </p>
            <p>
              צמחתי מתחתית הרשימות באליפויות אירופה, דרך עשרות מדליות ושיאים וייצוג המדינה באליפויות עולם, ועד להופעה על הבמה האולימפית בטוקיו.
            </p>
            <p>
              במהלך השנים הבנתי דבר אחד:
              גיליתי שהבעיה היא לא בטכניקה – אלא בתקשורת.
              <strong>כשמבינים אותך נכון – הכל מתחיל לזוז.</strong>
            </p>
            <p>
              וזה בדיוק מה שאני עושה היום – עוזר לאנשים להרגיש ביטחון מול המוט, לא דרך סיסמאות אלא דרך שפה פשוטה ועקרונות שאפשר ליישם מיד.
            </p>
            <p>
              המשימה שלי?
              להנגיש את עולם הוויטליפטינג לקהל הרחב.
              לא צריך להיות מקצוען כדי להרגיש חזק, מדויק ושלם באימון.
              אני כאן כדי להראות לך שאפשר גם אחרת – ולגרום לך לאהוב את זה.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center">
            <div className="retina-image-container transform hover:scale-105 transition-all duration-300 relative">
              {images.map((image, index) => (
                <picture key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <source srcSet={image.src} type="image/webp" />
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="retina-image"
                  />
                </picture>
              ))}
            </div>
          </div>


          {/* CTA Button */}
          <div className="text-center">
            <Link href="/about-david" className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-regular px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              לסיפור המלא שלי
            </Link>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex lg:flex-row gap-12 lg:gap-16 items-center" dir="ltr">
          {/* Image Side - Left */}
          <div className="flex-1 flex justify-center items-center">
            <div className="retina-image-container transform hover:scale-105 transition-all duration-300 relative">
              {images.map((image, index) => (
                <picture key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <source srcSet={image.src} type="image/webp" />
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="retina-image"
                  />
                </picture>
              ))}
            </div>
          </div>

          {/* Content Side - Right */}
          <div className="flex-1 text-center lg:text-right" dir="rtl">
            {/* Title */}
            <h2 className="typo-section-title mb-10 text-content">
            מי אני ולמה זה כל כך חשוב לי?
            </h2>

            {/* Description */}
            <div className="typo-body-regular-wrapped text-gray-300 mb-8 space-y-4">
              <p>
                קוראים לי דוד ליטבינוב – ספורטאי אולימפי ומאמן ווייטליפטינג.
                התחלתי להרים משקולות כמעט במקרה, בלי כישרון מיוחד ובלי חלום גדול – אבל עם סקרנות והתמדה.
              </p>
              <p>
                צמחתי מתחתית הרשימות באליפויות אירופה, דרך עשרות מדליות ושיאים וייצוג המדינה באליפויות עולם, ועד להופעה על הבמה האולימפית בטוקיו.
              </p>
              <p>
                במהלך השנים הבנתי דבר אחד:
                גיליתי שהבעיה היא לא בטכניקה – אלא בתקשורת.
                <strong>כשמבינים אותך נכון – הכל מתחיל לזוז.</strong>
              </p>
              <p>
                וזה בדיוק מה שאני עושה היום – עוזר לאנשים להרגיש ביטחון מול המוט, לא דרך סיסמאות אלא דרך שפה פשוטה ועקרונות שאפשר ליישם מיד.
              </p>
              <p>
                המשימה שלי?
                להנגיש את עולם הוויטליפטינג לקהל הרחב.
                לא צריך להיות מקצוען כדי להרגיש חזק, מדויק ושלם באימון.
                אני כאן כדי להראות לך שאפשר גם אחרת – ולגרום לך לאהוב את זה.
              </p>
            </div>


            {/* CTA Button */}
            <Link href="/about-david" className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-regular px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              לסיפור המלא שלי
            </Link>
          </div>
        </div>

        {/* Trust Factor Banner - Media Logos */}
        <div className="mt-16 lg:mt-14 pt-12">
          <div className="text-center" dir="rtl">
            {/* Featured In Text */}
            <h3 className="typo-body-regular text-gray-400 mb-14">
            על הקריירה שלי כספורטאי סיקרו ב - 
            </h3>
            
            {/* Logos Row */}
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-95">
              <div className="h-8 lg:h-full flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/israelhayom-logo.webp"
                  alt="ישראל היום"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-full flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/ynet-logo.webp"
                  alt="ynet"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-full flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/sport5-logo.webp"
                  alt="Sport 5"
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="h-8 lg:h-full flex items-center transform hover:scale-110 transition-all duration-300">
                <img 
                  src="/images/logos/sport1-logo.webp"
                  alt="Sport 1"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDavid; 