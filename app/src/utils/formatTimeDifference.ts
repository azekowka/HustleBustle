import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears, addYears, addMonths } from 'date-fns';

export function formatTimeDifference(endDate: Date, type: 'till' | 'from', now: Date) {
  const [start, end] = type === 'till' ? [now, endDate] : [endDate, now];

  const totalSeconds = Math.max(0, differenceInSeconds(end, start));
  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, addYears(start, years));
  const days = differenceInDays(end, addMonths(addYears(start, years), months));
  const hours = differenceInHours(end, addMonths(addYears(start, years), months)) % 24;
  const minutes = differenceInMinutes(end, addMonths(addYears(start, years), months)) % 60;
  const seconds = totalSeconds % 60;

  return {
    total: totalSeconds * 1000,
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
}

