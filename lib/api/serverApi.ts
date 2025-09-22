import { cookies } from 'next/headers';
import { nextServer } from './api';
import { NewDiaryData } from '@/types/diary';
import { FetchDiaryResponse } from './clientApi';

export async function fetchDiary() {
  const cookieStore = await cookies();

  const resp = await nextServer.get<FetchDiaryResponse>('/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return resp.data;
}

export async function createDiary(newDiary: NewDiaryData) {
  const cookieStore = await cookies();

  const resp = await nextServer.post('/diaries', newDiary, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return resp.data;
}
