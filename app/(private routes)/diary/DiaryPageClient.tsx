'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import React from 'react';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getDiaries } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

const DiaryPage = () => {
  const { data } = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  return (
    <section className={css.diaryContainer}>
      <DiaryList diaryData={data?.data} />
      <DiaryEntryDetails entryData={data?.data[0]} />
    </section>
  );
};

export default DiaryPage;
