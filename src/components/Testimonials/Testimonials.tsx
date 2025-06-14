import React, { useEffect, useRef } from 'react';

interface TestimonialProps {}

const Testimonials: React.FC<TestimonialProps> = () => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Swiper if available
    const initSwiper = () => {
      if (window.Swiper && swiperRef.current) {
        new window.Swiper(swiperRef.current, {
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            // when window width is > 400px
            401: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is > 800px
            801: {
              slidesPerView: 2,
              spaceBetween: 32
            },
            // when window width is > 1200px
            1201: {
              slidesPerView: 2,
              spaceBetween: 80
            }
          }
        });
      }
    };

    // Try to initialize immediately, or wait for Swiper to load
    if (window.Swiper) {
      initSwiper();
    } else {
      // Wait for Swiper to be available
      const checkSwiper = setInterval(() => {
        if (window.Swiper) {
          clearInterval(checkSwiper);
          initSwiper();
        }
      }, 100);

      return () => clearInterval(checkSwiper);
    }
  }, []);

  const testimonials = [
    {
      id: 1,
      image: "images/portfolio/tache-lik.png",
      name: "University Students",
      title: "Educational Platform Clients",
      quote: "A platform that transformed how we approach learning and collaboration. The intuitive design and seamless functionality provided us with the tools to innovate, learn, and grow. A trusted partner in shaping the next generation of developers and creators."
    },
    {
      id: 2,
      image: "images/icons/Jameela.svg",
      name: "Jameela App",
      title: "Mobile Application",
      quote: "Collaborating on cutting-edge software with a focus on innovation, usability, and scalability has been a game-changer. The results not only met our expectations but exceeded them in terms of creativity and technical execution. Truly a leader in technological solutions."
    },
    {
      id: 3,
      image: "images/portfolio/esprit.jpg",
      name: "ESPRIT University",
      title: "Award Recognition",
      quote: "Awarded second place for the best video game design and development at ESPRIT University. The project demonstrated exceptional creativity, attention to detail, and technical mastery. A remarkable achievement that highlights a commitment to excellence and innovation."
    }
  ];

  return (
    <div className="row testimonials">
      <div className="column lg-12" data-animate-block>
        <div
          ref={swiperRef}
          className="swiper-container testimonial-slider"
          data-animate-el
        >
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slider__slide swiper-slide">
                <div className="testimonial-slider__author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-slider__avatar"
                  />
                  <cite className="testimonial-slider__cite">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.title}</span>
                  </cite>
                </div>
                <p>"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
