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
    const { result } = await getDiaries(1);
    set({
      diaries: result.data,
      selectedDiary:
        get().selectedDiary || (result.data.length > 0 ? result.data[0] : null),
    });
  },
}));
