import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/page-banner';
import { JoinForm } from '@/components/join/join-form';

export const metadata: Metadata = {
  title: 'The Process | ADVANCE',
  description:
    'Joining ADVANCE takes two simple steps: register on CampusLink, then fill out our interest form.',
};

export default function JoinPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Where Your Leadership Journey Begins!!!" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-4 text-3xl font-bold text-primary">The Process</h1>
        <p className="mb-2 text-foreground/80">Joining ADVANCE takes two simple steps.</p>
        <p className="mb-8 text-foreground/80">
          Since 1986, ADVANCE has earned the Chevron Award from NACE for preparing UC students to
          lead. Take the first step toward being part of that legacy.
        </p>

        <ol className="mb-8 space-y-6">
          <li>
            <h2 className="mb-1 text-xl font-semibold text-primary">1. Register on CampusLink.</h2>
            <p className="text-foreground/80">
              Visit ADVANCE&apos;s{' '}
              <a
                href="https://campuslink.uc.edu/organization/advance1986"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                CampusLink page
              </a>{' '}
              and join as a registered University of Cincinnati student organization member.
            </p>
          </li>
          <li>
            <h2 className="mb-1 text-xl font-semibold text-primary">2. Fill out our interest form.</h2>
            <p className="text-foreground/80">
              Click below to fill out our informational form, and a team member will reach out to
              you soon.
            </p>
          </li>
        </ol>

        <p className="mb-2 text-sm text-foreground/60">
          Already registered on CampusLink? If not, do that first — then come back here for step
          2.
        </p>

        <p className="mb-2 text-sm text-foreground/60">
          Have questions before you start?{' '}
          <a
            href="mailto:advanceboard@gmail.com"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Reach out to our board
          </a>{' '}
          — we&apos;re happy to help.
        </p>

        <JoinForm />
      </section>
    </>
  );
}
