import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/lib/data/events';
import { getUpcomingEvents } from '@/lib/data/get-upcoming-events';

function formatEventDate(date: string): string {
  if (date.startsWith('TBA')) return date;
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function UpcomingEvents() {
  const upcoming = getUpcomingEvents(events);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold text-primary">Upcoming Events</h2>

      {upcoming.length === 0 ? (
        <Card className="border-primary/25 bg-background">
          <CardContent className="py-10 text-center text-foreground/70">
            Check back soon for new events!
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
                <Image src={`/${event.flyer}`} alt="" fill className="object-cover" />
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
