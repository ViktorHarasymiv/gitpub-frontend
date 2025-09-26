'use client';
import { useDiaryStore } from '@/lib/store/diaryStore';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';

export default function DiaryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { diaries, selectedDiary, setSelectedDiary, fetchDiaries } =
    useDiaryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchDiaries();
      setLoading(false);
    };
    load();
  }, [fetchDiaries]);

  useEffect(() => {
    if (!loading) {
      const decodedTitle = decodeURIComponent(id || '');
      const diary = diaries.find(d => d.title === decodedTitle) || null;
      setSelectedDiary(diary);
    }
  }, [loading, diaries, id, setSelectedDiary]);

  if (loading) return <Loader />;

  return (
    <section className={css.diaryDetailsContainer}>
      <DiaryEntryDetails entryData={selectedDiary} />
    </section>
  );
}
