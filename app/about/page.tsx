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

      <h1 className="sr-only">About ADVANCE</h1>

      <AboutSection
        heading="Who We Are"
        body="ADVANCE is a professional development student organization founded in 1986 by four African American students at the University of Cincinnati, alongside Terry Davis, then Assistant Director of the university's Career Development Center, in response to the need for stronger career awareness and preparation among minority students. The organization was inspired by the Corporate Orientation Program (CORP), which operated under the Council on Career Development Minorities, Inc. In the decades since, ADVANCE has remained a unique program among colleges and universities, earning the Chevron Award from the National Association of Colleges and Employers (NACE) for its outstanding work."
        imageSrc="images/Logos/ADVANCE_new_logo.webp"
        imageAlt="ADVANCE logo"
        imageSide="left"
      />

      <AboutSection
        heading="Our Mission"
        body="ADVANCE exists to prepare University of Cincinnati students for a world of effective professionalism, building a cohesive community focused on the advancement of its members. As an educational program operating under UC's Career Development Center, ADVANCE bridges the gap between the classroom and the career students are working toward."
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_1.webp"
        imageAlt="The Men of Honor Gala 2024"
        imageSide="right"
      />

      <AboutSection
        heading="Goals"
        body="ADVANCE is built around three goals: equipping members with the tools and resources to succeed in their careers, connecting them with mentors and industry professionals, and creating consistent opportunities to network and grow through workshops and events."
        imageSrc="images/Old_Advance_Photos/Advance_20th_Annual_Report.webp"
        imageAlt="ADVANCE 20th Annual Report"
        imageSide="left"
      />

      <AboutSection
        heading="Benefits to Students"
        body="Members join a supportive community of like-minded students and gain direct access to industry professionals and ADVANCE alumni. Beyond networking, members receive exclusive job and internship postings, along with discounted access to ADVANCE events and workshops throughout the year."
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_2.webp"
        imageAlt="30th Annual ADVANCE Networking Reception"
        imageSide="right"
      />

      <AboutSection
        heading="Programs & Events"
        body="Throughout the year, ADVANCE hosts networking receptions, professional development workshops, and its signature Corporate Excursion. The organization partners with local businesses and community organizations to give members real-world professional experience alongside opportunities to give back."
        imageSrc="images/Old_Advance_Photos/Photo_from_ADVANCE_IG_3.webp"
        imageAlt="Programs & Events"
        imageSide="left"
      />
    </>
  );
}
