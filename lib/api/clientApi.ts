import nextServer from './api';

import type {
  User,
  RegisterRequest,
  LoginRequest,
  CheckSessionRequest,
} from '../../types/user.ts';

//register

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

//login

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

//checkSession

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

//logout

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
