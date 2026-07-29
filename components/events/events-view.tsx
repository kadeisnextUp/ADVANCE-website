'use client';

import { useState } from 'react';
import { EventCard } from './event-card';
import { EventLightbox } from './event-lightbox';
import type { Event } from '@/lib/data/events';
import type { MonthGroup } from '@/lib/data/group-events-by-month';

interface EventsViewProps {
  upcoming: MonthGroup[];
  past: MonthGroup[];
}

export function EventsView({ upcoming, past }: EventsViewProps) {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  function renderColumn(heading: string, groups: MonthGroup[]) {
    return (
      <section aria-label={heading}>
        <h2 className="mb-4 text-xl font-bold text-primary">{heading}</h2>
        {groups.length === 0 ? (
          <p className="text-foreground/70">No events yet. Check back soon.</p>
        ) : (
          groups.map((group) => (
            <div key={group.label} className="mb-8">
              <h3 className="mb-3 border-l-2 border-primary/50 pl-3 text-sm tracking-wide text-primary/80">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.events.map((event) => (
                  <EventCard key={event.id} event={event} onImageClick={setActiveEvent} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 sm:grid-cols-2">
      {renderColumn('Upcoming', upcoming)}
      {renderColumn('Past', past)}
      <EventLightbox event={activeEvent} onClose={() => setActiveEvent(null)} />
    </div>
  );
}
