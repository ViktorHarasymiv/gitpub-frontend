import { Journey, JourneyMom, JourneyBaby } from '@/types/journey';
import axios from 'axios';

export const fetchCurrentWeek = async() => {
    const response = await axios.get<Journey>(`${URL}/current`);
    return response.data.weekNumber;
};

export const getJourneyByWeekNumberAndTab = async (
    weekNumber: number,
    activeTab: string,
) => {
    const res = await axios.get<JourneyBaby | JourneyMom>(`${URL}/weeks/${weekNumber}/${activeTab}`);
    return res.data;
};