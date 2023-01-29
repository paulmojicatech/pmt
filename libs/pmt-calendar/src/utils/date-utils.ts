import {getDay} from 'date-fns';
import { DAY_OF_WEEK } from '../models/calendar.const';

export function getDayOfWeekGivenDate(date: Date): string {
    const dow = getDay(date);
    return DAY_OF_WEEK[dow];
}