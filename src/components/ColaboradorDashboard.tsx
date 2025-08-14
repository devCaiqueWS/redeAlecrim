import React, { useState, useEffect } from 'react';
import { LogOut, User, Calendar, FileText, Users, Briefcase, AlertCircle, UserPlus, Plus, Link, Settings, Shield, Edit, Save, X, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CadastroColaborador from './CadastroColaborador';
import './ColaboradorDashboard.css';

const ColaboradorDashboard: React.FC = () => {
  const { colaborador, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState(colaborador);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Estados para formulários
  const [newJobForm, setNewJobForm] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    salario: '',
    localizacao: '',
    tipo: 'efetivo'
  });

  // Estado para plataformas
  const [platforms, setPlatforms] = useState<Array<{
    id: number;
    nome: string;
    url: string;
    categoria: string;
    descricao: string;
  }>>([]);

  // Estado para equipe/colaboradores
  const [teamMembers, setTeamMembers] = useState<Array<{
    id: number;
    nome: string;
    email: string;
    cargo: string;
    departamento?: string;
    dataAdmissao?: string;
    data_admissao?: string; // Campo do banco de dados
  }>>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // Estados para edição de perfil
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nome: userData?.nome || '',
    email: userData?.email || '',
    cargo: userData?.cargo || '',
    departamento: userData?.departamento || '',
    dataAdmissao: userData?.dataAdmissao || ''
  });

  // Função para carregar plataformas
  const loadPlatforms = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/plataformas');
      if (response.ok) {
        const data = await response.json();
        setPlatforms(data);
      }
    } catch (error) {
      console.error('Erro ao carregar plataformas:', error);
    }
  };

  // Carregar plataformas quando o componente montar
  useEffect(() => {
    loadPlatforms();
    setIsInitialized(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNewJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/admin/vagas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobForm)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setNewJobForm({ titulo: '', descricao: '', requisitos: '', salario: '', localizacao: '', tipo: 'efetivo' });
      } else {
        alert(result.error || 'Erro ao criar vaga');
      }
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      alert('Erro ao criar vaga. Verifique sua conexão e tente novamente.');
    }
  };

  // Funções para edição de perfil
  const handleProfileEdit = () => {
    setProfileForm({
      nome: userData?.nome || '',
      email: userData?.email || '',
      cargo: userData?.cargo || '',
      departamento: userData?.departamento || '',
      dataAdmissao: userData?.dataAdmissao || ''
    });
    setIsEditingProfile(true);
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    setProfileForm({
      nome: userData?.nome || '',
      email: userData?.email || '',
      cargo: userData?.cargo || '',
      departamento: userData?.departamento || '',
      dataAdmissao: userData?.dataAdmissao || ''
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3001/colaboradores/${userData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileForm)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        setIsEditingProfile(false);
        // Atualizar os dados locais
        setUserData(result);
      } else {
        alert(result.error || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Verifique sua conexão e tente novamente.');
    }
  };

  // Carregar dados apenas uma vez quando o componente monta
  React.useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        // Carregar plataformas
        const plataformasResponse = await fetch('http://localhost:3001/admin/plataformas');
        if (plataformasResponse.ok) {
          const plataformasData = await plataformasResponse.json();
          setPlatforms(plataformasData);
        }

        // Carregar equipe
        setLoadingTeam(true);
        const equipeResponse = await fetch('http://localhost:3001/colaboradores');
        if (equipeResponse.ok) {
          const equipeData = await equipeResponse.json();
          setTeamMembers(equipeData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoadingTeam(false);
      }
    };

    carregarDadosIniciais();
  }, []); // Executar apenas uma vez

  // Carregar dados completos do usuário da API
  React.useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (!colaborador?.id) return;
      
      setLoadingUserData(true);
      try {
        const response = await fetch(`http://localhost:3001/colaboradores/${colaborador.id}`);
        if (response.ok) {
          const dadosCompletos = await response.json();
          setUserData(dadosCompletos);
        } else {
          console.error('Erro ao carregar dados do usuário');
          // Usar dados do contexto como fallback
          setUserData(colaborador);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        // Usar dados do contexto como fallback
        setUserData(colaborador);
      } finally {
        setLoadingUserData(false);
      }
    };

    carregarDadosUsuario();
  }, [colaborador]);

  // Atualizar formulário quando userData mudar
  React.useEffect(() => {
    if (userData && !isEditingProfile) {
      setProfileForm({
        nome: userData.nome || '',
        email: userData.email || '',
        cargo: userData.cargo || '',
        departamento: userData.departamento || '',
        dataAdmissao: userData.dataAdmissao || ''
      });
    }
  }, [userData, isEditingProfile]);

  if (!colaborador) return null;

  return (
    <div className="dashboard-container">
      {/* Header do Dashboard */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Área dos Colaboradores</h1>
          
          {/* Menu de Navegação */}
          <nav className="dashboard-nav">
            <button 
              className={`nav-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <Briefcase size={18} />
              Dashboard
            </button>
            <button 
              className={`nav-btn ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              <UserPlus size={18} />
              Usuários
            </button>
            <button 
              className={`nav-btn ${activeSection === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveSection('jobs')}
            >
              <Plus size={18} />
              Vagas
            </button>
            <button 
              className={`nav-btn ${activeSection === 'dashboards' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboards')}
            >
              <BarChart3 size={18} />
              Dashboards
            </button>
          </nav>
          
          <div className="user-info">
            <div className="user-avatar">
              {getInitials(colaborador.nome)}
            </div>
            <div className="user-details">
              <h3>{colaborador.nome}</h3>
              <p>{colaborador.cargo}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="dashboard-content" key={`section-${activeSection}`}>
        {!isInitialized ? (
          <div className="loading-section">
            <p>Carregando...</p>
          </div>
        ) : (
          <>
            {activeSection === 'dashboard' && (
          <>
            {/* Seção de Boas-vindas */}
            <section className="welcome-section">
              <h2>Bem-vindo, {userData?.nome ? userData.nome.split(' ')[0] : 'Usuário'}! 👋</h2>
              <p>Esta é sua área pessoal na Rede Alecrim. Aqui você pode acessar informações importantes, recursos da empresa e se manter atualizado com os comunicados.</p>
            </section>

            {/* Grid de Recursos */}
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <User />
                  </div>
                  <h3>Meu Perfil</h3>
                </div>
                <div className="card-content">
                  <p>Visualize e atualize suas informações pessoais e profissionais.</p>
                  <button 
                    className="card-link"
                    onClick={() => setActiveSection('profile')}
                  >
                    Ver perfil
                    <Calendar size={16} />
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <FileText />
                  </div>
                  <h3>Documentos</h3>
                </div>
                <div className="card-content">
                  <p>Acesse holerites, declarações e outros documentos importantes.</p>
                  <button 
                    className="card-link"
                    onClick={() => setActiveSection('documents')}
                  >
                    Ver documentos
                    <FileText size={16} />
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <Users />
                  </div>
                  <h3>Equipe</h3>
                </div>
                <div className="card-content">
                  <p>Conecte-se com outros colaboradores e veja a estrutura da empresa.</p>
                  <button 
                    className="card-link"
                    onClick={() => setActiveSection('team')}
                  >
                    Ver equipe
                    <Users size={16} />
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <Briefcase />
                  </div>
                  <h3>Recursos</h3>
                </div>
                <div className="card-content">
                  <p>Acesse ferramentas, manuais e recursos úteis para o seu trabalho.</p>
                  <button 
                    className="card-link"
                    onClick={() => setActiveSection('resources')}
                  >
                    Ver recursos
                    <Briefcase size={16} />
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <Link />
                  </div>
                  <h3>Plataformas</h3>
                </div>
                <div className="card-content">
                  <p>Acesse rapidamente as principais plataformas e sistemas da empresa.</p>
                  <button className="card-link" onClick={() => setActiveSection('platforms')}>
                    Ver plataformas
                    <Link size={16} />
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <BarChart3 />
                  </div>
                  <h3>Dashboards</h3>
                </div>
                <div className="card-content">
                  <p>Acesse relatórios, métricas e painéis de controle da empresa.</p>
                  <button className="card-link" onClick={() => setActiveSection('dashboards')}>
                    Ver dashboards
                    <BarChart3 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Avisos e Comunicados */}
            <section className="announcements-section">
              <h2>
                <AlertCircle />
                Avisos e Comunicados
              </h2>
              
              <div className="announcement-item">
                <div className="announcement-header">
                  <h3 className="announcement-title">🎉 Bem-vindo à nova área dos colaboradores!</h3>
                  <span className="announcement-date">{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="announcement-content">
                  Estamos muito felizes em apresentar a nova plataforma digital da Rede Alecrim. 
                  Em breve, teremos ainda mais funcionalidades para tornar sua experiência ainda melhor.
                </p>
              </div>

              <div className="announcement-item">
                <div className="announcement-header">
                  <h3 className="announcement-title">📱 Acesso mobile disponível</h3>
                  <span className="announcement-date">{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="announcement-content">
                  Agora você pode acessar a área dos colaboradores pelo seu smartphone ou tablet 
                  com total responsividade e facilidade de navegação.
                </p>
              </div>
            </section>
          </>
        )}

        {activeSection === 'profile' && (
          <section className="profile-section">
            <div className="section-header">
              <h2>
                <User />
                Meu Perfil
              </h2>
              <p>Visualize e gerencie suas informações pessoais</p>
              {!isEditingProfile && (
                <button 
                  className="edit-profile-btn"
                  onClick={handleProfileEdit}
                >
                  <Edit size={16} />
                  Editar Perfil
                </button>
              )}
            </div>

            <div className="profile-content">
              <div className="profile-card">
                <div className="profile-avatar">
                  {userData?.nome ? getInitials(userData.nome) : '?'}
                </div>
                <div className="profile-info">
                  <h3>{userData?.nome || 'Carregando...'}</h3>
                  <p className="profile-role">{userData?.cargo || ''}</p>
                  <p className="profile-email">{userData?.email || ''}</p>
                </div>
              </div>

              {!isEditingProfile ? (
                <div className="profile-details">
                  <h3>Informações Pessoais</h3>
                  {loadingUserData ? (
                    <p>Carregando dados...</p>
                  ) : (
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Nome Completo</label>
                        <span>{userData?.nome || 'Não informado'}</span>
                      </div>
                      <div className="info-item">
                        <label>E-mail</label>
                        <span>{userData?.email || 'Não informado'}</span>
                      </div>
                      <div className="info-item">
                        <label>Cargo</label>
                        <span>{userData?.cargo || 'Não informado'}</span>
                      </div>
                      <div className="info-item">
                        <label>Departamento</label>
                        <span>{userData?.departamento || 'Não informado'}</span>
                      </div>
                      <div className="info-item">
                        <label>Data de Admissão</label>
                        <span>{userData?.dataAdmissao ? new Date(userData.dataAdmissao).toLocaleDateString('pt-BR') : 'Não informado'}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="profile-edit-form">
                  <div className="edit-form-header">
                    <h3>Editar Informações</h3>
                    <div className="edit-form-actions">
                      <button 
                        className="cancel-btn"
                        onClick={handleProfileCancel}
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                          type="text"
                          id="nome"
                          value={profileForm.nome}
                          onChange={(e) => setProfileForm({ ...profileForm, nome: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cargo">Cargo</label>
                        <input
                          type="text"
                          id="cargo"
                          value={profileForm.cargo}
                          onChange={(e) => setProfileForm({ ...profileForm, cargo: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="departamento">Departamento</label>
                        <input
                          type="text"
                          id="departamento"
                          value={profileForm.departamento}
                          onChange={(e) => setProfileForm({ ...profileForm, departamento: e.target.value })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="dataAdmissao">Data de Admissão</label>
                        <input
                          type="date"
                          id="dataAdmissao"
                          value={profileForm.dataAdmissao}
                          onChange={(e) => setProfileForm({ ...profileForm, dataAdmissao: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="save-btn"
                      >
                        <Save size={16} />
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === 'documents' && (
          <section className="documents-section">
            <div className="section-header">
              <h2>
                <FileText />
                Documentos
              </h2>
              <p>Acesse seus documentos e recursos importantes</p>
            </div>

            <div className="documents-grid">
              <div className="document-card">
                <div className="document-icon">
                  <FileText />
                </div>
                <h3>Manual do Colaborador</h3>
                <p>Guia completo com políticas e procedimentos da empresa</p>
                <button className="download-btn">Baixar PDF</button>
              </div>

              <div className="document-card">
                <div className="document-icon">
                  <FileText />
                </div>
                <h3>Código de Conduta</h3>
                <p>Diretrizes de comportamento e ética profissional</p>
                <button className="download-btn">Baixar PDF</button>
              </div>

              <div className="document-card">
                <div className="document-icon">
                  <FileText />
                </div>
                <h3>Benefícios</h3>
                <p>Informações sobre plano de saúde, vale-alimentação e outros benefícios</p>
                <button className="download-btn">Baixar PDF</button>
              </div>

              <div className="document-card">
                <div className="document-icon">
                  <FileText />
                </div>
                <h3>Formulários RH</h3>
                <p>Formulários para solicitações e atualizações de dados</p>
                <button className="download-btn">Baixar PDF</button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'team' && (
          <section className="team-section">
            <div className="section-header">
              <h2>
                <Users />
                Equipe
              </h2>
              <p>Conheça os profissionais que fazem parte da nossa equipe</p>
            </div>

            {loadingTeam ? (
              <div className="loading-state">
                <p>Carregando equipe...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <h3>Nenhum membro cadastrado</h3>
                <p>A equipe ainda não foi cadastrada no sistema.</p>
              </div>
            ) : (
              <div className="team-by-department">
                {Object.entries(
                  teamMembers.reduce((grouped: { [key: string]: typeof teamMembers }, member) => {
                    const department = member.departamento || 'Setor não informado';
                    if (!grouped[department]) {
                      grouped[department] = [];
                    }
                    grouped[department].push(member);
                    return grouped;
                  }, {})
                )
                .sort(([a], [b]) => {
                  // Colocar "Setor não informado" por último
                  if (a === 'Setor não informado') return 1;
                  if (b === 'Setor não informado') return -1;
                  return a.localeCompare(b);
                })
                .map(([department, members]) => (
                  <div key={department} className="department-section">
                    <div className="department-header">
                      <h3>{department}</h3>
                      <span className="member-count">{members.length} {members.length === 1 ? 'colaborador' : 'colaboradores'}</span>
                    </div>
                    
                    <div className="team-grid">
                      {members.map((member) => (
                        <div key={member.id} className="team-member">
                          <div className="member-avatar">
                            {getInitials(member.nome)}
                          </div>
                          <div className="member-info">
                            <h4>{member.nome}</h4>
                            <p className="member-role">{member.cargo}</p>
                            <span className="member-email">{member.email}</span>
                            <div className="member-details">
                              {(member.dataAdmissao || member.data_admissao) && (
                                <small className="member-since">
                                  Desde {new Date(member.dataAdmissao || member.data_admissao || '').toLocaleDateString('pt-BR')}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeSection === 'platforms' && (
          <section className="platforms-section">
            <div className="section-header">
              <h2>
                <Link />
                Plataformas da Empresa
              </h2>
              <p>Acesse as principais plataformas e sistemas utilizados pela empresa</p>
            </div>

            <div className="platforms-grid">
              {platforms.length === 0 ? (
                <div className="empty-state">
                  <Link size={48} />
                  <h3>Nenhuma plataforma cadastrada</h3>
                  <p>Entre em contato com o administrador para adicionar plataformas.</p>
                </div>
              ) : (
                platforms.map((platform) => (
                  <div key={platform.id} className="platform-card">
                    <div className="platform-header">
                      <h4>{platform.nome}</h4>
                      <span className="platform-category">{platform.categoria}</span>
                    </div>
                    <p className="platform-description">{platform.descricao}</p>
                    <a 
                      href={platform.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="platform-link"
                    >
                      <Link size={16} />
                      Acessar Plataforma
                    </a>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeSection === 'dashboards' && (
          <section className="dashboards-section">
            <div className="section-header">
              <h2>
                <BarChart3 />
                Dashboards & Relatórios
              </h2>
              <p>Acesse painéis de controle, métricas e relatórios da empresa</p>
            </div>

            <div className="dashboards-grid">
              <div className="dashboard-item-card">
                <div className="dashboard-item-header">
                  <div className="dashboard-item-icon">
                    <BarChart3 />
                  </div>
                  <h3>Dashboard Vendas</h3>
                </div>
                <p className="dashboard-item-description">
                  📊 Métricas de vendas, metas e performance das lojas
                </p>
                <button className="dashboard-item-link">
                  <BarChart3 size={16} />
                  Acessar Dashboard
                </button>
              </div>

              <div className="dashboard-item-card">
                <div className="dashboard-item-header">
                  <div className="dashboard-item-icon">
                    <Users />
                  </div>
                  <h3>Dashboard RH</h3>
                </div>
                <p className="dashboard-item-description">
                  👥 Indicadores de recursos humanos, colaboradores e equipes
                </p>
                <button className="dashboard-item-link">
                  <Users size={16} />
                  Acessar Dashboard
                </button>
              </div>

              <div className="dashboard-item-card">
                <div className="dashboard-item-header">
                  <div className="dashboard-item-icon">
                    <FileText />
                  </div>
                  <h3>Relatórios Financeiros</h3>
                </div>
                <p className="dashboard-item-description">
                  💰 Relatórios financeiros, fluxo de caixa e análises contábeis
                </p>
                <button className="dashboard-item-link">
                  <FileText size={16} />
                  Acessar Relatórios
                </button>
              </div>

              <div className="dashboard-item-card">
                <div className="dashboard-item-header">
                  <div className="dashboard-item-icon">
                    <Settings />
                  </div>
                  <h3>Dashboard Operacional</h3>
                </div>
                <p className="dashboard-item-description">
                  ⚙️ Métricas operacionais, KPIs e indicadores de performance
                </p>
                <button className="dashboard-item-link">
                  <Settings size={16} />
                  Acessar Dashboard
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'resources' && (
          <section className="resources-section">
            <div className="section-header">
              <h2>
                <Briefcase />
                Recursos
              </h2>
              <p>Ferramentas e recursos úteis para o seu trabalho</p>
            </div>

            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">
                  <Calendar />
                </div>
                <h3>Calendário Corporativo</h3>
                <p>Visualize feriados, eventos importantes e reuniões da empresa</p>
                <button className="resource-btn">Acessar Calendário</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <Shield />
                </div>
                <h3>Políticas de Segurança</h3>
                <p>Diretrizes de segurança da informação e boas práticas</p>
                <button className="resource-btn">Ver Políticas</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <Settings />
                </div>
                <h3>Configurações</h3>
                <p>Ajustes de conta, notificações e preferências pessoais</p>
                <button className="resource-btn">Configurar</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <FileText />
                </div>
                <h3>Templates</h3>
                <p>Modelos de documentos, apresentações e relatórios</p>
                <button className="resource-btn">Ver Templates</button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'users' && (
          <section className="admin-section">
            <div style={{padding: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px'}}>
              <h2 style={{color: '#000', marginBottom: '20px'}}>Teste de Renderização</h2>
              <p style={{color: '#333'}}>Se você está vendo este texto, o problema é no componente CadastroColaborador.</p>
            </div>
            <CadastroColaborador 
              onSuccess={() => {
                // Callback opcional após cadastro bem-sucedido
                console.log('Colaborador cadastrado com sucesso!');
              }}
            />
          </section>
        )}

        {activeSection === 'jobs' && (
          <section className="admin-section">
            <div className="section-header">
              <h2>
                <Plus />
                Gerenciar Vagas
              </h2>
              <p>Cadastre novas oportunidades de trabalho</p>
            </div>

            <form onSubmit={handleNewJobSubmit} className="admin-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Título da Vaga *</label>
                  <input
                    type="text"
                    value={newJobForm.titulo}
                    onChange={(e) => setNewJobForm({...newJobForm, titulo: e.target.value})}
                    required
                    placeholder="Ex: Vendedor(a) - Loja Shopping Butantã"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Descrição da Vaga *</label>
                  <textarea
                    value={newJobForm.descricao}
                    onChange={(e) => setNewJobForm({...newJobForm, descricao: e.target.value})}
                    required
                    placeholder="Descreva as principais atividades e responsabilidades da vaga"
                    rows={4}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Requisitos *</label>
                  <textarea
                    value={newJobForm.requisitos}
                    onChange={(e) => setNewJobForm({...newJobForm, requisitos: e.target.value})}
                    required
                    placeholder="Liste os requisitos necessários para a vaga"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Salário</label>
                  <input
                    type="text"
                    value={newJobForm.salario}
                    onChange={(e) => setNewJobForm({...newJobForm, salario: e.target.value})}
                    placeholder="Ex: R$ 1.500,00 + benefícios ou A combinar"
                  />
                </div>

                <div className="form-group">
                  <label>Localização *</label>
                  <input
                    type="text"
                    value={newJobForm.localizacao}
                    onChange={(e) => setNewJobForm({...newJobForm, localizacao: e.target.value})}
                    required
                    placeholder="Ex: São Paulo - SP"
                  />
                </div>

                <div className="form-group">
                  <label>Tipo de Contratação *</label>
                  <select
                    value={newJobForm.tipo}
                    onChange={(e) => setNewJobForm({...newJobForm, tipo: e.target.value})}
                    required
                  >
                    <option value="efetivo">Efetivo</option>
                    <option value="temporario">Temporário</option>
                    <option value="terceirizado">Terceirizado</option>
                    <option value="estagio">Estágio</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <Plus size={18} />
                Cadastrar Vaga
              </button>
            </form>
          </section>
        )}

        {activeSection === 'dashboards' && (
          <section className="admin-section">
            <div className="section-header">
              <h2>
                <BarChart3 />
                Dashboards Administrativos
              </h2>
              <p>Acesse relatórios e dashboards importantes para gestão</p>
            </div>

            <div className="dashboards-grid">
              <div className="dashboard-card">
                <div className="card-icon">
                  <Users size={24} />
                </div>
                <div className="card-content">
                  <h3>Relatório de Colaboradores</h3>
                  <p>Visualize estatísticas e dados dos colaboradores ativos</p>
                  <button className="dashboard-btn">
                    <BarChart3 size={16} />
                    Acessar Dashboard
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">
                  <Briefcase size={24} />
                </div>
                <div className="card-content">
                  <h3>Dashboard de Vagas</h3>
                  <p>Acompanhe métricas de candidaturas e processos seletivos</p>
                  <button className="dashboard-btn">
                    <BarChart3 size={16} />
                    Acessar Dashboard
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">
                  <FileText size={24} />
                </div>
                <div className="card-content">
                  <h3>Relatórios Financeiros</h3>
                  <p>Visualize dados financeiros e métricas de performance</p>
                  <button className="dashboard-btn">
                    <BarChart3 size={16} />
                    Acessar Dashboard
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">
                  <Settings size={24} />
                </div>
                <div className="card-content">
                  <h3>Analytics Operacional</h3>
                  <p>Monitore KPIs e indicadores operacionais em tempo real</p>
                  <button className="dashboard-btn">
                    <BarChart3 size={16} />
                    Acessar Dashboard
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default ColaboradorDashboard;
