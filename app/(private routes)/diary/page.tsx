import React from 'react';
import DiaryPageClient from './DiaryPageClient';
import { getDiaries } from '@/lib/api/serverApi';
import css from './page.module.css';

const DiaryPage = async () => {
  const diaries = await getDiaries();

  return (
    <section className={css.diaryContainer}>
      <DiaryPageClient initialDiaries={diaries.data} />
    </section>
  );
};

export default DiaryPage;
