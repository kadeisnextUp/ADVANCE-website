import { describe, expect, it } from 'vitest';
import type { Event } from './events';
import { getUpcomingEvents } from './get-upcoming-events';

const baseEvent: Event = {
  id: 'base',
  title: 'Base Event',
  date: '2026-01-01',
  flyer: 'images/flyer.webp',
  full: 'images/flyer.webp',
  description: 'desc',
};

describe('getUpcomingEvents', () => {
  it('excludes events with a past date', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'past', date: '2020-01-01' },
      { ...baseEvent, id: 'future', date: '2030-01-01' },
    ];

    const result = getUpcomingEvents(events, new Date('2026-07-25'));

    expect(result.map((e) => e.id)).toEqual(['future']);
  });

  it('sorts real dates chronologically, soonest first', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'later', date: '2030-06-01' },
      { ...baseEvent, id: 'sooner', date: '2030-01-01' },
    ];

    const result = getUpcomingEvents(events, new Date('2026-07-25'));

    expect(result.map((e) => e.id)).toEqual(['sooner', 'later']);
  });

  it('places TBA events after all dated events, preserving original order', () => {
    const events: Event[] = [
      { ...baseEvent, id: 'tba-1', date: 'TBA' },
      { ...baseEvent, id: 'dated', date: '2030-01-01' },
      { ...baseEvent, id: 'tba-2', date: 'TBA Spring 2027' },
    ];

    const result = getUpcomingEvents(events, new Date('2026-07-25'));

    expect(result.map((e) => e.id)).toEqual(['dated', 'tba-1', 'tba-2']);
  });
});
