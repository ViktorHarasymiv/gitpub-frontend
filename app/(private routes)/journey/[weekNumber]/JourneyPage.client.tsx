'use client';

// STACK

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// UTILS

import { useJourneyStore } from '@/lib/store/weeksDataStore';
import { JourneyData, Tab } from '@/types/journey';
import { getJourneyByWeekNumberAndTab } from '@/lib/api/clientApi';

// COMPONENTS

import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import Loader from '@/components/ui/Loader/Loader';

import css from './JourneyPageClient.module.css'

const JourneyPageClient = () => {
  // STORE

  const currentWeek = useJourneyStore<number>(s => s.currentWeek);

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
  const [activeTab, setActiveTab] = useState<Tab>('baby');

  const { data, isLoading } = useQuery<JourneyData>({
    queryKey: ['journey', selectedWeek, activeTab],
    queryFn: () => getJourneyByWeekNumberAndTab(selectedWeek, activeTab),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader loading={true} />;

  return (
    <>
          <div className={css.weekContainer}>
            <WeekSelector
              currentWeek={currentWeek}
              onSelectedWeek={setSelectedWeek}
            />
          </div>

        {data ? (
          <JourneyDetails
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            data={data}
          />
        ) : null}
    </>
  );
};

export default JourneyPageClient;
