import css from './JourneyDetails.module.css';
import clsx from 'clsx';
import Image from "next/image";
import { JourneyBaby, Tab } from "@/types/journey";
import { JourneyMom } from "@/types/journey";
import { Icon } from "../ui/Icon/Icon";
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';

interface JourneyDetailsProps {
    activeTab: Tab;
    onChangeTab: (tab: Tab) => void;
    data: JourneyBaby | JourneyMom;
}

const JourneyDetails = ({
    activeTab, 
    onChangeTab, 
    data,
}: JourneyDetailsProps) => {
    const iconMap: { [key: string]: string } = {
        "Харчування": "eat",
        "Активність": "activity",
        "Відпочинок та комфорт": "rest",
    }; 

    return (
        <div className={css.container}>
            <div className={css.tabContainer}>
                <button
                className={clsx(css.tab, {
                        [css.active]: activeTab === "baby",
                    })}
                type='button'
                onClick={() => onChangeTab("baby")}
                >
                    Розвиток малюка
                </button>
                <button
                className={clsx(css.tab, {
                        [css.active]: activeTab === "mom",
                    })}
                type='button'
                onClick={() => onChangeTab("mom")}
                >
                    Тіло мами
                </button>
            </div>

            {activeTab === "baby" && "analogy" in data ? (
            <div className={css.babyContainer}>
                <div className={css.babySize}>
                    <Image
                    className={css.image}
                    src={data.image}
                    alt='Baby size compared to fruits'
                    width={461}
                    height={379}
                    sizes="(max-width: 1440px) 100vw, 461px"
                    style={{ width: '100%', height: 'auto' }}
                    />
                    <p>Ваш малюк зараз розміом з {data.analogy}</p>
                </div>
                <ul>
                    <li className={css.aboutBaby}>
                        {data.babyActivity}
                        {data.babyDevelopment}
                    </li>
                    <li className={css.fact}>
                        <div className={css.titleContainer}>
                            <Icon name={"star"} width={24} height={24}/>
                            <h2 className={css.title}>Цікавий факт тижня</h2>
                        </div>
                        <p className={css.text}>{data.interestingFact}</p>
                    </li>
                </ul>
            </div>
            ) : activeTab === "mom" && "feelings" in data ? (
                <div className={css.momTabsContainer}>
                <div>
                    <div className={css.momContainer}>
                        <h2 className={css.momTitle}>Як ви можете почуватись</h2>
                        <ul className={css.feelings}>
                            {data.feelings.states.map(( state ) => (
                                <li key={state} 
                                className={css.feeling}
                                >
                                    {state}
                                </li>
                            ))}
                        </ul>
                        <p className={css.text}>{data.feelings.sensationDescr}</p>
                    </div>
                    <div className={`${css.momContainer} ${css.tip}`}>
                        <h2 className={css.momTitle}>Поради для вашого комфорту</h2>
                        <ul className={css.text}>
                            {data.comfortTips.map((comfortTip) => (
                                <li key={comfortTip.category}
                                className={css.comfortTip}
                                >
                                    <Icon name={iconMap[comfortTip.category]} width={24} height={24}/>
                                    <div>
                                        <h3 className={css.category}>{comfortTip.category}</h3>
                                        <p>{comfortTip.tip}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <TasksReminderCard />
            </div>
            ) : null}
        </div>
    )
};

export default JourneyDetails;