import localFont from 'next/font/local';
import { Comfortaa } from 'next/font/google';

export const lato = localFont({
  src: [
    {
      path: '../../app/fonts/lato/Lato-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../app/fonts/lato/Lato-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../app/fonts/lato/Lato-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../app/fonts/lato/Lato-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lato',
});

export const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  variable: '--font-comfortaa',
  display: 'swap',
});
