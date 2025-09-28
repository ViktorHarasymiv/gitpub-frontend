'use client';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import Decor from '../../../../components/Decor/Decor';
import Form from './LoginForm';

import css from '../Page.module.css';

import image from '@/public/img/logx2.jpg';

export default function RegisterPage() {
  const usePageWidth = useWindowWidth();
  return (
    <main className={css.wrapper}>
      <Form />
      {usePageWidth >= 920 && <Decor image={image} />}
    </main>
  );
}
