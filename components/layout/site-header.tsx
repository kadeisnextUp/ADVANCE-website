'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/join', label: 'Join' },
  { href: '/events', label: 'Events' },
  { href: '/executive-board', label: 'Executive Board' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/resources', label: 'Resources' },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={`rounded px-3 py-2 font-semibold transition-colors ${
            pathname === href
              ? 'bg-primary/25 text-primary'
              : 'text-foreground hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur">
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
            <Menu className="h-6 w-6 text-primary" />
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-background">
            <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
              <NavLinks onNavigate={() => setOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
