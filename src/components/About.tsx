import React, { useState, useEffect } from 'react';
import { Leaf, Handshake, Lightbulb } from 'lucide-react';
import './About.css';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations';

const About: React.FC = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);
  const [statsRef, statsVisible] = useScrollAnimation(0.1);
  const [valuesRef, valuesAnimated] = useStaggerAnimation(200);
  const [currentSlide, setCurrentSlide] = useState(0);

  const historyImages = [
    { src: '/images/history/placeholder1.jpeg', alt: 'Nossa História - Início da Rede Alecrim' },
    { src: '/images/history/placeholder2.jpeg', alt: 'Crescimento e Expansão da Rede' },
    { src: '/images/history/placeholder3.jpeg', alt: 'Rede Alecrim Hoje - Compromisso com a Beleza' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % historyImages.length);
    }, 4000); // Troca de slide a cada 4 segundos

    return () => clearInterval(interval);
  }, [historyImages.length]);

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="about-history">
              <div 
                ref={headerRef as React.RefObject<HTMLDivElement>}
                className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
              >
                <h2>Nossa História</h2>
              </div>
              <div 
                ref={contentRef as React.RefObject<HTMLDivElement>}
                className={`about-paragraphs ${contentVisible ? 'stagger-animation' : ''}`}
              >
                <p>
                  A Rede Alecrim nasceu da paixão pela beleza e pelo atendimento de excelência. 
                  Fundada com o propósito de democratizar o acesso a produtos de qualidade, 
                  hoje somos referência no mercado de cosméticos e beleza.
                </p>
                <p>
                  Nossa equipe especializada está sempre pronta para oferecer consultoria 
                  personalizada, ajudando cada cliente a encontrar os produtos ideais 
                  para realçar sua beleza natural e aumentar sua autoestima.
                </p>
              </div>
            </div>
            
            <div className="about-image">
              <div className="about-image-container modern-card">
                <div className="history-slider">
                  {historyImages.map((image, index) => (
                    <div
                      key={index}
                      className={`history-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="history-slide-image"
                      />
                      <div className="history-slide-overlay">
                        <h4>Nossa Jornada</h4>
                      </div>
                    </div>
                  ))}
                  <div className="history-slider-indicators">
                    {historyImages.map((_, index) => (
                      <button
                        key={index}
                        className={`history-indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className={`about-stats ${statsVisible ? 'stagger-animation' : ''}`}
          >
            <div className="stat-item">
              <div className="stat-number gradient-text">
                45+
              </div>
              <div className="stat-label">Anos de Experiência</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">
                200.000+
              </div>
              <div className="stat-label">Clientes Atendidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">
                20+
              </div>
              <div className="stat-label">Pontos de Venda</div>
            </div>
          </div>
          
          <div className="about-values">
            <div 
              ref={valuesRef as React.RefObject<HTMLDivElement>}
              className="values-grid"
            >
              <div className={`value-item modern-card hover-lift ${valuesAnimated > 0 ? 'animate-scale-in' : ''}`}>
                <div className="value-icon animate-bounce-in">
                  <Leaf size={32} />
                </div>
                <h4>Missão</h4>
                <p>Transformar a vida de nossos colaboradores, clientes e parceiros através da inclusão no nosso ecossistema de beleza.</p>
              </div>
              <div className={`value-item modern-card hover-lift ${valuesAnimated > 2 ? 'animate-scale-in delay-400' : ''}`}>
                <div className="value-icon animate-bounce-in delay-400">
                  <Lightbulb size={32} />
                </div>
                <h4>Valores</h4>
                <p>Somos apaixonados pelo que fazemos, íntegros em nossas atitudes, respeitamos as pessoas e relacionamentos, somos transparentes em ações e decisões. Somos inquietos na busca pelo crescimento sustentável e pela alta performance.</p>
              </div>
              <div className={`value-item modern-card hover-lift ${valuesAnimated > 1 ? 'animate-scale-in delay-200' : ''}`}>
                <div className="value-icon animate-bounce-in delay-200">
                  <Handshake size={32} />
                </div>
                <h4>Visão</h4>
                <p>Ser uma franquia de alta performance, gerando valor econômico, social e ambiental.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
