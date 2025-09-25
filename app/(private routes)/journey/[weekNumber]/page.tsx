import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchCurrentWeek, getJourneyByWeekNumberAndTabServer } from '@/lib/api/serverApi';
import JourneyPageClient from './JourneyPage.client';
import { JourneyBaby, JourneyMom } from '@/types/journey';

type Props = {
    params: Promise<{ selectedWeek: number}>
};

export async function generateMetadata({ params }: Props) {
    const { selectedWeek } = await params;
    const momPack = await getJourneyByWeekNumberAndTabServer(selectedWeek, "mom") as JourneyMom;
    const babyPack = await getJourneyByWeekNumberAndTabServer(selectedWeek, "baby") as JourneyBaby;

    const babySize = babyPack?.analogy || "a tiny miracle";
    const babyHighlight = babyPack?.babyActivity?.split(".")[0] || "";
    const momHighlight = momPack?.feelings?.sensationDescr?.split(".")[0] || "";

    return {
        title: `Week ${selectedWeek} of Pregnancy Journey`,
        description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
        openGraph: {
            title: `Week ${selectedWeek} of Pregnancy Journey`,
            description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
            url: `https://gitpub-backend-qq3d.onrender.com/api/weeks/${selectedWeek}`,
            siteName: `Лелека`,
            images: [
                {
                    url: `@/public/img/logx2.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'Лелека',
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Week ${selectedWeek} of Pregnancy Journey`,
            description: `Week ${selectedWeek}: Baby is about the size of ${babySize}. ${babyHighlight}. ${momHighlight}.`,
            images: [`@/public/img/logx2.jpg`],
        },
    }
};

const JourneyPage = async () => {
    const currentWeek = 28; // await fetchCurrentWeek();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['journey', currentWeek, 'baby'],
        queryFn: () => getJourneyByWeekNumberAndTabServer(currentWeek, 'baby'),
    });
    await queryClient.prefetchQuery({
    queryKey: ['journey', currentWeek, 'mom'],
    queryFn: () => getJourneyByWeekNumberAndTabServer(currentWeek, 'mom'),
  });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <JourneyPageClient currentWeek={currentWeek} />
        </HydrationBoundary>
    );
};

export default JourneyPage;