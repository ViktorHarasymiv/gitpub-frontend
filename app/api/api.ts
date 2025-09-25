import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BEKEND_ORIGIN,
  // baseURL: 'http://localhost:4000',
  withCredentials: true,
});
