import { User } from '../../types/user';

// INITIAL

import { api, serverApi } from './api';

// COOKIES

import { cookies } from 'next/headers';

// TYPES

import { Journey, JourneyMom, JourneyBaby } from "@/types/journey";

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


export const fetchCurrentWeekServer = async() => {
    const cookieStore = await cookies();
    const response = await serverApi.get<Journey>('/weeks/current',
        {
        headers: {
            Cookie: cookieStore.toString(),
        },
});
    return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTabServer = async (
    weekNumber: number,
    activeTab: string = "baby",
) => {
    const cookieStore = await cookies();
    const res = await serverApi.get<JourneyBaby | JourneyMom>(`/weeks/journej/${weekNumber}/${activeTab}`,
        {
        headers: {
            Cookie: cookieStore.toString(),
        },
});
    return res.data;
};