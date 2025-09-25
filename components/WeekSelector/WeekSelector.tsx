import css from './WeekSelector.module.css';
import clsx from 'clsx';

interface WeekSelectorProps {
    currentWeek: number;
    onSelectedWeek: (weekNumber: number) => void;
}

const WeekSelector = ({ currentWeek, onSelectedWeek }: WeekSelectorProps) => {
    const totalWeeks = 40;
    const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

    return (
        <ul className={css.container}>
            {weeks.map(( weekNumber ) => (
                 <li key={weekNumber}>
                    <button 
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
    )
};

export default WeekSelector;