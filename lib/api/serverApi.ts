import axios from 'axios';
import { cookies } from "next/headers";
import { Journey, JourneyMom, JourneyBaby } from "@/types/journey";

export const fetchCurrentWeekServer = async() => {
    const cookieStore = await cookies();
    const response = await axios.get<Journey>('/current',
        {
        headers: {
            Cookie: cookieStore.toString(),
        },
});
    return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTabServer = async (
    weekNumber: number,
    activeTab: string = "baby",
) => {
    const cookieStore = await cookies();
    const res = await axios.get<JourneyBaby | JourneyMom>(`/journej/${weekNumber}/${activeTab}`,
        {
        headers: {
            Cookie: cookieStore.toString(),
        },
});
    return res.data;
};