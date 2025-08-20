
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  // Ping health API a cada 60 segundos
  useEffect(() => {
    const fetchHealth = () => {
      fetch('https://api-redealecrim.onrender.com/health')
        .then(() => {})
        .catch(() => {});
    };
    fetchHealth(); // primeira chamada ao montar
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand animate-fade-in-left">
          <div className="logo">
            <img src="/images/ciano.svg" alt="Rede Alecrim" />
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="animate-fade-in-down delay-100"><a href="/" onClick={() => setIsMenuOpen(false)} className="nav-link">Início</a></li>
            <li className="animate-fade-in-down delay-200"><a href="/#about" onClick={() => setIsMenuOpen(false)} className="nav-link">Sobre</a></li>
            <li className="animate-fade-in-down delay-300"><a href="/#stores" onClick={() => setIsMenuOpen(false)} className="nav-link">Lojas</a></li>
            <li className="animate-fade-in-down delay-400"><a href="/#gallery" onClick={() => setIsMenuOpen(false)} className="nav-link">Galeria</a></li>
            <li className="animate-fade-in-down delay-500"><a href="/#contact" onClick={() => setIsMenuOpen(false)} className="nav-link">Contato</a></li>
          </ul>
          
          <div className="mobile-actions">
            <a href="#jobs" onClick={() => setIsMenuOpen(false)} className="btn btn-primary mobile-btn">Trabalhe Conosco</a>
            <a href="#colaboradores" onClick={() => setIsMenuOpen(false)} className="btn btn-outline mobile-btn">Área dos Colaboradores</a>
          </div>
        </nav>

        <div className="header-actions animate-fade-in-right delay-700">
          <a href="#jobs" className="btn btn-primary hover-glow">Trabalhe Conosco</a>
          <a href="#colaboradores" className="btn btn-outline hover-glow">Área dos Colaboradores</a>
        </div>

        <div className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
