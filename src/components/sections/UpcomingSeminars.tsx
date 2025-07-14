import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingSeminars: React.FC = () => {
  const seminars = [
    {
      id: 1,
      city: "תל אביב",
      location: "פיט אנד פאן",
      date: "15 בפברואר",
      time: "10:00-14:00",
      price: "₪399",
      spotsLeft: 3
    },
    {
      id: 2,
      city: "חיפה", 
      location: "בולדר חיפה",
      date: "22 בפברואר",
      time: "10:00-14:00",
      price: "₪399",
      spotsLeft: 7
    },
    {
      id: 3,
      city: "ירושלים",
      location: "ג'ים סנטר",
      date: "1 במרץ",
      time: "10:00-14:00", 
      price: "₪399",
      spotsLeft: 5
    }
  ];

  return (
    <section id="upcoming" 
             className="bg-gradient-to-b from-gray-100 to-white py-16 
                       lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            סדנאות קרובות
          </h2>
          <p className="typo-body-large-wrapped text-gray-600 max-w-3xl 
                        mx-auto">
            הצטרפו לסדנה הקרובה ותתחילו את המסע שלכם לווייטליפטינג נכון
          </p>
        </div>

        {/* Seminars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                        gap-8 max-w-6xl mx-auto mb-12">
          {seminars.map((seminar) => (
            <div key={seminar.id} 
                 className="bg-white rounded-2xl shadow-2xl overflow-hidden 
                           transform hover:scale-105 transition-all 
                           duration-300">
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-br from-bg-primary to-blue-800 p-6 
                              text-center">
                <div className="w-16 h-16 bg-white rounded-full flex 
                               items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bg-primary" fill="currentColor" 
                       viewBox="0 0 20 20">
                    <path fillRule="evenodd" 
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 
                             7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                          clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="typo-body-large-wrapped font-bold text-white mb-2">
                  {seminar.location}
                </h3>
                <p className="typo-body-regular-wrapped text-white font-medium">
                  {seminar.city}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 text-center">
                {/* Date */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 
                                 mb-2">
                    <svg className="w-5 h-5 text-bg-primary" fill="currentColor" 
                         viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 
                               002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 
                               0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 
                               2h8a1 1 0 100-2H6z" 
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      תאריך
                    </span>
                  </div>
                  <p className="typo-body-large-wrapped text-gray-800 font-bold">
                    {seminar.date}
                  </p>
                </div>

                {/* Time */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 
                                 mb-2">
                    <svg className="w-5 h-5 text-bg-primary" fill="currentColor" 
                         viewBox="0 0 20 20">
                      <path fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 
                               0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 
                               0 101.415-1.415L11 9.586V6z" 
                            clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      שעה
                    </span>
                  </div>
                  <p className="typo-body-large-wrapped text-gray-800 font-bold">
                    {seminar.time}
                  </p>
                </div>

                {/* Spots Left */}
                <div className="mb-6">
                  <div className="bg-green-100 text-green-800 px-3 py-1 
                                 rounded-full text-sm font-medium 
                                 inline-block">
                    נותרו {seminar.spotsLeft} מקומות
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-2xl md:text-3xl font-rubik font-bold 
                                 text-bg-primary">
                    {seminar.price}
                  </div>
                  <p className="typo-body-small-wrapped text-gray-500">
                    למשתתף
                  </p>
                </div>

                {/* CTA Button */}
                <Link 
                  to="/seminars"
                  className="w-full bg-cta hover:bg-yellow-600 
                            text-bg-primary typo-button-cta py-3 rounded-lg 
                            transition-colors block text-center"
                >
                  לדף הסדנה
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link 
            to="/seminars"
            className="bg-cta hover:bg-yellow-600 text-bg-primary 
                      typo-button-cta px-8 py-4 rounded-lg 
                      transition-all duration-300 transform hover:scale-105 
                      inline-block"
          >
            לצפייה בכל הסדנאות
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSeminars; 