import React, { useState, useEffect } from 'react';
import styles from './TestimonialCarousel.module.css';
import Diego1 from '@assets/testimonials/diego1.png';
import Maria1 from '@assets/testimonials/maria1.png';

const testimonials = [
  {
    id: 1,
    image: Diego1,
    alt: 'Testimonio Diego'
  },
  {
    id: 2,
    image: Maria1,
    alt: 'Testimonio Maria'
  }
];

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.slide}>
              <img 
                src={testimonial.image} 
                alt={testimonial.alt}
                className={styles.testimonialImage}
              />
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ''
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
