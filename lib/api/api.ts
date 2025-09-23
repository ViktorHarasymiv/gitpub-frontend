import axios from 'axios';

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export const hostApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_VERCEL + '/api',
  withCredentials: true,
});
