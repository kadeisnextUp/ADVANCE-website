import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/lib/data/events';
import { formatEventDate } from '@/lib/data/format-event-date';
import { getUpcomingEvents, isTba } from '@/lib/data/get-upcoming-events';

export function UpcomingEvents() {
  const upcoming = getUpcomingEvents(events);
  const dated = upcoming.filter((event) => !isTba(event.date));
  const planned = upcoming.filter((event) => isTba(event.date));

  if (dated.length === 0) {
    // Server-side nudge for maintainers: the homepage is showing the fallback
    // card below, not the event grid. Add real dates to lib/data/events.ts,
    // or this keeps logging (harmlessly) until someone does.
    console.warn(
      '[UpcomingEvents] No dated upcoming events in lib/data/events.ts — homepage is showing the "in the works" fallback.'
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary">Upcoming Events</h2>
        <Link
          href="/events"
          className="shrink-0 text-sm text-primary underline underline-offset-2 hover:text-primary/80"
        >
          See all events →
        </Link>
      </div>

      {dated.length === 0 ? (
        <Card className="border-primary/25 bg-background">
          <CardContent className="py-10 text-center text-foreground/70">
            <p>
              {planned.length === 0
                ? 'Check back soon for new events!'
                : 'New events are in the works — dates coming soon.'}
            </p>
            {planned.length > 0 ? (
              <p className="mt-2 text-sm text-foreground/60">
                In planning: {planned.map((event) => event.title).join(', ')}
              </p>
            ) : null}
            <Link
              href="/events"
              className="mt-4 inline-block text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Browse our full event calendar →
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {upcoming.map((event) => (
            <Card
              key={event.id}
              className="min-w-[85%] shrink-0 snap-center border-primary/15 bg-background sm:min-w-0"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={`/${event.flyer}`}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 85vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-primary">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <time className="mb-2 block text-sm text-foreground/70">
                  {formatEventDate(event.date)}
                </time>
                <p className="text-sm text-foreground/80">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
