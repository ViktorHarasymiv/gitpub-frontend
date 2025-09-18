'use client';

import css from './Page.module.css';

import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import { useAuthStore } from '@/lib/store/authStore';

interface BabyToday {
  title: string;
  height: string;
  width: string;
  activeRange: string;
  about: string;
  advice: string;
  adviceToday: string;
}

export default function Home() {
  const { user } = useAuthStore();

  function getPregnancyWeek(dueDateStr: string): number | null {
    if (!dueDateStr) return null;

    const dueDates = new Date(dueDateStr);
    const conceptionDate = new Date(
      dueDates.getTime() - 280 * 24 * 60 * 60 * 1000
    ); // мінус 280 днів
    const now = new Date();

    // Якщо поточна дата до зачаття або після пологів — повертаємо null
    if (now < conceptionDate || now > dueDates) return null;

    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksPassed = Math.floor(
      (now.getTime() - conceptionDate.getTime()) / msPerWeek
    );

    return weeksPassed;
  }

  const babyToday: BabyToday = {
    title: 'Малюк сьогодні',
    height: '12',
    width: '45 грамів',
    activeRange:
      "М'язи обличчя вже працюють! Малюк вчиться хмуритися, мружитись і навіть може зловити гикавку.",
    about:
      'У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи — все більш скоординованими. Хоч ви ще не відчуваєте цих кульбітів, знайте: всередині вас відбувається справжнє диво!',

    advice:
      'Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок.',
    adviceToday: 'Занотуйте незвичні відчуття у тілі.',
  };

  return (
    <section className={css.section}>
      <div className={css.section_wrapper}>
        <div className={css.first_column}>
          <div className={css.statictic_wrapper}>
            <div className={css.statistic_block}>
              <h2 className={css.statistic_title}>Тиждень</h2>
              <p className={css.statistic_value}>
                {user?.dueDate ? getPregnancyWeek(user?.dueDate) : '13'}
              </p>
            </div>
            <div className={css.statistic_block}>
              <h2 className={css.statistic_title}>Днів до зустрічі</h2>
              <p className={css.statistic_val2ue}>
                {' '}
                {'Орієнтовна дата - теперішня дата = днів до зістрічі'}
              </p>
            </div>
          </div>
          <div className={css.baby_wrapper}>
            <h3 className={css.block_title}>{babyToday.title}</h3>
            <div className={css.baby_details}>
              <div className={css.baby_image}></div>
              <div className={css.baby_info}>
                <p className={css.baby_value}>
                  <b>Розмір:</b> Приблизно {babyToday.height} см
                </p>
                <p className={css.baby_value}>
                  <b>Вага:</b> Близько {babyToday.width}
                </p>
                <p className={css.baby_value}>
                  <b>Активність:</b> {babyToday.activeRange}
                </p>
              </div>
            </div>
            <p className={css.baby_value}>{babyToday.about}</p>
          </div>
          <div className={css.advice_wrapper}>
            <h3 className={css.block_title}>Порада для мами</h3>
            <p>{babyToday.advice}</p>
          </div>
        </div>
        <div className={css.task_wrapper}>
          <TasksReminderCard />
          <FeelingCheckCard babyToday={babyToday} />
        </div>
      </div>
    </section>
  );
}
