import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/page-banner';
import { ResourceLinkList } from '@/components/resources/resource-link-list';
import { helpfulLinks, memberForms } from '@/lib/data/resources';

export const metadata: Metadata = {
  title: 'Resources | ADVANCE',
  description:
    'Materials to help ADVANCE members and UC students grow personally and professionally.',
};

export default function ResourcesPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Where We Are Empowering Leaders With Knowledge!!!" />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <h1 className="mb-2 text-3xl font-bold text-primary">Resources</h1>
        <p className="text-foreground/80">
          Welcome to the ADVANCE Resources page! Here, members and students can access materials
          to help them grow personally and professionally.
        </p>
      </section>

      <ResourceLinkList
        heading="Forms & RSVPs"
        intro="Apply for the Executive Board or RSVP for an upcoming event."
        links={memberForms}
      />
      <ResourceLinkList
        heading="Helpful Links"
        intro="A curated set of tools for resumes, job searches, and professional development."
        links={helpfulLinks}
      />
    </>
  );
}