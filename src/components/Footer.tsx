import React from 'react';
import './Footer.css';
import { Instagram, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerVisible] = useScrollAnimation(0.1);
  const [linksRef, linksAnimated] = useStaggerAnimation(200);

  return (
    <footer className="footer" ref={footerRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="footer-content">
          <div className={`footer-brand ${footerVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="logo">
              <span className="logo-text">Rede Alecrim</span>
            </div>
            <p className={`${footerVisible ? 'animate-fade-in-up delay-200' : ''}`}>
              Transformando beleza em oportunidades. A Rede Alecrim é sua 
              parceira de confiança no mundo dos cosméticos, oferecendo 
              produtos de qualidade e atendimento especializado há mais de 45 anos.
            </p>
            <div className={`social-icons ${footerVisible ? 'animate-fade-in-up delay-400' : ''}`}>
              <a href="https://www.instagram.com/redealecrim" title='Instagram' className="social-link hover-lift animate-bounce-in delay-500" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://www.linkedin.com/company/o-boticário-cp-alecrim" title='LinkedIn' className="social-link hover-lift animate-bounce-in delay-700" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://wa.me/5508007440010?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20gostaria%20de%20falar%20com%20a%20loja%207768" title='WhatsApp' className="social-link hover-lift animate-bounce-in delay-800" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle /></a>
            </div>
          </div>

          <div 
            ref={linksRef as React.RefObject<HTMLDivElement>}
            className="footer-links"
          >
            <div className={`link-column ${linksAnimated > 0 ? 'animate-fade-in-up delay-300' : ''}`}>
              <h4>Navegação</h4>
              <ul>
                <li><a href="/" className="footer-link">Início</a></li>
                <li><a href="/#about" className="footer-link">Sobre</a></li>
                <li><a href="/#stores" className="footer-link">Lojas</a></li>
                <li><a href="/#gallery" className="footer-link">Galeria</a></li>
                <li><a href="/#contact" className="footer-link">Contato</a></li>
                <li><a href="#jobs" className="footer-link">Trabalhe Conosco</a></li>
              </ul>
            </div>

            <div className={`link-column ${linksAnimated > 1 ? 'animate-fade-in-up delay-400' : ''}`}>
              <h4>Nossas Lojas</h4>
              <ul>
                <li><a href="#stores" className="footer-link">Lojas O Boticário</a></li>
                <li><a href="#stores" className="footer-link">Lojas QDB</a></li>
                <li><a href="#stores" className="footer-link">Espaço Revendedor</a></li>
              </ul>
            </div>

            <div className={`link-column ${linksAnimated > 2 ? 'animate-fade-in-up delay-500' : ''}`}>
              <h4>Contato</h4>
              <ul>
                <li className="cont"><MapPin size={16} /> São Paulo, SP</li>
                <li className="cont"><Phone size={16} /> (11) 1234-5678</li>
                <li className="cont"><Mail size={16} /> contato@redealecrim.com.br</li>
                <li className="cont"><Clock size={16} /> Seg-Sex: 7h30-16h50</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`footer-bottom ${footerVisible ? 'animate-fade-in-up delay-600' : ''}`}>
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Rede Alecrim. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#colaboradores">Área dos Colaboradores</a>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="footer-bottom-link">Política de Privacidade</a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="footer-bottom-link">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
