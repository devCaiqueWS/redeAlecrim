import React, { useState } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <div className="logo">
            <span className="logo-text">Rede Alecrim</span>
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
            <li><a href="#stores" onClick={() => setIsMenuOpen(false)}>Lojas</a></li>
            <li><a href="#gallery" onClick={() => setIsMenuOpen(false)}>Galeria</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contato</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#contact" className="btn btn-primary">Entre em Contato</a>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
