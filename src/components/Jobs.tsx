import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, Star, BarChart3, Home, Settings, MapPin, DollarSign, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './Jobs.css';
import { useScrollAnimation, useStaggerAnimation, useCountAnimation } from '../hooks/useAnimations';
import JobApplication from './JobApplication';
import emailjs from '@emailjs/browser';
import { API_ENDPOINTS, buildApiUrl } from '../config/api.js';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ToastContainer';

// Interface para as vagas vindas do JSON
interface VagaJSON {
  id: string;
  titulo: string;
  local: string;
  salario: string;
  responsavel: string;
  empresa: string;
  categoria: string;
  descricao?: string;
  beneficios: string[];
  responsabilidades: string[];
  requisitos: string[];
  tipo: string;
  experiencias_preferenciais: string[];
  perguntas_selecao?: string[];
}

// Interface para o formato interno do componente
interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary: string;
}

interface JobCategory {
  id: string;
  title: string;
  icon: React.ReactElement;
  jobs: Job[];
}

const Jobs: React.FC = () => {
  const { toasts, showSuccess, showError, removeToast } = useToast();
  const [vagas, setVagas] = useState<VagaJSON[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<VagaJSON | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [curriculumForm, setCurriculumForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    areaInteresse: '',
    experiencia: ''
  });
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCurriculumModal) {
        handleCloseCurriculumModal();
      }
    };

    if (showCurriculumModal) {
      document.addEventListener('keydown', handleEscapeKey);
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showCurriculumModal]);

  useEffect(() => {
    const carregarVagas = async () => {
      try {
        console.log('🔄 Iniciando carregamento das vagas...');
        console.log('🌐 URL da API:', API_ENDPOINTS.vagas);
        const response = await fetch(API_ENDPOINTS.vagas);
        const data: VagaJSON[] = await response.json();
        console.log('📦 Dados carregados:', data);
        console.log('📊 Quantidade de vagas carregadas:', data.length);
        setVagas(data);
        setLoading(false);
        console.log('✅ Loading finalizado');
      } catch (error) {
        console.error('❌ Erro ao carregar vagas:', error);
        setLoading(false);
      }
    };

    carregarVagas();
  }, []);

  const converterVagasParaJobs = (vagas: VagaJSON[]): Job[] => {
    return vagas.map(vaga => ({
      id: vaga.id,
      title: vaga.titulo,
      location: vaga.local,
      type: vaga.tipo,
      description: vaga.descricao || vaga.responsabilidades.slice(0, 2).join('. ') + '.',
      requirements: vaga.requisitos,
      benefits: vaga.beneficios,
      salary: vaga.salario
    }));
  };

  // Agrupa as vagas por categoria
  const agruparVagasPorCategoria = (vagas: VagaJSON[]): JobCategory[] => {
    
    const categorias: { [key: string]: { title: string; icon: React.ReactElement } } = {
      vendas: { title: 'Vendas', icon: <Briefcase size={24} /> },
      administrativo: { title: 'Administrativo', icon: <BarChart3 size={24} /> },
      vendadireta: { title: 'Venda Direta', icon: <Home size={24} /> },
      operacional: { title: 'Operacional', icon: <Settings size={24} /> }
    };

    const vagasAgrupadas: { [key: string]: VagaJSON[] } = {};
    
    vagas.forEach(vaga => {
      const categoria = vaga.categoria || 'vendas';
      if (!vagasAgrupadas[categoria]) {
        vagasAgrupadas[categoria] = [];
      }
      vagasAgrupadas[categoria].push(vaga);
    });
    

    // Filtra apenas as categorias que realmente têm vagas
    const resultado = Object.keys(vagasAgrupadas)
      .filter(categoriaId => vagasAgrupadas[categoriaId].length > 0)
      .map(categoriaId => ({
        id: categoriaId,
        title: categorias[categoriaId]?.title || 'Outras',
        icon: categorias[categoriaId]?.icon || <Briefcase size={24} />,
        jobs: converterVagasParaJobs(vagasAgrupadas[categoriaId])
      }));
      
    return resultado;
  };

  const jobCategories = agruparVagasPorCategoria(vagas);

  // Vagas em destaque
  const featuredJobs = vagas.slice(0, 2).map(vaga => ({
    id: vaga.id,
    title: vaga.titulo,
    location: vaga.local,
    type: vaga.tipo,
    description: vaga.descricao || vaga.responsabilidades.slice(0, 2).join('. ') + '.',
    requirements: vaga.requisitos,
    benefits: vaga.beneficios,
    salary: vaga.salario
  }));

  // Hooks para animações
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [, statsVisible] = useScrollAnimation(0.2);
  const [featuredRef, featuredVisible] = useScrollAnimation(0.1);
  const [categoriesRef, categoriesAnimated] = useStaggerAnimation(200);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  
  // Contadores animados - versão mais robusta com implementação direta
  const totalJobs = vagas.length;
  const totalAreas = jobCategories.length;
  
  // Estados para contadores manuais
  const [displayJobCount, setDisplayJobCount] = useState(0);
  const [displayAreaCount, setDisplayAreaCount] = useState(0);
  
  // Hooks originais (mantidos para referências)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobCountRef, jobCount] = useCountAnimation(totalJobs > 0 ? totalJobs : 0, 2000);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [areaCountRef, areaCount] = useCountAnimation(totalAreas > 0 ? totalAreas : 0, 1500);
  
  // Atualiza os contadores quando os dados mudarem
  useEffect(() => {
    if (!loading && totalJobs > 0) {
      console.log('🎯 Iniciando animação manual dos contadores');
      
      // Anima contador de vagas
      const animateJobCount = () => {
        const duration = 2000;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * totalJobs);
          setDisplayJobCount(value);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      };
      
      // Anima contador de áreas
      const animateAreaCount = () => {
        const duration = 1500;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * totalAreas);
          setDisplayAreaCount(value);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      };
      
      setTimeout(animateJobCount, 400);
      setTimeout(animateAreaCount, 600);
    }
  }, [loading, totalJobs, totalAreas]);

  // Reset das animações quando os dados mudarem
  useEffect(() => {
    if (!loading && totalJobs > 0) {
      // Os hooks já vão reiniciar automaticamente devido às dependências
    }
  }, [loading, totalJobs, totalAreas]);

  // Funções para controlar modais
  const handleApplyJob = (jobId: string) => {
    console.log('🔥 handleApplyJob chamado para:', jobId);
    const vaga = vagas.find(v => v.id === jobId);
    console.log('🔍 Vaga encontrada:', vaga);
    if (vaga) {
      setSelectedJob(vaga);
      setShowApplication(true);
      console.log('✅ Página de aplicação deve abrir');
    }
  };

  const handleViewDetails = (jobId: string) => {
    console.log('👁️ handleViewDetails chamado para:', jobId);
    console.log('📦 Estado atual expandedCards:', Array.from(expandedCards));
    
    // Garante que apenas este job específico seja afetado
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      const wasExpanded = newSet.has(jobId);
      
      if (wasExpanded) {
        newSet.delete(jobId);
        console.log('📦 Card recolhido:', jobId);
      } else {
        newSet.add(jobId);
        console.log('📖 Card expandido:', jobId);
      }
      
      console.log('📦 Novo estado expandedCards:', Array.from(newSet));
      console.log('🎯 Job específico afetado:', jobId, wasExpanded ? 'recolhido' : 'expandido');
      
      return newSet;
    });
  };

  const handleBackToJobs = () => {
    setShowApplication(false);
    setSelectedJob(null);
  };

  // Função para gerar o corpo do email personalizado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateEmailBody = (userInfo?: {
    nome?: string;
    telefone?: string;
    email?: string;
    areaInteresse?: string;
    experiencia?: string;
  }) => {
    const nome = userInfo?.nome || '';
    const telefone = userInfo?.telefone || '';
    const email = userInfo?.email || '';
    const areaInteresse = userInfo?.areaInteresse || '';
    const experiencia = userInfo?.experiencia || '';

    const corpo = `Olá,

Gostaria de cadastrar meu currículo no banco de talentos da Rede Alecrim.

Segue em anexo meu currículo e algumas informações:

Nome completo: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Área de interesse: ${areaInteresse}
Experiência profissional: ${experiencia}

Aguardo retorno.

Atenciosamente.`;

    // Codificar para URL
    return encodeURIComponent(corpo);
  };

  // Função para gerar o corpo do email com informação sobre arquivo
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateEmailBodyWithFile = (userInfo: {
    nome?: string;
    telefone?: string;
    email?: string;
    areaInteresse?: string;
    experiencia?: string;
  }, fileName: string) => {
    const nome = userInfo?.nome || '';
    const telefone = userInfo?.telefone || '';
    const email = userInfo?.email || '';
    const areaInteresse = userInfo?.areaInteresse || '';
    const experiencia = userInfo?.experiencia || '';

    const corpo = `Olá,

Gostaria de cadastrar meu currículo no banco de talentos da Rede Alecrim.

Segue minhas informações pessoais e anexarei meu currículo:

Nome completo: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Área de interesse: ${areaInteresse}
Experiência profissional: ${experiencia}

ARQUIVO DE CURRÍCULO: ${fileName}
(Arquivo selecionado - será anexado manualmente neste e-mail)

Aguardo retorno.

Atenciosamente.`;

    // Codificar para URL
    return encodeURIComponent(corpo);
  };

  // Função para abrir modal de dados do usuário
  const handleCadastrarCurriculo = () => {
    console.log('📋 Abrindo modal de cadastro de currículo');
    setShowCurriculumModal(true);
  };

  // Função para fechar o modal
  const handleCloseCurriculumModal = () => {
    console.log('❌ Fechando modal de cadastro de currículo');
    setShowCurriculumModal(false);
    setCurriculumForm({
      nome: '',
      telefone: '',
      email: '',
      areaInteresse: '',
      experiencia: ''
    });
    setCurriculumFile(null);
    setIsSubmitting(false);
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  // Função para atualizar os campos do formulário
  const handleFormChange = (field: string, value: string) => {
    setCurriculumForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para lidar com o upload do arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar tipo de arquivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
      
      if (!allowedTypes.includes(file.type) && !hasValidExtension) {
        showError('Por favor, selecione apenas arquivos PDF, DOC ou DOCX.');
        e.target.value = '';
        return;
      }
      
      // Verificar tamanho (máximo 50KB)
      const maxSize = 50 * 1024; // 50KB
      
      if (file.size > maxSize) {
        showError(`Arquivo muito grande (${(file.size / 1024).toFixed(1)}KB). 

LIMITE: 50KB máximo

DICAS para reduzir o tamanho:
• Use sites como SmallPDF ou ILovePDF
• Salve o PDF com menor qualidade
• Remova imagens desnecessárias
• Ou entre em contato pelo WhatsApp

Por favor, selecione um arquivo menor.`);
        e.target.value = '';
        return;
      }
      
      setCurriculumFile(file);
    }
  };

  // Função de teste rápido do EmailJS (sem arquivo)
  const testEmailJS = async () => {
    
    try {
      const testParams = {
        to_email: 'suporte.bi@redealecrim.com.br',
        from_name: 'Teste Sistema',
        from_email: 'teste@teste.com',
        telefone: '(11) 99999-9999',
        area_interesse: 'Teste',
        experiencia: 'Teste de funcionamento do sistema EmailJS',
        curriculo_nome: 'teste.pdf',
        curriculo_tamanho: '1.5MB',
        curriculo_base64: 'VGVzdGUgZGUgYXJxdWl2bw==', // "Teste de arquivo" em base64
        data_envio: new Date().toLocaleString('pt-BR'),
        subject: 'TESTE - Sistema EmailJS Funcionando'
      };

      const response = await emailjs.send(
        'service_dkcbwgh',
        'template_zn162dm',
        testParams
      );

      console.log('✅ [TESTE] Email de teste enviado com sucesso:', response);
      showSuccess('✅ Teste EmailJS realizado com sucesso! Verifique o email.');
      
    } catch (error) {
      console.error('❌ [TESTE] Erro no teste EmailJS:', error);
      showError('❌ Erro no teste EmailJS. Veja o console para detalhes.');
    }
  };

  // Configuração do EmailJS
  useEffect(() => {
    // CREDENCIAIS REAIS DO EMAILJS:
    const emailJSConfig = {
      publicKey: 'iwakafYjT8tuM6Tyv',      // ✅ Sua Public Key configurada
      serviceId: 'service_dkcbwgh',        // ✅ Seu Service ID do Gmail configurado
      templateId: 'template_zn162dm'       // ✅ Seu Template ID configurado
    };
    
    try {
      // Inicializar EmailJS com a chave pública real
      emailjs.init(emailJSConfig.publicKey);
      
      console.log('✅ [EmailJS] Inicialização realizada com sucesso');
      console.log('🔧 [EmailJS] Public Key configurada:', emailJSConfig.publicKey.substring(0, 8) + '...');
      console.log('🔧 [EmailJS] Service ID:', emailJSConfig.serviceId);
      console.log('🔧 [EmailJS] Template ID:', emailJSConfig.templateId);
      console.log('🔧 [EmailJS] Versão da biblioteca:', typeof emailjs);
      
    } catch (initError) {
      console.error('❌ [EmailJS] Erro na inicialização:', initError);
    }
  }, []);

  // Serviço de envio de email com simulação aprimorada para testes
  const sendEmailService = async (formData: FormData, file: File): Promise<{ success: boolean; message: string }> => {
    console.log('📧 [TESTE] Iniciando processo de envio...');
    console.log('📧 [TESTE] Destino: suporte.bi@redealecrim.com.br');
    
    // Simular delay real de processamento
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    try {
      // EmailJS configurado com credenciais reais - MODO PRODUÇÃO ATIVADO! 
      const hasEmailJSKeys = true; // ✅ ATIVADO - Todas as credenciais configuradas
      
      if (hasEmailJSKeys) {
        console.log('📧 [EmailJS] Processando arquivo:', file.name, `(${(file.size / 1024).toFixed(2)}KB)`);
        
        // Verificar se arquivo ultrapassa 50KB
        const maxFileSize = 50 * 1024; // 50KB
        const isLargeFile = file.size > maxFileSize;
        
        if (isLargeFile) {
          console.log('❌ [EmailJS] Arquivo muito grande - rejeitando envio');
          
          return {
            success: false,
            message: `Arquivo muito grande (${(file.size / 1024).toFixed(1)}KB). 

LIMITE: 50KB máximo para envio por email.

SOLUÇÕES:
• Comprima o arquivo usando SmallPDF
• Entre em contato via WhatsApp
• Envie por email diretamente

Por favor, tente com um arquivo menor.`
          };
        }
        
        console.log('✅ [EmailJS] Arquivo dentro do limite - anexando via base64');
        
        // Converter arquivo para base64 para anexar no email
        const fileBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Remove o prefixo data:mime;base64,
          };
          reader.readAsDataURL(file);
        });

        // Preparar nome personalizado do arquivo
        const currentDate = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
        const candidateName = (formData.get('nome') as string).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
        
        // Detectar extensão do arquivo
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'pdf';
        const personalizedFileName = `Curriculo_${candidateName}_${currentDate}.${fileExtension}`;

        // Preparar dados do template com nome personalizado
        const templateParams = {
          to_email: 'suporte.bi@redealecrim.com.br',
          from_name: formData.get('nome') as string,
          from_email: formData.get('email') as string,
          telefone: formData.get('telefone') as string,
          area_interesse: formData.get('areaInteresse') as string,
          experiencia: formData.get('experiencia') as string,
          curriculo_nome: personalizedFileName,
          curriculo_nome_original: file.name,
          curriculo_tamanho: `${(file.size / 1024).toFixed(2)}KB`,
          curriculo_base64: fileBase64,
          curriculo_download_link: `data:${file.type};base64,${fileBase64}`,
          curriculo_info: `📄 CURRÍCULO: ${personalizedFileName} (${(file.size / 1024).toFixed(2)}KB)`,
          application_date: currentDate,
          data_envio: new Date().toLocaleString('pt-BR'),
          subject: `Novo Currículo - ${formData.get('nome')} - ${formData.get('areaInteresse')} - ${currentDate}`,
          arquivo_status: `✅ Arquivo anexado com sucesso`,
          download_instructions: `
� CURRÍCULO PARA DOWNLOAD:

📄 ARQUIVO: ${file.name} (${(file.size / 1024).toFixed(2)}KB)

💡 COMO BAIXAR:
1. Clique com botão direito no link abaixo
2. Selecione "Salvar link como..." ou "Save link as..."
3. Salve o arquivo no seu computador

⬇️ LINK DE DOWNLOAD:
[CLIQUE AQUI PARA BAIXAR O CURRÍCULO](data:${file.type};base64,${fileBase64})

📧 ALTERNATIVA: Responda este email e o currículo será reenviado como anexo tradicional.

🔒 DADOS BASE64 (backup):
${fileBase64}
          `
        };

        console.log('� [EmailJS] Parâmetros do template preparados:', {
          to_email: templateParams.to_email,
          from_name: templateParams.from_name,
          from_email: templateParams.from_email,
          telefone: templateParams.telefone,
          area_interesse: templateParams.area_interesse,
          curriculo_nome: templateParams.curriculo_nome,
          curriculo_tamanho: templateParams.curriculo_tamanho,
          data_envio: templateParams.data_envio,
          subject: templateParams.subject,
          curriculo_base64_size: templateParams.curriculo_base64?.length || 0
        });

        console.log('📧 [EmailJS] Enviando email via EmailJS...');
        console.log('🔧 [EmailJS] Service ID:', 'service_dkcbwgh');
        console.log('🔧 [EmailJS] Template ID:', 'template_zn162dm');

        // Enviar via EmailJS com credenciais configuradas
        const response = await emailjs.send(
          'service_dkcbwgh', // ✅ Seu Service ID do Gmail
          'template_zn162dm', // ✅ Seu Template ID configurado
          templateParams
        );

        console.log('✅ Email enviado com sucesso via EmailJS:', response);

        // Mensagem de sucesso baseada no tipo de arquivo
        let successMessage = '';
        if (isLargeFile) {
          successMessage = `Currículo registrado com sucesso! ⚠️ Nota: Devido ao tamanho do arquivo (${(file.size / 1024 / 1024).toFixed(2)}MB), ele não foi anexado automaticamente. Nossa equipe entrará em contato via WhatsApp ou email para solicitar o currículo comprimido.`;
        } else {
          successMessage = `Currículo enviado com sucesso para suporte.bi@redealecrim.com.br! Recebemos seu arquivo "${file.name}" e suas informações. Nossa equipe de RH entrará em contato em breve.`;
        }

        return {
          success: true,
          message: successMessage
        };
      } else {
        // Modo TESTE - Log detalhado
        console.log('🧪 [MODO TESTE] EmailJS não configurado - simulando envio');
        console.log('📧 [TESTE] EMAIL SERIA ENVIADO PARA: suporte.bi@redealecrim.com.br');
        console.log('� [TESTE] DADOS DO CANDIDATO:');
        console.log('   Nome:', formData.get('nome'));
        console.log('   Email:', formData.get('email'));
        console.log('   Telefone:', formData.get('telefone'));
        console.log('   Área:', formData.get('areaInteresse'));
        console.log('   Experiência:', formData.get('experiencia'));
        console.log('   Arquivo:', file.name);
        console.log('   Tamanho:', `${(file.size / 1024 / 1024).toFixed(2)}MB`);
        console.log('   Data/Hora:', new Date().toLocaleString('pt-BR'));
        
        // Simular estrutura do email que seria enviado
        const emailContent = `
=== EMAIL QUE SERIA ENVIADO ===
Para: suporte.bi@redealecrim.com.br
Assunto: Novo Currículo - ${formData.get('nome')} - ${formData.get('areaInteresse')}

Olá equipe de RH,

Recebemos um novo currículo através do site:

DADOS DO CANDIDATO:
Nome: ${formData.get('nome')}
Email: ${formData.get('email')}
Telefone: ${formData.get('telefone')}
Área de Interesse: ${formData.get('areaInteresse')}
Experiência: ${formData.get('experiencia')}

ANEXO:
Arquivo: ${file.name}
Tamanho: ${(file.size / 1024 / 1024).toFixed(2)}MB

Data/Hora: ${new Date().toLocaleString('pt-BR')}

Atenciosamente,
Sistema Automatizado - Site Rede Alecrim
================================`;
        
        console.log(emailContent);

        return {
          success: true,
          message: `[TESTE] Currículo processado com sucesso! 
          
📧 Destino: suporte.bi@redealecrim.com.br
📋 Dados: ${formData.get('nome')} - ${formData.get('areaInteresse')}
📎 Arquivo: ${file.name}

✅ Em ambiente de produção, o email seria enviado automaticamente.
📝 Verifique o console do navegador (F12) para ver os dados completos que seriam enviados.`
        };
      }

    } catch (error) {
      console.error('❌ [EmailJS] Erro detalhado:', error);
      console.error('❌ [EmailJS] Tipo do erro:', typeof error);
      console.error('❌ [EmailJS] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      
      // Verificar se é erro específico do EmailJS
      let errorMessage = 'Erro no sistema de email.';
      let technicalDetails = 'Erro desconhecido';
      
      if (error instanceof Error) {
        technicalDetails = error.message;
        
        if (error.message.includes('Invalid public key') || error.message.includes('public_key')) {
          errorMessage = 'Erro de configuração: Public Key inválida no EmailJS.';
        } else if (error.message.includes('Template') || error.message.includes('template')) {
          errorMessage = 'Erro de template: Template ID incorreto ou template mal configurado.';
        } else if (error.message.includes('Service') || error.message.includes('service')) {
          errorMessage = 'Erro de serviço: Service ID incorreto ou serviço não configurado.';
        } else if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Erro de conexão: Problemas de rede ou bloqueio de CORS.';
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
          errorMessage = 'Limite de emails do EmailJS atingido (200/mês no plano gratuito).';
        } else if (error.message.includes('blocked') || error.message.includes('CORS')) {
          errorMessage = 'Erro de bloqueio: Verificar configurações de CORS no EmailJS.';
        }
      }
      
      console.log('📋 [DEBUG] Mensagem de erro interpretada:', errorMessage);
      console.log('📋 [DEBUG] Detalhes técnicos:', technicalDetails);
      
      return {
        success: false,
        message: `${errorMessage}

🔍 Detalhes técnicos: ${technicalDetails}
📱 Entre em contato pelo WhatsApp se o problema persistir.
🛠️ Verifique o console do navegador (F12) para mais informações.`
      };
    }
  };

  // Função para enviar o formulário
  const handleSubmitCurriculum = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se o arquivo foi selecionado
    if (!curriculumFile) {
      // Rolar para o topo para mostrar o aviso
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setSubmitStatus('error');
      setSubmitMessage('Por favor, selecione seu currículo (arquivo PDF, DOC ou DOCX)');
      return;
    }

    // Iniciar processo de envio
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      console.log('📤 Iniciando envio do currículo...');
      
      // Criar FormData com todas as informações
      const formData = new FormData();
      formData.append('nome', curriculumForm.nome);
      formData.append('telefone', curriculumForm.telefone);
      formData.append('email', curriculumForm.email);
      formData.append('areaInteresse', curriculumForm.areaInteresse);
      formData.append('experiencia', curriculumForm.experiencia);
      formData.append('curriculo', curriculumFile);

      // Tentar primeiro via API real (se disponível)
      try {
        const response = await fetch(buildApiUrl('/api/submit-curriculum'), {
          method: 'POST',
          body: formData,
          headers: {
            'X-Destination-Email': 'suporte.bi@redealecrim.com.br' // Header para informar o destino
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Currículo enviado via API para suporte.bi@redealecrim.com.br:', result);
          
          setIsSubmitting(false);
          setSubmitStatus('success');
          setSubmitMessage(result.message || `Currículo enviado com sucesso para suporte.bi@redealecrim.com.br! Nossa equipe entrará em contato em breve.`);
          
          // Fechar modal após 3 segundos
          setTimeout(() => {
            handleCloseCurriculumModal();
          }, 3000);
          
          return;
        } else {
          console.log('⚠️ API retornou erro, usando EmailJS para suporte.bi@redealecrim.com.br');
        }
      } catch (apiError) {
        console.log('⚠️ API não disponível, usando EmailJS para suporte.bi@redealecrim.com.br:', apiError);
      }

      // Usar EmailJS para enviar para suporte.bi@redealecrim.com.br
      console.log('📧 Enviando via EmailJS para suporte.bi@redealecrim.com.br...');
      const emailResult = await sendEmailService(formData, curriculumFile);
      
      setIsSubmitting(false);
      
      if (emailResult.success) {
        // Rolar para o topo da página para mostrar o aviso
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        setSubmitStatus('success');
        setSubmitMessage(emailResult.message);
        console.log('✅ Email enviado com sucesso');
        
        // Fechar modal após 4 segundos para dar tempo de ler
        setTimeout(() => {
          handleCloseCurriculumModal();
        }, 4000);
      } else {
        // Rolar para o topo da página para mostrar o erro
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        setSubmitStatus('error');
        setSubmitMessage(emailResult.message);
        console.log('❌ Erro ao enviar email');
      }

    } catch (error) {
      console.error('❌ Erro geral ao enviar currículo:', error);
      
      // Rolar para o topo da página para mostrar o erro
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Erro inesperado ao enviar currículo. Verifique sua conexão e tente novamente.');
    }
  };

  if (loading) {
    return (
      <section id="jobs" className="jobs section">
        <div className="container">
          <div className="loading-state">
            <div className="loader"></div>
            <p>Carregando vagas disponíveis...</p>
          </div>
        </div>
      </section>
    );
  }

  // Se showApplication é true, mostra a página de candidatura
  if (showApplication && selectedJob) {
    return (
      <div className="application-page">
        <div className="application-header">
          <button 
            onClick={handleBackToJobs}
            className="back-button"
          >
            ← Voltar às Vagas
          </button>
        </div>
        <JobApplication 
          jobId={selectedJob.id} 
          jobTitle={selectedJob.titulo}
          onBackToJobs={handleBackToJobs}
        />
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      {/* Modal de Cadastro de Currículo - Estilos Inline para Garantir Funcionamento */}
      {showCurriculumModal && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
          onClick={(e) => {
            // Só fecha se clicou diretamente no overlay
            if (e.target === e.currentTarget) {
              console.log('🎯 Clique no overlay - fechando modal');
              handleCloseCurriculumModal();
            }
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div 
              style={{
                padding: '30px 30px 20px 30px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 10
              }}
            >
              <h3 
                style={{
                  margin: 0,
                  color: '#229c99',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                Cadastrar Currículo
              </h3>
              <button 
                onClick={() => {
                  console.log('❌ Botão X clicado - fechando modal');
                  handleCloseCurriculumModal();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  color: '#999',
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease'
                }}
                type="button"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmitCurriculum} style={{ padding: '20px 30px 30px 30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="nome"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  value={curriculumForm.nome}
                  onChange={(e) => handleFormChange('nome', e.target.value)}
                  required
                  placeholder="Digite seu nome completo"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="telefone"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  value={curriculumForm.telefone}
                  onChange={(e) => handleFormChange('telefone', e.target.value)}
                  required
                  placeholder="(11) 99999-9999"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={curriculumForm.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                  placeholder="seu@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="areaInteresse"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  Área de Interesse *
                </label>
                <select
                  id="areaInteresse"
                  value={curriculumForm.areaInteresse}
                  onChange={(e) => handleFormChange('areaInteresse', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Selecione uma área</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Venda Direta">Venda Direta</option>
                  <option value="Operacional">Operacional</option>
                  <option value="Outras">Outras</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="experiencia"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  Experiência Profissional *
                </label>
                <textarea
                  id="experiencia"
                  value={curriculumForm.experiencia}
                  onChange={(e) => handleFormChange('experiencia', e.target.value)}
                  required
                  placeholder="Descreva brevemente sua experiência profissional..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                />
              </div>

              {/* Campo de Upload de Currículo */}
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="curriculum-file"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}
                >
                  Anexar Currículo * (PDF, DOC, DOCX - máx. 10MB)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    id="curriculum-file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  {curriculumFile && (
                    <div 
                      style={{
                        marginTop: '8px',
                        padding: '8px 12px',
                        backgroundColor: '#e8f5e8',
                        border: '1px solid #229c99',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#094d4c',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>📎</span>
                      <span>{curriculumFile.name}</span>
                      <span style={{ color: '#666', fontSize: '0.8rem' }}>
                        ({(curriculumFile.size / 1024 / 1024).toFixed(2)}MB)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCurriculumFile(null);
                          const fileInput = document.getElementById('curriculum-file') as HTMLInputElement;
                          if (fileInput) fileInput.value = '';
                        }}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          padding: '0 4px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status do Envio */}
              {(isSubmitting || submitStatus !== 'idle') && (
                <div 
                  style={{
                    marginTop: '20px',
                    padding: '16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isSubmitting 
                      ? '#e3f2fd' 
                      : submitStatus === 'success' 
                        ? '#e8f5e8' 
                        : '#ffeaea',
                    border: `2px solid ${isSubmitting 
                      ? '#2196f3' 
                      : submitStatus === 'success' 
                        ? '#229c99' 
                        : '#f44336'}`,
                    animation: 'fadeIn 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>
                    {isSubmitting && <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />}
                    {submitStatus === 'success' && <CheckCircle size={24} style={{ color: '#229c99' }} />}
                    {submitStatus === 'error' && <AlertCircle size={24} style={{ color: '#f44336' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div 
                      style={{ 
                        fontWeight: 600, 
                        marginBottom: '4px',
                        color: isSubmitting 
                          ? '#1976d2' 
                          : submitStatus === 'success' 
                            ? '#094d4c' 
                            : '#d32f2f'
                      }}
                    >
                      {isSubmitting && 'Enviando currículo...'}
                      {submitStatus === 'success' && 'Enviado com sucesso!'}
                      {submitStatus === 'error' && 'Erro no envio'}
                    </div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {isSubmitting && 'Processando suas informações e anexo. Aguarde alguns instantes.'}
                      {submitStatus !== 'idle' && submitMessage}
                    </div>
                  </div>
                </div>
              )}

              <div 
                style={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'flex-end',
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: '1px solid #eee'
                }}
              >
                <button
                  type="button"
                  onClick={testEmailJS}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #ff6b35',
                    backgroundColor: 'transparent',
                    color: '#ff6b35',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🧪 Teste EmailJS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('🚫 Botão Cancelar clicado - fechando modal');
                    handleCloseCurriculumModal();
                  }}
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 24px',
                    border: '2px solid #229c99',
                    backgroundColor: 'transparent',
                    color: isSubmitting ? '#999' : '#229c99',
                    borderColor: isSubmitting ? '#ddd' : '#229c99',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    backgroundColor: isSubmitting 
                      ? '#ccc' 
                      : submitStatus === 'success' 
                        ? '#4caf50' 
                        : '#229c99',
                    color: 'white',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: isSubmitting || submitStatus === 'success' ? 0.8 : 1
                  }}
                >
                  {isSubmitting && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                  {submitStatus === 'success' && <CheckCircle size={18} />}
                  {isSubmitting 
                    ? 'Enviando...' 
                    : submitStatus === 'success' 
                      ? 'Enviado!' 
                      : 'Enviar Currículo'
                  }
                </button>
              </div>
            </form>

            <div 
              style={{
                padding: '15px 30px',
                fontSize: '0.9rem',
                color: '#666',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #eee'
              }}
            >
              <p style={{ margin: '0', lineHeight: '1.5' }}>
                <strong>🎯 Destino:</strong> suporte.bi@redealecrim.com.br<br/>
                <strong>📝 Status:</strong> <span style={{ color: '#4caf50', fontWeight: 600 }}>MODO PRODUÇÃO ✅</span><br/>
                <strong>ℹ️ Sistema:</strong> 
                {isSubmitting ? (
                  <>
                    Enviando seu currículo via EmailJS para a equipe de RH. 
                    Não feche esta janela durante o envio.
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    ✅ Currículo enviado com sucesso para suporte.bi@redealecrim.com.br!
                    <br/>� A equipe receberá um email com seus dados e anexo.
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    ⚠️ Erro no envio do email. Tente novamente ou entre em contato pelo WhatsApp.
                  </>
                ) : curriculumFile ? (
                  <>
                    Arquivo "{curriculumFile.name}" selecionado. Será enviado automaticamente 
                    via EmailJS para nossa equipe de RH com template estilizado.
                  </>
                ) : (
                  <>
                    Selecione seu currículo acima. O sistema enviará automaticamente 
                    um email profissional com seus dados para a equipe de RH.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

      <section id="jobs" className="jobs section">
      <div className="container">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <h2 className="gradient-text">Trabalhe Conosco</h2>
          <p className={`${headerVisible ? 'animate-fade-in-up delay-200' : ''}`}>
            Faça parte da nossa equipe! Descubra as oportunidades disponíveis 
            e construa sua carreira conosco na Rede Alecrim.
          </p>
          <div 
            className={`jobs-stats ${statsVisible ? 'animate-fade-in-up delay-400' : ''}`}
          >
            <div className="stat modern-card hover-lift">
              <span 
                ref={jobCountRef as React.RefObject<HTMLSpanElement>}
                className="stat-number gradient-text"
              >
                {loading ? '...' : (displayJobCount > 0 ? displayJobCount : totalJobs)}
              </span>
              <span className="stat-label">
                Vaga{totalJobs !== 1 ? 's' : ''} Disponíve{totalJobs !== 1 ? 'is' : 'l'}
              </span>
            </div>
            <div className="stat modern-card hover-lift">
              <span 
                ref={areaCountRef as React.RefObject<HTMLSpanElement>}
                className="stat-number gradient-text"
              >
                {loading ? '...' : (displayAreaCount > 0 ? displayAreaCount : totalAreas)}
              </span>
              <span className="stat-label">
                Área{totalAreas !== 1 ? 's' : ''} de Atuação
              </span>
            </div>
            <div className="stat modern-card hover-lift">
              <span className="stat-number gradient-text">25+</span>
              <span className="stat-label">Lojas</span>
            </div>
          </div>
        </div>

        {/* Seção de Vagas em Destaque */}
        {featuredJobs.length > 0 && (
          <div 
            ref={featuredRef as React.RefObject<HTMLDivElement>}
            className={`featured-jobs ${featuredVisible ? 'animate-fade-in-up delay-300' : ''}`}
          >
            <h3><Star size={20} style={{display: 'inline', marginRight: '8px'}} /> Vagas em Destaque</h3>
            <div className="featured-jobs-grid">
              {featuredJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className={`featured-job-card modern-card hover-lift ${featuredVisible ? 'animate-scale-in' : ''}`}
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                >
                  <div className="job-badge animate-bounce-in">DESTAQUE</div>
                  <h4>{job.title}</h4>
                  <div className="job-info">
                    <span className="location"><MapPin size={16} /> {job.location}</span>
                    <span className="type">{job.type}</span>
                  </div>
                  <div className="salary"><DollarSign size={16} /> {job.salary}</div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-details">
                    <div className="requirements">
                      <strong>Requisitos:</strong>
                      <ul>
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleApplyJob(job.id);
                    }}
                    className="btn btn-primary btn-apply hover-glow"
                    type="button"
                  >
                    Candidatar-se Agora
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div 
          ref={categoriesRef as React.RefObject<HTMLDivElement>}
          className="jobs-categories"
        >
          {jobCategories.map((category, categoryIndex) => (
            <div 
              key={category.id} 
              className={`category-section ${categoriesAnimated > categoryIndex ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="category-header">
                <div className="category-icon animate-float">{category.icon}</div>
                <div className="category-info">
                  <h3 className="gradient-text">{category.title}</h3>
                  <p>{category.jobs.length} vaga{category.jobs.length > 1 ? 's' : ''} disponível{category.jobs.length > 1 ? 'eis' : ''}</p>
                </div>
              </div>

              <div className="jobs-grid">
                {category.jobs.map((job, jobIndex) => (
                  <div 
                    key={job.id} 
                    className={`job-card modern-card hover-lift ${categoriesAnimated > categoryIndex ? 'animate-scale-in' : ''} ${expandedCards.has(job.id) ? 'expanded' : ''}`}
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (jobIndex * 0.1)}s` }}
                    onClick={(e) => {
                      // Previne cliques acidentais no container do card
                      e.stopPropagation();
                    }}
                  >
                    <div className="job-header">
                      <h4>{job.title}</h4>
                      <div className="job-meta">
                        <span className="job-location"><MapPin size={16} /> {job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    
                    <div className="salary"><DollarSign size={16} /> {job.salary}</div>
                    <p className="job-description">{job.description}</p>
                    
                    <div className="job-details">
                      <div className="job-requirements">
                        <strong>Requisitos:</strong>
                        <ul>
                          {expandedCards.has(job.id) 
                            ? job.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                              ))
                            : job.requirements.slice(0, 3).map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                              ))
                          }
                          {!expandedCards.has(job.id) && job.requirements.length > 3 && (
                            <li className="more-requirements">+{job.requirements.length - 3} mais requisitos</li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="job-benefits">
                        <strong>Benefícios:</strong>
                        <div className="benefits-tags">
                          {expandedCards.has(job.id)
                            ? job.benefits.map((benefit, index) => (
                                <span key={index} className="benefit-tag">• {benefit}</span>
                              ))
                            : job.benefits.slice(0, 3).map((benefit, index) => (
                                <span key={index} className="benefit-tag">• {benefit}</span>
                              ))
                          }
                          {!expandedCards.has(job.id) && job.benefits.length > 3 && (
                            <span className="benefit-tag more"> +{job.benefits.length - 3} mais</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo expandido - só aparece quando o card está expandido */}
                    {expandedCards.has(job.id) && (
                      <div className="expanded-content">
                        {/* Buscar a vaga original do JSON para mostrar mais detalhes */}
                        {(() => {
                          const vagaOriginal = vagas.find(v => v.id === job.id);
                          return vagaOriginal && (
                            <>
                              {vagaOriginal.responsabilidades && vagaOriginal.responsabilidades.length > 0 && (
                                <div className="job-section">
                                  <strong>Responsabilidades:</strong>
                                  <ul>
                                    {vagaOriginal.responsabilidades.map((resp, index) => (
                                      <li key={index}>{resp}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {vagaOriginal.experiencias_preferenciais && vagaOriginal.experiencias_preferenciais.length > 0 && (
                                <div className="job-section">
                                  <strong>Experiências Preferenciais:</strong>
                                  <ul>
                                    {vagaOriginal.experiencias_preferenciais.map((exp, index) => (
                                      <li key={index}>{exp}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {vagaOriginal.descricao && (
                                <div className="job-section">
                                  <strong>Descrição Completa:</strong>
                                  <p>{vagaOriginal.descricao}</p>
                                </div>
                              )}

                              <div className="job-section">
                                <strong>Empresa:</strong>
                                <p>{vagaOriginal.empresa}</p>
                              </div>

                              <div className="job-section">
                                <strong>Responsável:</strong>
                                <p>{vagaOriginal.responsavel}</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    <div 
                      className="job-actions"
                      onClick={(e) => {
                        // Previne qualquer propagação de eventos na seção de botões
                        e.stopPropagation();
                        console.log('🛡️ Container job-actions clicado, propagação bloqueada');
                      }}
                    >
                      <button 
                        id={`apply-btn-${job.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          // Garante que o clique foi no botão correto
                          const target = e.target as HTMLElement;
                          const expectedId = `apply-btn-${job.id}`;
                          
                          console.log('🔥 Clique em Candidatar-se para job:', job.id);
                          console.log('🎯 Target ID:', target.id);
                          console.log('🎯 Expected ID:', expectedId);
                          
                          // Só executa se o ID bater
                          if (target.id === expectedId || target.closest(`#${expectedId}`)) {
                            handleApplyJob(job.id);
                          } else {
                            console.log('❌ ID não coincide, ignorando clique');
                          }
                        }}
                        className="btn btn-primary hover-glow"
                        type="button"
                      >
                        Candidatar-se
                      </button>
                      <button 
                        id={`details-btn-${job.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          // Garante que o clique foi no botão correto
                          const target = e.target as HTMLElement;
                          const expectedId = `details-btn-${job.id}`;
                          
                          console.log('🔍 Clique em Ver Detalhes para job:', job.id);
                          console.log('🎯 Target ID:', target.id);
                          console.log('🎯 Expected ID:', expectedId);
                          
                          // Só executa se o ID bater
                          if (target.id === expectedId || target.closest(`#${expectedId}`)) {
                            handleViewDetails(job.id);
                          } else {
                            console.log('❌ ID não coincide, ignorando clique');
                          }
                        }}
                        className="btn btn-outline view-details-btn"
                        type="button"
                      >
                        {expandedCards.has(job.id) ? 'Recolher' : 'Ver Detalhes'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {vagas.length === 0 && !loading && (
          <div className="no-jobs-message">
            <h3>Nenhuma vaga disponível no momento</h3>
            <p>Mas cadastre seu currículo em nosso banco de talentos!</p>
          </div>
        )}

        <div 
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`jobs-cta ${ctaVisible ? 'animate-fade-in-up delay-600' : ''}`}
        >
          <h3 className="gradient-text">Não encontrou a vaga ideal?</h3>
          <p>
            Cadastre seu currículo em nosso banco de talentos e seja contactado quando surgir uma oportunidade perfeita para o seu perfil.
          </p>
          <div className="cta-actions">
            <button 
              onClick={handleCadastrarCurriculo}
              className="btn btn-primary btn-lg hover-glow"
              type="button"
            >
              Cadastrar Currículo
            </button>
            <a href="#contact" className="btn btn-outline btn-lg">
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Jobs;