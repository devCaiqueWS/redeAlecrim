import React from 'react';
import './Gallery.css';

const Gallery: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      title: '[PROJETO 1]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    },
    {
      id: 2,
      title: '[PROJETO 2]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    },
    {
      id: 3,
      title: '[PROJETO 3]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    },
    {
      id: 4,
      title: '[PROJETO 4]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    },
    {
      id: 5,
      title: '[PROJETO 5]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    },
    {
      id: 6,
      title: '[PROJETO 6]',
      category: '[CATEGORIA]',
      description: '[Breve descrição do projeto]'
    }
  ];

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>[NOSSOS PROJETOS]</h2>
          <p>
            [Escreva uma introdução sobre os projetos realizados, 
            destacando a qualidade do trabalho e a satisfação dos clientes]
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item fade-in">
              <div className="gallery-image">
                <div className="image-placeholder">
                  [IMAGEM DO PROJETO {item.id}]
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    <span className="gallery-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button className="gallery-btn">Ver Detalhes</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta fade-in">
          <h3>[QUER VER MAIS PROJETOS?]</h3>
          <p>[Convite para conhecer mais trabalhos ou entrar em contato]</p>
          <a href="#contact" className="btn btn-outline">
            [VER PORTFÓLIO COMPLETO]
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
