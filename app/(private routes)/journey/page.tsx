import React from 'react';
import JourneyPageClient from './[weekNumber]/JourneyPage.client';

// export async function generateMetadata({ params }: Props) {
//   const { selectedWeek } = await params;
//   const momPack = (await getJourneyByWeekNumberAndTabServer(
//     selectedWeek,
//     'mom'
//   )) as JourneyMom;
//   const babyPack = (await getJourneyByWeekNumberAndTabServer(
//     selectedWeek,
//     'baby'
//   )) as JourneyBaby;

//   const babySize = babyPack?.analogy || 'a tiny miracle';
//   const babyHighlight = babyPack?.babyActivity?.split('.')[0] || '';
//   const momHighlight = momPack?.feelings?.sensationDescr?.split('.')[0] || '';

//   return {
//     title: `Week ${selectedWeek} of Pregnancy Journey`,
//     description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
//     openGraph: {
//       title: `Week ${selectedWeek} of Pregnancy Journey`,
//       description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
//       url: `https://gitpub-backend-qq3d.onrender.com/api/weeks/${selectedWeek}`,
//       siteName: `Лелека`,
//       images: [
//         {
//           url: `@/public/img/logx2.jpg`,
//           width: 1200,
//           height: 630,
//           alt: 'Лелека',
//         },
//       ],
//       type: 'article',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `Week ${selectedWeek} of Pregnancy Journey`,
//       description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
//       images: [`@/public/img/logx2.jpg`],
//     },
//   };
// }

import css from './[weekNumber]/JourneyPage.module.css';

const JourneyPage = async () => {
  return (
    <section className={css.section_block}>
      <JourneyPageClient />
    </section>
  );
};

export default JourneyPage;
