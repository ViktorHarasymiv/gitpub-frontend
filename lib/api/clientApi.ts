import { nextServer } from './api';
import { DiaryEntry, NewDiaryData } from '@/types/diary';

export interface FetchDiaryResponse {
  data: DiaryEntry[];
}

export async function fetchDiary() {
  const resp = await nextServer.get<FetchDiaryResponse>('/diaries', {});

  return resp.data;
}

export async function createDiary(newDiary: NewDiaryData) {
  const resp = await nextServer.post<DiaryEntry>('/diaries', newDiary);
  return resp.data;
}

export async function deleteDiary(_id: string) {
  const resp = await nextServer.delete<DiaryEntry>(`/diaries/${_id}`);
  return resp.data;
}
