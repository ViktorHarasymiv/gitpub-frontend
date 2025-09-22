import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchCurrentWeekServer, getJourneyByWeekNumberAndTabServer } from '@/lib/api/serverApi';
import JourneyPageClient from './JourneyPage.client';

const JourneyPage = async () => {
    const currentWeek = await fetchCurrentWeekServer();
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['journey', currentWeek],
        queryFn: () => getJourneyByWeekNumberAndTabServer(currentWeek),
    });
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <JourneyPageClient currentWeek={currentWeek} />
        </HydrationBoundary>
    );
};

export default JourneyPage;