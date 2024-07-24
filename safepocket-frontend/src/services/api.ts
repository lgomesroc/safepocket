import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base do backend
});

export const loginUser = (data: { email: string; password: string }) => api.post('/login', data);
// Adicione outras funções conforme necessário
