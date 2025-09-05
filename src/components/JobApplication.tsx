import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './JobApplication.css';
import { useToast } from '../hooks/useToast';

interface JobApplicationProps {
  jobId?: string;
  jobTitle?: string;
  onBackToJobs?: () => void;
}

const JobApplication: React.FC<JobApplicationProps> = ({ jobId = 'general', jobTitle = 'Banco de Talentos', onBackToJobs }) => {
  const { showError } = useToast();

  // Inicializar EmailJS com credenciais de produção
  React.useEffect(() => {
    emailjs.init('iwakafYjT8tuM6Tyv'); // Public Key
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    education: '', // manter para compatibilidade
    experience: '', // manter para compatibilidade
    availability: '',
    salary: '',
    message: ''
  });


  // Novo estado para experiências profissionais
  const [experiences, setExperiences] = useState([
    { role: '', company: '', startYear: '', endYear: '' }
  ]);
  // Manipulador para campos de experiências profissionais
  const handleExperienceChange = (index: number, field: string, value: string) => {
    setExperiences(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddExperience = () => {
    setExperiences(prev => ([...prev, { role: '', company: '', startYear: '', endYear: '' }]));
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  };

  // Novo estado para experiências educacionais
  const [educations, setEducations] = useState([
    { level: '', institution: '', startYear: '', endYear: '' }
  ]);

  const [files, setFiles] = useState({
    resume: null as File | null,
    photo: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manipulador para campos de experiências educacionais
  const handleEducationChange = (index: number, field: string, value: string) => {
    setEducations(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddEducation = () => {
    setEducations(prev => ([...prev, { level: '', institution: '', startYear: '', endYear: '' }]));
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = {
        resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        photo: ['image/jpeg', 'image/jpg', 'image/png']
      };

      const fieldName = e.target.name as keyof typeof allowedTypes;
      if (allowedTypes[fieldName] && !allowedTypes[fieldName].includes(file.type)) {
        if (fieldName === 'resume') {
          showError('Por favor, selecione um arquivo PDF, DOC ou DOCX para o currículo.');
        } else {
          showError('Por favor, selecione uma imagem JPG ou PNG para a foto.');
        }
        e.target.value = '';
        return;
      }

      const maxSize = 50 * 1024; // 50KB
      if (file.size > maxSize) {
        if (fieldName === 'resume') {
          showError(`Currículo muito grande (${(file.size / 1024).toFixed(1)}KB).

LIMITE: 50KB máximo

DICAS para reduzir o tamanho:
• Use sites como SmallPDF ou ILovePDF
• Salve o PDF com menor qualidade  
• Remova imagens desnecessárias
• Ou entre em contato pelo WhatsApp

Por favor, selecione um arquivo menor.`);
        } else {
          showError(`Foto muito grande (${(file.size / 1024).toFixed(1)}KB).

LIMITE: 50KB máximo

DICAS para reduzir o tamanho:
• Use compressores online como TinyPNG
• Redimensione a imagem para menor resolução
• Salve em qualidade menor (JPEG)
• Ou entre em contato pelo WhatsApp

Por favor, selecione um arquivo menor.`);
        }
        e.target.value = '';
        return;
      }

      setFiles({
        ...files,
        [e.target.name]: file
      });
    }
  };

  // Função para enviar candidatura via EmailJS
  const sendJobApplication = async (resumeFile?: File, photoFile?: File) => {
    try {
      // Verificar se arquivo ultrapassa 50KB
      const maxFileSize = 50 * 1024; // 50KB
      const isResumeTooBig = resumeFile && resumeFile.size > maxFileSize;
      const isPhotoTooBig = photoFile && photoFile.size > maxFileSize;

      if (isResumeTooBig) {
        return {
          success: false,
          message: `Currículo muito grande (${(resumeFile!.size / 1024).toFixed(1)}KB).\n\nLIMITE: 50KB máximo para envio por email.\n\nSOLUÇÕES:\n• Comprima o arquivo usando SmallPDF\n• Entre em contato via WhatsApp\n• Envie por email diretamente\n\nPor favor, tente com um arquivo menor.`
        };
      }
      if (isPhotoTooBig) {
        return {
          success: false,
          message: `Foto muito grande (${(photoFile!.size / 1024).toFixed(1)}KB).\n\nLIMITE: 50KB máximo para envio por email.\n\nSOLUÇÕES:\n• Comprima a imagem usando TinyPNG\n• Redimensione para menor resolução\n• Entre em contato via WhatsApp\n\nPor favor, tente com um arquivo menor.`
        };
      }

      // Montar parâmetros para o template do EmailJS
      const params = {
        jobTitle,
        ...formData,
        educations: JSON.stringify(educations),
        experiences: JSON.stringify(experiences),
        resume_filename: resumeFile?.name || '',
        photo_filename: photoFile?.name || '',
      };

      // Enviar para o EmailJS
      await emailjs.send(
        'service_dkcbwgh', // Substitua pelo seu Service ID
        'template_5uh5ncg', // Novo Template ID
        params
      );

      return {
        success: true,
        message: `Candidatura enviada com sucesso para ${jobTitle}! Recebemos seus documentos e informações. Nossa equipe de RH entrará em contato em breve.`
      };
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error) {
        const emailError = error as { status: number; text: string };
        if (emailError.status === 413) {
          return {
            success: false,
            message: 'Arquivos muito grandes para envio. Por favor, comprima os arquivos e tente novamente.'
          };
        }
      }
      return {
        success: false,
        message: 'Erro no envio da candidatura. Tente novamente em alguns instantes.'
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // O currículo não é mais obrigatório. Apenas alerta se não anexar, mas permite envio.

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const result = await sendJobApplication(files.resume || undefined, files.photo || undefined);

      // Rolar para o topo da página para mostrar o aviso
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);

        // Reset do formulário após sucesso
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

        // Limpar inputs de arquivo
        const resumeInput = document.getElementById('resume') as HTMLInputElement;
        const photoInput = document.getElementById('photo') as HTMLInputElement;
        if (resumeInput) resumeInput.value = '';
        if (photoInput) photoInput.value = '';

      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }

    } catch (error) {
      // Rolar para o topo da página para mostrar o erro
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      setSubmitStatus('error');
      setSubmitMessage('Erro inesperado no envio. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id={`apply-${jobId}`} className="job-application section " style={{ paddingTop: onBackToJobs ? 80 : 140, paddingBottom: 60 }}>
        <div className="container">
          <div className="section-header fade-in">
            <h2>Candidatar-se</h2>
            <p>Vaga: <strong>{jobTitle}</strong></p>
            <p>Preencha o formulário abaixo e anexe seus documentos. Todas as informações serão enviadas para suporte.bi@redealecrim.com.br</p>
          </div>

          <div className="application-form fade-in">
            {/* Mensagem de feedback */}
            {submitMessage && (
              <div className={`submit-message ${submitStatus === 'success' ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}

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
                <h3>Experiências profissionais e Escolaridade</h3>

                {/* Escolaridade dinâmica */}
                {educations.map((edu, idx) => (
                  <div className="form-row" key={idx} style={{ alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: 2, minWidth: 180, fontSize: 20, fontWeight: 600 }}>Escolaridade
                      <label style={{ fontWeight: 500 }}>Nível de Escolaridade *</label>
                      <select
                        name={`level-${idx}`}
                        value={edu.level}
                        onChange={e => handleEducationChange(idx, 'level', e.target.value)}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="fundamental">Ensino Fundamental</option>
                        <option value="medio">Ensino Médio</option>
                        <option value="tecnico">Técnico</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pos">Pós-graduação</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 3, minWidth: 200 }}>
                      <label style={{ fontWeight: 500 }}>Instituição *</label>
                      <input
                        type="text"
                        name={`institution-${idx}`}
                        value={edu.institution}
                        onChange={e => handleEducationChange(idx, 'institution', e.target.value)}
                        placeholder="Nome da instituição"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1, minWidth: 100 }}>
                      <label style={{ fontWeight: 500 }}>Ano início *</label>
                      <input
                        type="number"
                        name={`startYear-${idx}`}
                        value={edu.startYear}
                        onChange={e => handleEducationChange(idx, 'startYear', e.target.value)}
                        placeholder="Ex: 2018"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1, minWidth: 100 }}>
                      <label style={{ fontWeight: 500 }}>Ano fim *</label>
                      <input
                        type="number"
                        name={`endYear-${idx}`}
                        value={edu.endYear}
                        onChange={e => handleEducationChange(idx, 'endYear', e.target.value)}
                        placeholder="Ex: 2022"
                        min="1900"
                        max={new Date().getFullYear() + 10}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ minWidth: 40, textAlign: 'center' }}>
                      {educations.length > 1 && (
                        <button type="button" className="btn btn-danger" style={{ marginBottom: 8 }} onClick={() => handleRemoveEducation(idx)} title="Remover">
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="form-row">
                  <button type="button" className="btn btn-outline" onClick={handleAddEducation} style={{ marginBottom: 30 }}>
                    + Adicionar nova experiência educacional
                  </button>
                </div>
                <hr style={{ borderColor: '#00000009' }} />
                <br />
                <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 20 }}>Experiências Profissionais</div>
                {experiences.map((exp, idx) => (
                  <div className="form-row" key={idx} style={{ alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: 2, minWidth: 180 }}>
                      <label style={{ fontWeight: 500 }}>Cargo *</label>
                      <input
                        type="text"
                        name={`role-${idx}`}
                        value={exp.role}
                        onChange={e => handleExperienceChange(idx, 'role', e.target.value)}
                        placeholder="Ex: Vendedor, Gerente..."
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 3, minWidth: 200 }}>
                      <label style={{ fontWeight: 500 }}>Empresa *</label>
                      <input
                        type="text"
                        name={`company-${idx}`}
                        value={exp.company}
                        onChange={e => handleExperienceChange(idx, 'company', e.target.value)}
                        placeholder="Nome da empresa"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1, minWidth: 100 }}>
                      <label style={{ fontWeight: 500 }}>Ano início *</label>
                      <input
                        type="number"
                        name={`startYearExp-${idx}`}
                        value={exp.startYear}
                        onChange={e => handleExperienceChange(idx, 'startYear', e.target.value)}
                        placeholder="Ex: 2018"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1, minWidth: 100 }}>
                      <label style={{ fontWeight: 500 }}>Ano fim *</label>
                      <input
                        type="number"
                        name={`endYearExp-${idx}`}
                        value={exp.endYear}
                        onChange={e => handleExperienceChange(idx, 'endYear', e.target.value)}
                        placeholder="Ex: 2022"
                        min="1900"
                        max={new Date().getFullYear() + 10}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ minWidth: 40, textAlign: 'center' }}>
                      {experiences.length > 1 && (
                        <button type="button" className="btn btn-danger" style={{ marginBottom: 8 }} onClick={() => handleRemoveExperience(idx)} title="Remover">
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="form-row">
                  <button type="button" className="btn btn-outline" onClick={handleAddExperience} style={{ marginTop: 8 }}>
                    + Adicionar nova experiência profissional
                  </button>
                </div>
              </div>

              <div className="form-section">
                <h3>Informações Adicionais</h3>
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
                {onBackToJobs ? (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={onBackToJobs}
                  >
                    Voltar às Vagas
                  </button>
                ) : (
                  <a href="#jobs" className="btn btn-outline">
                    Voltar às Vagas
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobApplication;
