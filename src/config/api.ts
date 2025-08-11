// Configuração da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rede-alecrim-api.railway.app'  // URL do Railway (será atualizada após deploy)
  : 'http://localhost:3001';

export { API_BASE_URL };
