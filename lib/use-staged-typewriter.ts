'use client';

import { useEffect, useState } from 'react';

export interface TypewriterStep {
  id: string;
  text: string;
  speed?: number;
}

const DEFAULT_SPEED = 50;

export function useStagedTypewriter(steps: TypewriterStep[]): Record<string, string> {
  const [revealed, setRevealed] = useState<Record<string, string>>({});

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function typeStep(stepIndex: number) {
      if (stepIndex >= steps.length) return;
      const step = steps[stepIndex];
      const speed = step.speed ?? DEFAULT_SPEED;

      function typeChar(charIndex: number) {
        setRevealed((prev) => ({ ...prev, [step.id]: step.text.slice(0, charIndex) }));
        if (charIndex < step.text.length) {
          timeouts.push(setTimeout(() => typeChar(charIndex + 1), speed));
        } else {
          timeouts.push(setTimeout(() => typeStep(stepIndex + 1), speed));
        }
      }

      typeChar(0);
    }

    typeStep(0);

    return () => timeouts.forEach(clearTimeout);
  }, [steps]);

  return revealed;
}
