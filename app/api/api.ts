import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://gitpub-backend-qq3d.onrender.com',
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});
