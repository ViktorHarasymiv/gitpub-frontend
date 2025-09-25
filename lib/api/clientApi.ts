import { NewTask, patchTask, Task } from '@/types/task';
import {
  RegisterRequest,
  User,
  CheckSessionRequest,
  LoginRequest,
  UserResponse,
} from '@/types/user';

import { serverApi } from './api';
import { DiaryEntry, NewDiaryData } from '@/types/diary';

export interface FetchDiaryResponse {
  data: DiaryEntry[];
}

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

//diary CRUD

export async function fetchDiary() {
  const resp = await serverApi.get<FetchDiaryResponse>('/diaries', {});

  return resp.data;
}

export async function createDiary(newDiary: NewDiaryData) {
  const resp = await serverApi.post<DiaryEntry>('/diaries', newDiary);
  return resp.data;
}

export async function deleteDiary(_id: string) {
  const resp = await serverApi.delete<DiaryEntry>(`/diaries/${_id}`);
  return resp.data;
}
