import { User } from '../../types/user';

// INITIAL

import { serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';

// PRIVAT USER

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) throw new Error('Unauthorized');

  const { data } = await serverApi.get('/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

// CHECK SESSION

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await serverApi.get('/auth/refresh', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};
