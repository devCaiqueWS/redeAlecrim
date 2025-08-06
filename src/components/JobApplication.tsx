import React, { useState } from 'react';
import './JobApplication.css';

interface JobApplicationProps {
  jobId?: string;
  jobTitle?: string;
}

const JobApplication: React.FC<JobApplicationProps> = ({ jobId = 'general', jobTitle = 'Banco de Talentos' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    education: '',
    experience: '',
    availability: '',
    salary: '',
    message: ''
  });

  const [files, setFiles] = useState({
    resume: null as File | null,
    photo: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles({
        ...files,
        [e.target.name]: file
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulação do envio do formulário
      // Aqui você implementaria a integração com um serviço de email
      console.log('Dados do formulário:', formData);
      console.log('Arquivos:', files);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Candidatura enviada com sucesso para ${jobTitle}! Entraremos em contato em breve.`);
      
      // Reset do formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        birthDate: '',
        address: '',
        city: '',
        state: '',
        education: '',
        experience: '',
        availability: '',
        salary: '',
        message: ''
      });
      setFiles({ resume: null, photo: null });
    } catch (error) {
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={`apply-${jobId}`} className="job-application section">
      <div className="container">
        <div className="section-header fade-in">
          <h2>Candidatar-se</h2>
          <p>Vaga: <strong>{jobTitle}</strong></p>
          <p>Preencha o formulário abaixo e anexe seus documentos. Todas as informações serão enviadas para suporte.bi@redealecrim.com.br</p>
        </div>

        <div className="application-form fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome Completo *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail *"
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
                    placeholder="Telefone/WhatsApp *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF *"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    name="birthDate"
                    placeholder="Data de Nascimento *"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Endereço Completo *"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="Cidade *"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o Estado *</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Informações Profissionais</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Escolaridade *</option>
                    <option value="fundamental">Ensino Fundamental</option>
                    <option value="medio">Ensino Médio</option>
                    <option value="tecnico">Técnico</option>
                    <option value="superior">Ensino Superior</option>
                    <option value="pos">Pós-graduação</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Experiência na área *</option>
                    <option value="nenhuma">Nenhuma experiência</option>
                    <option value="ate1ano">Até 1 ano</option>
                    <option value="1a3anos">1 a 3 anos</option>
                    <option value="3a5anos">3 a 5 anos</option>
                    <option value="mais5anos">Mais de 5 anos</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Disponibilidade *</option>
                    <option value="imediata">Imediata</option>
                    <option value="15dias">15 dias</option>
                    <option value="30dias">30 dias</option>
                    <option value="negociar">A negociar</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="salary"
                    placeholder="Pretensão Salarial"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Documentos</h3>
              
              <div className="form-row">
                <div className="form-group file-group">
                  <label htmlFor="resume">Currículo (PDF) *</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {files.resume && <span className="file-name">📄 {files.resume.name}</span>}
                </div>
                <div className="form-group file-group">
                  <label htmlFor="photo">Foto (JPG/PNG)</label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  {files.photo && <span className="file-name">📷 {files.photo.name}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Observações</h3>
              <div className="form-group">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Conte-nos um pouco sobre você, suas motivações e por que quer trabalhar conosco..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary form-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
              </button>
              <a href="#jobs" className="btn btn-outline">
                Voltar às Vagas
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobApplication;
