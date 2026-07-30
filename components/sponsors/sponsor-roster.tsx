import Image from 'next/image';
import type { Sponsor } from '@/lib/data/sponsors';

interface SponsorRosterProps {
  sponsors: Sponsor[];
}

export function SponsorRoster({ sponsors }: SponsorRosterProps) {
  return (
    <section aria-labelledby="sponsor-roster-heading" className="mx-auto max-w-6xl px-6 py-12">
      <h2 id="sponsor-roster-heading" className="mb-6 text-2xl font-bold text-primary">
        Our Sponsors
      </h2>
      {sponsors.length === 0 ? (
        <p className="text-center text-foreground/70">
          We&apos;re building sponsor partnerships for 2026-2027. Interested in being our first?
          Reach out below.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="rounded-xl bg-background p-5 ring-1 ring-primary/15">
              {sponsor.logo && (
                <div className="relative mb-3 h-16 w-full">
                  <Image
                    src={`/${sponsor.logo}`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 317px, (min-width: 640px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="mb-1 font-bold text-primary">{sponsor.name}</h3>
              <p className="text-sm text-foreground/80">{sponsor.description}</p>
              {sponsor.website && (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}'s website`}
                  className="mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline"
                >
                  Visit website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
