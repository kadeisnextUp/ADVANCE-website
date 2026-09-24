'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
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

  const hasConfirmedUpcoming = upcoming.some((group) => group.label !== 'TBA');

  function renderGroup(group: MonthGroup, collapsedByDefault: boolean) {
    const isTbaGroup = group.label === 'TBA';
    const labelText = isTbaGroup ? 'Dates pending' : group.label;
    const headingClass = isTbaGroup
      ? 'border-foreground/20 text-foreground/50 italic'
      : 'border-primary/50 text-primary/80';

    const cards = (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.events.map((event) => (
          <EventCard key={event.id} event={event} onImageClick={setActiveEvent} />
        ))}
      </div>
    );

    if (!collapsedByDefault) {
      return (
        <div key={group.label} className="mb-8">
          <h3 className={`mb-3 border-l-2 pl-3 text-sm tracking-wide ${headingClass}`}>
            {labelText}
          </h3>
          {cards}
        </div>
      );
    }

    return (
      <details key={group.label} className="group mb-8">
        <summary
          className={`mb-3 flex list-none items-center gap-2 border-l-2 pl-3 text-sm tracking-wide [&::-webkit-details-marker]:hidden ${headingClass}`}
        >
          <ChevronRight
            className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
          {labelText}
        </summary>
        <div className="mt-3">{cards}</div>
      </details>
    );
  }

  function renderColumn(
    heading: string,
    groups: MonthGroup[],
    emptyMessage: string,
    options: { collapseAfterFirst?: boolean } = {}
  ) {
    const headingId = `events-${heading.toLowerCase()}-heading`;
    return (
      <section aria-labelledby={headingId}>
        <h2 id={headingId} className="mb-4 text-xl font-bold text-primary">
          {heading}
        </h2>
        {heading === 'Upcoming' && !hasConfirmedUpcoming && groups.length > 0 && (
          <p className="mb-6 text-sm text-foreground/70">
            No confirmed dates yet. Follow{' '}
            <a
              href="https://instagram.com/advance_uc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              @advance_uc
            </a>{' '}
            to stay up-to-date.
          </p>
        )}
        {groups.length === 0 ? (
          <p className="text-foreground/70">{emptyMessage}</p>
        ) : (
          groups.map((group, index) =>
            renderGroup(group, Boolean(options.collapseAfterFirst) && index > 0)
          )
        )}
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 sm:grid-cols-2">
      {renderColumn('Upcoming', upcoming, 'No events yet. Check back soon.')}
      {renderColumn('Past', past, 'No past events yet.', { collapseAfterFirst: true })}
      <EventLightbox event={activeEvent} onClose={() => setActiveEvent(null)} />
    </div>
  );
}