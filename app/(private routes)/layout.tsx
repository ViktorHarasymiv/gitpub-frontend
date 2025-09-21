'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="main">
        <Breadcrumbs />
        <GreetingBlock />
        {children}
      </main>
    </>
  );
}
