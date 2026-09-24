'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { href: '/about', label: 'About', activeLabel: 'About ADVANCE' },
  { href: '/join', label: 'Join', activeLabel: 'The Process' },
  { href: '/events', label: 'Events' },
  { href: '/executive-board', label: 'Executive Board', activeLabel: 'Meet the Board'},
  { href: '/sponsors', label: 'Sponsors', activeLabel: 'Our Sponsors' },
  { href: '/resources', label: 'Resources' },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map(({ href, label, activeLabel }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`rounded px-3 py-2 font-semibold text-primary drop-shadow-md transition-colors ${
              isActive ? 'bg-primary/25' : 'hover:bg-primary/10 hover:text-primary/80'
            }`}
          >
            {isActive && activeLabel ? activeLabel : label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-white/5 bg-black/20 backdrop-blur transition-colors duration-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="ADVANCE home">
            <Image src="/images/Logos/Advance_logo_new.webp" alt="ADVANCE logo" width={56} height={56} />
          </Link>
          <Link href="https://www.uc.edu" aria-label="University of Cincinnati">
            <Image
              src="/images/Logos/university_of_cincinnati_logo.svg"
              alt="UC logo"
              width={44}
              height={44}
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-2 sm:flex" aria-label="Main navigation">
          <NavLinks />
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Toggle navigation" />
            }
          >
            <Menu className="h-6 w-6 text-primary drop-shadow-md" />
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-background text-foreground">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
              <NavLinks onNavigate={() => setOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
