'use client';

// STACK

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// UTILS

import { useJourneyStore } from '@/lib/store/weeksDataStore';
import { JourneyBaby, JourneyMom, Tab } from '@/types/journey';
import { getJourneyByWeekNumberAndTab } from '@/lib/api/clientApi';

// COMPONENTS

import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import Loader from '@/components/ui/Loader/Loader';

import css from './JourneyPage.module.css';

const JourneyPageClient = () => {
  // STORE

  const currentWeek = useJourneyStore<number>(s => s.currentWeek);

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
  const [activeTab, setActiveTab] = useState<Tab>('baby');

  const { data, isLoading } = useQuery<JourneyBaby | JourneyMom>({
    queryKey: ['journey', selectedWeek, activeTab],
    queryFn: () => getJourneyByWeekNumberAndTab(selectedWeek, activeTab),
    refetchOnMount: false,
  });

  console.log(data);

  if (isLoading) return <Loader loading={true} />;

  return (
    <div>
      <WeekSelector
        currentWeek={currentWeek}
        onSelectedWeek={setSelectedWeek}
      />

      {data ? (
        <JourneyDetails
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          data={data}
        />
      ) : null}
    </div>
  );
};

export default JourneyPageClient;
