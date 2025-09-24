import axios from 'axios';

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN + '/api',
//   withCredentials: true,
// });
