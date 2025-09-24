import { getCurrentWeekPublicServer } from '@/lib/api/serverApi';
import React from 'react';

const DiaryPage = async () => {
  const test = await getCurrentWeekPublicServer();
  console.log('test', test);

  return <div>DiaryPage</div>;
};

export default DiaryPage;
