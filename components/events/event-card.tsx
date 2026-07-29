'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { formatEventDate } from '@/lib/data/format-event-date';
import type { Event } from '@/lib/data/events';

interface EventCardProps {
  event: Event;
  onImageClick: (event: Event) => void;
}

export function EventCard({ event, onImageClick }: EventCardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl bg-background ring-1 ring-primary/15 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => onImageClick(event)}
        className="relative block h-56 w-full cursor-zoom-in"
        aria-label={`View full-size flyer for ${event.title}`}
      >
        <Image
          src={`/${event.flyer}`}
          alt=""
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover"
        />
      </button>
      <div className="p-4">
        <h4 className="mb-1 font-bold text-primary">{event.title}</h4>
        <time className="mb-2 block text-sm text-foreground/70">{formatEventDate(event.date)}</time>
        <p className="text-sm text-foreground/80">{event.description}</p>
      </div>
    </div>
  );
}
