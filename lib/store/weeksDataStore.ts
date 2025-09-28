import { create } from 'zustand';
import { getCurrentWeek, getCurrentWeekPublic } from '../api/clientApi';
import { BabyInfo, MomInfo } from '@/types/weeks';

interface JourneyState {
  currentWeek: number | null;
  daysToDue: number | null;
  baby: BabyInfo | null;
  mom: MomInfo | null;
  isLoaded: boolean;
  fetchJourneyData: (dueDate?: string | null) => Promise<void>;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  currentWeek: null,
  daysToDue: null,
  baby: null,
  mom: null,
  isLoaded: false,

  fetchJourneyData: async (dueDate?: string | null) => {
    try {
      const data = dueDate
        ? await getCurrentWeek(dueDate)
        : await getCurrentWeekPublic();

      if (!data) return;

      set({
        currentWeek: data.week ?? null,
        daysToDue: data.daysToDue ?? null,
        baby: data.pack?.baby ?? null,
        mom: data.pack?.mom ?? null,
        isLoaded: true,
      });
    } catch (error) {
      console.error('Failed to fetch journey data:', error);
      set({ isLoaded: false });
    }
  },
}));
