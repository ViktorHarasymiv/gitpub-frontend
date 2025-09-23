import { api } from '@/app/api/api';
import { WeekMom, WeekBaby, FullWeekData } from '@/types/weeks';
import { serverApi } from './api';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
} from '@/types/user';
import { NewTask, patchTask, Task, TasksHttpResponse } from '@/types/task';

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

//===========================WEEKS API==================================

//GET CURRENT WEEK INFO
export const getCurrentWeek = async (
  dueDate: string
): Promise<FullWeekData> => {
  const { data } = await api.get<FullWeekData>('/api/weeks/current', {
    params: { dueDate },
  });
  return data;
};

//GET CURRENT WEEK INFO PUBLIC
export const getCurrentWeekPublic = async (): Promise<FullWeekData> => {
  const { data } = await api.get<FullWeekData>('/api/weeks/current/public');
  return data;
};

//GET CURRENT WEEK MOM INFO
export const getWeekMom = async (weekNumber: number): Promise<WeekMom> => {
  const { data } = await api.get<WeekMom>(`/api/weeks/${weekNumber}/mom`);
  return data;
};

//GET CURRENT WEEK BABY INFO
export const getWeekBaby = async (weekNumber: number): Promise<WeekBaby> => {
  const { data } = await api.get<WeekBaby>(`/api/weeks/${weekNumber}/baby`);
  return data;
};

//GET CURRENT WEEK WITH FUUL INFO (MOM + BABY)
export const getWeekFull = async (
  weekNumber: number
): Promise<FullWeekData> => {
  const { data } = await api.get<FullWeekData>(`/api/weeks/${weekNumber}`);
  return data;
};

//========================TASKS API====================================

// GET TASKS
export const getTasksServer = async (
  page = 1,
  limit = 20,
  status?: 'todo' | 'in_progress' | 'done'
): Promise<TasksHttpResponse> => {
  const { data } = await api.get<TasksHttpResponse>('/tasks', {
    params: { page, limit, status },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// CREATE TASK
export const createTaskServer = async (task: NewTask): Promise<Task> => {
  const { data } = await serverApi.post<Task>('/tasks', task, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// UPDATE TASK
export const updateTaskStatusServer = async (
  id: string,
  patch: patchTask
): Promise<Task> => {
  const { data } = await serverApi.patch<Task>(`/tasks/${id}/status`, patch, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
