'use client';
import { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  diaryEntry: DiaryEntry;
}

function DiaryEntryCard({ diaryEntry }: DiaryEntryCardProps) {
  return (
    <li className={css.diaryList_item}>
      <div className={css.diaryItem_header}>
        <h3 className={css.diaryItemHeader_Title}>{diaryEntry.title}</h3>
        <span className={css.diaryItemHeader_date}>{diaryEntry.createdAt}</span>
      </div>
      <ul className={css.diaryItem_tagList}>
        {diaryEntry.emotions.map((emotion, index) => {
          return (
            <li
              key={diaryEntry._id + '_emotion_' + index}
              className={css.diaryTagList_item}
            >
              {emotion}
            </li>
          );
        })}
      </ul>
    </li>
  );
}
export default DiaryEntryCard;
