import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ToastContainer';

const Contact: React.FC = () => {
  const { toasts, showSuccess, removeToast } = useToast();
  
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
    showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
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
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div>
                <h4>Telefone</h4>
                <p>+55 (11) 1234-5678<br />+55 0800 744 0010</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4>E-mail</h4>
                <p>contato@redealecrim.com.br</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Clock size={24} />
              </div>
              <div>
                <h4>Horário de Funcionamento</h4>
                <p>Segunda a Sexta: 7h30-16h50</p>
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
                  rows={14}
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
    </>
  );
};

export default Contact;
