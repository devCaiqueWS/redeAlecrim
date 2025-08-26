
import React, { useState, useEffect } from 'react';
import { LogOut, User, Calendar, FileText, Users, Briefcase, AlertCircle, UserPlus, Plus, Link, Settings, Edit, Save, X, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CadastroColaborador from './CadastroColaborador';
import { API_ENDPOINTS } from '../config/api';
import './ColaboradorDashboard.css';



const ColaboradorDashboard: React.FC = () => {
  // Estado para criação de aviso
  const [newNotice, setNewNotice] = useState({
    title: '',
    body: '',
    date: ''
  });
  const [creatingNotice, setCreatingNotice] = useState(false);

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingNotice(true);
    try {
      const payload = {
        title: newNotice.title,
        body: newNotice.body,
        date: newNotice.date || new Date().toISOString()
      };
      const response = await fetch('http://localhost:3000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Aviso criado com sucesso!');
        setNewNotice({ title: '', body: '', date: '' });
        setActiveSection('announcements');
      } else {
        alert('Erro ao criar aviso: ' + (result.error || JSON.stringify(result)));
      }
    } catch (error) {
      alert('Erro ao criar aviso. Verifique sua conexão e tente novamente.');
    } finally {
      setCreatingNotice(false);
    }
  };
  const [showCanvaFull, setShowCanvaFull] = useState(false);
  const { colaborador, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');


  // Avisos da API (deve ficar dentro da função do componente)
  const [notices, setNotices] = useState<Array<{
    id: string;
    title: string;
    date: string;
    body: string;
  }>>([]);
  const [loadingNotices, setLoadingNotices] = useState(false);



  React.useEffect(() => {
    if (activeSection !== 'announcements') return;
    const fetchNotices = async () => {
      setLoadingNotices(true);
      try {
        const response = await fetch('http://localhost:3000/api/notices');
        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result.data)) {
            setNotices(result.data);
          } else {
            setNotices([]);
          }
        } else {
          setNotices([]);
        }
      } catch (err) {
        setNotices([]);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchNotices();
  }, [activeSection]);
  const [userData, setUserData] = useState(colaborador);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [newJobForm, setNewJobForm] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    localizacao: '',
    salario: '',
    salario_tipo: 'monthly',
    tipo: 'full-time',
    job_type: 'full_time',
    experiencia: 'entry',
    requisitos: '',
    beneficios: '',
    empresa: '',
    email_candidatura: '',
    expira_em: ''
  });

  // Estado para plataformas
  const [platforms, setPlatforms] = useState<Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    website_url: string;
    logo_url?: string | null;
    is_active?: boolean;
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
      const response = await fetch(`http://localhost:3000${API_ENDPOINTS.platforms}`);
      if (response.ok) {
        const data = await response.json();
        setPlatforms(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error('[PLATAFORMAS] Erro HTTP:', response.status, response.statusText);
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

  function getInitials(name: string) {
    if (!name || typeof name !== 'string') return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  const handleNewJobSubmit = async (e: React.FormEvent) => {
    if (!newJobForm.empresa || newJobForm.empresa.trim() === '') {
      alert('O campo Nome da Empresa é obrigatório.');
      return;
    }
    e.preventDefault();
    // Adapta o payload para o padrão mais comum de APIs brasileiras
    // Se requisitos for string, transforma em array (separado por linha ou vírgula)
    // Monta o payload conforme o modelo fornecido pelo backend
    const payload = {
      title: newJobForm.titulo,
      description: newJobForm.descricao,
      category: newJobForm.categoria,
      location: newJobForm.localizacao,
      salary: Number(newJobForm.salario) || 0,
      salary_type: newJobForm.salario_tipo,
      employment_type: newJobForm.tipo,
      job_type: newJobForm.job_type,
      experience_level: newJobForm.experiencia,
      requirements: newJobForm.requisitos,
      benefits: newJobForm.beneficios,
      company: newJobForm.empresa,
      application_email: newJobForm.email_candidatura,
      expires_at: newJobForm.expira_em ? newJobForm.expira_em : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    };
    // console.log removido
    // console.log removido
    try {
  const response = await fetch(`http://localhost:3000${API_ENDPOINTS.jobs}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Vaga cadastrada com sucesso!');
        setNewJobForm({
          titulo: '',
          descricao: '',
          categoria: '',
          localizacao: '',
          salario: '',
          salario_tipo: 'monthly',
          tipo: 'full-time',
          job_type: 'full_time',
          experiencia: 'entry',
          requisitos: '',
          beneficios: '',
          empresa: '',
          email_candidatura: '',
          expira_em: ''
        });
      } else {
        // Mostra mensagem detalhada do backend para facilitar debug
        let details = '';
        if (result.details && Array.isArray(result.details)) {
          details = '\n' + result.details.map((d: any) => `• ${d.message || JSON.stringify(d)}`).join('\n');
        }
        alert('Erro ao criar vaga: ' + (result.error || JSON.stringify(result)) + details);
        console.error('Erro detalhado da API:', result);
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

  // Função para recarregar dados do usuário após update
  const recarregarDadosUsuario = async () => {
    if (!userData?.id) return;
    setLoadingUserData(true);
    try {
  const response = await fetch(`http://localhost:3000${API_ENDPOINTS.users}/${userData.id}`);
      if (response.ok) {
        const dadosCompletos = await response.json();
        const userRaw = dadosCompletos?.data?.user || dadosCompletos?.data || dadosCompletos.user || dadosCompletos.colaborador || dadosCompletos;
        const user = {
          id: userRaw.id,
          nome: userRaw.nome || userRaw.name || '',
          email: userRaw.email || '',
          cargo: userRaw.funcao || userRaw.cargo || userRaw.role || '',
          departamento: userRaw.setor || userRaw.departamento || '',
          dataAdmissao: userRaw.dataAdmissao || userRaw.data_admissao || userRaw.createdAt || '',
          permissoes: userRaw.permissoes || []
        };
        setUserData(user);
        setProfileForm({
          nome: user.nome,
          email: user.email,
          cargo: user.cargo,
          departamento: user.departamento,
          dataAdmissao: user.dataAdmissao
        });
      }
    } catch (error) {
      // fallback: não faz nada
    } finally {
      setLoadingUserData(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUserData(true);
    try {
      // Envia 'name' além de 'nome' para garantir compatibilidade com backend
      // Envia data_admissao e dataAdmissao para máxima compatibilidade
      const payload = {
        ...profileForm,
        name: profileForm.nome,
        funcao: profileForm.cargo,
        cargo: profileForm.cargo,
        setor: profileForm.departamento,
        departamento: profileForm.departamento,
        data_admissao: profileForm.dataAdmissao,
        dataAdmissao: profileForm.dataAdmissao
      };
      console.log('[PUT PERFIL] Payload enviado:', JSON.stringify(payload, null, 2));
  const response = await fetch(`http://localhost:3000${API_ENDPOINTS.users}/${userData?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let result;
      try {
        result = await response.json();
      } catch (jsonErr) {
        result = { error: 'Resposta não é JSON', raw: await response.text() };
      }
      console.log('[PUT PERFIL] Status:', response.status, response.statusText);
      console.log('[PUT PERFIL] Resposta:', result);
      if (response.ok) {
        // Verifica se a data de admissão foi realmente alterada
        const returned = result?.data || result;
        const dataEnviada = payload.dataAdmissao || payload.data_admissao;
        const dataRetornada = returned.dataAdmissao || returned.data_admissao || returned.createdAt;
        setIsEditingProfile(false);
        if (
          dataEnviada && dataRetornada &&
          new Date(dataEnviada).toISOString().slice(0, 10) !== new Date(dataRetornada).toISOString().slice(0, 10)
        ) {
          alert('Perfil atualizado, mas a data de admissão não pôde ser alterada pelo sistema.');
        } else {
          alert('Perfil atualizado com sucesso!');
        }
        await recarregarDadosUsuario();
      } else {
        alert(result.error || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Verifique sua conexão e tente novamente.');
    } finally {
      setLoadingUserData(false);
    }
  };

  // (Removido useEffect duplicado que sobrescrevia platforms)

  // Carregar equipe sempre que abrir a aba 'team'
  React.useEffect(() => {
    if (activeSection !== 'team') return;
    const fetchEquipe = async () => {
      setLoadingTeam(true);
      try {
  const equipeResponse = await fetch(`http://localhost:3000${API_ENDPOINTS.users}`);
        if (equipeResponse.ok) {
          const equipeData = await equipeResponse.json();
          let users = Array.isArray(equipeData.data) ? equipeData.data : Array.isArray(equipeData) ? equipeData : [];
          const mapped = users.map((user: any) => ({
            id: user.id,
            nome: user.nome || user.name || '',
            email: user.email || '',
            cargo: user.funcao || user.cargo || user.role || '',
            departamento: user.setor || user.departamento || '',
            dataAdmissao: user.dataAdmissao || user.data_admissao || user.createdAt || ''
          }));
          setTeamMembers(mapped);
        }
      } catch (error) {
        console.error('Erro ao carregar equipe:', error);
      } finally {
        setLoadingTeam(false);
      }
    };
    fetchEquipe();
  }, [activeSection]);

  // Carregar dados completos do usuário da API
  React.useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (!colaborador?.id) {
        console.warn('ID do colaborador não definido:', colaborador);
        return;
      }
      setLoadingUserData(true);
      try {
        // console.log removido
  const response = await fetch(`http://localhost:3000${API_ENDPOINTS.users}/${colaborador.id}`);
        // console.log removido
        const dadosCompletos = await response.ok ? await response.json() : null;
        // console.log removido
        if (response.ok && dadosCompletos) {
          // Extrai o usuário do padrão de resposta
          const userRaw = dadosCompletos?.data?.user || dadosCompletos?.data || dadosCompletos.user || dadosCompletos.colaborador || dadosCompletos;
          // Mapeia para o formato esperado pelo dashboard
          const user = {
            id: userRaw.id,
            nome: userRaw.nome || userRaw.name || '',
            email: userRaw.email || '',
            cargo: userRaw.funcao || userRaw.cargo || userRaw.role || '',
            departamento: userRaw.setor || userRaw.departamento || '',
            dataAdmissao: userRaw.dataAdmissao || userRaw.data_admissao || userRaw.createdAt || '',
            permissoes: userRaw.permissoes || []
          };
          setUserData(user);
        } else {
          console.error('Erro ao carregar dados do usuário', response.status, dadosCompletos);
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
              className={`nav-btn ${activeSection === 'createNotice' ? 'active' : ''}`}
              onClick={() => setActiveSection('createNotice')}
            >
              <AlertCircle size={18} />
              Criar Aviso
            </button>
          </nav>

            

          <div className="user-info">
            <div className="user-avatar">
              {getInitials(
                colaborador?.nome
                  ? colaborador.nome
                  : (colaborador as any)?.name || ''
              )}
            </div>
            <div className="user-details">
              <h3>{colaborador?.nome || (colaborador as any)?.name || ''}</h3>
              <p>{colaborador?.cargo}</p>
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
                  <h2>Bem-vindo, {
                    userData?.nome
                      ? userData.nome.split(' ')[0]
                      : (userData && (userData as any).name)
                        ? ((userData as any).name as string).split(' ')[0]
                        : 'Usuário'
                  }! 👋</h2>
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
                  <div className="dashboard-card">
                    <div className="card-header">
                      <div className="card-icon">
                        <AlertCircle />
                      </div>
                      <h3>Avisos</h3>
                    </div>
                    <div className="card-content">
                      <p>Veja comunicados e novidades importantes da empresa.</p>
                      <button
                        className="card-link"
                        onClick={() => setActiveSection('announcements')}
                      >
                        Ver avisos
                        <AlertCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>


              </>
            )}

            {activeSection === 'createNotice' && (
              <section className="admin-section">
                <div className="section-header">
                  <h2>
                    <AlertCircle />
                    Criar Aviso
                  </h2>
                  <p>Cadastre um novo aviso/comunicado para todos os colaboradores</p>
                  <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                    Voltar
                  </button>
                </div>
                <form onSubmit={handleCreateNotice} className="admin-form">
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Título *</label>
                      <input
                        type="text"
                        value={newNotice.title}
                        onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                        required
                        placeholder="Ex: Aviso importante"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Conteúdo *</label>
                      <textarea
                        value={newNotice.body}
                        onChange={e => setNewNotice({ ...newNotice, body: e.target.value })}
                        required
                        placeholder="Digite o conteúdo do aviso"
                        rows={4}
                      />
                    </div>
                    <div className="form-group">
                      <label>Data (opcional)</label>
                      <input
                        type="datetime-local"
                        value={newNotice.date}
                        onChange={e => setNewNotice({ ...newNotice, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <button type="submit" className="submit-btn" disabled={creatingNotice}>
                    <Plus size={18} />
                    {creatingNotice ? 'Criando...' : 'Criar Aviso'}
                  </button>
                </form>
              </section>
            )}

            {activeSection === 'profile' && (
              <section className="profile-section">
                <div className="section-header">
                  <h2>
                    <User />
                    Meu Perfil
                  </h2>
                  <p>Visualize e gerencie suas informações pessoais</p>
                  <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                    Voltar
                  </button>
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
                            <label>Data de Admissão</label>
                            <input
                              type="text"
                              value={profileForm.dataAdmissao ? new Date(profileForm.dataAdmissao).toLocaleDateString('pt-BR') : ''}
                              readOnly
                              disabled
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
                  <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                    Voltar
                  </button>
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
                    {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
                      Object.entries(
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
                              {members.map((member) => {
                                const isAdmin = (member.cargo?.toLowerCase() === 'admin' || member.cargo?.toLowerCase() === 'administrador' || member.cargo?.toLowerCase() === 'administradora');
                                return (
                                  <div
                                    key={member.id}
                                    className={['team-member', isAdmin ? 'admin-member' : ''].join(' ').trim()}
                                  >
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
                                );
                              })}
                            </div>
                          </div>
                        ))
                    ) : (
                      <p>Nenhum colaborador encontrado.</p>
                    )}
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
                  <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                    Voltar
                  </button>
                </div>

                <div className="platforms-grid">
                  {(!Array.isArray(platforms) || platforms.length === 0) ? (
                    <div className="empty-state">
                      <Link size={48} />
                      <h3>Nenhuma plataforma cadastrada</h3>
                      <p>Entre em contato com o administrador para adicionar plataformas.</p>
                    </div>
                  ) : (
                    (Array.isArray(platforms) ? platforms : []).map((platform) => (
                      <div key={platform.id} className="platform-card">
                        <div className="platform-header">
                          <h4>{platform.name}</h4>
                          <span className="platform-category">{platform.category}</span>
                        </div>
                        <p className="platform-description">{platform.description}</p>
                        <a
                          href={platform.website_url}
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
              <>
                {showCanvaFull ? (
                  <section className="dashboards-section" style={{ zIndex: 10, position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
                      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
                        <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', overflow: 'hidden', borderRadius: 8, willChange: 'transform' }}>
                          <iframe
                            loading="lazy"
                            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                            src="https://www.canva.com/design/DAGv4hV5C2g/IyDpdPAizb0ryMKBjThJUQ/view?embed"
                            allowFullScreen
                            allow="fullscreen"
                            title="Apresentação Primeiro Semestre 2025 Rede Alecrim"
                          ></iframe>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowCanvaFull(false)}
                        style={{ marginTop: 24, padding: '10px 24px', borderRadius: 6, background: '#eee', color: '#007C7C', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
                      >
                        Voltar para Dashboards
                      </button>
                    </div>
                  </section>
                ) : (
                  <section className="dashboards-section">
                    <div className="section-header">
                      <h2>
                        <BarChart3 />
                        Dashboards & Relatórios
                      </h2>
                      <p>Acesse painéis de controle, métricas e relatórios da empresa</p>
                      <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                        Voltar
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    </div>
                    <div className="dashboards-grid">
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <BarChart3 />
                        </div>
                        <h3>Dashboards Compras</h3>
                        <hr />
                        <br />
                        <button
                          style={{ margin: '8px 0' }}
                          className="dashboard-item-link"
                        // onClick={() => }
                        >
                          <FileText size={16} />
                          BI Giro de Estoque
                        </button>
                        <button
                          style={{ margin: '8px 0' }}
                          className="dashboard-item-link"
                        // onClick={() => }
                        >
                          <FileText size={16} />
                          BI Valores em estoque
                        </button>
                        <button
                          style={{ margin: '8px 0' }}
                          className="dashboard-item-link"
                        // onClick={() => }
                        >
                          <FileText size={16} />
                          BI Atendimentos
                        </button>
                      </div>
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <BarChart3 />
                        </div>
                        <h3>Dashboards Vendas</h3>
                        <hr />
                        <br />
                        <button
                          className="dashboard-item-link"
                          onClick={() => setShowCanvaFull(true)}
                        >
                          <FileText size={16} />
                          Relatório 1º Semestre 2025
                        </button>
                      </div>
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <Users />
                        </div>
                        <h3>Dashboards RH</h3>
                      </div>
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <Users />
                        </div>
                        <h3>Dashboards VDs</h3>
                        <hr />
                        <br />
                        <button
                          style={{ margin: '8px 0' }}
                          className="dashboard-item-link"
                        // onClick={() => }
                        >
                          <FileText size={16} />
                          Apresentação Dashs HUB
                        </button>
                        <button
                          style={{ margin: '8px 0' }}
                          className="dashboard-item-link"
                        // onClick={() => }
                        >
                          <FileText size={16} />
                          BI Dash HUB
                        </button>
                      </div>
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <FileText />
                        </div>
                        <h3>Dashboards Financeiros</h3>
                      </div>
                      <div className="dashboard-item-card">
                        <div className="dashboard-item-header">
                          <Settings />
                        </div>
                        <h3>Dashboards Operacionais</h3>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}

            {activeSection === 'announcements' && (
              <section className="admin-section">
                <div className="section-header">
                  <h2>
                    <AlertCircle />
                    Avisos e Comunicados
                  </h2>
                  <p>Veja comunicados e novidades importantes da empresa</p>
                  <button className="edit-profile-btn" onClick={() => setActiveSection('dashboard')}>
                    Voltar
                  </button>
                </div>
                {loadingNotices ? (
                  <p>Carregando avisos...</p>
                ) : notices.length === 0 ? (
                  <p>Nenhum aviso disponível.</p>
                ) : (
                  notices.map(aviso => (
                    <div className="announcement-item" key={aviso.id}>
                      <div className="announcement-header">
                        <h3 className="announcement-title">{aviso.title}</h3>
                        <span className="announcement-date">{new Date(aviso.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p className="announcement-content">{aviso.body}</p>
                    </div>
                  ))
                )}
              </section>
            )}

            {activeSection === 'users' && (
              <section className="admin-section">
                <CadastroColaborador
                  onSuccess={() => {
                    // Callback opcional após cadastro bem-sucedido
                    // console.log removido
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
                        onChange={(e) => setNewJobForm({ ...newJobForm, titulo: e.target.value })}
                        required
                        placeholder="Ex: Vendedor(a) - Loja Shopping Butantã"
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoria *</label>
                      <input
                        type="text"
                        value={newJobForm.categoria}
                        onChange={(e) => setNewJobForm({ ...newJobForm, categoria: e.target.value })}
                        required
                        placeholder="Ex: Vendas, Atendimento, etc."
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Descrição da Vaga *</label>
                      <textarea
                        value={newJobForm.descricao}
                        onChange={(e) => setNewJobForm({ ...newJobForm, descricao: e.target.value })}
                        required
                        placeholder="Descreva as principais atividades e responsabilidades da vaga"
                        rows={4}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Requisitos *</label>
                      <textarea
                        value={newJobForm.requisitos}
                        onChange={(e) => setNewJobForm({ ...newJobForm, requisitos: e.target.value })}
                        required
                        placeholder="Liste os requisitos necessários para a vaga"
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label>Salário *</label>
                      <input
                        type="number"
                        value={newJobForm.salario}
                        onChange={(e) => setNewJobForm({ ...newJobForm, salario: e.target.value })}
                        required
                        placeholder="Ex: 1500"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tipo de Salário *</label>
                      <select
                        value={newJobForm.salario_tipo}
                        onChange={(e) => setNewJobForm({ ...newJobForm, salario_tipo: e.target.value })}
                        required
                      >
                        <option value="hourly">Por hora</option>
                        <option value="monthly">Mensal</option>
                        <option value="yearly">Anual</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Localização *</label>
                      <input
                        type="text"
                        value={newJobForm.localizacao}
                        onChange={(e) => setNewJobForm({ ...newJobForm, localizacao: e.target.value })}
                        required
                        placeholder="Ex: São Paulo - SP"
                      />
                    </div>

                    <div className="form-group">
                      <label>Tipo de Contratação *</label>
                      <select
                        value={newJobForm.tipo}
                        onChange={(e) => setNewJobForm({ ...newJobForm, tipo: e.target.value })}
                        required
                      >
                        <option value="full-time">Efetivo</option>
                        <option value="part-time">Meio Período</option>
                        <option value="temporary">Temporário</option>
                        <option value="internship">Estágio</option>
                        <option value="freelancer">Freelancer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nível de Experiência *</label>
                      <select
                        value={newJobForm.experiencia}
                        onChange={(e) => setNewJobForm({ ...newJobForm, experiencia: e.target.value })}
                        required
                      >
                        <option value="entry">Júnior</option>
                        <option value="mid">Pleno</option>
                        <option value="senior">Sênior</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label>Benefícios *</label>
                      <input
                        type="text"
                        value={newJobForm.beneficios}
                        onChange={(e) => setNewJobForm({ ...newJobForm, beneficios: e.target.value })}
                        required
                        placeholder="Ex: Vale transporte, VR, Plano de saúde"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Nome da Empresa *</label>
                      <input
                        type="text"
                        value={newJobForm.empresa}
                        onChange={(e) => setNewJobForm({ ...newJobForm, empresa: e.target.value })}
                        required
                        placeholder="Ex: Rede Alecrim"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Email para Candidatura *</label>
                      <input
                        type="email"
                        value={newJobForm.email_candidatura}
                        onChange={(e) => setNewJobForm({ ...newJobForm, email_candidatura: e.target.value })}
                        required
                        placeholder="Ex: rh@empresa.com"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Data de Expiração *</label>
                      <input
                        type="date"
                        value={newJobForm.expira_em}
                        onChange={(e) => setNewJobForm({ ...newJobForm, expira_em: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn">
                    <Plus size={18} />
                    Cadastrar Vaga
                  </button>
                </form>
              </section>
            )}


          </>
        )}
      </div>

    </div>
  );
}

export default ColaboradorDashboard;
