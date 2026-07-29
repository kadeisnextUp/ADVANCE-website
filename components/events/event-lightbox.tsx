'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Event } from '@/lib/data/events';

interface EventLightboxProps {
  event: Event | null;
  onClose: () => void;
}

export function EventLightbox({ event, onClose }: EventLightboxProps) {
  return (
    <Dialog open={event !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[92vw] bg-black p-4 ring-primary/20 sm:max-w-[92vw]">
        {event && (
          <>
            <DialogTitle className="text-center text-primary">{event.title}</DialogTitle>
            <div className="relative mx-auto h-[75vh] w-[85vw] max-w-3xl">
              <Image
                src={`/${event.full}`}
                alt={event.title}
                fill
                sizes="85vw"
                className="object-contain"
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
