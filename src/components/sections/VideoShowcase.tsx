import React from 'react';

const VideoShowcase: React.FC = () => {
  return (
    <section className="bg-bg-primary text-text-primary py-16 lg:py-24">
      <div className="mx-auto px-2 sm:px-4 max-w-[1200px]">
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typo-section-title mb-6 text-content">
            איך זה נראה?
          </h2>
        </div>

        {/* Video Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative transform hover:scale-105 transition-all duration-300">
              <iframe
                title="איך זה נראה?"
                src="https://player.vimeo.com/video/1100994718?title=0&byline=0&portrait=0"
                className="w-full h-[500px] sm:h-[520px] md:h-[400px] lg:h-[500px] xl:h-[520px] rounded-lg"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;