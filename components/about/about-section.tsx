'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface AboutSectionProps {
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageSide: 'left' | 'right';
}

export function AboutSection({ heading, body, imageSrc, imageAlt, imageSide }: AboutSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const hiddenTranslateClass = imageSide === 'left' ? '-translate-x-6' : 'translate-x-6';

  return (
    <div
      ref={ref}
      className={`mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 transition-all duration-700 ease-out sm:flex-row ${
        imageSide === 'right' ? 'sm:flex-row-reverse' : ''
      } ${visible ? 'translate-x-0 opacity-100' : `${hiddenTranslateClass} opacity-0`}`}
    >
      <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-80 sm:w-1/2">
        <Image src={`/${imageSrc}`} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="sm:w-1/2">
        <h2 className="mb-4 text-2xl font-bold text-primary">{heading}</h2>
        <p className="text-foreground/80">{body}</p>
      </div>
    </div>
  );
}
