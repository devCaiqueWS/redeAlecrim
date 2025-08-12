import React from 'react';
import { LogOut, User, Calendar, FileText, Users, Briefcase, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './ColaboradorDashboard.css';

const ColaboradorDashboard: React.FC = () => {
  const { colaborador, logout } = useAuth();

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

  if (!colaborador) return null;

  return (
    <div className="dashboard-container">
      {/* Header do Dashboard */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Área dos Colaboradores</h1>
          
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
      <div className="dashboard-content">
        {/* Seção de Boas-vindas */}
        <section className="welcome-section">
          <h2>Bem-vindo, {colaborador.nome.split(' ')[0]}! 👋</h2>
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
              <button className="card-link">
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
              <button className="card-link">
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
              <button className="card-link">
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
              <button className="card-link">
                Ver recursos
                <Briefcase size={16} />
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
      </div>
    </div>
  );
};

export default ColaboradorDashboard;
