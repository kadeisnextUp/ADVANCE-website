import type { Event } from './events';
import { isPast, isTba } from './get-upcoming-events';

export interface MonthGroup {
  label: string;
  events: Event[];
}

function monthKey(event: Event): string {
  return isTba(event.date) ? 'TBA' : event.date.slice(0, 7);
}

function monthLabel(key: string): string {
  if (key === 'TBA') return 'TBA';
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function groupByMonth(events: Event[]): MonthGroup[] {
  const groups = new Map<string, Event[]>();

  for (const event of events) {
    const key = monthKey(event);
    const existing = groups.get(key);
    if (existing) {
      existing.push(event);
    } else {
      groups.set(key, [event]);
    }
  }

  const keys = [...groups.keys()];
  const tbaIndex = keys.indexOf('TBA');
  if (tbaIndex !== -1) {
    keys.splice(tbaIndex, 1);
    keys.push('TBA');
  }

  return keys.map((key) => ({ label: monthLabel(key), events: groups.get(key)! }));
}

export function groupEventsByMonth(
  events: Event[],
  referenceDate: Date = new Date()
): { upcoming: MonthGroup[]; past: MonthGroup[] } {
  const upcoming = events
    .filter((event) => !isPast(event.date, referenceDate))
    .sort((a, b) => {
      const aTba = isTba(a.date);
      const bTba = isTba(b.date);
      if (aTba && !bTba) return 1;
      if (!aTba && bTba) return -1;
      if (aTba && bTba) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const past = events
    .filter((event) => isPast(event.date, referenceDate))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    upcoming: groupByMonth(upcoming),
    past: groupByMonth(past),
  };
}
