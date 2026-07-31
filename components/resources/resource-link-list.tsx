import { ExternalLink } from 'lucide-react';
import type { ResourceLink } from '@/lib/data/resources';

interface ResourceLinkListProps {
  heading: string;
  intro?: string;
  links: ResourceLink[];
}

export function ResourceLinkList({ heading, intro, links }: ResourceLinkListProps) {
  const headingId = `resources-${heading.toLowerCase().replace(/\s+/g, '-')}-heading`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-6xl px-6 py-8">
      <h2 id={headingId} className="mb-2 text-2xl font-bold text-primary">
        {heading}
      </h2>
      {intro && <p className="mb-4 text-foreground/80">{intro}</p>}
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-4 py-2 text-sm text-foreground hover:bg-primary/10"
            >
              {link.label}
              <ExternalLink className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
