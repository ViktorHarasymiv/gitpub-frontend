'use client';
import { getEmotions } from '@/lib/api/clientApi';
import { Icon } from '../ui/Icon/Icon';
import css from './DiaryEntryDetails.module.css';
import { DiaryEntry } from '@/types/diary';
import { useQuery } from '@tanstack/react-query';

interface DiaryEntryDetailsProps {
  entryData?: DiaryEntry;
}

function DiaryEntryDetails({ entryData }: DiaryEntryDetailsProps) {
  const emotions = useQuery({
    queryKey: ['emotions'],
    queryFn: getEmotions,
  });

  return entryData ? (
    <div className={css.diary_noteWrapper}>
      <div className={css.diary_note_header}>
        <div className={css.diary_noteHeader_titleBox}>
          <h2 className={css.diary_noteList_title}>{entryData.title}</h2>
          <Icon name="note" />
        </div>
        <div className={css.diary_note_date}>
          {entryData.createdAt}
          <Icon name="delete" />
        </div>
      </div>
      <p className={css.diary_note_content}>{entryData.description}</p>
      <ul className={css.diary_note_tagList}>
        {entryData.emotions.map((emotion, index) => (
          <li
            key={entryData._id + '_emo_' + index}
            className={css.diary_tagListNote_item}
          >
            {emotion}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h2 className={css.diary_noteList_title}>Щоденників поки що немає.</h2>
  );
}

export default DiaryEntryDetails;
