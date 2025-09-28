"use client";

import styles from "./DashboardPage.module.css";

import StatusBlock from "@/components/DashboardPage/StatusBlock/StatusBlock";
import BabyTodayCard from '@/components/DashboardPage/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/DashboardPage/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/DashboardPage/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard
  from '@/components/TasksReminderCard/TasksReminderCard';
import {
  useJourneyStore,
} from '@/lib/store/weeksDataStore';
import { useEffect, useRef } from 'react';
import Loader from '@/components/ui/Loader/Loader';


export default function DashboardPage() {

  const currentWeek = useJourneyStore(s => s.currentWeek);
  const daysToDue = useJourneyStore(s => s.daysToDue);
  const mom = useJourneyStore(s => s.mom);
  const baby = useJourneyStore(s => s.baby);

  const isLoaded = useJourneyStore(s => s.isLoaded);

  const fetchJourneyData = useJourneyStore(s => s.fetchJourneyData);

  const dueDate: string | null = null;

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchJourneyData(dueDate ?? undefined);
  }, [fetchJourneyData, dueDate]);

  return (
    <div className={styles.dashboardContainer}>
      <StatusBlock weeks={currentWeek} days={daysToDue} />
      <BabyTodayCard
        img={baby?.image}
        height={baby?.babySize}
        weight={baby?.babyWeight}
        activity={baby?.babyActivity}
        info={baby?.babyDevelopment}
        analogy={baby?.analogy}
      />
      <MomTipCard adviceForMom={mom?.comfortTips.map(s => s.tip)?.join('')}/>
      <TasksReminderCard/>
      <FeelingCheckCard/>
    </div>
  )
}

