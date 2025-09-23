import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchCurrentWeek, getJourneyByWeekNumberAndTab } from '@/lib/api/clientApi';
import JourneyPageClient from './JourneyPage.client';
import { JourneyBaby, JourneyMom } from '@/types/journey';

type Props = {
    params: Promise<{ selectedWeek: number}>
};

export async function generateMetadata({ params }: Props) {
    const { selectedWeek } = await params;
    const momPack = await getJourneyByWeekNumberAndTab(selectedWeek, "mom") as JourneyMom;
    const babyPack = await getJourneyByWeekNumberAndTab(selectedWeek, "baby") as JourneyBaby;

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

const JourneyPage = async ({ params }: Props) => {
    const selectedWeekString = await params;
    const selectedWeek = Number(selectedWeekString);
    const currentWeek = await fetchCurrentWeek();
    const queryClient = new QueryClient();
    const activeTab = "baby";

    await queryClient.prefetchQuery({
        queryKey: ['journey', selectedWeek, activeTab],
        queryFn: () => getJourneyByWeekNumberAndTab(selectedWeek, activeTab),
    });
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <JourneyPageClient currentWeek={currentWeek} />
        </HydrationBoundary>
    );
};

export default JourneyPage;