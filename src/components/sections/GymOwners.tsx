import React from 'react';

const GymOwners: React.FC = () => {
  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24 relative overflow-hidden">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h2 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              יש לכם חדר כושר או סטודיו?
            </h2>
            
            {/* Subtitle */}
            <p className="font-rubik text-2xl md:text-3xl text-cta font-bold mb-8">
              יש לי הצעה מעניינת
            </p>

            {/* Value Proposition */}
            <div className="mb-8">
              <p className="font-heebo text-xl md:text-2xl text-text-primary mb-4">
                מה אם הסדנה שלי תתקיים אצלכם?
              </p>
              <p className="font-heebo text-xl md:text-2xl text-gray-300 mb-8">
                זה לא רק כיף - זה גם רווחי
              </p>
            </div>

            {/* Benefits List */}
            <div className="mb-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-heebo text-lg text-text-primary">
                    המתאמנים שלכם מקבלים סדנה מקצועית
                  </span>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-heebo text-lg text-text-primary">
                    אתם מקבלים עמלה מכל כרטיס שאני מוכר
                  </span>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-heebo text-lg text-text-primary">
                    חשיפה לקהל חדש - משתתפים מגיעים מכל הארץ לסדנה שלי
                  </span>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-heebo text-lg text-text-primary">
                    ללא השקעה - אני מספק את כל הציוד והידע
                  </span>
                </li>
              </ul>
            </div>

            {/* Result Statement */}
            <div className="mb-8">
              <p className="font-heebo text-xl text-text-primary font-medium">
                <span className="text-cta font-bold">התוצאה?</span> מתאמנים מרוצים יותר, הכנסה נוספת עבורכם, וחשיפה למקום שלכם.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-8 py-4 rounded-lg text-lg transition-colors">
              למידע נוסף
            </button>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="סטודיו כושר עם אימון קבוצתי"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-cta text-bg-primary px-4 py-2 rounded-lg font-rubik font-bold text-lg shadow-lg">
                שותפות רווחית
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymOwners; 