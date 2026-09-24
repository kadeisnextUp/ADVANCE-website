'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { formatEventDate } from '@/lib/data/format-event-date';
import { isTba } from '@/lib/data/get-upcoming-events';
import type { Event } from '@/lib/data/events';

interface EventLightboxProps {
  event: Event | null;
  onClose: () => void;
}

export function EventLightbox({ event, onClose }: EventLightboxProps) {
  return (
    <Dialog open={event !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-[92vw] overflow-y-auto bg-background p-4 text-foreground ring-primary/20 sm:max-w-[92vw]">
        {event && (
          <>
            <DialogTitle className="text-center text-xl text-primary">{event.title}</DialogTitle>
            <DialogDescription className="space-y-1 text-center text-foreground/70">
              <span className="block">
                <time dateTime={isTba(event.date) ? undefined : event.date}>
                  {formatEventDate(event.date)}
                </time>
                {event.location ? ` · ${event.location}` : null}
              </span>
              <span className="block text-foreground/80">{event.description}</span>
            </DialogDescription>
            <div className="relative mx-auto h-[60vh] w-full max-w-3xl">
              <Image
                src={`/${event.full}`}
                alt={event.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}