'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import style from '@/app/(private routes)/Page.module.css';
import iconStyle from '@/components/ui/Icon/Style.module.css';

import css from './Style.module.css';

import Icon from '@/public/icons/circle.svg';
import Image from 'next/image';
import Button from '../ui/Button/Button';
import ModalTask from './ModalTask';
import { getAllTasks, patchActiveTask } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import Loader from '../ui/Loader/Loader';

interface TasksHttpResponse {
  result: {
    data: Task[];
    totalPages: number;
  };
}

function TasksReminderCard() {
  const [switchModal, setSwitchModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<TasksHttpResponse>({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(1),
  });

  const tasks: Task[] = data?.result?.data ?? [];
  console.log(tasks);

  // PATCH

  const mutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      patchActiveTask(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => {
      console.error('Помилка при оновленні задачі:', error);
    },
  });

  const handleToggleActive = (id: string, currentState: boolean) => {
    mutation.mutate({ id, isActive: !currentState });
  };

  // DATA FORMATED

  const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <>
      <div className={css.task_form}>
        <div className={css.title_wrapper}>
          <h3 className={style.block_title}>Важливі завдання</h3>
          <Image
            onClick={() => setSwitchModal(true)}
            src={Icon}
            alt="Open form button"
            className={iconStyle.icon}
          />
        </div>
        {tasks.length > 0 ? (
          <ul className={css.list}>
            {tasks.map((item, index) => {
              return (
                <li key={index} className={css.item}>
                  <input
                    onChange={() => handleToggleActive(item._id, item.isActive)}
                    type="checkbox"
                    checked={item.isActive}
                    name={item.text}
                  />
                  <div className={css.item_content}>
                    <span>{formatDateShort(item.date)}</span>
                    <span
                      style={{
                        textDecoration: item.isActive ? 'line-through' : 'none',
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={css.greating_block}>
            <b>Наразі немає жодних завдань</b>
            <p className={css.about_text}>Створіть мершій нове завдання!</p>
            <Button
              type={'button'}
              styles={{ maxWidth: 191 }}
              action={() => setSwitchModal(true)}
            >
              {'Створити завдання'}
            </Button>
          </div>
        )}
      </div>
      {/* Modal */}
      {switchModal && <ModalTask switchModal={setSwitchModal} />}
    </>
  );
}

export default TasksReminderCard;
