'use client';

import { useEffect, useState } from 'react';
import { ExecutiveBoardSection } from './executive-board-section';
import { ExecutiveBoardBioDialog } from './executive-board-bio-dialog';
import type { ExecutiveBoardMember } from '@/lib/data/executive-board';

interface ExecutiveBoardViewProps {
  members: ExecutiveBoardMember[];
}

export function ExecutiveBoardView({ members }: ExecutiveBoardViewProps) {
  const [selectedMember, setSelectedMember] = useState<ExecutiveBoardMember | null>(null);

  useEffect(() => {
    const root = document.documentElement.style;

    if (selectedMember) {
      root.setProperty('--background', selectedMember.theme.bg);
      root.setProperty('--foreground', selectedMember.theme.fg);
      root.setProperty('--primary', selectedMember.theme.accent);
    } else {
      root.removeProperty('--background');
      root.removeProperty('--foreground');
      root.removeProperty('--primary');
    }

    return () => {
      root.removeProperty('--background');
      root.removeProperty('--foreground');
      root.removeProperty('--primary');
    };
  }, [selectedMember]);

  const leadership = members.filter((member) => member.team === 'leadership');
  const external = members.filter((member) => member.team === 'external');
  const internal = members.filter((member) => member.team === 'internal');

  return (
    <>
      <ExecutiveBoardSection heading="Executive Leadership" members={leadership} onCardSelect={setSelectedMember} />
      <ExecutiveBoardSection heading="External Affairs" members={external} onCardSelect={setSelectedMember} />
      <ExecutiveBoardSection heading="Internal Affairs" members={internal} onCardSelect={setSelectedMember} />
      <ExecutiveBoardBioDialog member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}
