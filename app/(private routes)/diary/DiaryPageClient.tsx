'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import React, { useEffect } from 'react';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { DiaryEntry } from '@/types/diary';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useEmotionsStore } from '@/lib/store/emotionStore';

interface Props {
  initialDiaries: DiaryEntry[];
}

const DiaryPageClient = ({ initialDiaries }: Props) => {
  const { diaries, setDiaries } = useDiaryStore();
  useEffect(() => {
    if (initialDiaries.length > 0) setDiaries(initialDiaries);
  }, [initialDiaries, setDiaries]);

  const { fetchEmotions } = useEmotionsStore();
  useEffect(() => {
    fetchEmotions();
  }, [fetchEmotions]);

  return (
    <>
      <DiaryList diaryData={diaries} />
      <DiaryEntryDetails entryData={diaries[0]} />
    </>
  );
};

export default DiaryPageClient;
