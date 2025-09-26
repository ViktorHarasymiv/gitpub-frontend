import { useEffect, useRef } from 'react';
import css from './WeekSelector.module.css';
import clsx from 'clsx';

interface WeekSelectorProps {
  currentWeek: number;
  onSelectedWeek: (weekNumber: number) => void;

  setActiveTab?: () => void;
}

const WeekSelector = ({ currentWeek, onSelectedWeek }: WeekSelectorProps) => {
  const totalWeeks = 40;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  console.log(containerRef, itemRefs);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const targetIndex = Math.min(currentWeek - 10, weeks.length - 1);
    const targetElement = itemRefs.current[targetIndex];

    if (currentWeek < 5) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    if (targetElement && containerRef.current) {
      const offsetLeft = targetElement.offsetLeft;

      console.log(container);

      container.scrollTo({
        left: offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [currentWeek]);

  return (
    <ul className={css.container} ref={containerRef}>
      {weeks.map((weekNumber, index) => (
        <li key={weekNumber}>
          <button
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className={clsx(css.weekButton, {
              [css.current]: weekNumber === currentWeek,
              [css.disabled]: weekNumber > currentWeek,
            })}
            type="button"
            onClick={() => {
              if (weekNumber <= currentWeek) {
                onSelectedWeek(weekNumber);
              }
            }}
            disabled={weekNumber > currentWeek}
          >
            {weekNumber}
            <span className={css.week}>Тиждень</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WeekSelector;
