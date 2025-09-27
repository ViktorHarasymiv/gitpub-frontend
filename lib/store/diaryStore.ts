import { create } from 'zustand';
import { DiaryEntry } from '../../types/diary';
import { getDiaries } from '../api/clientApi';

type DiaryStore = {
  diaries: DiaryEntry[];
  selectedDiary: DiaryEntry | null;
  setSelectedDiary: (entry: DiaryEntry | null) => void;
  fetchDiaries: () => Promise<void>;
  setDiaries: (entries: DiaryEntry[]) => void;
};

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  diaries: [],
  selectedDiary: null,
  setSelectedDiary: entry => set({ selectedDiary: entry }),
  setDiaries: entries => set({ diaries: entries }),
  fetchDiaries: async () => {
    const { data } = await getDiaries();
    set({
      diaries: data,
      selectedDiary: get().selectedDiary || (data.length > 0 ? data[0] : null),
    });
  },
}));
