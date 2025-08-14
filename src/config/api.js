/**
 * Configuração da API para desenvolvimento e produção
 */

// URL base da API conforme o ambiente
// Permite forçar produção com REACT_APP_USE_PROD_API=true
const API_BASE_URL = process.env.REACT_APP_USE_PROD_API === 'true' 
  ? 'https://rede-alecrim-backend.onrender.com'
  : process.env.NODE_ENV === 'production' 
    ? 'https://rede-alecrim-backend.onrender.com'
    : 'http://localhost:3001';

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
  vagas: `${API_BASE_URL}/vagas`,
  colaboradores: `${API_BASE_URL}/colaboradores`,
  login: `${API_BASE_URL}/colaboradores/login`,
};

/**
 * Exportação da URL base da API
 */
export default API_BASE_URL;
