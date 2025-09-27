'use client';
import React, { useEffect, useState } from 'react';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { DiaryEntry } from '@/types/diary';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import Loader from '@/components/ui/Loader/Loader';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Props {
  initialDiaries: DiaryEntry[];
}
const DiaryPageClient = ({ initialDiaries }: Props) => {
  const { diaries, setDiaries, selectedDiary, setSelectedDiary } =
    useDiaryStore();
  const { fetchEmotions } = useEmotionsStore();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(true);

  console.log(diaries);

  useEffect(() => {
    const load = async () => {
      if (initialDiaries.length > 0) setDiaries(initialDiaries);
      await fetchEmotions();
      if (!selectedDiary && initialDiaries.length > 0) {
        setSelectedDiary(initialDiaries[0]);
      }
      setLoading(false);
    };
    load();
  }, [
    initialDiaries,
    setDiaries,
    selectedDiary,
    setSelectedDiary,
    fetchEmotions,
  ]);

  if (loading) return <Loader />;

  return (
    <>
      <DiaryList diaryData={diaries} />
      {!isMobile && selectedDiary && (
        <DiaryEntryDetails entryData={selectedDiary} />
      )}
    </>
  );
};

export default DiaryPageClient;
