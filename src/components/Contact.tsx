import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica de envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Entre em Contato</h2>
          <p>
            Estamos prontos para atendê-lo! Entre em contato conosco para dúvidas, 
            informações sobre nossos produtos ou para agendar uma consultoria personalizada.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info fade-in">
            <h3>Fale Conosco</h3>
            <p>Estamos sempre dispostos a ajudar você a encontrar os melhores produtos!</p>
            
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Endereço</h4>
                <p>Rua das Flores, 123 - Centro<br />São Paulo, SP - CEP: 01234-567</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Telefone</h4>
                <p>(11) 1234-5678<br />WhatsApp: (11) 91234-5678</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h4>E-mail</h4>
                <p>contato@redealecrim.com.br</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div>
                <h4>Horário de Funcionamento</h4>
                <p>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 16h</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Redes Sociais</h4>
              <div className="social-icons">
                <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📱</a>
                <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">📘</a>
                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
                <a href="https://wa.me/" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">💬</a>
              </div>
            </div>
          </div>

          <div className="contact-form fade-in">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu Nome *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu E-mail *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Seu Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o Assunto *</option>
                    <option value="orcamento">Solicitação de Orçamento</option>
                    <option value="informacao">Informações Gerais</option>
                    <option value="suporte">Suporte/Dúvidas</option>
                    <option value="parceria">Parcerias</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Sua Mensagem *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-btn">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
