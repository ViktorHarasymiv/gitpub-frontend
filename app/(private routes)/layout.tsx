'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isMobile = useIsMobile();

  const pathProfileSetting = () => {
    if (path.includes('/profile')) return null;

    return true;
  };

  console.log(isMobile);

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
