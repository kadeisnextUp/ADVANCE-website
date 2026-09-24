import { ExecutiveBoardCard } from './executive-board-card';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardSectionProps {
  heading: string;
  members: ExecutiveBoardMember[];
  onCardSelect: (member: ExecutiveBoardMember) => void;
}

export function ExecutiveBoardSection({ heading, members, onCardSelect }: ExecutiveBoardSectionProps) {
  const headingId = `exec-board-${heading.toLowerCase().replace(/\s+/g, '-')}-heading`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-6xl px-6 py-8">
      <h2 id={headingId} className="mb-4 text-xl font-bold text-primary transition-colors duration-700">
        {heading}
      </h2>
      {members.length === 0 ? (
        <p className="text-foreground/70">No members listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <ExecutiveBoardCard key={member.id} member={member} onSelect={onCardSelect} />
          ))}
        </div>
      )}
    </section>
  );
}