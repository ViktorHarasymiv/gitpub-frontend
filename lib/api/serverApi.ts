import { NewTask, patchTask, Task } from '@/types/task';
import { User } from '../../types/user';
import { CurrentWeekDetailed } from '../../types/week';

// INITIAL

import { serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

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

// PATCH ME

export const editProfile = async (data: FormData) => {
  const cookieStore = await cookies();
  const res = await serverApi.patch('/users', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
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

// GET

export const getServerAllTasks = async (
  page: number
): Promise<TasksHttpResponse> => {
  const PARAMS = new URLSearchParams({
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await serverApi.get('/task', {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// POST

export const createServerTask = async (newTask: NewTask): Promise<Task> => {
  const cookieStore = await cookies();
  const response = await serverApi.post('/task', newTask, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// PATCH

export const patchActiveTask = async (id: string, payload: patchTask) => {
  const cookieStore = await cookies();
  const res = await serverApi.patch(`/task/${id}`, payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};


export const getWeekCurrentPublic = async (): Promise<CurrentWeekDetailed> => {
  const { data } = await serverApi.get<CurrentWeekDetailed>('/weeks/current/public');
  return data;
};

export const getWeekCurrentPrivate = async (): Promise<CurrentWeekDetailed> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<CurrentWeekDetailed>('/weeks/current', {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });
  return data;
}
