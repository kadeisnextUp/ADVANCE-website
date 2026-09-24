import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/page-banner';
import { SponsorPitch } from '@/components/sponsors/sponsor-pitch';
import { SponsorRoster } from '@/components/sponsors/sponsor-roster';
import { SponsorFaq } from '@/components/sponsors/sponsor-faq';
import { sponsors } from '@/lib/data/sponsors';

export const metadata: Metadata = {
  title: 'Sponsors | ADVANCE',
  description:
    'Sponsorship opportunities with ADVANCE, a University of Cincinnati student organization recognized with the Chevron Award from NACE.',
};

export default function SponsorsPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Where We Are Supporting Future Leaders Through Partnership!!!" />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary">Our Sponsors</h1>
        <p className="text-foreground/80">
          Since 1986, ADVANCE has earned the Chevron Award from NACE for preparing University of
          Cincinnati students to lead — we&apos;re building partnerships with organizations that
          want to invest in that legacy.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative h-64 w-full sm:h-80">
          <Image
            src="/images/Executive_Board_Photos/Group_photos/Executive_Board_Retreat_2025_2.webp"
            alt="ADVANCE's Executive Board at their 2025 retreat"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-sm text-foreground/60">The students your sponsorship supports directly.</p>
      </div>

      <SponsorPitch />
      <SponsorRoster sponsors={sponsors} />
      <SponsorFaq />
    </>
  );
}