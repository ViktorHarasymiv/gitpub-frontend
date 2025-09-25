import { TasksHttpResponse, NewTask, Task, patchTask } from '@/types/task';
import { FullWeekData, WeekMom, WeekBaby } from '@/types/weeks';
import { User } from '../../types/user';

// INITIAL

import { api, serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';

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
    const response = await api.post('/auth/refresh', {
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
  const cookieStore = await cookies();
  const { data } = await serverApi.get<FullWeekData>('/weeks/current', {
    params: { dueDate },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log(cookieStore);

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
  const cookieStore = await cookies();
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
  const cookieStore = await cookies();
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
  const cookieStore = await cookies();
  const { data } = await serverApi.get<FullWeekData>(`/weeks/${weekNumber}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
