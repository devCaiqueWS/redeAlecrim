import React from 'react';
import './Footer.css';
import { Instagram, Facebook, Linkedin, MessageCircleCode } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Rede Alecrim</span>
            </div>
            <p>
              [Escrever aqui uma breve descrição da empresa, 
              seus valores e compromisso com os clientes]
            </p>
            <div className="social-icons">
              <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook /></a>
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://wa.me/" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircleCode /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#stores">Lojas</a></li>
                <li><a href="#gallery">Galeria</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>

            <div className="link-column">
              <h4>Nossas Lojas</h4>
              <ul>
                <li><a href="#stores">Lojas Boti</a></li>
                <li><a href="#stores">Lojas QDB</a></li>
                <li><a href="#stores">Venda Direta (VD)</a></li>
              </ul>
            </div>

            <div className="link-column">
              <h4>Contato</h4>
              <ul>
                <li>📍 [ENDEREÇO]</li>
                <li>📞 [TELEFONE]</li>
                <li>📧 [EMAIL]</li>
                <li>🕒 [HORÁRIO DE FUNCIONAMENTO]</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Rede Alecrim. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
