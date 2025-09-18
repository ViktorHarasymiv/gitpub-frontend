import { Lato, Comfortaa } from 'next/font/google';
import './global.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { headers } from 'next/headers';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

//Fonts----------------------------------------

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'], // Bold
  variable: '--font-comfortaa',
  display: 'swap',
});

//RootLayout----------------------------------------

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const pathname = h.get('x-pathname') || '';
  const isAuthRoute = pathname.startsWith('/auth');

  return (
    <html lang="uk" className={`${lato.variable} ${comfortaa.variable}`}>
      <body>
        <TanStackProvider>
          {!isAuthRoute && <Sidebar />}
          <div className="content">
            {!isAuthRoute && <Header />}
            {!isAuthRoute && <Breadcrumbs />}
            <main>{children}</main>
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
