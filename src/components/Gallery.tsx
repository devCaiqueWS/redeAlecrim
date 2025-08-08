import React, { useState } from 'react';
import { Palette, UserCheck, GraduationCap, Star, Flame, Sparkles, SoapDispenserDroplet } from 'lucide-react';
import './Gallery.css';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [galleryRef, galleryAnimated] = useStaggerAnimation(150);

  const galleryItems = [
    {
      id: 1,
      title: 'Maquiagem Profissional',
      category: 'makeup',
      description: 'Serviços de maquiagem para eventos especiais',
      icon: <Palette size={24} />
    },
    {
      id: 2,
      title: 'Produtos Premium',
      category: 'products',
      description: 'Linha exclusiva de cosméticos de alta qualidade',
      icon: <Sparkles size={24} />
    },
    {
      id: 3,
      title: 'Atendimento Personalizado',
      category: 'service',
      description: 'Consultoria especializada em beleza',
      icon: <UserCheck size={24} />
    },
    {
      id: 4,
      title: 'Workshops de Beleza',
      category: 'events',
      description: 'Cursos e workshops para clientes',
      icon: <GraduationCap size={24} />
    },
    {
      id: 5,
      title: 'Tendências da Moda',
      category: 'trends',
      description: 'Últimas tendências em maquiagem e beleza',
      icon: <Star size={24} />
    },
    {
      id: 6,
      title: 'Cuidados com a Pele',
      category: 'skincare',
      description: 'Produtos e tratamentos para todos os tipos de pele',
      icon: <SoapDispenserDroplet size={24} />
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: <Flame size={16} /> },
    { id: 'makeup', name: 'Maquiagem', icon: <Palette size={16} /> },
    { id: 'products', name: 'Produtos', icon: <Sparkles size={16} /> },
    { id: 'service', name: 'Serviços', icon: <UserCheck size={16} /> },
    { id: 'events', name: 'Eventos', icon: <GraduationCap size={16} /> },
    { id: 'trends', name: 'Tendências', icon: <Star size={16} /> },
    { id: 'skincare', name: 'Skincare', icon: <SoapDispenserDroplet size={16} /> }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <h2>Nossa Galeria</h2>
          <p className={`${headerVisible ? 'animate-fade-in-up delay-200' : ''}`}>
            Conheça alguns dos nossos trabalhos e serviços especiais. 
            Cada projeto é realizado com muito cuidado e dedicação 
            para proporcionar a melhor experiência aos nossos clientes.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className={`gallery-filters ${headerVisible ? 'animate-fade-in-up delay-400' : ''}`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} hover-lift`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div 
          ref={galleryRef as React.RefObject<HTMLDivElement>}
          className="gallery-grid"
        >
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`gallery-item modern-card hover-lift ${galleryAnimated > index ? 'animate-scale-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="gallery-image">
                <div className="image-placeholder">
                  <div className="placeholder-content">
                    <div className="item-icon animate-pulse">{item.icon}</div>
                    <h4>{item.title}</h4>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="category-badge">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`gallery-cta ${headerVisible ? 'animate-fade-in-up delay-800' : ''}`}>
          <h3>Quer saber mais sobre nossos serviços?</h3>
          <p>Entre em contato conosco e descubra como podemos ajudar você a realçar sua beleza natural.</p>
          <a href="#contact" className="btn btn-outline hover-glow">
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
