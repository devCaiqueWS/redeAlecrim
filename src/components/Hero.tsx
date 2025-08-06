import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title fade-in">
            [SEU TÍTULO IMPACTANTE AQUI]
          </h1>
          <p className="hero-subtitle fade-in">
            [Descrição breve e envolvente sobre sua empresa - escreva aqui sua proposta de valor única]
          </p>
          <div className="hero-actions fade-in">
            <a href="#contact" className="btn btn-primary hero-btn">
              [BOTÃO PRINCIPAL]
            </a>
            <a href="#about" className="btn btn-outline hero-btn">
              [SAIBA MAIS]
            </a>
          </div>
        </div>
        <div className="hero-image fade-in">
          <div className="image-placeholder">
            [IMAGEM PRINCIPAL]
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
