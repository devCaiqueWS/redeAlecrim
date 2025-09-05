import axios from 'axios';

/**
 * Configuração da API para desenvolvimento e produção
 * SEMPRE usa a API de produção no Render
 */

// URL base da API - FIXO para produção
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Função utilitária para construir URLs da API
 */
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

/**
 * Endpoints específicos da API
 */
export const API_ENDPOINTS = {
  // Vagas/Jobs
  jobs: `${API_BASE_URL}/jobs`,
  vagas: `${API_BASE_URL}/jobs`, // Compatibilidade com código antigo
  
  // Usuários/Colaboradores
  users: `${API_BASE_URL}/users`,
  colaboradores: `${API_BASE_URL}/users`, // Compatibilidade com código antigo
  
  // Autenticação
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  
  // Plataformas
  platforms: `${API_BASE_URL}/platforms`,
  
  // Aplicações/Currículos
  applications: `${API_BASE_URL}/applications`,
  
  // Admin
  admin: {
    jobs: `${API_BASE_URL}/admin/jobs`,
    users: `${API_BASE_URL}/admin/users`,
    platforms: `${API_BASE_URL}/admin/platforms`,
    applications: `${API_BASE_URL}/admin/applications`,
    dashboard: `${API_BASE_URL}/admin/dashboard`,
    stats: `${API_BASE_URL}/admin/stats`,
  }
};

/**
 * Função para criar headers autenticados
 * @returns Headers com token de autorização se disponível
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;

/**
 * Exportação da URL base da API
 */
export { API_BASE_URL };
