import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { DiaryEntry } from '@/types/diary';
import { Icon } from '../ui/Icon/Icon';
import css from './DiaryList.module.css';

interface DiaryListProps {
  diaryData?: DiaryEntry[];
}

function DiaryList({ diaryData }: DiaryListProps) {
  console.log(diaryData);
  return (
    <div className={css.diaryNoteListWrapper}>
      <div className={css.diaryNoteList_header}>
        <h2 className={css.diaryNoteList_title}>Ваші записи</h2>
        <div className={css.diaryNoteList_bttn}>
          Новий Запис
          <Icon name="plus" action={() => {}} />
        </div>
      </div>
      {diaryData === undefined || diaryData?.length === 0 ? (
        <p>Покищо у вас немає записів.</p>
      ) : (
        <ul className={css.diaryList}>
          {diaryData?.map(entry => {
            return <DiaryEntryCard key={entry._id} diaryEntry={entry} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default DiaryList;
