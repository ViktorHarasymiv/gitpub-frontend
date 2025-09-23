'use client';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import Loader from '@/components/ui/Loader/Loader';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useAuthStore } from '@/lib/store/authStore';

export default function DashboardPage() {
  const [openModal, setOpenModal] = useState(false);

  // STATE

  const { user } = useAuthStore();

  console.log(user);

  return (
    <div>
      123
      <Button type="submit">Кнопка 1</Button>
      <br />
      {/* Усі пропси для кнопки можна подивитись в компоненті  */}
      <Button type="submit" alternative={true}>
        Кнопка 2
      </Button>
      <br />
      {/* Модальне вікно , контент наповнювати індивідуально */}
      <Button
        type="submit"
        alternative={true}
        action={() => setOpenModal(true)}
      >
        Відкрити модалку
      </Button>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          title="Загаловок для модального вікна"
        >
          <Button type="submit">Зберегти</Button>
        </Modal>
      )}
      {/* 
      Компонент для іконок з спрайту , заходимо в спрайт копіюємо ім'я іконки і вставляємо в name пропсом.
      Приклад навів , усі інші пропси подивитись самостійно в компоненті 
      */}
      <Icon name={'close_btn'} width={14} height={14}></Icon>
      <Icon name={'note'} width={14} height={14}></Icon>
      <br />
      {/* Loader */}
      <Loader loading={true} />
    </div>
  );
}
