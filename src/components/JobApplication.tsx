import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './JobApplication.css';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ToastContainer';

interface JobApplicationProps {
  jobId?: string;
  jobTitle?: string;
  onBackToJobs?: () => void;
}

const JobApplication: React.FC<JobApplicationProps> = ({ jobId = 'general', jobTitle = 'Banco de Talentos', onBackToJobs }) => {
  const { toasts, showSuccess, showError, removeToast } = useToast();
  
  // Inicializar EmailJS com credenciais de produção
  React.useEffect(() => {
    emailjs.init('iwakafYjT8tuM6Tyv'); // Public Key
    console.log('🚀 [EmailJS] JobApplication inicializado - Template: template_0zrs24h');
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testJobApplicationTemplate = async () => {
    
    try {
      const testParams = {
        to_email: 'suporte.bi@redealecrim.com.br',
        job_title: 'Operador de Caixa - TESTE',
        job_id: 'teste-template-001',
        candidate_name: 'João Silva Teste',
        candidate_email: 'joao.teste@email.com',
        candidate_phone: '(11) 99999-9999',
        candidate_cpf: '123.456.789-00',
        birth_date: '15/03/1990',
        address: 'Rua Teste, 123',
        city: 'São Paulo',
        state: 'SP',
        education: 'Ensino Médio Completo',
        experience: 'Experiência em atendimento ao cliente',
        availability: 'Integral',
        salary_expectation: 'R$ 1.500,00',
        message: 'Teste do novo template EmailJS para JobApplication',
        resume_name: 'curriculo-teste.pdf',
        resume_size: '2.1MB',
        resume_base64: 'VGVzdGUgZGUgY3VycmN1bG8=',
        photo_name: 'foto-teste.jpg',
        photo_size: '1.2MB',
        photo_base64: 'VGVzdGUgZGUgZm90bw==',
        has_photo: 'SIM',
        data_envio: new Date().toLocaleString('pt-BR'),
        subject: 'TESTE - Nova Candidatura JobApplication'
      };

      const response = await emailjs.send(
        'service_dkcbwgh',
        'template_0zrs24h',
        testParams
      );

      console.log('✅ [TESTE] Template JobApplication funcionando:', response);
      showSuccess('✅ Teste do template JobApplication realizado com sucesso!');
      
    } catch (error) {
      console.error('❌ [TESTE] Erro no template JobApplication:', error);
      showError('❌ Erro no teste do template. Veja o console.');
    }
  };
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
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      
      console.log('📎 Arquivo selecionado:', file.name, 'Tamanho:', (file.size / 1024).toFixed(2) + 'KB');
    }
  };

  // Função para enviar candidatura via EmailJS
  const sendJobApplication = async (resumeFile: File, photoFile?: File) => {
    console.log('📧 [EmailJS] Iniciando envio de candidatura...');
    
    try {
      // Verificar se arquivo ultrapassa 50KB
      const maxFileSize = 50 * 1024; // 50KB
      const isResumeTooBig = resumeFile.size > maxFileSize;
      const isPhotoTooBig = photoFile && photoFile.size > maxFileSize;

      if (isResumeTooBig) {
        return {
          success: false,
          message: `Currículo muito grande (${(resumeFile.size / 1024).toFixed(1)}KB). 

LIMITE: 50KB máximo para envio por email.

SOLUÇÕES:
• Comprima o arquivo usando SmallPDF
• Entre em contato via WhatsApp  
• Envie por email diretamente

Por favor, tente com um arquivo menor.`
        };
      }

      if (isPhotoTooBig) {
        return {
          success: false,
          message: `Foto muito grande (${(photoFile!.size / 1024).toFixed(1)}KB). 

LIMITE: 50KB máximo para envio por email.

SOLUÇÕES:
• Comprima a imagem usando TinyPNG
• Redimensione para menor resolução
• Entre em contato via WhatsApp

Por favor, tente com um arquivo menor.`
        };
      }

      console.log('✅ [EmailJS] Arquivos dentro do limite - processando...');

      // Converter currículo para base64
      const resumeBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // Remove o prefixo data:mime;base64,
        };
        reader.readAsDataURL(resumeFile);
      });

      let photoBase64 = '';
      if (photoFile) {
        photoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Remove o prefixo data:mime;base64,
          };
          reader.readAsDataURL(photoFile);
        });
      }

        // Preparar dados do template
        const templateParams = {
          to_email: 'suporte.bi@redealecrim.com.br',
          job_title: jobTitle,
          job_id: jobId,
          candidate_name: formData.name,
          candidate_email: formData.email,
          candidate_phone: formData.phone,
          candidate_cpf: formData.cpf,
          birth_date: formData.birthDate,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          education: formData.education,
          experience: formData.experience,
          availability: formData.availability,
          salary_expectation: formData.salary,
          message: formData.message || 'Nenhuma observação adicional.',
          resume_name: resumeFile.name,
          resume_size: `${(resumeFile.size / 1024).toFixed(2)}KB`,
          resume_base64: resumeBase64,
          photo_name: photoFile?.name || 'Não enviada',
          photo_size: photoFile ? `${(photoFile.size / 1024).toFixed(2)}KB` : 'N/A',
          photo_base64: photoBase64 || '',
          has_photo: photoFile ? 'SIM - Anexada' : 'NÃO - Opcional',
          data_envio: new Date().toLocaleString('pt-BR'),
          subject: `Nova Candidatura - ${formData.name} - ${jobTitle}`
        };      console.log('📧 [EmailJS] Dados do template preparados:', {
        candidate_name: templateParams.candidate_name,
        job_title: templateParams.job_title,
        resume_name: templateParams.resume_name,
        resume_size: templateParams.resume_size,
        has_photo: templateParams.has_photo
      });

      console.log('📤 [EmailJS] Enviando candidatura...');

      const response = await emailjs.send(
        'service_dkcbwgh',      // Service ID do Gmail
        'template_0zrs24h',     // Template ID - Job Application
        templateParams,         
        'iwakafYjT8tuM6Tyv'    // Public Key
      );

      console.log('✅ [EmailJS] Candidatura enviada com sucesso:', response);

      return {
        success: true,
        message: `Candidatura enviada com sucesso para ${jobTitle}! Recebemos seus documentos e informações. Nossa equipe de RH entrará em contato em breve.`
      };

    } catch (error) {
      console.error('❌ [EmailJS] Erro no envio:', error);
      
      // Tratamento de erros específicos
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
    
    // Validar se currículo foi anexado
    if (!files.resume) {
      setSubmitStatus('error');
      setSubmitMessage('Por favor, anexe seu currículo (arquivo PDF, DOC ou DOCX)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      console.log('🚀 [JobApplication] Iniciando envio de candidatura...');
      
      const result = await sendJobApplication(files.resume, files.photo || undefined);
      
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
      console.error('❌ Erro inesperado:', error);
      setSubmitStatus('error');
      setSubmitMessage('Erro inesperado no envio. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <section id={`apply-${jobId}`} className="job-application section">
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
