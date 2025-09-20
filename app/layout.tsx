import { Lato, Comfortaa } from 'next/font/google';
import './global.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import { PathnameProvider } from '@/components/PathNameContext/PathNameContext';
import LayoutContent from '@/components/LayoutContent/LayoutContent';

export const metadata = {
  title: 'Лелека',
  description: 'Додаток який допоможе вам в очікуванні малюка',
};

//Fonts----------------------------------------

const open_sans = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
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
  return (
    <html lang="uk" className={`${open_sans.variable} ${comfortaa.variable}`}>
      <body>

        <TanStackProvider>
          <PathnameProvider>
            <LayoutContent>{children}</LayoutContent>
          
          </PathnameProvider>
        </TanStackProvider>

      </body>
    </html>
  );
}
