/**
 * Configuração da API para desenvolvimento e produção
 */

// URL base da API conforme o ambiente
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rede-alecrim-backend.onrender.com'
  : 'http://localhost:3001';

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
  vagas: `${API_BASE_URL}/vagas`,
  colaboradores: `${API_BASE_URL}/colaboradores`,
  login: `${API_BASE_URL}/colaboradores/login`,
};

/**
 * Exportação da URL base da API
 */
export default API_BASE_URL;
