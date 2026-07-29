import { describe, expect, it } from 'vitest';
import type { Event } from './events';
import { groupEventsByMonth } from './group-events-by-month';

const baseEvent: Event = {
  id: 'base',
  title: 'Base Event',
  date: '2026-01-01',
  flyer: 'images/flyer.webp',
  full: 'images/flyer.webp',
  description: 'desc',
};

describe('groupEventsByMonth', () => {
  it('splits events into upcoming and past relative to the reference date', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'past', date: '2020-01-01' },
      { ...baseEvent, id: 'future', date: '2030-01-01' },
    ];

    const { upcoming, past } = groupEventsByMonth(events, new Date('2026-07-25'));

    expect(upcoming.flatMap((g) => g.events.map((e) => e.id))).toEqual(['future']);
    expect(past.flatMap((g) => g.events.map((e) => e.id))).toEqual(['past']);
  });

  it('keeps a same-day event as upcoming until the end of that day', () => {
    const events: Event[] = [{ ...baseEvent, id: 'today', date: '2026-07-25' }];

    const { upcoming, past } = groupEventsByMonth(events, new Date('2026-07-25T09:00:00'));

    expect(upcoming.flatMap((g) => g.events.map((e) => e.id))).toEqual(['today']);
    expect(past).toEqual([]);
  });

  it('groups upcoming events by month with human-readable labels, ascending', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'feb', date: '2030-02-15' },
      { ...baseEvent, id: 'jan-a', date: '2030-01-05' },
      { ...baseEvent, id: 'jan-b', date: '2030-01-20' },
    ];

    const { upcoming } = groupEventsByMonth(events, new Date('2026-07-25'));

    expect(upcoming.map((g) => g.label)).toEqual(['January 2030', 'February 2030']);
    expect(upcoming[0].events.map((e) => e.id)).toEqual(['jan-a', 'jan-b']);
  });

  it('groups past events by month, most recent month first', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'nov', date: '2020-11-10' },
      { ...baseEvent, id: 'dec-a', date: '2020-12-01' },
      { ...baseEvent, id: 'dec-b', date: '2020-12-20' },
    ];

    const { past } = groupEventsByMonth(events, new Date('2026-07-25'));

    expect(past.map((g) => g.label)).toEqual(['December 2020', 'November 2020']);
    expect(past[0].events.map((e) => e.id)).toEqual(['dec-b', 'dec-a']);
  });

  it('groups TBA events into their own group, ordered after all dated months', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'tba-1', date: 'TBA' },
      { ...baseEvent, id: 'dated', date: '2030-01-01' },
      { ...baseEvent, id: 'tba-2', date: 'TBA Spring 2027' },
    ];

    const { upcoming } = groupEventsByMonth(events, new Date('2026-07-25'));

    expect(upcoming.map((g) => g.label)).toEqual(['January 2030', 'TBA']);
    expect(upcoming[1].events.map((e) => e.id)).toEqual(['tba-1', 'tba-2']);
  });

  it('returns empty groups for an empty events array', () => {
    const { upcoming, past } = groupEventsByMonth([], new Date('2026-07-25'));

    expect(upcoming).toEqual([]);
    expect(past).toEqual([]);
  });
});
