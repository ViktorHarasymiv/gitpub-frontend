'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import React from 'react';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getDiaries } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

const DiaryPageClient = () => {
  const diary = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  return (
    <>
      <DiaryList diaryData={diary.data?.data} />
      <DiaryEntryDetails entryData={diary.data?.data[0]} />
    </>
  );
};

export default DiaryPageClient;
