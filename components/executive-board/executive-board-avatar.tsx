import Image from 'next/image';
import { getInitials } from '@/lib/data/get-initials';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardAvatarProps {
  member: ExecutiveBoardMember;
  className?: string;
  sizes?: string;
}

const DEFAULT_SIZES = '(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 100vw';

export function ExecutiveBoardAvatar({ member, className = '', sizes = DEFAULT_SIZES }: ExecutiveBoardAvatarProps) {
  if (member.photo !== null) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={`/${member.photo}`} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const isVacant = member.name === null;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full border-2 bg-foreground/10 text-2xl font-bold text-primary transition-colors duration-700 sm:text-4xl ${
        isVacant ? 'border-dashed border-primary/50' : 'border-primary/60'
      } ${className}`}
    >
      {isVacant ? '—' : getInitials(member.name as string)}
    </div>
  );
}
