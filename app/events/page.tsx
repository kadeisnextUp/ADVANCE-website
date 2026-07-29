import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/page-banner';
import { EventsView } from '@/components/events/events-view';
import { events } from '@/lib/data/events';
import { groupEventsByMonth } from '@/lib/data/group-events-by-month';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Events | ADVANCE',
  description: "Browse ADVANCE's upcoming and past events, all in one place.",
};

export default function EventsPage() {
  const { upcoming, past } = groupEventsByMonth(events);

  return (
    <>
      <PageBanner tagline="ADVANCE — Where We Experience Growth Beyond The Classroom!!!" />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary">Events</h1>
        <p className="text-foreground/80">
          Browse ADVANCE&apos;s upcoming and past events, all in one place.
        </p>
      </section>

      <EventsView upcoming={upcoming} past={past} />
    </>
  );
}
