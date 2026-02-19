import React, { useState, useEffect } from 'react';

const BackgroundCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cinematicImages = [
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1489599807961-c79686cb15c2?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cinematicImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cinematicImages.length]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {cinematicImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Cinematic background ${index + 1}`}
            className="carousel-image w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="cinematic-overlay absolute inset-0 w-full h-full"></div>
    </div>
  );
};

export default BackgroundCarousel;
