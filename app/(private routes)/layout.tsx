'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { useIsMobile } from '@/lib/hooks/useIsMobile';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();

  console.log(isMobile);

  return (
    <>
      {isMobile === true ? <Header /> : <Sidebar />}
      <main className="main">
        <Breadcrumbs />
        <GreetingBlock />
        {children}
      </main>
    </>
  );
}
