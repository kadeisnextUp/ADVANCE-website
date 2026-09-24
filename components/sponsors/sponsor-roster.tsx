import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Sponsor } from '@/lib/data/sponsors';

interface SponsorRosterProps {
  sponsors: Sponsor[];
}

export function SponsorRoster({ sponsors }: SponsorRosterProps) {
  return (
    <section aria-labelledby="sponsor-roster-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-roster-heading" className="mb-6 text-2xl font-bold text-primary">
        Current Sponsors
      </h2>
      {sponsors.length === 0 ? (
        <div className="flex flex-wrap items-baseline justify-between gap-6 border-y border-primary/25 py-10">
          <div>
            <h3 className="text-lg font-bold text-primary sm:text-xl">Be Our Founding Sponsor</h3>
            <p className="mt-2 max-w-md text-foreground/80">
              We&apos;re building sponsor partnerships for 2026-2027, and you could be the first
              name on this page.
            </p>
          </div>
          <div>
            <Button render={<a href="mailto:advanceboard@gmail.com" />} nativeButton={false} size="lg">
              Email Us
            </Button>
            <p className="mt-3 text-sm text-foreground/60">advanceboard@gmail.com</p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-primary/25 border-y border-primary/25">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-10"
            >
              {sponsor.logo ? (
                <div className="relative h-16 w-full sm:h-20">
                  <Image
                    src={`/${sponsor.logo}`}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <h3 className="text-lg font-bold text-primary sm:text-xl">{sponsor.name}</h3>
              )}
              <div className="sm:self-center">
                {sponsor.logo && (
                  <h3 className="mb-1 text-lg font-bold text-primary sm:text-xl">{sponsor.name}</h3>
                )}
                <p className="line-clamp-4 text-foreground/80">{sponsor.description}</p>
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${sponsor.name}'s website`}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Visit website
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}