import { Nunito, Comfortaa } from 'next/font/google';
import './global.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import { PathnameProvider } from '@/components/PathNameContext/PathNameContext';
import LayoutContent from '@/components/LayoutContent/LayoutContent';

export const metadata = {
  title: 'Лелека',
  description: 'Додаток який допоможе вам в очікуванні малюка',
};

//Fonts----------------------------------------

const nunito = Nunito({
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${nunito.variable} ${comfortaa.variable}`}>
      <body>
        <html lang="uk" className={`${nunito.variable} ${comfortaa.variable}`}>
          <body>
            <TanStackProvider>
              <PathnameProvider>
                <LayoutContent>{children}</LayoutContent>
                {modal}
              </PathnameProvider>
            </TanStackProvider>
          </body>
        </html>
      </body>
    </html>
  );
}
