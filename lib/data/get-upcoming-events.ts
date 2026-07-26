import type { Event, EventDate } from './events';

function isTba(date: EventDate): boolean {
  return date === 'TBA' || date.startsWith('TBA ');
}

function isPast(date: EventDate, referenceDate: Date): boolean {
  if (isTba(date)) return false;
  return new Date(`${date}T23:59:59`) < referenceDate;
}

export function getUpcomingEvents(events: Event[], referenceDate: Date = new Date()): Event[] {
  const upcoming = events.filter((event) => !isPast(event.date, referenceDate));

  const dated = upcoming
    .filter((event) => !isTba(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const tba = upcoming.filter((event) => isTba(event.date));

  return [...dated, ...tba];
}
