import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

api.interceptors.request.use((config) => {
  if (!config.url.endsWith('sessions')) {
    const ongData = JSON.parse(localStorage.getItem('ong'));

    if (ongData) {
      config.headers.Authorization = `${ongData.id}`;
    } else {
      window.location.href = '/';
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
