'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface AboutSectionProps {
  heading: string;
  body: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageSide: 'left' | 'right';
  linkHref?: string;
  linkText?: string;
  tint?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function AboutSection({
  heading,
  body,
  imageSrc,
  imageAlt,
  imageSide,
  linkHref,
  linkText,
  tint = false,
}: AboutSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const headingId = slugify(heading);

  // Only offset horizontally at sm+ — at mobile widths this stays fade-only,
  // since translating a full-width row off-screen causes horizontal overflow.
  const hiddenTranslateClass = imageSide === 'left' ? 'sm:-translate-x-6' : 'sm:translate-x-6';
  const revealClass = visible ? 'translate-x-0 opacity-100' : `opacity-0 ${hiddenTranslateClass}`;

  return (
    <section
      ref={ref}
      aria-labelledby={headingId}
      className={`mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 transition-all duration-700 ease-out motion-reduce:transition-none sm:flex-row ${
        imageSide === 'right' ? 'sm:flex-row-reverse' : ''
      } ${revealClass} motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
        tint ? 'bg-primary/[0.03]' : ''
      }`}
    >
      <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-80 sm:w-1/2">
        <Image
          src={`/${imageSrc}`}
          alt={imageAlt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="sm:w-1/2">
        <h2 id={headingId} className="mb-4 text-2xl font-bold text-primary">
          {heading}
        </h2>
        <div className="space-y-3 text-foreground/80">{body}</div>
        {linkHref && linkText ? (
          <Link
            href={linkHref}
            className="mt-4 inline-block text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {linkText} →
          </Link>
        ) : null}
      </div>
    </section>
  );
}