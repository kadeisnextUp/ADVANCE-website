'use client';

import { useScrollReveal } from '@/lib/use-scroll-reveal';
import { getFirstSentence } from '@/lib/data/get-first-sentence';
import { ExecutiveBoardAvatar } from './executive-board-avatar';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardCardProps {
  member: ExecutiveBoardMember;
  onSelect: (member: ExecutiveBoardMember) => void;
}

export function ExecutiveBoardCard({ member, onSelect }: ExecutiveBoardCardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const displayName = member.name ?? 'Vacant';
  const ariaLabel =
    member.name === null ? `Read more about the ${member.role} role` : `Read full bio for ${member.name}`;

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl bg-background ring-1 ring-primary/15 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(member)}
        className="block w-full text-left transition-colors hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 focus-visible:outline-none"
        aria-label={ariaLabel}
      >
        <ExecutiveBoardAvatar member={member} className="aspect-square w-full" />
        <div className="p-4">
          <h3 className={`mb-1 font-bold text-primary transition-colors duration-700 ${member.name === null ? 'italic' : ''}`}>
            {displayName}
          </h3>
          <p className="mb-2 text-sm text-foreground/70 transition-colors duration-700">{member.role}</p>
          <div className="text-sm text-foreground/80 transition-colors duration-700">
            <p className="line-clamp-2">{getFirstSentence(member.bio)}</p>
            <span className="font-semibold text-primary transition-colors duration-700">Read more</span>
          </div>
        </div>
      </button>
    </div>
  );
}