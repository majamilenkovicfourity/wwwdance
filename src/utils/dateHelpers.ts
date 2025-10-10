import { EventData } from './datatype';

export const monthNameToNumber = (monthName: string): number => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames.indexOf(monthName);
};

const monthToNumber: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function sortEvents(events: EventData[]) {
  return events.sort((a, b) => {
    const getDate = (d: EventData['date']) => {
      // take first day from range or single day
      const day = parseInt(d.days.split('.')[0]);
      const month = monthToNumber[d.month];
      return new Date(d.year, month, day).getTime();
    };

    return getDate(a.date) - getDate(b.date); // ascending: nearest → newest
  });
}

function getEventDate(d: EventData['date']) {
  const day = parseInt(d.days.split('.')[0]); // first day
  const month = monthToNumber[d.month];
  return new Date(d.year, month, day);
}

export function getNext3Events(events: EventData[]): EventData[] {
  const today = new Date();

  return events
    .filter((event) => getEventDate(event.date) >= today) // only future/today
    .sort(
      (a, b) => getEventDate(a.date).getTime() - getEventDate(b.date).getTime()
    )
    .slice(0, 3);
}

// Main function: group by "Month Year", sort, exclude past events
export const groupByYearAndMonth = (events: EventData[]) => {
  const today = new Date();

  const groupedEvents: { [key: string]: EventData[] } = {};

  // Only include future events
  events
    .filter((event) => getEventDate(event.date) >= today)
    .forEach((event) => {
      const yearMonth = `${event.date.month} ${event.date.year}`;
      if (!groupedEvents[yearMonth]) groupedEvents[yearMonth] = [];
      groupedEvents[yearMonth].push(event);
    });

  // Sort months chronologically
  return Object.entries(groupedEvents)
    .sort(([a], [b]) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');

      const dateA = new Date(Number(yearA), monthToNumber[monthA]);
      const dateB = new Date(Number(yearB), monthToNumber[monthB]);

      return dateA.getTime() - dateB.getTime();
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: EventData[] });
};
