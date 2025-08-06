import React, { useState, useEffect } from 'react';
import './Jobs.css';
import { useScrollAnimation, useStaggerAnimation, useCountAnimation } from '../hooks/useAnimations';
import JobApplication from './JobApplication';

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
  icon: string;
  jobs: Job[];
}

const Jobs: React.FC = () => {
  const [vagas, setVagas] = useState<VagaJSON[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<VagaJSON | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Carrega as vagas do arquivo JSON
  useEffect(() => {
    const carregarVagas = async () => {
      try {
        const response = await fetch('/vagas.json');
        const data: VagaJSON[] = await response.json();
        setVagas(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
        setLoading(false);
      }
    };

    carregarVagas();
  }, []);

  // Converte as vagas do JSON para o formato do componente
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
    const categorias: { [key: string]: { title: string; icon: string } } = {
      vendas: { title: 'Vendas', icon: '💼' },
      administrativo: { title: 'Administrativo', icon: '📊' },
      vendadireta: { title: 'Venda Direta', icon: '🏠' },
      operacional: { title: 'Operacional', icon: '⚙️' }
    };

    const vagasAgrupadas: { [key: string]: VagaJSON[] } = {};
    
    vagas.forEach(vaga => {
      const categoria = vaga.categoria || 'vendas';
      if (!vagasAgrupadas[categoria]) {
        vagasAgrupadas[categoria] = [];
      }
      vagasAgrupadas[categoria].push(vaga);
    });

    return Object.keys(vagasAgrupadas).map(categoriaId => ({
      id: categoriaId,
      title: categorias[categoriaId]?.title || 'Outras',
      icon: categorias[categoriaId]?.icon || '💼',
      jobs: converterVagasParaJobs(vagasAgrupadas[categoriaId])
    }));
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
  
  // Contadores animados
  const totalJobs = vagas.length;
  const [jobCountRef, jobCount] = useCountAnimation(totalJobs, 2000);
  const [areaCountRef, areaCount] = useCountAnimation(jobCategories.length || 1, 1500);

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
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
        console.log('📦 Card recolhido:', jobId);
      } else {
        newSet.add(jobId);
        console.log('📖 Card expandido:', jobId);
      }
      return newSet;
    });
  };

  const closeModals = () => {
    setShowApplication(false);
    setSelectedJob(null);
  };

  const handleBackToJobs = () => {
    setShowApplication(false);
    setSelectedJob(null);
  };

  // Função para gerar o corpo do email personalizado
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

  // Função para abrir modal de dados do usuário
  const handleCadastrarCurriculo = () => {
    // Por enquanto, vamos usar um prompt simples
    // Depois pode ser substituído por um modal mais elaborado
    const nome = prompt('Seu nome completo:') || '';
    const telefone = prompt('Seu telefone:') || '';
    const email = prompt('Seu e-mail:') || '';
    const areaInteresse = prompt('Área de interesse:') || '';
    const experiencia = prompt('Experiência profissional (resumo):') || '';

    const emailBody = generateEmailBody({
      nome,
      telefone,
      email,
      areaInteresse,
      experiencia
    });

    const mailtoLink = `mailto:rh@redealecrim.com.br?subject=${encodeURIComponent('Cadastro no Banco de Talentos')}&body=${emailBody}`;
    
    window.location.href = mailtoLink;
  };

  console.log('🚀 Estados atuais:', { 
    showApplication, 
    selectedJobId: selectedJob?.id,
    selectedJobTitle: selectedJob?.titulo,
    expandedCardsCount: expandedCards.size
  });

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
        />
      </div>
    );
  }

  return (
    <section id="jobs" className="jobs section">
      <div className="container">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`section-header ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <h2 className="gradient-text-animated">Trabalhe Conosco</h2>
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
                {jobCount}
              </span>
              <span className="stat-label">Vagas Disponíveis</span>
            </div>
            <div className="stat modern-card hover-lift">
              <span 
                ref={areaCountRef as React.RefObject<HTMLSpanElement>}
                className="stat-number gradient-text"
              >
                {areaCount}
              </span>
              <span className="stat-label">Áreas de Atuação</span>
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
            <h3 className="gradient-text">🌟 Vagas em Destaque</h3>
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
                    <span className="location">📍 {job.location}</span>
                    <span className="type">{job.type}</span>
                  </div>
                  <div className="salary">💰 {job.salary}</div>
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
                  >
                    <div className="job-header">
                      <h4>{job.title}</h4>
                      <div className="job-meta">
                        <span className="job-location">📍 {job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    
                    <div className="salary">💰 {job.salary}</div>
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
                                <span key={index} className="benefit-tag">{benefit}</span>
                              ))
                            : job.benefits.slice(0, 3).map((benefit, index) => (
                                <span key={index} className="benefit-tag">{benefit}</span>
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

                    <div className="job-actions">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleApplyJob(job.id);
                        }}
                        className="btn btn-primary hover-glow"
                        type="button"
                      >
                        Candidatar-se
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleViewDetails(job.id);
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
  );
};

export default Jobs;