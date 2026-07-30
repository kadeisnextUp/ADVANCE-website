import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/layout/page-banner';
import { ExecutiveBoardView } from '@/components/executive-board/executive-board-view';
import { executiveBoard } from '@/lib/data/executive-board';

export const metadata: Metadata = {
  title: 'Executive Board | ADVANCE',
  description: 'Meet the officers leading ADVANCE for the 2026-2027 academic year.',
};

export default function ExecutiveBoardPage() {
  return (
    <>
      <PageBanner tagline="ADVANCE - Lead Today. Inspiring Tomorrow!!!" />

      <h1 className="sr-only">Executive Board</h1>

      <div className="relative h-[40vh] w-full sm:h-[50vh]">
        <Image
          src="/images/Executive_Board_Photos/Group_photos/Executive_Board_Retreat_2025_1.webp"
          alt="ADVANCE Executive Board at their 2025 retreat"
          fill
          priority
          className="object-cover"
        />
      </div>
      <p className="py-3 text-center text-sm text-foreground/60 transition-colors duration-700">
        Executive Board Retreat, 2025
      </p>

      <ExecutiveBoardView members={executiveBoard} />
    </>
  );
}
