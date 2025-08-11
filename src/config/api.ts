// Configuração da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rede-alecrim-backend.onrender.com'  // URL do Render em produção
  : 'http://localhost:3001';  // URL local para desenvolvimento

export { API_BASE_URL };
