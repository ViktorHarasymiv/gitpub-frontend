'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { useIsMobile } from '@/hooks/useIsMobile';
import { usePathname } from 'next/navigation';

import { useJourneyStore } from '@/lib/store/weeksDataStore';
import { getCurrentWeek } from '@/lib/api/clientApi';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isMobile = useIsMobile();

  // STATE

  const { user } = useAuthStore();

  const pathProfileSetting = () => {
    if (path.includes('/profile')) return null;

    return true;
  };

  useEffect(() => {
    if (!user?.dueDate) return;

    const fetchData = async () => {
      const data = await getCurrentWeek(user?.dueDate);
      if (data) {
        useJourneyStore.setState({
          currentWeek: data.week,
          daysToDue: data.daysToDue,
          baby: data.pack.baby,
          mom: data.pack.mom,
          isLoaded: true,
        });
      }
    };

    fetchData();
  }, [user?.dueDate]);

  return (
    <>
      {isMobile === true ? <Header /> : <Sidebar />}
      <main className="main">
        <Breadcrumbs />
        {pathProfileSetting() && <GreetingBlock />}
        {children}
      </main>
    </>
  );
}
