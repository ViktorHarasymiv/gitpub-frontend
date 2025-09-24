'use client';

import Decor from '../../Decor';
import Form from './RegisterForm';

import css from '../Page.module.css';

import image from '@/public/img/regx2.jpg';

import { useWindowWidth } from '@/hooks/useWindowWidth';

export default function RegisterPage() {
  const usePageWidth = useWindowWidth();

  return (
    <main className={css.wrapper}>
      <Form />
      {usePageWidth >= 920 && <Decor image={image} />}
    </main>
  );
}
