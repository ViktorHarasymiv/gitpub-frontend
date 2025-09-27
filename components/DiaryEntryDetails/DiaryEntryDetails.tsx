'use client';
import { Icon } from '../ui/Icon/Icon';
import { DiaryEntry, NewDiaryData } from '@/types/diary';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import css from './DiaryEntryDetails.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';
import { deleteDiary } from '@/lib/api/clientApi';
import { useDiaryStore } from '@/lib/store/diaryStore';
import dayjs from 'dayjs';

import Modal from '../Modal/Modal';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';

interface DiaryEntryDetailsProps {
  entryData: DiaryEntry | null;
}

function DiaryEntryDetails({ entryData }: DiaryEntryDetailsProps) {
  const { emotions } = useEmotionsStore();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPatchModal, setPatchModal] = useState(false);
  const { fetchDiaries } = useDiaryStore();

  const emotionMap = new Map(emotions.map(e => [e._id, e.title]));
  const emotionsTags = entryData?.emotions
    .map(id => emotionMap.get(id))
    .filter(Boolean);

  const curDate = dayjs().format('YYYY-MM-DD');

  const initialValues: NewDiaryData = {
    title: entryData?.title ?? '',
    description: entryData?.description ?? '',
    emotions: entryData?.emotions ?? [],
    date: entryData ? dayjs(entryData.date).format('YYYY-MM-DD') : curDate,
  };

  const handleDeleteDiary = async () => {
    if (!entryData?._id) return;
    try {
      await deleteDiary(entryData._id);
      setIsDeleteModal(false);
      await fetchDiaries();
    } catch (error) {
      console.log('Failed to delete the draft', error);
    }
  };

  return entryData === null ? (
    <div className={css.diary_noteWrapper}>
      <div className={css.diary_noteHeader_titleBox}>
        <h2 className={css.diary_noteList_title}>Щоденників поки що немає.</h2>
      </div>
    </div>
  ) : (
    <div className={css.diary_noteWrapper}>
      <div className={css.diary_note_header}>
        <div className={css.diary_noteHeader_titleBox}>
          <h2 className={css.diary_noteList_title}>{entryData?.title}</h2>
          <Icon name="note" action={() => setPatchModal(true)} />
        </div>
        {isPatchModal && (
          <Modal title="Змінити запис" onClose={() => setPatchModal(false)}>
            <AddDiaryEntryForm
              initialValues={initialValues}
              closeModal={() => setPatchModal(false)}
              isPatch={true}
              id={entryData._id}
            />
          </Modal>
        )}
        <div className={css.diary_note_date}>
          {new Date(entryData.updatedAt).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}

          <Icon
            name="delete"
            action={() => {
              setIsDeleteModal(true);
            }}
          />
        </div>
        {isDeleteModal && (
          <ConfirmationModal
            title="Видалити запис?"
            handler={handleDeleteDiary}
            onClose={() => {
              setIsDeleteModal(false);
            }}
          />
        )}
      </div>
      <p className={css.diary_note_content}>{entryData?.description}</p>
      <ul className={css.diary_note_tagList}>
        {emotionsTags?.map((title, index) => (
          <li
            key={entryData?._id + '_emo_' + index}
            className={css.diary_tagListNote_item}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryEntryDetails;
