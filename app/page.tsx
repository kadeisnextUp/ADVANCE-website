import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/about/about-section';
import { UpcomingEvents } from '@/components/home/upcoming-events';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection
        heading="A Legacy Since 1986"
        body={
          <p>
            ADVANCE was founded by four African American University of Cincinnati students
            working alongside Terry Davis, then Assistant Director of UC&apos;s Career
            Development Center, who saw a gap in career preparation and built the organization to
            close it. That work — inspired by the Corporate Orientation Program (CORP) — went on
            to earn ADVANCE the Chevron Award from NACE, a distinction few student organizations
            ever hold.
          </p>
        }
        imageSrc="images/Old_Advance_Photos/Advance_Newsletter_1.webp"
        imageAlt="An archival ADVANCE newsletter"
        imageSide="left"
        linkHref="/about"
        linkText="Learn our story"
      />
      <UpcomingEvents />
    </>
  );
}
