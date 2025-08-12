import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { buildApiUrl } from '../config/api.js';

// Interface para dados do colaborador
export interface Colaborador {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  telefone?: string;
  avatar?: string;
  permissoes: string[];
}

// Interface para dados de login
export interface LoginCredentials {
  email: string;
  senha: string;
}

// Interface do contexto de autenticação
interface AuthContextData {
  isAuthenticated: boolean;
  colaborador: Colaborador | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  updateProfile: (data: Partial<Colaborador>) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há token salvo no localStorage ao inicializar
  useEffect(() => {
    checkAuth();
  }, []);

  // Função para verificar autenticação
  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('auth_token');
      const colaboradorData = localStorage.getItem('colaborador_data');
      
      if (!token || !colaboradorData) {
        setLoading(false);
        return false;
      }

      // Verificar se token ainda é válido
      const response = await fetch(buildApiUrl('/colaboradores/verify'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setColaborador(data.colaborador);
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      } else {
        // Token inválido, limpar dados
        localStorage.removeItem('auth_token');
        localStorage.removeItem('colaborador_data');
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao verificar autenticação:', error);
      setLoading(false);
      return false;
    }
  };

  // Função de login
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const response = await fetch(buildApiUrl('/colaboradores/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token e dados do colaborador
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('colaborador_data', JSON.stringify(data.colaborador));
        localStorage.setItem('login_timestamp', Date.now().toString());
        
        setColaborador(data.colaborador);
        setIsAuthenticated(true);
        setLoading(false);
        
        console.log('✅ Login realizado com sucesso:', data.colaborador.nome);
        
        return { success: true };
      } else {
        setLoading(false);
        return { 
          success: false, 
          error: data.error || 'Credenciais inválidas' 
        };
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      return { 
        success: false, 
        error: 'Erro de conexão. Verifique sua internet.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    // Limpar dados locais
    localStorage.removeItem('auth_token');
    localStorage.removeItem('colaborador_data');
    localStorage.removeItem('login_timestamp');
    
    // Resetar estado
    setIsAuthenticated(false);
    setColaborador(null);
    
    console.log('👋 Logout realizado');
  };

  // Função para atualizar perfil
  const updateProfile = (data: Partial<Colaborador>) => {
    if (colaborador) {
      const updatedColaborador = { ...colaborador, ...data };
      setColaborador(updatedColaborador);
      localStorage.setItem('colaborador_data', JSON.stringify(updatedColaborador));
    }
  };

  const value: AuthContextData = {
    isAuthenticated,
    colaborador,
    loading,
    login,
    logout,
    checkAuth,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
