import React, { useState } from 'react';
import './Colaboradores.css';

const Colaboradores: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setIsAuthenticated(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isAuthenticated) {
    return (
      <section className="colaboradores-login fade-in">
        <div className="container">
          <div className="login-wrapper">
            <div className="login-header">
              <h1 className="section-title">Área dos Colaboradores</h1>
              <p className="section-subtitle">
                Faça login para acessar informações exclusivas, benefícios e recursos internos.
              </p>
            </div>

            <div className="login-form-container">
              <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu e-mail corporativo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-login">
                  Entrar
                </button>

                <div className="login-help">
                  <a href="#esqueci-senha" className="forgot-password">
                    Esqueci minha senha
                  </a>
                  <p className="login-note">
                    Não possui acesso? Entre em contato com o RH.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="colaboradores-dashboard fade-in">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="section-title">Bem-vindo(a), Colaborador!</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="btn btn-outline btn-logout"
          >
            Sair
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h3>Holerites</h3>
            <p>Consulte e baixe seus comprovantes de pagamento</p>
            <a href="#holerites" className="btn btn-primary btn-sm">Acessar</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎯</div>
            <h3>Metas e Resultados</h3>
            <p>Acompanhe suas metas e performance</p>
            <a href="#metas" className="btn btn-primary btn-sm">Acessar</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>Treinamentos</h3>
            <p>Cursos disponíveis e certificações</p>
            <a href="#treinamentos" className="btn btn-primary btn-sm">Acessar</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎁</div>
            <h3>Benefícios</h3>
            <p>Consulte seus benefícios e vantagens</p>
            <a href="#beneficios" className="btn btn-primary btn-sm">Acessar</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📅</div>
            <h3>Agenda</h3>
            <p>Eventos, reuniões e datas importantes</p>
            <a href="#agenda" className="btn btn-primary btn-sm">Acessar</a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📞</div>
            <h3>Contatos Internos</h3>
            <p>Lista telefônica e e-mails da empresa</p>
            <a href="#contatos" className="btn btn-primary btn-sm">Acessar</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Colaboradores;
