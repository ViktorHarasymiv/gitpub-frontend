import { NewTask, patchTask, Task } from '@/types/task';
import { serverApi } from './api';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
  UserResponse,
} from '@/types/user';

import { 
    Journey, 
    JourneyMom, 
    JourneyBaby 
} from '@/types/journey';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

// REGISTER

export const register = async (data: RegisterRequest) => {
  const res = await serverApi.post<User>('/auth/register', data);
  return res.data;
};

// LOGIN

export const login = async (data: LoginRequest) => {
  const res = await serverApi.post<User>('/auth/login', data);
  return res.data;
};

// PATCH

export const editProfile = async (data: FormData) => {
  const res = await serverApi.patch<UserResponse>('/users', data);
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
  const res = await serverApi.get<CheckSessionRequest>('/auth/session', {
    withCredentials: true,
  });

  console.log('Session response:', res.data);

  return res.data.success;
};

export const fetchCurrentWeek = async() => {
    const response = await serverApi.get<Journey>(`/weeks/current`);
    return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTab = async (
    weekNumber: number,
    activeTab: string,
) => {
    const res = await serverApi.get<JourneyBaby | JourneyMom>(`/weeks/${weekNumber}/${activeTab}`);
    return res.data;
};
// GET

export const getAllTasks = async (page: number): Promise<TasksHttpResponse> => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });

  const response = await serverApi.get<TasksHttpResponse>('/task', {
    params: PARAMS,
  });

  return response.data;
};

// POST

export const createTask = async (newTask: NewTask): Promise<Task> => {
  const response = await serverApi.post('/task', newTask);
  return response.data;
};

// PATCH

export const patchActiveTask = async (id: string, payload: patchTask) => {
  const res = await serverApi.patch<TasksHttpResponse>(`/task/${id}`, payload);
  return res.data;
};
