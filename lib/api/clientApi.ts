import { serverApi, vercelApi } from './api';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
} from '@/types/user';

// REGISTER

export const register = async (data: RegisterRequest) => {
  const res = await vercelApi.post<User>('/auth/register', data);
  return res.data;
};

// LOGIN

export const login = async (data: LoginRequest) => {
  const res = await vercelApi.post<User>('/auth/login', data);
  return res.data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await vercelApi.post('/auth/logout');
};

// AUTH ME

export const getMe = async (): Promise<User> => {
  const { data } = await vercelApi.get('/users/me', {
    withCredentials: true,
  });

  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  const res = await vercelApi.get<CheckSessionRequest>('/auth/session', {
    withCredentials: true,
  });

  console.log('Session response:', res.data);

  return res.data.success;
};
