import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppPopup.css';

const WhatsAppPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Mostrar o popup após 3 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Esconder o texto após 15 segundos de permanência na página
    const hideTextTimer = setTimeout(() => {
      setShowText(false);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTextTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappUrl = 'https://wa.me/5508007440010?text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20gostaria%20de%20falar%20com%20a%20loja%207768';
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="whatsapp-popup">
      <button 
        className={`whatsapp-popup-btn ${!showText ? 'text-hidden' : ''}`}
        onClick={handleWhatsAppClick}
        aria-label="Comprar pelo WhatsApp"
      >
        <MessageCircle size={24} />
        {showText && (
          <span>
            Compre pelo whatsapp<br />
            e receba ainda hoje
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppPopup;
