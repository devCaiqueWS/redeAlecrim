

/**
 * Configuração da API para produção
 * Sempre usa a API de produção no Render
 */

// URL base da API - FIXO para produção
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Função utilitária para construir URLs da API
 * @param endpoint - O endpoint a ser anexado à URL base
 * @returns A URL completa da API
 */
export function buildApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

/**
 * Endpoints específicos da API
 */
export const API_ENDPOINTS = {
  // Autenticação
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,

  // Usuários
  users: `${API_BASE_URL}/users`,
  userById: (id: string|number) => `${API_BASE_URL}/users/${id}`,
  userProfile: `${API_BASE_URL}/users/profile`,

  // Empregos (Jobs)
  jobs: `${API_BASE_URL}/jobs`,
  jobById: (id: string|number) => `${API_BASE_URL}/jobs/${id}`,
  jobsByCategory: (category: string) => `${API_BASE_URL}/jobs/category/${category}`,
  jobsFeatured: `${API_BASE_URL}/jobs/featured`,
  jobsCategories: `${API_BASE_URL}/jobs/categories`,
  jobsLocations: `${API_BASE_URL}/jobs/locations`,
  jobsSearch: (q: string) => `${API_BASE_URL}/jobs/search?q=${encodeURIComponent(q)}`,

  // Plataformas
  platforms: `${API_BASE_URL}/platforms`,
  platformById: (id: string|number) => `${API_BASE_URL}/platforms/${id}`,
  platformsByCategory: (category: string) => `${API_BASE_URL}/platforms/category/${category}`,
  platformsFeatured: `${API_BASE_URL}/platforms/featured`,
  platformsCategories: `${API_BASE_URL}/platforms/categories`,
  platformsTags: `${API_BASE_URL}/platforms/tags`,
  platformsSearch: (q: string) => `${API_BASE_URL}/platforms/search?q=${encodeURIComponent(q)}`,
  platformRating: (id: string|number) => `${API_BASE_URL}/platforms/${id}/rating`,

  // Candidaturas (Applications)
  applications: `${API_BASE_URL}/applications`,
  applicationById: (id: string|number) => `${API_BASE_URL}/applications/${id}`,
  applicationStatus: (id: string|number) => `${API_BASE_URL}/applications/${id}/status`,

  // Avisos (Notices)
  notices: `${API_BASE_URL}/notices`,
  noticesById: (id: string|number) => `${API_BASE_URL}/notices/${id}`,
  createNotice: `${API_BASE_URL}/notices`,
  updateNotice: (id: string|number) => `${API_BASE_URL}/notices/${id}`,
  deleteNotice: (id: string|number) => `${API_BASE_URL}/notices/${id}`,

  // Compatibilidade com código antigo
  vagas: `${API_BASE_URL}/jobs`,
  colaboradores: `${API_BASE_URL}/users`,
};



import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

/**
 * Exportação da URL base da API
 */
export { API_BASE_URL };
