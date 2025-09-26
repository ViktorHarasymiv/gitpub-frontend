'use client';
import { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryCard.module.css';
import { useEmotionsStore } from '@/lib/store/emotionStore';

interface DiaryEntryCardProps {
  diaryEntry: DiaryEntry;
}

function DiaryEntryCard({ diaryEntry }: DiaryEntryCardProps) {
  const { emotions } = useEmotionsStore();

  const emotionMap = new Map(emotions.map(e => [e._id, e.title]));
  const emotionsTags = diaryEntry.emotions
    .map(id => emotionMap.get(id))
    .filter(Boolean);

  return (
    <li className={css.diaryList_item}>
      <div className={css.diaryItem_header}>
        <h3 className={css.diaryItemHeader_Title}>{diaryEntry.title}</h3>
        <span className={css.diaryItemHeader_date}>{diaryEntry.createdAt}</span>
      </div>
      <ul className={css.diaryItem_tagList}>
        {emotionsTags.map((title, index) => {
          return (
            <li
              key={diaryEntry._id + '_emotion_' + index}
              className={css.diaryTagList_item}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </li>
  );
}
export default DiaryEntryCard;
