import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { API_ENDPOINTS } from '../config/api';

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
  needsPasswordChange: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string; needsPasswordChange?: boolean }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  updateProfile: (data: Partial<Colaborador>) => void;
  setPasswordChanged: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);

  // Função para mapear dados do usuário para o formato Colaborador
  function mapUserToColaborador(userRaw: any): Colaborador {
    return {
      id: userRaw.id || userRaw._id || 0,
      nome: userRaw.nome || userRaw.name || '',
      email: userRaw.email || '',
      cargo: userRaw.role || userRaw.funcao || userRaw.cargo || '',
      departamento: userRaw.setor || userRaw.departamento || '',
      dataAdmissao: userRaw.dataAdmissao || userRaw.data_admissao || userRaw.createdAt || '',
      telefone: userRaw.telefone || '',
      avatar: userRaw.avatar || '',
      permissoes: userRaw.permissoes || []
    };
  }

  // Função para verificar autenticação (sem token)
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const colaboradorData = localStorage.getItem('colaborador_data');
      if (!colaboradorData) {
        setLoading(false);
        return false;
      }
      const colaboradorParsed = JSON.parse(colaboradorData);
      const colaboradorMapped = mapUserToColaborador(colaboradorParsed);
      setColaborador(colaboradorMapped);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } catch (error) {
      localStorage.removeItem('colaborador_data');
      setLoading(false);
      return false;
    }
  }, []);

  // Verificar se há token salvo no localStorage ao inicializar
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Função de login
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string; needsPasswordChange?: boolean }> => {
    try {
      setLoading(true);
      
      // Verificar se está usando a senha padrão
      const isDefaultPassword = credentials.senha === 'Alecrim@25';
      
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.senha
        })
      });
      const data = await response.json();
      if (response.ok) {
        // Novo padrão: data.data.user
        const userRaw = data?.data?.user || data.user || data.colaborador || data;
        const colaboradorMapped = mapUserToColaborador(userRaw);
        localStorage.setItem('colaborador_data', JSON.stringify(colaboradorMapped));
        setColaborador(colaboradorMapped);
        setIsAuthenticated(true);
        
        // Se está usando senha padrão, marcar para alteração obrigatória
        if (isDefaultPassword) {
          setNeedsPasswordChange(true);
          setLoading(false);
          return { 
            success: true, 
            needsPasswordChange: true 
          };
        }
        
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { 
          success: false, 
          error: data.error || 'Credenciais inválidas' 
        };
      }
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: 'Erro de conexão. Verifique sua internet.' 
      };
    }
  };

  // Função de logout
  const logout = () => {
    // Limpar apenas os dados do colaborador
    localStorage.removeItem('colaborador_data');
    setIsAuthenticated(false);
    setColaborador(null);
    setNeedsPasswordChange(false);
    setLoading(false);
  };

  // Função para marcar que a senha foi alterada
  const setPasswordChanged = () => {
    setNeedsPasswordChange(false);
  };

  // Função para atualizar perfil
  const updateProfile = (data: Partial<Colaborador>) => {
    if (colaborador) {
      const updatedColaborador = { ...colaborador, ...data };
      const mapped = mapUserToColaborador(updatedColaborador);
      setColaborador(mapped);
      localStorage.setItem('colaborador_data', JSON.stringify(mapped));
    }
  };

  const value: AuthContextData = {
    isAuthenticated,
    colaborador,
    loading,
    needsPasswordChange,
    login,
    logout,
    checkAuth,
    updateProfile,
    setPasswordChanged
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
