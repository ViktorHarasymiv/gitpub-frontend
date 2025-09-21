import './global.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { PathnameProvider } from '@/components/PathNameContext/PathNameContext';
import LayoutContent from '@/components/LayoutContent/LayoutContent';
import { lato, comfortaa } from '@/lib/fonts/fonts';

export const metadata = {
  title: 'Лелека',
  description: 'Додаток який допоможе вам в очікуванні малюка',
};

//RootLayout----------------------------------------

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${lato.variable} ${comfortaa.variable}`}>
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
