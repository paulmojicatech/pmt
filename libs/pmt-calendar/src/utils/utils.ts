import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import { CalendarView } from "../models/calendar.types";

export function getNextView(currentView: CalendarView, currentDate: Date): Date {
  switch (currentView) {
    case 'Day': {
      return addDays(currentDate, 1);
    }
    case 'Week': {
      return addWeeks(currentDate, 1);
    }
    case 'Month': {
      return addMonths(currentDate, 1);
    }
    case 'Year': {
      return addYears(currentDate, 1);
    }
    default: 
      return undefined;
  }
}

export function getPrevView(currentView: CalendarView, currentDate: Date): Date {
  switch (currentView) {
    case 'Day': {
      return subDays(currentDate, 1);
    }
    case 'Week': {
      return subWeeks(currentDate, 1);
    }
    case 'Month': {
      return subMonths(currentDate, 1);
    }
    case 'Year': {
      return subYears(currentDate, 1);
    }
    default:
      return undefined;
  }
}
