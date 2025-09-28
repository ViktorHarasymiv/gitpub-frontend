'use client';
import React, { useEffect, useState } from 'react';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import Loader from '@/components/ui/Loader/Loader';
import { useIsMobile } from '@/hooks/useIsMobile';

const DiaryPageClient = () => {
  const { diaries, fetchDiaries, selectedDiary, setSelectedDiary } =
    useDiaryStore();
  const { fetchEmotions } = useEmotionsStore();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(true);

  console.log(diaries);

  useEffect(() => {
    const load = async () => {
      fetchDiaries();
      fetchEmotions();
    };
    load();
  }, [fetchDiaries, fetchEmotions]);

  useEffect(() => {
    if (selectedDiary) {
      const updatedDiary = diaries.find(d => d._id === selectedDiary._id);
      if (updatedDiary && updatedDiary !== selectedDiary) {
        setSelectedDiary(updatedDiary);
      }
    }
  }, [diaries, selectedDiary, setSelectedDiary]);

  if (!diaries) return <Loader />;

  return (
    <>
      <DiaryList diaryData={diaries} />
      {!isMobile && <DiaryEntryDetails entryData={selectedDiary} />}
    </>
  );
};

export default DiaryPageClient;
