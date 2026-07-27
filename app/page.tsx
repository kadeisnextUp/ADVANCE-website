import { Hero } from '@/components/home/hero';
import { UpcomingEvents } from '@/components/home/upcoming-events';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
    </>
  );
}
