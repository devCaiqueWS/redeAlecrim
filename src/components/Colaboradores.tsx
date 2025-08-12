import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import './Colaboradores.css';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ToastContainer';
import LoadingSpinner from './LoadingSpinner';
import ColaboradorDashboard from './ColaboradorDashboard';

const Colaboradores: React.FC = () => {
  const { isAuthenticated, loading, login } = useAuth();
  const { toasts, showSuccess, showError, removeToast } = useToast();
  
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.senha) {
      showError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await login(loginData);
      
      if (result.success) {
        showSuccess('Login realizado com sucesso! Bem-vindo(a)!');
        // Limpar formulário
        setLoginData({ email: '', senha: '' });
      } else {
        showError(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      showError('Erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Loading da verificação inicial de autenticação
  if (loading) {
    return <LoadingSpinner fullScreen message="Verificando autenticação..." />;
  }

  // Se já está autenticado, mostra o dashboard
  if (isAuthenticated) {
    return <ColaboradorDashboard />;
  }

  // Formulário de login
  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
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
                  <label htmlFor="email">
                    <Mail size={18} />
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu e-mail corporativo"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="senha">
                    <Lock size={18} />
                    Senha
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="senha"
                      name="senha"
                      value={loginData.senha}
                      onChange={handleInputChange}
                      placeholder="Digite sua senha"
                      required
                      disabled={isSubmitting}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary login-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="small" message="" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </form>
            </div>

            <div className="login-help">
              <p>Problemas para acessar? Entre em contato com o suporte:</p>
              <p><strong>E-mail:</strong> suporte.bi@redealecrim.com.br</p>
              <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Colaboradores;
