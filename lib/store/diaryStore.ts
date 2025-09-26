import { create } from 'zustand';

import { DiaryEntry } from '../../types/diary';
import { getDiaries } from '../api/clientApi';

type DiaryStore = {
  diaries: DiaryEntry[];
  fetchDiaries: () => Promise<void>;
  setDiaries: (entries: DiaryEntry[]) => void;
};

export const useDiaryStore = create<DiaryStore>(set => ({
  diaries: [],
  setDiaries: entries => set({ diaries: entries }),
  fetchDiaries: async () => {
    const { data } = await getDiaries();
    set({ diaries: data });
  },
}));
