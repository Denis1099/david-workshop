import React from 'react';

const UpcomingSeminars: React.FC = () => {
  const seminars = [
    {
      id: 1,
      location: "CrossFit Haifa",
      city: "חיפה",
      date: "10.8.25",
      time: "09:00-13:00",
      spotsLeft: 8,
      price: "300"
    },
    {
      id: 2,
      location: "CrossFit TLV", 
      city: "תל אביב",
      date: "27.7.25",
      time: "09:00-13:00",
      spotsLeft: 5,
      price: "300"
    },
    {
      id: 3,
      location: "CrossFit Ashdod",
      city: "אשדוד", 
      date: "13.7.25",
      time: "09:00-13:00",
      spotsLeft: 12,
      price: "300"
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            סדנאות קרובות
          </h2>
        </div>

        {/* Seminar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {seminars.map((seminar) => (
            <div key={seminar.id} className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-br from-cta to-yellow-600 p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cta" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-rubik text-2xl font-bold text-white mb-2">
                  {seminar.location}
                </h3>
                <p className="text-white text-lg font-medium">
                  {seminar.city}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 text-center">
                {/* Date */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-rubik text-gray-600 font-medium">תאריך</span>
                  </div>
                  <p className="font-heebo text-2xl font-bold text-gray-800">
                    {seminar.date}
                  </p>
                </div>

                {/* Time */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-cta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-rubik text-gray-600 font-medium">שעה</span>
                  </div>
                  <p className="font-heebo text-xl font-bold text-gray-800">
                    {seminar.time}
                  </p>
                </div>

                {/* Spots Left */}
                <div className="mb-6">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    נותרו {seminar.spotsLeft} מקומות
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-center">
                    <span className="font-rubik text-3xl font-bold text-gray-800">
                      ₪{seminar.price}
                    </span>
                    <span className="text-gray-600 text-lg"> / משתתף</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  לדף הסדנה
                </button>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-4 text-center">
                <p className="text-gray-600 text-sm font-heebo">
                  מקסימום 15 משתתפים בלבד
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* All Seminars Button */}
        <div className="text-center">
          <button className="bg-transparent border-2 border-cta text-cta hover:bg-cta hover:text-bg-primary font-rubik font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300">
            לכל הסדנאות
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSeminars; 