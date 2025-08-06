import React from 'react';
import './About.css';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations';

const About: React.FC = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);
  const [statsRef, statsVisible] = useScrollAnimation(0.1);
  const [valuesRef, valuesAnimated] = useStaggerAnimation(200);

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div 
              ref={headerRef as React.RefObject<HTMLDivElement>}
              className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
            >
              <h2 className="gradient-text-animated">Nossa História</h2>
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
            
            <div 
              ref={statsRef as React.RefObject<HTMLDivElement>}
              className={`about-stats ${statsVisible ? 'stagger-animation' : ''}`}
            >
              <div className="stat-item hover-lift">
                <div className="stat-number gradient-text">
                  15+
                </div>
                <div className="stat-label">Anos de Experiência</div>
              </div>
              <div className="stat-item hover-lift">
                <div className="stat-number gradient-text">
                  100.000+
                </div>
                <div className="stat-label">Clientes Atendidos</div>
              </div>
              <div className="stat-item hover-lift">
                <div className="stat-number gradient-text">
                  25+
                </div>
                <div className="stat-label">Pontos de Venda</div>
              </div>
            </div>

            <div className="about-values">
              <h3 className={`gradient-text ${statsVisible ? 'animate-fade-in-up delay-400' : ''}`}>
                Nossos Valores
              </h3>
              <div 
                ref={valuesRef as React.RefObject<HTMLDivElement>}
                className="values-grid"
              >
                <div className={`value-item modern-card hover-lift ${valuesAnimated > 0 ? 'animate-scale-in' : ''}`}>
                  <div className="value-icon animate-bounce-in">🌱</div>
                  <h4>Qualidade</h4>
                  <p>Oferecemos apenas produtos de alta qualidade, selecionados criteriosamente para garantir os melhores resultados.</p>
                </div>
                <div className={`value-item modern-card hover-lift ${valuesAnimated > 1 ? 'animate-scale-in delay-200' : ''}`}>
                  <div className="value-icon animate-bounce-in delay-200">🤝</div>
                  <h4>Confiança</h4>
                  <p>Construímos relacionamentos duradouros baseados na transparência e no comprometimento com nossos clientes.</p>
                </div>
                <div className={`value-item modern-card hover-lift ${valuesAnimated > 2 ? 'animate-scale-in delay-400' : ''}`}>
                  <div className="value-icon animate-bounce-in delay-400">💡</div>
                  <h4>Inovação</h4>
                  <p>Estamos sempre em busca das últimas tendências e tecnologias do mercado de beleza e cosméticos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="image-placeholder modern-card">
              <div className="placeholder-content">
                <div className="team-icon">👥</div>
                <h4>Nossa Equipe</h4>
                <p>Especializada em Beleza</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
