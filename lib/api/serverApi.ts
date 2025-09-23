import { User } from '../../types/user';

// INITIAL

import { serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';
import { FullWeekData, WeekBaby, WeekMom } from '@/types/weeks';
import { NewTask, patchTask, Task, TasksHttpResponse } from '@/types/task';

// PRIVAT USER

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  try {
    const cookieStore = await cookies();
    const response = await serverApi.post('/auth/refresh', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response;
  } catch (error: unknown) {
    console.error(
      'Session refresh failed:',
      error instanceof Error ? error.message : error
    );
    return null;
  }
};

//====================WeeksApi===================================

//GET CURRENT WEEK INFO

export const getCurrentWeekServer = async (
  dueDate: string
): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>('/weeks/current', {
    params: { dueDate },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//GET CURRENT WEEK INFO PUBLIC

export const getCurrentWeekPublicServer = async (): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>('/weeks/current/public');
  return data;
};

//GET CURRENT WEEK MOM INFO

export const getWeekMomServer = async (
  weekNumber: number
): Promise<WeekMom> => {
  const { data } = await serverApi.get<WeekMom>(`/weeks/${weekNumber}/mom`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//GET CURRENT WEEK BABY INFO

export const getWeekBabyServer = async (
  weekNumber: number
): Promise<WeekBaby> => {
  const { data } = await serverApi.get<WeekBaby>(`/weeks/${weekNumber}/baby`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//GET CURRENT WEEK WITH FUUL INFO (MOM + BABY)

export const getWeekFullServer = async (
  weekNumber: number
): Promise<FullWeekData> => {
  const { data } = await serverApi.get<FullWeekData>(`/weeks/${weekNumber}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

//========================TASKS API====================================

// GET TASKS
export const getAllTasksServer = async (
  page = 1,
  limit = 20,
  status?: 'todo' | 'in_progress' | 'done'
): Promise<TasksHttpResponse> => {
  const { data } = await serverApi.get<TasksHttpResponse>('/tasks', {
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
export const patchActiveTaskServer = async (
  id: string,
  patch: patchTask
): Promise<Task> => {
  const { data } = await serverApi.patch<Task>(`/tasks/${id}/status`, patch, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
