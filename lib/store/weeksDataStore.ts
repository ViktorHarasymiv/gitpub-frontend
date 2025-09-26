import { create } from 'zustand';
import { getCurrentWeek } from '../api/clientApi';
import { BabyInfo, MomInfo } from '@/types/weeks';

interface JourneyState {
  currentWeek: number;
  daysToDue: number | null;
  baby: BabyInfo | null;
  mom: MomInfo | null;
  isLoaded: boolean;
  fetchJourneyData: (dueDate: string) => Promise<void>;
}

export const useJourneyStore = create<JourneyState>(set => ({
  currentWeek: 14,
  daysToDue: 165,
  baby: null,
  mom: null,
  isLoaded: false,

  fetchJourneyData: async (dueDate: string) => {
    if (!dueDate) return;

    try {
      const data = await getCurrentWeek(dueDate);
      if (!data) return;

      set({
        currentWeek: data.week ?? null,
        daysToDue: data.daysToDue ?? null,
        baby: data.pack.baby ?? null,
        mom: data.pack.mom ?? null,
        isLoaded: true,
      });
    } catch (error) {
      console.error('Failed to fetch journey data:', error);
      set({ isLoaded: false });
    }
  },
}));
