import React from 'react';
import './Hero.css';
import { useTypewriter, useParallax } from '../hooks/useAnimations';

const Hero: React.FC = () => {
  const [titleRef, displayTitle] = useTypewriter('Rede Alecrim', 100);
  const [parallaxRef, parallaxOffset] = useParallax(0.5);

  return (
    <section id="home" className="hero" ref={parallaxRef as React.RefObject<HTMLElement>}>
      <div 
        className="hero-bg"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      ></div>
      <div className="container">
        <div className="hero-content">
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="hero-title animate-fade-in-up"
          >
            {displayTitle}
          </h1>
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
            <img 
              src="/images/hero-beauty.svg" 
              alt="Rede Alecrim - Produtos de Beleza e Cosméticos" 
              className="hero-main-image"
            />
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
