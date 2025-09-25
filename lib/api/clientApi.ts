import { api, serverApi } from './api';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
} from '@/types/user';

import { 
    Journey, 
    JourneyMom, 
    JourneyBaby 
} from '@/types/journey';

// REGISTER

export const register = async (data: RegisterRequest) => {
  const res = await serverApi.post<User>('/auth/register', data);
  return res.data;
};

// LOGIN

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await serverApi.post('/auth/logout');
};

// AUTH ME

export const getMe = async (): Promise<User> => {
  const { data } = await serverApi.get('/users/me', {
    withCredentials: true,
  });

  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session', {
    withCredentials: true,
  });

  console.log('Session response:', res.data);

  return res.data.success;
};

export const fetchCurrentWeek = async() => {
    const response = await api.get<Journey>(`/weeks/current`);
    return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTab = async (
    weekNumber: number,
    activeTab: string,
) => {
    const res = await serverApi.get<JourneyBaby | JourneyMom>(`/weeks/${weekNumber}/${activeTab}`);
    return res.data;
};