import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/page-banner';
import { SponsorPitch } from '@/components/sponsors/sponsor-pitch';
import { SponsorRoster } from '@/components/sponsors/sponsor-roster';
import { SponsorFaq } from '@/components/sponsors/sponsor-faq';
import { sponsors } from '@/lib/data/sponsors';

export const metadata: Metadata = {
  title: 'Sponsors | ADVANCE',
  description:
    'Partner with ADVANCE to support the next generation of student leaders at the University of Cincinnati.',
};

export default function SponsorsPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Where We Are Supporting Future Leaders Through Partnership!!!" />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary">Sponsors</h1>
        <p className="text-foreground/80">
          We&apos;re building meaningful partnerships with organizations that invest in student
          success, leadership, and opportunity.
        </p>
      </section>

      <SponsorPitch />
      <SponsorRoster sponsors={sponsors} />
      <SponsorFaq />
    </>
  );
}
