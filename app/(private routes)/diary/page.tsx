import React from 'react';
import css from './page.module.css';
import DiaryPageClient from './DiaryPageClient';

const DiaryPage = () => {
  return (
    <section className={css.diaryContainer}>
      <DiaryPageClient />
    </section>
  );
};

export default DiaryPage;
