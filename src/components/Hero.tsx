import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useParallax } from '../hooks/useAnimations';

const Hero: React.FC = () => {
  const [parallaxRef, parallaxOffset] = useParallax(0.5);
  const [currentSlide, setCurrentSlide] = useState(0);

  const storeImages = [
    { src: '/images/stores/assai jaguare.png', alt: 'Assaí Jaguaré' },
    { src: '/images/stores/assai taboao.png', alt: 'Assaí Taboão' },
    { src: '/images/stores/shopping butantã.png', alt: 'Shopping Butantã' },
    { src: '/images/stores/shopping taboão.png', alt: 'Shopping Taboão' },
    { src: '/images/stores/shopping vila olimpia.png', alt: 'Shopping Vila Olímpia' },
    { src: '/images/stores/qdb butanta.png', alt: 'QDB Butantã' },
    { src: '/images/stores/qdb taboao.png', alt: 'QDB Taboão' },
    { src: '/images/stores/qdb vila olimpia.png', alt: 'QDB Vila Olímpia' },
    { src: '/images/stores/metro butantã.png', alt: 'Metrô Butantã' },
    { src: '/images/stores/portal morumbi.png', alt: 'Portal Morumbi' },
    { src: '/images/stores/joao cachoeira.png', alt: 'João Cachoeira' },
    { src: '/images/stores/cupece.png', alt: 'Cupecê' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storeImages.length);
    }, 3000); // Troca de slide a cada 3 segundos

    return () => clearInterval(interval);
  }, [storeImages.length]);

  return (
    <section id="home" className="hero" ref={parallaxRef as React.RefObject<HTMLElement>}>
      <div 
        className="hero-bg"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      ></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo animate-fade-in-up">
            <img 
              src="/images/mainLogo.png" 
              alt="Rede Alecrim" 
              className="hero-title-logo"
            />
          </div>
          <p className="hero-subtitle animate-fade-in-up delay-500">
            Transformando beleza em oportunidades. Somos uma rede de lojas especializadas em produtos de beleza e cosméticos, oferecendo as melhores marcas e atendimento personalizado.
          </p>
          <div className="hero-actions animate-fade-in-up delay-800">
            <a href="#contact" className="btn btn-primary hero-btn hover-lift">
              Entre em Contato
            </a>
            <a href="#about" className="btn btn-outline hero-btn hover-glow">
              Saiba Mais
            </a>
          </div>
        </div>
        <div className="hero-image animate-fade-in-right delay-300">
          <div className="hero-image-container">
            <div className="stores-slider">
              {storeImages.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="store-slide-image"
                    onClick={() => window.location.href = '#stores'}
                  />
                  <div className="slide-overlay">
                    <h4>{image.alt}</h4>
                  </div>
                </div>
              ))}
              <div className="slider-indicators">
                {storeImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll animate-bounce-in delay-1000">
        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
