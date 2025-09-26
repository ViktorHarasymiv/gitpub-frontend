"use client";

import styles from "./DashboardPage.module.css";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

import { CurrentWeekDetailed } from '@/types/week';

import StatusBlock from "@/components/DashboardPage/StatusBlock/StatusBlock";
import BabyTodayCard from '@/components/DashboardPage/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/DashboardPage/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/DashboardPage/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard
  from '@/components/TasksReminderCard/TasksReminderCard';
import Loader from '@/components/ui/Loader/Loader';

import {
  getWeekCurrentPrivate,
  getWeekCurrentPublic,
} from '@/lib/api/serverApi';


export default function DashboardPage() {
  const [data, setData] = useState<CurrentWeekDetailed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (isAuthenticated){
     getWeekCurrentPrivate()
      .then(setData)
      .catch(() => setError("Не вдалося завантажити дані"))
      .finally(() => setLoading(false));
    }

    getWeekCurrentPublic()
    .then(setData)
    .catch(() => setError("Не вдалося завантажити дані"))
    .finally(() => setLoading(false));
  }, [isAuthenticated])

  if (loading) return <Loader></Loader>;
  if (error || !data) return null;

  return (
    <section className={styles.dashboardContainer}>
      <StatusBlock weeks={data.week} days={data.daysToDue} />
      <BabyTodayCard
        img={data?.pack?.baby?.image}
        height={data?.pack?.baby?.babySize}
        weight={data?.pack?.baby?.babyWeight}
        activity={data?.pack?.baby?.babyActivity}
        info={data?.pack?.baby?.babyDevelopment}
      />
      <MomTipCard adviceForMom={data.pack?.mom?.comfortTips.map(s => s.tip)?.join('')
      }/>
      <TasksReminderCard/>
      <FeelingCheckCard/>
    </section>
  )
}
