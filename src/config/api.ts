/**
 * Configuração da API para desenvolvimento e produção
 * SEMPRE usa a API de produção no Render
 */

// URL base da API - FIXO para produção
const API_BASE_URL = 'https://rede-alecrim-backend.onrender.com';

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
