'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './FeelingCheckCard.module.css';

import Button from '../../ui/Button/Button';
import Modal from '@/components/Modal/Modal';
import AddDiaryEntryForm from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';
import dayjs from 'dayjs';
import { NewDiaryData } from '@/types/diary';

const curDate = dayjs().format('YYYY-MM-DD');
const initialValues: NewDiaryData = {
  title: '',
  description: '',
  emotions: [],
  date: curDate,
};

export default function FeelingCheckCard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setIsOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <div className={css.feelingCheckCardContainer}>
      <div className={css.contentWrap}>
        <h4 className={css.title}>Як ви себе почуваєте?</h4>
        <p className={css.text}>Рекомендація на сьогодні:</p>
        <br />
        <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>
      </div>
      {/*Як буде секція з щоденником то можна буде доробити швидко*/}
      <Button styles={{ height: 42, width: 225 }} action={handleClick}>
        Зробити запис у щоденник
      </Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title={'Щоденник'}>
          <AddDiaryEntryForm
            initialValues={initialValues}
            isPatch={false}
            closeModal={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
