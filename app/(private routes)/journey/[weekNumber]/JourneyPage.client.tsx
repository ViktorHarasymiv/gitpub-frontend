'use client';

import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import { useState } from "react";
import { JourneyBaby, JourneyMom, Tab } from "@/types/journey";
import { getJourneyByWeekNumberAndTab } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";
import Loader from "@/components/ui/Loader/Loader";

interface JourneyPageClientProps {
    currentWeek: number;
};

const JourneyPageClient = ({ currentWeek }: JourneyPageClientProps) => {
    const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
    const [activeTab, setActiveTab] = useState<Tab>("baby");
    
    const { data, isLoading,} = useQuery<JourneyBaby | JourneyMom>({
        queryKey: ['journey', selectedWeek, activeTab],
        queryFn: () => getJourneyByWeekNumberAndTab(selectedWeek, activeTab),
        refetchOnMount: false,
    });

    if (isLoading) return <Loader loading={true} />

    return(
         <>
         <GreetingBlock />

         <WeekSelector 
         currentWeek={currentWeek} 
         onSelectedWeek={setSelectedWeek}
         />

         {data ? (
            <JourneyDetails 
         activeTab={activeTab}
         onChangeTab={setActiveTab}
         data={data}
         />
        ) : null}
         </>
    )
};

export default JourneyPageClient;