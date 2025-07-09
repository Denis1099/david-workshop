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
      <div className="mx-auto px-2 sm:px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            מה אומרים המשתתפים?
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 lg:mb-12">
          {videoTestimonials.map((video, index) => {
            // Desktop logic: show first 3, then all 6
            // Mobile logic: show first 2, then first 4
            const showOnDesktop = showAllVideos || index < 3;
            const showOnMobile = showAllVideos ? index < 4 : index < 2;
            
            return (
              <div 
                key={video.id} 
                className={`
                  ${showOnMobile ? 'block' : 'hidden'} 
                  ${showOnDesktop ? 'lg:block' : 'lg:hidden'}
                `}
              >
                <div className="relative transform hover:scale-105 transition-all duration-300">
                  <iframe
                    title={video.title}
                    src={video.src}
                    className="w-full h-[500px] sm:h-[520px] md:h-[400px] lg:h-[500px] xl:h-[520px] rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {!showAllVideos && (
          <div className="text-center">
            <button
              onClick={() => setShowAllVideos(true)}
              className="bg-cta hover:bg-yellow-600 text-bg-primary 
                         px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-medium
                         transition-all duration-300
                         typo-body-regular-wrapped
                         transform hover:scale-105"
            >
              טען עוד סרטונים
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials; 