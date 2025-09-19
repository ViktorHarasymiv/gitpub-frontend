'use client';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import { useCurrentPathname } from '../PathNameContext/PathNameContext';
import Sidebar from '../Sidebar/Sidebar';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = useCurrentPathname();
  const isAuthRoute = pathname.startsWith('/auth');

  return (
    <>
      {!isAuthRoute && <Sidebar />}
      <main className="content">
        {!isAuthRoute && <Header />}
        {!isAuthRoute && <Breadcrumbs />}
        <div>{children}</div>
      </main>
    </>
  );
}
