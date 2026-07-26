import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/advance-organization-59726937', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'mailto:advanceboard@gmail.com', label: 'Email', Icon: Mail },
  { href: 'https://instagram.com/advance_uc', label: 'Instagram', Icon: FaInstagram },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background px-6 py-8 text-center">
      <p className="text-sm text-foreground/70">
        &copy; {new Date().getFullYear()} ADVANCE. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center gap-6">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-foreground/70 transition-colors hover:text-primary"
          >
            <Icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
