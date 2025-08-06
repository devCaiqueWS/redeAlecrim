import React from 'react';
import './Jobs.css';
import { useScrollAnimation, useStaggerAnimation, useCountAnimation } from '../hooks/useAnimations';

const Jobs: React.FC = () => {
  const jobCategories = [
    {
      id: 'vendas',
      title: 'Vendas',
      icon: '💼',
      jobs: [
        {
          id: 1,
          title: 'Consultor(a) de Vendas - Boti',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Atendimento ao cliente, vendas de produtos de beleza e cosméticos, metas de vendas.',
          requirements: ['Experiência em vendas', 'Ensino médio completo', 'Boa comunicação'],
          benefits: ['Vale transporte', 'Vale refeição', 'Comissões', 'Plano de saúde']
        },
        {
          id: 2,
          title: 'Consultor(a) de Vendas - QDB',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Atendimento especializado em maquiagem, vendas consultivas, relacionamento com clientes.',
          requirements: ['Conhecimento em maquiagem', 'Experiência em vendas', 'Ensino médio completo'],
          benefits: ['Vale transporte', 'Vale refeição', 'Comissões', 'Plano de saúde']
        },
        {
          id: 9,
          title: 'Consultor(a) de Vendas Sênior - Boti',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Vendas especializadas, treinamento de novos consultores, metas elevadas.',
          requirements: ['3+ anos em vendas', 'Ensino superior preferencial', 'Liderança'],
          benefits: ['Salário diferenciado', 'Comissões altas', 'PLR', 'Plano de saúde premium']
        },
        {
          id: 10,
          title: 'Vendedor(a) Interno - QDB',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Atendimento telefônico, vendas online, suporte aos consultores externos.',
          requirements: ['Experiência em televendas', 'Boa dicção', 'Conhecimento em informática'],
          benefits: ['Vale transporte', 'Vale refeição', 'Comissões', 'Home office híbrido']
        },
        {
          id: 11,
          title: 'Promotor(a) de Vendas',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Promoção de produtos em pontos de venda, demonstrações, ativações de marca.',
          requirements: ['Experiência em promoção', 'Dinamismo', 'Disponibilidade para viagens'],
          benefits: ['Vale transporte', 'Ajuda de custo viagens', 'Comissões', 'Flexibilidade']
        }
      ]
    },
    {
      id: 'gestao',
      title: 'Gestão',
      icon: '👥',
      jobs: [
        {
          id: 3,
          title: 'Gerente de Loja',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Gestão completa da loja, liderança de equipe, controle de resultados e metas.',
          requirements: ['Experiência em gestão', 'Ensino superior', 'Liderança de equipe'],
          benefits: ['Salário competitivo', 'PLR', 'Vale refeição', 'Plano de saúde', 'Vale transporte']
        },
        {
          id: 4,
          title: 'Supervisor(a) Comercial',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Supervisão de múltiplas lojas, desenvolvimento de equipe, análise de performance.',
          requirements: ['Experiência em supervisão', 'Ensino superior', 'Conhecimento em varejo'],
          benefits: ['Salário competitivo', 'PLR', 'Vale refeição', 'Plano de saúde', 'Carro da empresa']
        },
        {
          id: 12,
          title: 'Coordenador(a) Regional',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Coordenação de múltiplas unidades regionais, desenvolvimento estratégico, gestão de resultados.',
          requirements: ['5+ anos em gestão', 'MBA preferencial', 'Experiência regional'],
          benefits: ['Salário executivo', 'PLR', 'Carro da empresa', 'Plano de saúde família', 'Stock options']
        },
        {
          id: 13,
          title: 'Gerente de Desenvolvimento',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Desenvolvimento de novos mercados, expansão de lojas, análise de viabilidade.',
          requirements: ['Experiência em expansão', 'Análise de mercado', 'Ensino superior'],
          benefits: ['Salário + variável', 'Carro da empresa', 'PLR', 'Viagens corporativas']
        }
      ]
    },
    {
      id: 'vendadireta',
      title: 'Venda Direta',
      icon: '🏠',
      jobs: [
        {
          id: 5,
          title: 'Consultor(a) de Venda Direta',
          location: 'Home Office',
          type: 'Autônomo',
          description: 'Vendas por catálogo, atendimento domiciliar, relacionamento com revendedores.',
          requirements: ['Facilidade de relacionamento', 'Organização', 'Proatividade'],
          benefits: ['Comissões atrativas', 'Flexibilidade de horários', 'Treinamentos', 'Materiais de apoio']
        },
        {
          id: 6,
          title: 'Líder de Venda Direta',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Liderança de equipe de venda direta, treinamentos, desenvolvimento de revendedores.',
          requirements: ['Experiência em venda direta', 'Liderança', 'Ensino médio completo'],
          benefits: ['Salário + comissões', 'Vale refeição', 'Vale transporte', 'Plano de saúde']
        },
        {
          id: 14,
          title: 'Coordenador(a) de Venda Direta',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Coordenação regional de vendas diretas, recrutamento, treinamento de líderes.',
          requirements: ['3+ anos em venda direta', 'Liderança de equipe', 'Conhecimento em gestão'],
          benefits: ['Salário competitivo', 'Comissões diferenciadas', 'Carro da empresa', 'PLR']
        },
        {
          id: 15,
          title: 'Especialista em Treinamento VD',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Desenvolvimento de treinamentos, capacitação de consultores, criação de materiais.',
          requirements: ['Experiência em treinamento', 'Pedagogia/RH', 'Conhecimento em venda direta'],
          benefits: ['Salário diferenciado', 'Vale refeição', 'Home office', 'Viagens para treinamentos']
        }
      ]
    },
    {
      id: 'administrativo',
      title: 'Administrativo',
      icon: '📊',
      jobs: [
        {
          id: 7,
          title: 'Assistente Administrativo',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Apoio administrativo geral, controle de documentos, atendimento telefônico.',
          requirements: ['Ensino médio completo', 'Conhecimento em informática', 'Organização'],
          benefits: ['Vale transporte', 'Vale refeição', 'Plano de saúde', 'Convênios']
        },
        {
          id: 8,
          title: 'Analista Financeiro',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Análise financeira, controle de contas, relatórios gerenciais.',
          requirements: ['Ensino superior em áreas afins', 'Excel avançado', 'Experiência financeira'],
          benefits: ['Salário competitivo', 'Vale refeição', 'Vale transporte', 'Plano de saúde', 'PLR']
        },
        {
          id: 16,
          title: 'Analista de RH',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Recrutamento, seleção, desenvolvimento de pessoas, gestão de benefícios.',
          requirements: ['Superior em RH/Psicologia', 'Experiência em R&S', 'Conhecimento em DP'],
          benefits: ['Salário competitivo', 'PLR', 'Home office híbrido', 'Plano de saúde família']
        },
        {
          id: 17,
          title: 'Analista de Marketing',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Campanhas promocionais, mídias sociais, análise de mercado, eventos.',
          requirements: ['Superior em Marketing/Comunicação', 'Adobe Creative Suite', 'Redes sociais'],
          benefits: ['Salário diferenciado', 'Vale refeição', 'Home office', 'Cursos de capacitação']
        },
        {
          id: 18,
          title: 'Coordenador(a) de TI',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Gestão de infraestrutura, suporte técnico, desenvolvimento de sistemas.',
          requirements: ['Superior em TI/Sistemas', 'Experiência em gestão', 'Cloud computing'],
          benefits: ['Salário executivo', 'PLR', 'Home office', 'Certificações pagas', 'Equipamentos']
        },
        {
          id: 19,
          title: 'Assistente de Compras',
          location: 'São Paulo, SP',
          type: 'CLT',
          description: 'Cotações, negociação com fornecedores, controle de estoque, compras estratégicas.',
          requirements: ['Ensino médio completo', 'Experiência em compras', 'Negociação'],
          benefits: ['Vale transporte', 'Vale refeição', 'Plano de saúde', 'Bônus por performance']
        }
      ]
    }
  ];

  // Adicionar nova seção de vagas em destaque
  const featuredJobs = [
    {
      id: 20,
      title: 'Diretor(a) Comercial',
      location: 'São Paulo, SP',
      type: 'CLT - Executivo',
      description: 'Liderança estratégica de toda área comercial, expansão nacional, desenvolvimento de novos canais.',
      requirements: ['10+ anos em gestão comercial', 'MBA/Pós-graduação', 'Experiência em varejo de beleza'],
      benefits: ['Pacote executivo', 'Stock options', 'Carro executivo', 'Plano de saúde premium', 'Previdência privada']
    },
    {
      id: 21,
      title: 'Gerente Nacional de Franquias',
      location: 'São Paulo, SP',
      type: 'CLT - Gerencial',
      description: 'Desenvolvimento do sistema de franquias, expansão nacional, suporte aos franqueados.',
      requirements: ['Experiência em franquias', 'Ensino superior', 'Conhecimento jurídico básico'],
      benefits: ['Salário + comissões', 'Carro da empresa', 'PLR', 'Viagens nacionais', 'Home office híbrido']
    }
  ];

  // Hooks para animações
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [statsRef, statsVisible] = useScrollAnimation(0.2);
  const [featuredRef, featuredVisible] = useScrollAnimation(0.1);
  const [categoriesRef, categoriesAnimated] = useStaggerAnimation(200);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  
  // Contadores animados
  const totalJobs = jobCategories.reduce((total, cat) => total + cat.jobs.length, 0) + featuredJobs.length;
  const [jobCountRef, jobCount] = useCountAnimation(totalJobs, 2000);
  const [areaCountRef, areaCount] = useCountAnimation(4, 1500);

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
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className={`jobs-stats ${statsVisible ? 'stagger-animation' : ''}`}
          >
            <div className="stat modern-card hover-lift">
              <span 
                ref={jobCountRef as React.RefObject<HTMLSpanElement>}
                className="stat-number gradient-text"
              >
                {jobCount}+
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
              <span className="stat-number gradient-text">1</span>
              <span className="stat-label">Estado - São Paulo</span>
            </div>
          </div>
        </div>

        {/* Seção de Vagas em Destaque */}
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
                <a 
                  href={`#apply-${job.id}`} 
                  className="btn btn-primary btn-apply hover-glow"
                >
                  Candidatar-se Agora
                </a>
              </div>
            ))}
          </div>
        </div>

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
                    className={`job-card modern-card hover-lift ${categoriesAnimated > categoryIndex ? 'animate-scale-in' : ''}`}
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (jobIndex * 0.1)}s` }}
                  >
                    <div className="job-header">
                      <h4>{job.title}</h4>
                      <div className="job-meta">
                        <span className="job-location">📍 {job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    
                    <div className="job-description">
                      <p>{job.description}</p>
                    </div>

                    <div className="job-requirements">
                      <h5>Requisitos:</h5>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-benefits">
                      <h5>Benefícios:</h5>
                      <ul>
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-actions">
                      <a href={`#apply-${job.id}`} className="btn btn-primary hover-glow">
                        Candidatar-se
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`jobs-cta ${ctaVisible ? 'animate-fade-in-up' : ''}`}
        >
          <h3 className="gradient-text">Não encontrou a vaga ideal?</h3>
          <p>Cadastre seu currículo em nosso banco de talentos e seja o primeiro a saber sobre novas oportunidades!</p>
          <a href="#apply-general" className="btn btn-outline hover-glow">
            Cadastrar Currículo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
