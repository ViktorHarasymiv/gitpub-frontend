'use client';

import Loader from '@/components/ui/Loader/Loader';
import { useJourneyStore } from '@/lib/store/weeksDataStore';

export default function Home() {
  const currentWeek = useJourneyStore(s => s.currentWeek);
  const daysToDue = useJourneyStore(s => s.daysToDue);
  const mom = useJourneyStore(s => s.mom);
  const baby = useJourneyStore(s => s.baby);

  const isLoaded = useJourneyStore(s => s.isLoaded);
  console.log(baby);

  return (
    <section>
      <div>Дедлай для секції 26.09</div>
      <br />
      <br />

      <p>Тиждень - {currentWeek}</p>
      <br />
      <p>День - {daysToDue}</p>

      {baby && isLoaded ? (
        <div>
          <h2>Тиждень №{baby.weekNumber}</h2>
          <img
            src={baby.image}
            alt={baby.analogy}
            style={{ maxWidth: '300px' }}
          />

          <h3>Аналогія:</h3>
          <p>{baby.analogy}</p>

          <h3>Розвиток дитини:</h3>
          <p>{baby.babyDevelopment}</p>

          <h3>Активність дитини:</h3>
          <p>{baby.babyActivity}</p>

          <h3>Цікавий факт:</h3>
          <p>{baby.interestingFact}</p>

          <h3>Розміри:</h3>
          <ul>
            <li>Вага: {baby.babyWeight} г</li>
            <li>Розмір: {baby.babySize} см</li>
          </ul>

          <h3>Поради для мами:</h3>
          <ul>
            {baby.momDailyTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
