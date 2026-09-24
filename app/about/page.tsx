import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/page-banner';
import { AboutSection } from '@/components/about/about-section';

export const metadata: Metadata = {
  title: 'About | ADVANCE',
  description:
    "ADVANCE is a professional development student organization founded in 1986 by four African American students at the University of Cincinnati, alongside Terry Davis, then Assistant Director of the university's Career Development Center.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Where We Are Building Leaders and Shaping Legacies!!!" />

      <div className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="text-3xl font-bold text-primary">About ADVANCE</h1>
      </div>

      <AboutSection
        heading="Who We Are"
        body={
          <>
            <p className="text-xl font-semibold text-primary">
              In 1986, four University of Cincinnati students decided the career preparation gap they saw
              shouldn&apos;t exist for the next generation and built ADVANCE to close it.
            </p>
            <p>
              Working alongside Terry Davis, then Assistant Director of UC&apos;s Career
              Development Center, and inspired by the Corporate Orientation Program (CORP), they
              built a professional development organization from the ground up. Decades later,
              that work earned ADVANCE the Chevron Award from the National Association of
              Colleges and Employers (NACE) — a distinction few student organizations ever hold.
            </p>
          </>
        }
        imageSrc="images/Old_Advance_Photos/Advance_Newsletter_2.webp"
        imageAlt="An archival ADVANCE newsletter"
        imageSide="left"
      />

      <AboutSection
        heading="Our Mission"
        body={
          <p>
            ADVANCE exists to prepare University of Cincinnati students for a world of effective
            professionalism, building a cohesive community focused on the advancement of its
            members. As an educational program operating under UC&apos;s Career Development
            Center, ADVANCE bridges the gap between the classroom and the career students are
            working toward.
          </p>
        }
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_1.webp"
        imageAlt="The Men of Honor Gala 2024"
        imageSide="right"
        tint
      />

      <AboutSection
        heading="Goals"
        body={
          <>
            <p>ADVANCE is built around three goals:</p>
            <ol className="list-decimal space-y-2 pl-5 marker:text-primary">
              <li>Equipping members with the tools and resources to succeed in their careers.</li>
              <li>Connecting them with mentors and industry professionals.</li>
              <li>
                Creating consistent opportunities to network and grow through workshops and
                events.
              </li>
            </ol>
          </>
        }
        imageSrc="images/Old_Advance_Photos/Advance_20th_Annual_Report.webp"
        imageAlt="ADVANCE 20th Annual Report"
        imageSide="left"
      />

      <AboutSection
        heading="Benefits to Students"
        body={
          <p>
            Members join a supportive community of like-minded students and gain direct access to
            industry professionals and ADVANCE alumni. Beyond networking, members receive
            exclusive job and internship postings, along with discounted access to ADVANCE events
            and workshops throughout the year.
          </p>
        }
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_2.webp"
        imageAlt="30th Annual ADVANCE Networking Reception"
        imageSide="right"
        tint
      />

      <AboutSection
        heading="Programs & Events"
        body={
          <p>
            Throughout the year, ADVANCE hosts networking receptions, professional development
            workshops, and its signature Corporate Excursion. The organization partners with
            local businesses and community organizations to give members real-world professional
            experience alongside opportunities to give back.
          </p>
        }
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_3.webp"
        imageAlt="Programs & Events"
        imageSide="left"
        linkHref="/join"
        linkText="Join ADVANCE"
      />
    </>
  );
}