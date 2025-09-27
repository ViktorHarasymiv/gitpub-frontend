import Link from 'next/link';
import React, { useState } from 'react';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Icon } from '../ui/Icon/Icon';
import Modal from '../Modal/Modal';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { DiaryEntry, NewDiaryData } from '@/types/diary';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import css from './DiaryList.module.css';
import dayjs from 'dayjs';

interface DiaryListProps {
  diaryData?: DiaryEntry[];
}

export interface MutationParams {
  data: NewDiaryData;
  _id?: string;
}

const curDate = dayjs().format('YYYY-MM-DD');
const initialValues: NewDiaryData = {
  title: '',
  description: '',
  emotions: [],
  date: curDate,
};

function DiaryList({ diaryData }: DiaryListProps) {
  const { setSelectedDiary } = useDiaryStore();

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={css.diaryNoteListWrapper}>
      <div className={css.diaryNoteList_header}>
        <h2 className={css.diaryNoteList_title}>Ваші записи</h2>
        <div className={css.diaryNoteList_bttn}>
          Новий Запис
          <Icon name="plus" action={() => setCreateModalOpen(true)} />
        </div>
      </div>

      {isCreateModalOpen && (
        <Modal title="Новий запис" onClose={() => setCreateModalOpen(false)}>
          <AddDiaryEntryForm
            initialValues={initialValues}
            closeModal={() => {
              setCreateModalOpen(false);
            }}
            isPatch={false}
          />
        </Modal>
      )}
      {diaryData === undefined || diaryData?.length === 0 ? (
        <p>Покищо у вас немає записів.</p>
      ) : (
        <ul className={css.diaryList}>
          {diaryData.map(entry => (
            <li key={entry._id} className={css.diaryList_item}>
              {isMobile ? (
                <Link
                  href={`/diary/${encodeURIComponent(entry.title)}?id=${
                    entry._id
                  }`}
                  onClick={() => setSelectedDiary(entry)}
                >
                  <DiaryEntryCard diaryEntry={entry} />
                </Link>
              ) : (
                <div onClick={() => setSelectedDiary(entry)}>
                  <DiaryEntryCard diaryEntry={entry} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DiaryList;
