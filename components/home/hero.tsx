import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const REVEAL_DELAYS = ['20ms', '600ms', '1000ms', '1500ms'];

export function Hero() {
  return (
    <section className="relative -mt-[73px] flex min-h-[80dvh] flex-col overflow-hidden">
      <Image src="/images/campus_sky.webp" alt="" fill priority className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-16 text-center">
        <h1
          className="hero-reveal text-4xl font-extrabold text-primary drop-shadow-lg sm:text-6xl"
          style={{ animationDelay: REVEAL_DELAYS[0] }}
        >
          ADVANCE
        </h1>
        <p
          className="hero-reveal italic text-primary drop-shadow-lg"
          style={{ animationDelay: REVEAL_DELAYS[1] }}
        >
          The mark of a leader.
        </p>
        <p
          className="hero-reveal max-w-xl text-primary drop-shadow-lg"
          style={{ animationDelay: REVEAL_DELAYS[2] }}
        >
          Since 1986, a Chevron Award-winning legacy of student leadership at UC.
        </p>
        <p
          className="hero-reveal max-w-xl text-primary drop-shadow-lg"
          style={{ animationDelay: REVEAL_DELAYS[3] }}
        >
          We prepare University of Cincinnati students for careers, connect them with mentors, and
          build a community of leaders.
        </p>
        <Button
          render={<Link href="/join" />}
          nativeButton={false}
          size="lg"
          className="mt-2 h-14 px-8 text-base font-semibold"
        >
          Join ADVANCE
        </Button>
      </div>
    </section>
  );
}