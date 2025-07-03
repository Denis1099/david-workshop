import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "משתתף 1",
      text: "הסדנה שינתה לי את הגישה לווייטליפטינג לחלוטין",
      videoUrl: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Video+Testimonial+1",
      duration: "00:31"
    },
    {
      id: 2,
      name: "משתתף 2", 
      text: "הרגשתי ביטחון עם המוט לראשונה",
      videoUrl: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Video+Testimonial+2",
      duration: "01:11"
    }
  ];

  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            מה אומרים משתתפים שכבר היו בסדנה?
          </h2>
        </div>

        {/* Video Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative group">
              {/* Video Container - Mobile Phone Aspect Ratio */}
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-sm">
                <div className="aspect-[9/16] relative">
                  {/* Placeholder for video */}
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white text-sm">
                        עדות וידאו {testimonial.id}
                      </p>
                    </div>
                  </div>

                  {/* Video Duration */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    {testimonial.duration}
                  </div>

                  {/* Play Button Overlay */}
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
                <p className="font-heebo text-lg text-gray-300 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-rubik text-text-primary font-medium mt-2">
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