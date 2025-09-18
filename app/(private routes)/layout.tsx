import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import '../../styles/globals.css';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { SideBar } from '@/components/SideBar/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <main className="main">
        <Breadcrumbs />
        <GreetingBlock />
        {children}
      </main>
    </>
  );
}
