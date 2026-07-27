'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStagedTypewriter, type TypewriterStep } from '@/lib/use-staged-typewriter';

const SEQUENCE: TypewriterStep[] = [
  { id: 'title', text: 'Advance', speed: 400 },
  { id: 'quote', text: 'The mark of a leader.' },
  { id: 'welcome', text: 'Welcome to the revived site!' },
  { id: 'mission', text: "Advance is where we are paving the way for tomorrow's leaders!" },
];

function useClock(): string {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Hero() {
  const revealed = useStagedTypewriter(SEQUENCE);
  const time = useClock();

  return (
    <section className="relative flex min-h-[80vh] flex-col overflow-hidden">
      <Image src="/images/campus_sky.webp" alt="" fill priority className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <span
        className="relative z-10 m-4 self-end rounded bg-black/60 px-3 py-1 font-mono text-sm text-foreground"
        suppressHydrationWarning
      >
        {time}
      </span>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-16 text-center">
        <h1 className="min-h-[1.2em] text-4xl font-extrabold text-foreground drop-shadow-lg sm:text-6xl">
          {revealed.title}
        </h1>
        <p className="min-h-[1.5em] italic text-primary">{revealed.quote}</p>
        <p className="min-h-[1.5em] text-foreground/80">{revealed.welcome}</p>
        <p className="min-h-[1.5em] max-w-xl text-foreground/80">{revealed.mission}</p>
        <Button render={<Link href="/join" />} size="lg" className="mt-2">
          Join ADVANCE
        </Button>
      </div>
    </section>
  );
}
