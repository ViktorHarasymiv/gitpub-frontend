import React from 'react';
import css from './page.module.css';
import DiaryPageClient from './DiaryPageClient';
import { getDiaries } from '@/lib/api/serverApi';

const DiaryPage = async () => {
  const diaries = await getDiaries();

  return (
    <section className={css.diaryContainer}>
      <DiaryPageClient initialDiaries={diaries.data} />
    </section>
  );
};

export default DiaryPage;
