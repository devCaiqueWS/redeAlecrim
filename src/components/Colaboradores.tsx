import React, { useState } from 'react';
import './Colaboradores.css';
import { buildApiUrl } from '../config/api.js';

const Colaboradores: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colaborador, setColaborador] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = buildApiUrl('/colaboradores/login');
      console.log('🔐 Fazendo login em:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsAuthenticated(true);
        setColaborador(data.colaborador);
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setColaborador(null);
    setLoginData({ email: '', senha: '' });
    setError('');
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
                {error && (
                  <div className="error-message" style={{ 
                    color: 'red', 
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '4px',
                    border: '1px solid #ff6b6b'
                  }}>
                    {error}
                  </div>
                )}
                
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
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={loginData.senha}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-login" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="login-help">
                  <a href="#esqueci-senha" className="forgot-password">
                    Esqueci minha senha
                  </a>
                  <p className="login-note">
                    Não possui acesso? Entre em contato com o RH.
                  </p>
                  <p className="demo-credentials" style={{
                    marginTop: '1rem',
                    padding: '0.5rem',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}>
                    <strong>Credenciais de teste:</strong><br/>
                    E-mail: adm@redealecrim.com<br/>
                    Senha: 123456
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
          <h1 className="section-title">Bem-vindo(a), {colaborador?.nome || 'Colaborador'}!</h1>
          <div className="user-info">
            <p><strong>E-mail:</strong> {colaborador?.email}</p>
            <p><strong>Cargo:</strong> {colaborador?.cargo}</p>
            <p><strong>Departamento:</strong> {colaborador?.departamento}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline btn-logout"
          >
            Sair
          </button>
        </div>

        <div className="dashboard-grid">
          

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
