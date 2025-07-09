import React, { useState } from 'react';

const Testimonials: React.FC = () => {
  const videoTestimonials = [
    {
      id: 1,
      src: "https://player.vimeo.com/video/1095582275?h=14d499dee0&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 1"
    },
    {
      id: 2,
      src: "https://player.vimeo.com/video/1095582322?h=6ed57fda21&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 2"
    },
    {
      id: 3,
      src: "https://player.vimeo.com/video/1095582371?h=cac4def62f&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 3"
    },
    {
      id: 4,
      src: "https://player.vimeo.com/video/1095582478?h=db0aab26ab&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 4"
    },
    {
      id: 5,
      src: "https://player.vimeo.com/video/1095582405?h=c6db283a99&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 5"
    },
    {
      id: 6,
      src: "https://player.vimeo.com/video/1095585750?h=3d05cce844&title=0&byline=0&portrait=0",
      title: "המלצת לקוח 6"
    }
  ];

  const [showAllVideos, setShowAllVideos] = useState(false);

  return (
    <section id="testimonials" className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="container-mobile">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            מה אומרים המשתתפים?
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="mobile-grid-3 mb-8 sm:mb-12">
          {videoTestimonials.map((video, index) => {
            // Mobile logic: show first 2, then expand to 4
            // Tablet logic: show first 4, then expand to 6  
            // Desktop logic: show first 3, then expand to all 6
            let showOnMobile, showOnTablet, showOnDesktop;
            
            if (showAllVideos) {
              showOnMobile = index < 4;
              showOnTablet = index < 6;
              showOnDesktop = true;
            } else {
              showOnMobile = index < 2;
              showOnTablet = index < 4;
              showOnDesktop = index < 3;
            }
            
            return (
              <div 
                key={video.id} 
                className={`
                  ${showOnMobile ? 'block' : 'hidden'} 
                  ${showOnTablet ? 'sm:block' : 'sm:hidden'}
                  ${showOnDesktop ? 'lg:block' : 'lg:hidden'}
                `}
              >
                <div className="relative transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg bg-gray-800">
                  <div className="aspect-video w-full h-64 sm:h-72 md:h-80 lg:h-64">
                    <iframe
                      title={video.title}
                      src={video.src}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Optional overlay for better mobile interaction */}
                  <div className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {!showAllVideos && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAllVideos(true)}
              className="bg-white hover:bg-gray-100 text-bg-primary 
                         btn-mobile-optimized
                         typo-button-cta
                         transform hover:scale-105 shadow-lg"
            >
              הצג עוד
            </button>
          </div>
        )}

        {/* Show Less Button (only when all videos are shown) */}
        {showAllVideos && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllVideos(false)}
              className="bg-transparent border-2 border-text-primary 
                         text-text-primary hover:bg-text-primary 
                         hover:text-bg-primary btn-mobile-optimized
                         typo-button-regular transition-all duration-300"
            >
              הצג פחות
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials; 