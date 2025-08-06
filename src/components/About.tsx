import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="fade-in">[TÍTULO SOBRE A EMPRESA]</h2>
            <p className="fade-in">
              [Escrever aqui a história da empresa, seus valores e missão. 
              Conte sobre como começou, o que motiva vocês e qual o diferencial 
              que oferece aos clientes.]
            </p>
            <p className="fade-in">
              [Adicione mais informações sobre a experiência da equipe, 
              os resultados alcançados e a visão de futuro da empresa. 
              Faça o leitor se conectar com a história.]
            </p>
            
            <div className="about-stats fade-in">
              <div className="stat-item">
                <div className="stat-number">[XX]</div>
                <div className="stat-label">[Anos de Experiência]</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">[XXX]</div>
                <div className="stat-label">[Clientes Atendidos]</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">[XX]</div>
                <div className="stat-label">[Projetos Realizados]</div>
              </div>
            </div>

            <div className="about-values fade-in">
              <h3>Nossos Valores</h3>
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">🌱</div>
                  <h4>[VALOR 1]</h4>
                  <p>[Descrição do valor]</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h4>[VALOR 2]</h4>
                  <p>[Descrição do valor]</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">💡</div>
                  <h4>[VALOR 3]</h4>
                  <p>[Descrição do valor]</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image fade-in">
            <div className="image-placeholder">
              [IMAGEM DA EMPRESA/EQUIPE]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
