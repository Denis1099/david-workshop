import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "משה כהן",
      text: "הסדנה של דוד שינתה לי את הגישה לווייטליפטינג. אחרי שנים של " +
            "פחד מהמוט, היום אני מרגיש בטוח ויודע בדיוק מה אני עושה."
    },
    {
      name: "שרה לוי",
      text: "דוד הוא המאמן הכי טוב שפגשתי. הוא יודע להסביר בפשטות ולגרום " +
            "לך להרגיש בטוח. הטכניקה שלי השתפרה משמעותית."
    },
    {
      name: "אמיר גולד",
      text: "אחרי הסדנה עם דוד, סוף סוף הבנתי מה זה ווייטליפטינג נכון. " +
            "המקום הכי טוב לשפר את הטכניקה."
    }
  ];

  return (
    <section id="testimonials" className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            מה אומרים המשתתפים?
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              {/* Video Thumbnail */}
              <div className="group cursor-pointer">
                <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden relative">
                  <picture>
                    <source srcSet="/images/david-hero.webp" type="image/webp" />
                    <img 
                      src="/images/david-hero.webp"
                      alt={`המלצה מ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                  </picture>

                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-gray-800 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile-style header */}
                <div className="absolute top-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">David Litvinov</p>
                    <p className="text-gray-300 text-xs">{testimonial.name}</p>
                  </div>
                  <div className="text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="text-center mt-6">
                <p className="typo-body-regular-wrapped text-gray-300 italic">
                  "{testimonial.text}"
                </p>
                <p className="typo-body-small-wrapped text-text-primary font-medium mt-2">
                  - {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 